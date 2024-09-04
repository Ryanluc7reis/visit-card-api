import { Router } from "express";
import dotenv from "dotenv";
import InvalidToken from "../../modules/invalidtoken/invalidToken.model";
dotenv.config();

const logout = Router();
const AUTH_NAME: string | any = process.env.SESSION_TOKEN_NAME;

logout.post("/logout", async (req, res) => {
  try {
    const token = req.headers[AUTH_NAME];
    if (!token) return res.status(401).send("Token não fornecido.");

    const invalidToken = new InvalidToken({ token });
    await invalidToken.save();

    res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (err) {
    console.error("Erro durante o logout:", err);
    return res.status(500).send("Ocorreu um erro durante o logout.");
  }
});

export default logout;
