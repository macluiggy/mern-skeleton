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
  .set(function (this, password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this) {
    return this._password;
  });

UserSchema.path("hashed_password").validate(function (this, v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, undefined);

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; // verify that the converted plain text to hash password is equal to the hashed password previously stored
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt) // create a hash using the salt
        .update(password) // update the hash with the password
        .digest("hex"); // the disgest is a method that converts the hash to a hexadecimal string
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};
export default model("User", UserSchema);
