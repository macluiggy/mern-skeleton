import User from "models/user.model";
import extend from "lodash/extend";
// import errorHandler './error/error.controller'

const create = (req, res, next) => {};
const list = (req, res) => {};
const userById = (req, res, next, id) => {};
const read = (req, res) => {};
const update = (req, res, next) => {};
const remove = (req, res, next) => {};

export { create, list, userById, read, remove, update }; // the order of exporting is not important
