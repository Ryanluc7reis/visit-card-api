import bcryptjs from "bcryptjs";

export const hashPassword = (password: string) => bcryptjs.hashSync(password);

export const compareSync = (password: string, hash: any) =>
  bcryptjs.compareSync(password, hash);
