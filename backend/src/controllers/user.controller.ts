import User from "../models/user.model";
import extend from "lodash/extend";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { RequestHandler, Response, Request, NextFunction } from "express";
import { RequestWithProfile } from "../types";
const create: RequestHandler = async (req, res, next) => {
  const { body } = req;
  const user = new User(body);
  try {
    await user.save();
    return res.status(200).json({ message: "Successfully signed up!" });
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};
const list: RequestHandler = async (req, res) => {
  try {
    const users = await User.find().select("name email updated created");
    return res.json(users);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};

const userById = async (
  req: RequestWithProfile,
  res: Response,
  next: NextFunction,
  id: any
) => {
  try {
    const user = await User.findById(id); // find the user by id
    if (!user) {
      // if the user is not found
      return res.status(400).json({
        // return a status code of 400 and a message
        error: "User not found",
      });
    }
    req.profile = user; // add the user to the request object
    next();
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};
const read = (req: RequestWithProfile, res: Response) => {
  const { profile } = req; // destructuring the profile from the request object
  if (!profile) return; // if the profile is not found
  profile.hashed_password = undefined; // remove the hashed password from the response
  profile.salt = undefined; // remove the salt from the response
  return res.json(req.profile); // return the profile
};
const update = async (
  req: RequestWithProfile,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.profile; // get the user from the request object
    const { body } = req; // get the body from the request object
    // update the user with the new values
    extend(user, body); // extend the user with the new values
    if (!user) return res.status(400).json({ error: "User not found" });
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(error),
    });
  }
};
const remove = async (req, res, next) => {};

export { create, list, userById, read, remove, update }; // the order of exporting is not important
