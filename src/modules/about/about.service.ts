import About from "./about.model";
import User from "../user/user.model";
interface AboutData {
  companyName: string;
  description: string;
  location: string;
  name: string;
  id: string;
  number: string;
  imagePath: string;
  imageName: string;
  originalname: string;
  path: string;
}
export const createAbout = async (
  body: AboutData,
  user: AboutData,
  fullName: AboutData,
  file: AboutData
) => {
  const foundUser = await User.findOne({ user: user });
  const foundNumber = foundUser?.number;
  if (!foundNumber) return null;

  const newAbout = await About.create({
    name: fullName,
    companyName: body.companyName,
    description: body.description,
    location: body.location,
    number: foundNumber,
    imagePath: file.path,
    imageName: file.originalname,
    createdBy: user,
  });
  return newAbout;
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
export const editAbout = async (
  body: AboutData,
  user: AboutData,
  file: AboutData
) => {
  return await About.findOneAndUpdate(
    {
      _id: body.id,
      createdBy: user,
    },
    {
      name: body.name,
      companyName: body.companyName,
      description: body.description,
      location: body.location,
      imagePath: file.path,
      imageName: file.originalname,
    },
    {
      new: true,
    }
  );
};
