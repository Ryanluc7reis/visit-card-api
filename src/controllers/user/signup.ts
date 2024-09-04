import { Router } from "express";
import { signupUser } from "../../modules/user/user.service";
import { signupUserSchema } from "../../modules/user/user.schema";
import validation from "../../../lib/middlewares/validation";

const signup = Router();

signup.post("/signup", validation(signupUserSchema), async (req, res) => {
  try {
    const user = await signupUser(req.body);
    if (user) {
      res.status(201).json({ message: "Usuário criado com sucesso" });
    }
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).send({
        code: 11000,
        duplicatedKey: Object.keys(err.keyPattern)[0],
      });
    }
    return res.status(500).send(err.message);
  }
});
export default signup;
