import { Request, Response } from "express";
import { uploadFileToCloudinary } from "../services/UploadService";
import fs from "fs";
import { logger } from "../logger/Logger";

export class UploadController {
    async uploadFile(req: Request, res: Response) {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }
        try {
            // @ts-expect-error usuario injetado pelo middleware
            const requestUserId = req.usuario?.id;

            logger.logFileUpload(requestUserId || 0, req.file.originalname, 'UploadController');

            const result = await uploadFileToCloudinary(req.file.path, req.file.originalname);
            fs.unlinkSync(req.file.path);

            logger.info('UploadController', 'FILE_UPLOAD_SUCCESS', requestUserId, {
                filename: req.file.originalname,
                url: result.secure_url
            });

            res.status(201).json({ url: result.secure_url });
        } catch (error) {
            logger.error('UploadController', 'UPLOAD_FILE_ERROR', undefined, error as Error);
            console.error("Erro ao fazer upload:", error);
            res.status(500).json({ error: "Erro ao fazer upload do arquivo." });
        }
    }
}
