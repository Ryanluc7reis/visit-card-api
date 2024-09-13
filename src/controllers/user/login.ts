import { Router } from "express";

import { loginUser } from "../../modules/user/user.service";
import { loginSchema } from "../../modules/user/user.schema";
import validation from "../../lib/middlewares/validation";

const login = Router();

login.post("/login", validation(loginSchema), async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.json({ auth: true, token });
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

export default login;
