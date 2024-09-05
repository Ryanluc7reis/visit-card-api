import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  createdBy: { type: String, required: true },
});

const About = mongoose.model("About", AboutSchema);
export default About;
