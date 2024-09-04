import Link from "./link.model";
interface LinkData {
  url: string;
  user?: string | any;
}
export const createLink = async (body: LinkData, user: LinkData) => {
  return await Link.create({
    url: body.url,
    createdBy: user,
  });
};
