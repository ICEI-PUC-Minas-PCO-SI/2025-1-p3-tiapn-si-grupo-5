import { Request, Response } from "express";
import { uploadFileToCloudinary } from "../services/uploadService";
import fs from "fs";

export class UploadController {
    async uploadFile(req: Request, res: Response) {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado." });
        }
        try {
            const result = await uploadFileToCloudinary(req.file.path, req.file.originalname);
            fs.unlinkSync(req.file.path);
            res.status(201).json({ url: result.secure_url });
        } catch (error) {
            console.error("Erro ao fazer upload:", error);
            res.status(500).json({ error: "Erro ao fazer upload do arquivo." });
        }
    }
}
