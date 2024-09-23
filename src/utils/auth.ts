// auth.ts
import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import InvalidToken from "../modules/invalidtoken/invalidToken.model";
dotenv.config();

const AUTH_SECRET = process.env.SESSION_PASSWORD as string;
const AUTH_NAME = process.env.SESSION_TOKEN_NAME as string;

interface TokenData {
  user: string;
  userId: string;
  email: string;
  fullName: string;
  number?: string;
}
declare module "express-serve-static-core" {
  interface Request {
    user?: string;
    userId?: string;
    email?: string;
    fullName?: string;
    number?: string;
  }
}

export const generateAccessToken = (data: TokenData): string => {
  const token = sign(data, AUTH_SECRET, { expiresIn: 300 });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers[AUTH_NAME] as string | undefined;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const verifyInvalidToken = await InvalidToken.findOne({ token });
    if (verifyInvalidToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    verify(token, AUTH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Falha ao autenticar o token" });
      } else {
        const payload = decoded as TokenData;

        req.user = payload.user;
        req.userId = payload.userId;
        req.email = payload.email;
        req.fullName = payload.fullName;
        req.number = payload.number;

        next();
      }
    });
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
