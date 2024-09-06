import Link from "./link.model";

interface LinkData {
  url: string;
  app: string;
  links: LinkData[];
  user?: string | any;
  id: string;
  linkId: string;
}

export const createOrUpdateLinks = async (body: LinkData, user: LinkData) => {
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
export const editLink = async (body: LinkData, user: string) => {
  return await Link.findOneAndUpdate(
    {
      _id: body.id,
      "links._id": body.linkId,
      createdBy: user,
    },
    {
      $set: {
        "links.$.url": body.url,
        "links.$.app": body.app,
      },
    },
    {
      new: true,
    }
  );
};
