import User from "models/user.model";
import exte from "lodash/extend";
import dbErrorHandler from "helpers/dbErrorHandler";
const create = async (req, res, next) => {
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
const list = (req, res) => {};
const userById = (req, res, next, id) => {};
const read = (req, res) => {};
const update = (req, res, next) => {};
const remove = (req, res, next) => {};

export { create, list, userById, read, remove, update }; // the order of exporting is not important
