import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthService } from "../services/AuthService";
import { sendPasswordResetEmail } from "../services/EmailServices";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { nomeUsuario, matricula, ramal, email, senha, gerencia, tipoUsuario } = req.body;
            const result = await authService.register({ nomeUsuario, matricula, ramal, email, senha, gerencia, tipoUsuario });
            if (result.error) {
                res.status(400).json({ error: result.error });
                return;
            }
            // Não tente acessar senha se não existir
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { senha: _senha, ...usuarioSemSenha } = result.usuario ?? {};
            res.status(201).json(usuarioSemSenha);
        } catch {
            res.status(500).json({ error: "Erro ao registrar usuário" });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, senha } = req.body;
            const { error, usuario } = await authService.login(email, senha);
            if (!usuario) {
                res.status(401).json({ error: error || "Email ou senha inválidos" });
                return;
            }
            if (!usuario.ativo) {
                res.status(403).json({ error: "Sua conta está desativada. Entre em contato com o administrador." });
                return;
            }
            const token = jwt.sign(
                { id: usuario.idUsuario, email: usuario.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '30m' }
            );
            res.cookie("trackit_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 30 * 60 * 1000
            });
            res.status(200).json({
                message: "Login realizado com sucesso",
                usuario: {
                    id: usuario.idUsuario,
                    nome: usuario.nomeUsuario,
                    email: usuario.email,
                    ramal: usuario.ramal,
                    matricula: usuario.matricula,
                    gerencia: usuario.idGerencia,
                    tipo: usuario.idTipoUsuario,
                    ativo: usuario.ativo,
                    fotoPerfil: usuario.fotoPerfil
                }
            });
        } catch {
            res.status(500).json({ error: "Erro no servidor" });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        res.clearCookie("trackit_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        res.status(200).json({ message: "Logout realizado com sucesso" });
    }

    async requestPasswordReset(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const result = await authService.createPasswordResetToken(email);
            if (!result) {
                res.status(404).json({ error: "E-mail não encontrado" });
                return;
            }
            await sendPasswordResetEmail({
                to: result.user.email,
                nomeUsuario: result.user.nomeUsuario,
                token: result.token
            });
            res.json({ message: "E-mail de redefinição enviado com sucesso." });
        } catch {
            res.status(500).json({ error: "Erro ao solicitar redefinição de senha" });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token, senha } = req.body;
            const result = await authService.resetPasswordByToken(token, senha);
            if (!result.success) {
                res.status(400).json({ error: result.error });
                return;
            }
            res.json({ message: "Senha redefinida com sucesso." });
        } catch {
            res.status(500).json({ error: "Erro ao redefinir senha" });
        }
    }
}
