import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  number: { type: String, required: true },
  imagePath: { type: String, required: true },
  createdBy: { type: String, required: true },
});

const About = mongoose.model("About", AboutSchema);
export default About;
