import About from "./about.model";
interface AboutData {
  companyName: string;
  description: string;
  location: string;
  name: string;
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
