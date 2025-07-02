import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { uploadFileToCloudinary } from "../services/UploadService";
import fs from "fs";
import { logger } from "../logger/Logger";

const userService = new UserService();

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const clients = await userService.getAllUsers();
            res.json(clients);
        } catch (error) {
            logger.error('UserController', 'GET_ALL_USERS_ERROR', undefined, error as Error);
            console.error("Erro ao buscar usuários:", error);
            res.status(500).json({ error: "Erro ao buscar usuários" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params;
            const { matricula, gerencia, tipoUsuario } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logUpdate('UserController', 'USER', idUsuario, requestUserId, { matricula, gerencia, tipoUsuario });

            const updatedUser = await userService.updateUser(Number(idUsuario), { matricula, gerencia, tipoUsuario });
            res.status(200).json(updatedUser);
        } catch (error) {
            logger.error('UserController', 'UPDATE_USER_ERROR', undefined, error as Error);
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({ error: "Erro ao atualizar usuário" });
        }
    }

    async changeUserStatus(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params;
            const { ativo } = req.body;
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.critical('UserController', 'CHANGE_USER_STATUS', requestUserId, {
                targetUserId: idUsuario,
                newStatus: ativo ? 'ACTIVE' : 'INACTIVE'
            });

            const updatedUser = await userService.changeUserStatus(Number(idUsuario), ativo);
            res.status(200).json(updatedUser);
        } catch (error) {
            logger.error('UserController', 'CHANGE_USER_STATUS_ERROR', undefined, error as Error);
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
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            if (!nome || !email || !ramal) {
                res.status(400).json({ error: "Todos os campos são obrigatórios." });
                return;
            }

            const existingUser = await userService.findUserByEmail(email);
            if (existingUser && existingUser.idUsuario !== usuarioId) {
                res.status(400).json({ error: "Este e-mail já está em uso por outro usuário." });
                return;
            }

            logger.logUpdate('UserController', 'USER_PROFILE', usuarioId, requestUserId, { nome, email, ramal });

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
        } catch (error) {
            logger.error('UserController', 'UPDATE_PROFILE_ERROR', undefined, error as Error);
            console.error("Erro ao atualizar perfil do usuário:", error);
            res.status(500).json({ error: "Erro ao atualizar perfil do usuário" });
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

    async uploadProfilePhoto(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.idUsuario);
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            if (!req.file) {
                return res.status(400).json({ error: "Nenhum arquivo enviado." });
            }

            logger.logFileUpload(requestUserId || idUsuario, req.file.originalname, 'UserController');

            const result = await uploadFileToCloudinary(req.file.path, req.file.originalname);
            const fotoPerfilUrl = result.secure_url;
            fs.unlinkSync(req.file.path);

            logger.logUpdate('UserController', 'USER_PHOTO', idUsuario, requestUserId, { photoUrl: fotoPerfilUrl });

            res.status(200).json({ fotoPerfil: fotoPerfilUrl });
        } catch (error) {
            logger.error('UserController', 'UPLOAD_PHOTO_ERROR', undefined, error as Error);
            console.error("Erro ao fazer upload da foto de perfil:", error);
            res.status(500).json({ error: "Erro ao fazer upload da foto de perfil." });
        }
    }
}