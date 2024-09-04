import { hashPassword } from "../../../utils/bcrypt.ts";

import User from "./user.model";

interface Body {
  fullName: string;
  user: string;
  email: string;
  password: string;
}

export const signupUser = async (body: Body) => {
  try {
    const user = {
      ...body,
      password: hashPassword(body.password),
    };
    const dbUser = await User.create(user);
    return dbUser;
  } catch (err) {
    throw err;
  }
};
