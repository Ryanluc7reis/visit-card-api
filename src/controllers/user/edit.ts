import { Router } from "express";

import { editUser } from "../../modules/user/user.service";
import { editUserSchema } from "../../modules/user/user.schema";
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

export default router;
