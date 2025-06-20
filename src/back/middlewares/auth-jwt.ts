import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  usuario?: JwtPayload | string;
}

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  // Busca o token apenas no cookie HTTP Only
  const token = req.cookies?.trackit_token;

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        res.status(403).json({ error: 'Token inválido ou expirado' });
      } else {
        (req as AuthenticatedRequest).usuario = decoded;
        next();
      }
    });
  }
}