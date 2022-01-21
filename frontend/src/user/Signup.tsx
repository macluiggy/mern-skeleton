import React, { useState } from "react";
interface IUser {
  name: string;
  password: string;
  email: string;
  open: boolean;
  error: string;
}
export default function Signup() {
  const [values, setValues] = useState<IUser>({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });
  const handleChange =
    (name) =>
    ({ target: value }) => {
      setValues({ ...values, [name]: value });
    };
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      password: values.password || undefined,
      email: values.email || undefined,
    };
  };
  return <div></div>;
}
