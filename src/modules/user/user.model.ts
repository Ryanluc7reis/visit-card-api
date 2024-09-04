import mongoose, { Document, Model, Schema } from "mongoose";

interface User extends Document {
  fullName: string;
  user: string;
  email: string;
  password: string;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  fullName: { type: String, required: true, maxlength: 50 },
  user: { type: String, required: true, maxlength: 30, unique: true },
  email: { type: String, required: true, maxlength: 100, unique: true },
  password: { type: String, required: true },
});

const User: Model<User> =
  mongoose.models.Measure || mongoose.model<User>("User", UserSchema);

export default User;
