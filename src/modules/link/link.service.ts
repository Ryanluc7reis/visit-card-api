import Link from "./link.model";
interface LinkData {
  url: string;
  app: string;
  user?: string | any;
}
export const createLink = async (body: LinkData, user: LinkData) => {
  return await Link.create({
    url: body.url,
    app: body.app,
    createdBy: user,
  });
};
export const getLinks = async (user: LinkData) => {
  const link = await Link.findOne({
    createdBy: user,
  });
  if (!link) {
    return null;
  }
  const links = await Link.find({
    createdBy: user,
  });
  return links;
};
