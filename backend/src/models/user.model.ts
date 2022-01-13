import { Schema, model } from "mongoose";
import crypto from "crypto";

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

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password; // store the password in a virtual field
    this.salt = this.makeSalt(); // generate a salt, this is a random string
    this.hashed_password = this.encryptPassword(password); // encrypt the password
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; // verify that the converted plain text to hash password is equal to the hashed password previously stored
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};
export default model("User", UserSchema);
