import { hashPassword, compareSync } from "../../../utils/bcrypt.ts";
import { generateAccessToken } from "../../../utils/auth";
import User from "./user.model";

interface Body {
  firstName: string;
  lastName: string;
  user: string;
  email: string;
  password: string;
  userOrEmail: string;
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
export const loginUser = async (body: Body) => {
  try {
    const user = await User.findOne({
      $or: [{ email: body.userOrEmail }, { user: body.userOrEmail }],
    });

    if (!user) throw new Error("not found");
    const passwordIsCorrect = compareSync(body.password, user.password);
    if (!passwordIsCorrect) throw new Error("password incorrect");

    const token = generateAccessToken({
      user: body.userOrEmail,
      userId: user.id,
      fullName: user.firstName + user.lastName,
      email: user.email,
    });
    return token;
  } catch (err) {
    throw err;
  }
};
