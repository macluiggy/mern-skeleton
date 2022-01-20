import React, { useEffect, useState } from "react";
import { list } from "./api-user";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) return console.log(data.error);
      console.log(data);

      setUsers(data);
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return <div></div>;
}
