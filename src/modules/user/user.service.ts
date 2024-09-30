import { hashPassword, compareSync } from "../../utils/bcrypt";
import { generateAccessToken } from "../../utils/auth";
import User from "./user.model";
import About from "../about/about.model";
import Link from "../link/link.model";

interface Body {
  firstName: string;
  lastName: string;
  user: string;
  email: string;
  password: string;
  userOrEmail: string;
  number: string;
  createdBy: string;
  id: string;
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

    const fullName = `${user.firstName} ${user.lastName}`;

    const token = generateAccessToken({
      user: user.user,
      userId: user.id,
      fullName: fullName,
      email: user.email,
      number: user.number,
    });

    return token;
  } catch (err) {
    throw err;
  }
};
export const editUser = async (body: Body, user: Body) => {
  try {
    const findUser = await User.findById(body.id);

    if (!findUser) {
      throw new Error("Usuário não encontrado");
    }

    if (body.password && body.password !== findUser.password) {
      body.password = hashPassword(body.password);
    } else {
      body.password = findUser.password;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: body.id },
      {
        email: body.email,
        password: body.password,
        number: body.number,
      },
      { new: true }
    );

    const updatedNumberAbout = await About.findOneAndUpdate(
      { createdBy: user },
      { number: updatedUser?.number },
      { new: true }
    );

    const newUser = updatedUser && updatedNumberAbout && true;
    if (!newUser) throw new Error("Não foi possível editar usuário");
    return newUser;
  } catch (err) {
    throw err;
  }
};

export const verifyPassword = async (body: Body, user: Body) => {
  try {
    const findUser: any = await User.findOne({
      user: user,
    });
    const passwordIsCorrect = compareSync(body.password, findUser.password);
    if (!passwordIsCorrect) throw new Error("password incorrect");

    return findUser;
  } catch (err) {
    throw err;
  }
};
export const getUser = async (user: Body) => {
  return await User.findOne({
    user: user,
  });
};
