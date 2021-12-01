import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { chekInput } from "./login.service";
import "./_login.scss";

function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const requestBody = JSON.stringify(data);
    await fetch("http://localhost:3050/user/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((resp) =>
        resp.status == 200
          ? resp.json()
          : Promise.reject(new Error("LOGIN ERROR"))
      )
      .then((token) => {
        localStorage.setItem("token", token);
        navigate("/signUp");
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
      });
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">Welcome</h2>
        <input
          type="text"
          placeholder="User"
          className="input userName"
          {...register("userName")}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input password"
          {...register("password")}
          required
        />
        <input type="submit" className="button-send" value="SEND" />
      </form>
    </div>
  );
}

export default Login;
