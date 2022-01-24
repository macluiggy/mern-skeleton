import {
  requireSignin,
  hasAuthorization,
} from "../controllers/auth.controller";
import { Router } from "express";
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

router
  .route("/api/users/:userId")
  .get(requireSignin, read)
  .put((req, res) => {
    res.json(req.body);
  })
  .delete(requireSignin, hasAuthorization, remove);

router.route("/api/").post((req, res) => {
  console.log("djdjjd");

  res.json(req.body);
});
router.param("userId", userById);

export default router;
