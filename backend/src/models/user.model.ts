import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, trim: true, required: [true, "Name is required"] },
  email: {
    type: String,
    trim: true,
    unique: true, // the email must be unique
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ], // and the email must be a valid email
    required: [true, "Email already exists"],
  },
  created: { type: Date, default: Date.now }, // the type of the field is Date, and the default value is the current date
  updated: Date, // the date is updated automatically
  hashed_password: { type: String, required: [true, "Password is required"] },
  salt: String,
});

export default model("User", UserSchema);
