import User from "../models/user.model";
import exte from "lodash/extend";
import dbErrorHandler from "../helpers/dbErrorHandler";
import { RequestHandler, Response, Request, NextFunction } from "express";
import { RequestHandlerWithProfile } from "../types";
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

const userById: RequestHandlerWithProfile = async (req, res, next, id) => {
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
const read = async (req, res) => {};
const update = async (req, res, next) => {};
const remove = async (req, res, next) => {};

export { create, list, userById, read, remove, update }; // the order of exporting is not important
