import { Router } from "express";

import { verifyToken } from "../../utils/auth";

const sessionVerification = Router();

sessionVerification.get("/verify-session", verifyToken, async (req, res) => {
  try {
    const session = {
      user: req.user,
      userId: req.userId,
      email: req.email,
      fullName: req.fullName,
      number: req.number,
    };
    if (session) {
      return res.status(200).send(session);
    }

    return res.status(401).send({ error: "Sessão inválida" });
  } catch (error) {
    console.error("Erro ao validar sessão:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default sessionVerification;
