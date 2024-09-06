import About from "./about.model";
interface AboutData {
  companyName: string;
  description: string;
  location: string;
  name: string;
  id: string;
}
export const createAbout = async (
  body: AboutData,
  user: AboutData,
  fullName: AboutData
) => {
  return await About.create({
    name: fullName,
    companyName: body.companyName,
    description: body.description,
    location: body.location,
    createdBy: user,
  });
};
export const getAbout = async (user: AboutData) => {
  const foundAbout = await About.findOne({
    createdBy: user,
  });
  if (!foundAbout) {
    return null;
  }
  const about = await About.find({
    createdBy: user,
  });
  return about;
};
export const editAbout = async (body: AboutData, user: AboutData) => {
  return await About.findOneAndUpdate(
    {
      _id: body.id,
      createdBy: user,
    },
    {
      companyName: body.companyName,
      description: body.description,
      location: body.location,
    },
    {
      new: true,
    }
  );
};
