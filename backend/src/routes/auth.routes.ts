import { Router } from "express";

const router = Router();

router.route("/auth/signin").post(); // request to authenticate the user with their email and password

router.route("/auth/signout").get(); // request to clear the cookie containing the JWT that was set on the response object after sign-in
export default router;
