import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, usuario) => {
      if (err) {
        res.status(403).json({ error: 'Token inválido ou expirado' });
      } else {
        // @ts-ignore
        req.usuario = usuario;
        next();
      }
    });
  }
}