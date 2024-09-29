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
      const about = await editUser(req.body);
      if (about) {
        return res.status(200).send(about);
      }
      return res.status(400).json({ message: "Algo deu errado" });
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }
);

export default router;
