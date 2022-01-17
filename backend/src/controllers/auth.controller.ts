import User from "../models/user.model";
import { CookieOptions, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../config/config";
const { jwtSecret } = config;

const signin: RequestHandler = async (req, res) => {
  try {
    const { email, password, _id, name } = req.body; // destructuring the email and password from the request body
    const user = await User.findOne({ email }); // find the user by email
    if (!user) return res.status(401).json({ error: "User not found" }); // if the user is not found

    if (!user.authenticate(password))
      // if tpassword dont match
      return res.status(401).json({ error: "Email and password don't match" });

    const token = jwt.sign({ _id }, jwtSecret); // create a token with the user id and the secret

    res.cookie("t", token, { expires: new Date(Date.now() + 9999) }); // set a cookie with the token for the user to use it in the client side
    return res.json({
      token,
      user: { _id, name, email },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// the use of cookies is optional, It is only used if cookies are used in the client side
const signout: RequestHandler = async (req, res) => {
  res.clearCookie("t"); // clear the cookie with the "t" name
  return res.status(200).json({ message: "signed out" });
};

const requireSignin = "";

const hasAuthorization = (req, res) => {};

export { signin, signout, requireSignin, hasAuthorization };
