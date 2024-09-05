import Link from "./link.model";

interface LinkData {
  url: string;
  app: string;
}

interface CreateLinkData {
  links: LinkData[];
  user?: string | any;
}

export const createOrUpdateLinks = async (
  body: CreateLinkData,
  user: string
) => {
  const existingLinks = await Link.findOne({ createdBy: user });
  if (existingLinks) {
    body.links.forEach((link) => {
      existingLinks.links.push(link);
    });
    return await existingLinks.save();
  } else {
    return await Link.create({
      links: body.links,
      createdBy: user,
    });
  }
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
