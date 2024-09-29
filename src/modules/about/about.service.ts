import About from "./about.model";
import User from "../user/user.model";

interface AboutData {
  companyName: string;
  description: string;
  location: string;
  name: string;
  id: string;
  number: string;
  imageData: Buffer;
  imageName: string;
  contentType: string;
}

export const createAbout = async (
  body: AboutData,
  user: AboutData,
  fullName: AboutData,
  file: Express.Multer.File
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
    imageName: file.originalname,
    contentType: file.mimetype,
    imageData: file.buffer,
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
  file: Express.Multer.File
) => {
  try {
    const findAbout: any = await getAbout(user);
    let currentImageName;
    let currentContentType;
    let currentImageData;

    if (!file) {
      currentImageName = findAbout[0].ImageName;
      currentContentType = findAbout[0].contentType;
      currentImageData = findAbout[0].imageData;
    } else {
      currentImageName = file.originalname;
      currentContentType = file.mimetype;
      currentImageData = file.buffer;
    }
    if (findAbout) {
      const newAbout = await About.findOneAndUpdate(
        {
          _id: body.id,
          createdBy: user,
        },
        {
          name: body.name,
          companyName: body.companyName,
          description: body.description,
          location: body.location,
          imageName: currentImageName,
          contentType: currentContentType,
          imageData: currentImageData,
        },
        {
          new: true,
        }
      );
      return newAbout;
    }
  } catch (err) {
    throw err;
  }
};
