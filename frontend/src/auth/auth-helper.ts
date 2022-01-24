import { signout } from "./api-auth";
import { iUserSignIn } from "./types";
const auth = {
  authenticate(jwt: iUserSignIn, cb) {
    if (typeof window !== undefined)
      sessionStorage.setItem("jwt", JSON.stringify(jwt)); // if we are in the browser, store the jwt in sessionStorage
    cb(); // call the callback that define actions to be executed after authentication
  },
  isAuthenticated() {
    // let test = typeof window == "undefined" && !sessionStorage.getItem("jwt");
    let jwt = sessionStorage.getItem("jwt");

    if (typeof window == "undefined") return false;
    if (jwt) {
      let parsedJwt = JSON.parse(jwt);
      // console.log(parsedJwt, "este es el token");
      return parsedJwt;
    }
    // parse method is the opposite of stringify
    else return false;
  },
  clearJWT(cb) {
    if (typeof window !== undefined) sessionStorage.removeItem("jwt"); // if we are in the browser, remove the jwt from sessionStorage
    cb(); // call the callback to dictate what should happen after a successful sign-out.
    signout().then((data) => {
      // if cookies are used to store credentials, then clear them with the signout method from api-auth.ts
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};
export default auth;
const a = false || true;
console.log(a);
