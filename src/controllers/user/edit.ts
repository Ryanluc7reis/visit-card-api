import { Router } from "express";

import {
  editUser,
  getUser,
  verifyPassword,
} from "../../modules/user/user.service";
import {
  editUserSchema,
  verifyPasswordSchema,
} from "../../modules/user/user.schema";
import validation from "../../lib/middlewares/validation";
import { verifyToken } from "../../utils/auth";

const router = Router();

router.patch(
  "/editUser",
  verifyToken,
  validation(editUserSchema),
  async (req, res) => {
    try {
      const newUser = await editUser(req.body, req.user as any);
      if (newUser) {
        return res.status(200).json({ message: "Usuário editado com sucesso" });
      }
      return res.status(400).json({ message: "Algo deu errado" });
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);
router.post(
  "/verify-password",
  verifyToken,
  validation(verifyPasswordSchema),
  async (req, res) => {
    try {
      const user = await verifyPassword(req.body, req.user as any);
      if (user) return res.status(200).json({ user });

      return res.status(400).json({ message: "Erro ao verificar senha" });
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

router.get("/getUser", verifyToken, async (req, res) => {
  try {
    const user = await getUser(req.user as any);
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).json({ message: "Usuário não encontrado" });
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

export default router;
