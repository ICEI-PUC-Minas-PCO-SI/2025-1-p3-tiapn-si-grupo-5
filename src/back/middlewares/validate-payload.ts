import { Request, Response, NextFunction } from "express";
import type { ZodSchema, ZodError } from "zod";
import type { Schema as JoiSchema, ValidationError as JoiError } from "joi";

type SupportedSchema = ZodSchema<unknown> | JoiSchema;

export function validatePayload(schema: SupportedSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Zod
        if (typeof (schema as ZodSchema).safeParse === "function") {
            const result = (schema as ZodSchema).safeParse(req.body);
            if (!result.success) {
                res.status(400).json({
                    error: "Validation error",
                    details: (result.error as ZodError).errors
                });
                return;
            }
            req.body = result.data;
            next();
            return;
        }
        if (typeof (schema as JoiSchema).validate === "function") {
            const { error, value } = (schema as JoiSchema).validate(req.body, { abortEarly: false });
            if (error) {
                res.status(400).json({
                    error: "Validation error",
                    details: (error as JoiError).details
                });
                return;
            }
            req.body = value;
            next();
            return;
        }
        // Schema não suportado
        res.status(500).json({ error: "Invalid validation schema" });
    };
}
