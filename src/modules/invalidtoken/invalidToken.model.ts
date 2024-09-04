import mongoose from "mongoose";

const InvalidTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: "24h" } },
});

const InvalidToken = mongoose.model("InvalidToken", InvalidTokenSchema);
export default InvalidToken;
