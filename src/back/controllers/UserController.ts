import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserService } from "../services/UserService";
import { sendPasswordResetEmail } from "../services/emailServices";
import { uploadFileToCloudinary } from "../services/uploadService";
import fs from "fs";

const userService = new UserService();

export class UserController {
    async registerUser(req: Request, res: Response) {
        try {
            const { nomeUsuario, matricula, ramal, email, senha, gerencia, tipoUsuario } = req.body;

            // Verifica matrícula duplicada
            const existingMatricula = await userService.findUserByMatricula(matricula);
            if (existingMatricula) {
                res.status(400).json({ error: "Já existe um usuário cadastrado com esta matrícula." });
                return;
            }

            // Verifica email duplicado
            const existingEmail = await userService.findUserByEmail(email);
            if (existingEmail) {
                res.status(400).json({ error: "Já existe um usuário cadastrado com este e-mail." });
                return;
            }

            const novoUsuario = await userService.registerUser({
                nomeUsuario, matricula, ramal, email, senha, gerencia, tipoUsuario
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { senha: _, ...usuarioSemSenha } = novoUsuario;
            res.status(201).json(usuarioSemSenha);
            console.log(JSON.stringify(usuarioSemSenha));
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;
            const { error, usuario } = await userService.loginUser(email, senha);
            if (!usuario) {
                res.status(401).json({ error: error || "Email ou senha inválidos" });
                return;
            }
            if (!usuario.ativo) {
                res.status(403).json({ error: "Sua conta está desativada. Entre em contato com o administrador." });
                return;
            }
            let nomeGerencia: string | undefined = undefined;
            if (usuario.idGerencia) {
                nomeGerencia = undefined;
            }
            const token = jwt.sign(
                { id: usuario.idUsuario, email: usuario.email },
                process.env.JWT_SECRET as string,
                { expiresIn: '30m' }
            );
            // Set cookie HTTP Only
            res.cookie("trackit_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
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
                    fotoPerfil: usuario.fotoPerfil,
                    nomeGerencia
                }
                // NÃO envie o token no corpo!
            });
        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Erro no servidor" });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const clients = await userService.getAllUsers();
            res.json(clients);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params;
            const { matricula, gerencia, tipoUsuario } = req.body;
            const updatedUser = await userService.updateUser(Number(idUsuario), { matricula, gerencia, tipoUsuario });
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }

    async changeUserStatus(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params;
            const { ativo } = req.body;
            const updatedUser = await userService.changeUserStatus(Number(idUsuario), ativo);
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Erro ao mudar status do usuário:", error);
            res.status(500).json({ error: "Erro ao mudar status do usuário" });
        }
    }

    async getMe(req: Request, res: Response) {
        try {
            // @ts-expect-error none
            const usuarioId = req.usuario.id;
            const usuario = await userService.getMe(usuarioId);
            if (!usuario) {
                res.status(404).json({ error: "Usuário não encontrado" });
                return;
            }
            res.json({
                usuario: {
                    id: usuario.idUsuario,
                    nome: usuario.nomeUsuario,
                    email: usuario.email,
                    ramal: usuario.ramal,
                    matricula: usuario.matricula,
                    gerencia: usuario.idGerencia,
                    tipo: usuario.idTipoUsuario,
                    ativo: usuario.ativo,
                    fotoPerfil: usuario.fotoPerfil,
                    idTipoUsuario: usuario.idTipoUsuario,
                    nomeGerencia: usuario.gerencia?.nomeGerencia
                }
            });
        } catch (error) {
            console.error("Erro ao buscar usuário autenticado:", error);
            res.status(500).json({ error: "Erro ao buscar usuário autenticado" });
        }
    }

    async updateProfileUser(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.idUsuario);
            const { nome, email, ramal } = req.body;
            if (!nome || !email || !ramal) {
                res.status(400).json({ error: "Todos os campos são obrigatórios." });
                return;
            }
            const existingUser = await userService.findUserByEmail(email);
            if (existingUser && existingUser.idUsuario !== usuarioId) {
                res.status(400).json({ error: "Este e-mail já está em uso por outro usuário." });
                return;
            }
            const updatedUser = await userService.updateProfileUser(usuarioId, { nome, email, ramal });
            res.status(200).json({
                id: updatedUser.idUsuario,
                nome: updatedUser.nomeUsuario,
                email: updatedUser.email,
                ramal: updatedUser.ramal,
                matricula: updatedUser.matricula,
                gerencia: updatedUser.idGerencia,
                tipo: updatedUser.idTipoUsuario,
                ativo: updatedUser.ativo,
                fotoPerfil: updatedUser.fotoPerfil,
            });
            return;
        } catch (error) {
            console.error("Erro ao atualizar perfil do usuário:", error);
            res.status(500).json({ error: "Erro ao atualizar perfil do usuário" });
            return;
        }
    }

    async getAnalysts(req: Request, res: Response) {
        try {
            const analysts = await userService.getAnalysts();
            res.json(analysts);
        } catch (error) {
            console.error("Erro ao buscar analistas:", error);
            res.status(500).json({ error: "Erro ao buscar analistas" });
        }
    }

    async checkEmailExists(req: Request, res: Response) {
        try {
            const email = req.params.email;
            if (!email) {
                res.status(400).json({ exists: false, error: "E-mail não registrado" });
                return;
            }
            const user = await userService.findUserByEmail(email);
            res.json({ exists: !!user });
        } catch (error) {
            console.error("Erro ao checar e-mail:", error);
            res.status(500).json({ error: "Erro ao checar e-mail" });
        }
    }

    async requestPasswordReset(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const result = await userService.createPasswordResetToken(email);
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
        } catch (error) {
            console.error("Erro ao solicitar redefinição de senha:", error);
            res.status(500).json({ error: "Erro ao solicitar redefinição de senha" });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { token, senha } = req.body;
            const result = await userService.resetPasswordByToken(token, senha);
            if (!result.success) {
                res.status(400).json({ error: result.error });
                return;
            }
            res.json({ message: "Senha redefinida com sucesso." });
        } catch (error) {
            console.error("Erro ao redefinir senha:", error);
            res.status(500).json({ error: "Erro ao redefinir senha" });
        }
    }

    async uploadProfilePhoto(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.idUsuario);
            if (!req.file) {
                return res.status(400).json({ error: "Nenhum arquivo enviado." });
            }
            console.log("[UserController] Foto recebida:", req.file.originalname, req.file.path);
            const result = await uploadFileToCloudinary(req.file.path, req.file.originalname);
            console.log("[UserController] Resposta do Cloudinary:", result);
            const fotoPerfilUrl = result.secure_url;
            fs.unlinkSync(req.file.path);

            const updatedUser = await userService.updateProfilePhoto(idUsuario, fotoPerfilUrl);
            console.log("[UserController] Usuário atualizado com fotoPerfil:", updatedUser);
            res.status(200).json({ fotoPerfil: fotoPerfilUrl });
        } catch (error) {
            console.error("Erro ao fazer upload da foto de perfil:", error);
            res.status(500).json({ error: "Erro ao fazer upload da foto de perfil." });
        }
    }
}