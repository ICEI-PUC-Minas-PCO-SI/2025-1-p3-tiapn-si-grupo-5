import { Request, Response, NextFunction } from "express";
import type { ZodSchema, ZodError } from "zod";
import type { Schema as JoiSchema, ValidationError as JoiError } from "joi";

type SupportedSchema = ZodSchema<unknown> | JoiSchema;

export function validatePayload(schema: SupportedSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Zod
        if (typeof (schema as ZodSchema).safeParse === "function") {
            const result = (schema as ZodSchema).safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({
                    error: "Validation error",
                    details: (result.error as ZodError).errors
                });
            }
            req.body = result.data;
            return next();
        }
        if (typeof (schema as JoiSchema).validate === "function") {
            const { error, value } = (schema as JoiSchema).validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    error: "Validation error",
                    details: (error as JoiError).details
                });
            }
            req.body = value;
            return next();
        }
        // Schema não suportado
        return res.status(500).json({ error: "Invalid validation schema" });
    };
}
