import { path } from "../config";

const create = async (user) => {
  try {
    let response = await fetch(`${path}/api/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch(`${path}/api/users`, {
      method: "GET",
      signal: signal, // cancel request if signal is canceled
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${path}/api/users/${params.userId}`, {
      method: "GET",
      signal: signal, // cancel request if signal is canceled
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
        Authorization: `Bearer ${credentials.t}`,
        // sosoterocafuertemacluiggy: "sosoterocafuertemacluiggy",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(`${path}/api/users/${params.userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
        Authorization: `Bearer ${credentials.t}`,
        // sosoterocafuertemacluiggy: "sosoterocafuertemacluiggy",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const remove = async (params, credentials): Promise<Response | void> => {
  try {
    const response = await fetch(`${path}/api/users/${params.userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
        Authorization: `Bearer ${credentials.t}`,
        // sosoterocafuertemacluiggy: "sosoterocafuertemacluiggy",
      },
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

export { create, list, read, update, remove };