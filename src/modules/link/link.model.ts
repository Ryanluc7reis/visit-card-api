import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  createdBy: { type: String, required: true },
});

const Link = mongoose.model("Link", LinkSchema);
export default Link;
