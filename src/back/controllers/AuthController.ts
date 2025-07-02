import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthService } from "../services/AuthService";
import { sendPasswordResetEmail } from "../services/EmailServices";
import { logger } from "../logger/Logger";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { nomeUsuario, matricula, ramal, email, senha, gerencia, tipoUsuario } = req.body;

            logger.info('AuthController', 'REGISTER_ATTEMPT', undefined, { email, matricula, nomeUsuario });

            const result = await authService.register({ nomeUsuario, matricula, ramal, email, senha, gerencia, tipoUsuario });
            if (result.error) {
                logger.warn('AuthController', 'REGISTER_FAILED', undefined, { email, error: result.error });
                res.status(400).json({ error: result.error });
                return;
            }

            logger.logCreate('AuthController', 'USER', result.usuario?.idUsuario || 0, undefined, { email, matricula, nomeUsuario });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { senha: _senha, ...usuarioSemSenha } = result.usuario ?? {};
            res.status(201).json(usuarioSemSenha);
        } catch (error) {
            logger.error('AuthController', 'REGISTER_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao registrar usuário" });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, senha } = req.body;

            logger.info('AuthController', 'LOGIN_ATTEMPT', undefined, { email });

            const { error, usuario } = await authService.login(email, senha);
            if (!usuario) {
                logger.warn('AuthController', 'LOGIN_FAILED', undefined, { email, error });
                res.status(401).json({ error: error || "Email ou senha inválidos" });
                return;
            }
            if (!usuario.ativo) {
                logger.warn('AuthController', 'LOGIN_INACTIVE_USER', usuario.idUsuario, { email });
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

            logger.logAuth('LOGIN_SUCCESS', usuario.idUsuario, email, true);

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
        } catch (error) {
            logger.error('AuthController', 'LOGIN_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro no servidor" });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        // @ts-expect-error usuario injetado pelo middleware
        const userId = req.usuario?.id;

        logger.logAuth('LOGOUT', userId);

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

            logger.info('AuthController', 'PASSWORD_RESET_REQUEST', undefined, { email });

            const result = await authService.createPasswordResetToken(email);
            if (!result) {
                logger.warn('AuthController', 'PASSWORD_RESET_EMAIL_NOT_FOUND', undefined, { email });
                res.status(404).json({ error: "E-mail não encontrado" });
                return;
            }

            await sendPasswordResetEmail({
                to: result.user.email,
                nomeUsuario: result.user.nomeUsuario,
                token: result.token
            });

            logger.info('AuthController', 'PASSWORD_RESET_EMAIL_SENT', result.user.idUsuario, { email });

            res.json({ message: "E-mail de redefinição enviado com sucesso." });
        } catch (error) {
            logger.error('AuthController', 'PASSWORD_RESET_REQUEST_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao solicitar redefinição de senha" });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token, senha } = req.body;

            logger.info('AuthController', 'PASSWORD_RESET_ATTEMPT', undefined, { token: token.substring(0, 8) + '...' });

            const result = await authService.resetPasswordByToken(token, senha);
            if (!result.success) {
                logger.warn('AuthController', 'PASSWORD_RESET_FAILED', undefined, { error: result.error });
                res.status(400).json({ error: result.error });
                return;
            }

            logger.info('AuthController', 'PASSWORD_RESET_SUCCESS', undefined, { token: token.substring(0, 8) + '...' });

            res.json({ message: "Senha redefinida com sucesso." });
        } catch (error) {
            logger.error('AuthController', 'PASSWORD_RESET_ERROR', undefined, error as Error);
            res.status(500).json({ error: "Erro ao redefinir senha" });
        }
    }
}
