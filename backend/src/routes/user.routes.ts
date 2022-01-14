import { Router, Request } from "express";
import {
  create,
  list,
  read,
  remove,
  update,
  userById,
} from "../controllers/user.controller";

const router = Router();

router.route("/api/users").get(list).post(create);

router.route("/api/users/:userId").get(read).put(update).delete(remove);

router.param("userId", userById);

export default router;
