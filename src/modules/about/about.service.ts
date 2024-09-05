import About from "./about.model";
interface AboutData {
  companyName: string;
  description: string;
  location: string;
}
export const createAbout = async (body: AboutData, user: AboutData) => {
  return await About.create({
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
