const auth = {
  authenticate(jwt, cb) {
    if (typeof window !== undefined)
      sessionStorage.setItem("jwt", JSON.stringify(jwt)); // if we are in the browser, store the jwt in sessionStorage
    cb(); // call the callback that define actions to be executed after authentication
  },
  isAuthenticated() {
    // let test = typeof window == "undefined" && !sessionStorage.getItem("jwt");
    let jwt = sessionStorage.getItem("jwt");
    if (typeof window == "undefined") return false;
    if (jwt) return JSON.parse(jwt);
    // parse method is the opposite of stringify
    else return false;
  },
};

const a = false || true;
console.log(a);
