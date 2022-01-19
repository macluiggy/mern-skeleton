import { path } from "../config";

const signin = async (user) => {
  try {
    const response = await fetch(`${path}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const signout = async () => {
  try {
    const response = await fetch(`${path}/auth/signout`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { signin, signout };
