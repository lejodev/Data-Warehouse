import React, { useState } from "react";
import { BrowserRouter, link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { createUser, validateForm } from "./User.service";
import "./_signUp.scss";

function SignUp() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const requestBody = JSON.stringify(data);

    fetch("http://localhost:3050/user/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((resp) =>
        resp.status == 200
          ? resp.json()
          : Promise.reject(new Error("Error while signUp"))
      )
      .then((resp) => {
        navigate("/contacts");
      })
      .catch((err) => {
        console.log(err);
        alert("Error while signUp");
      });
    console.log(data);
  };

  return (
    <div className="form-container">
      <form className="signUp-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title">Create user</h2>
        <label htmlFor="name" className="label">
          Name
          <input
            type="text"
            id="name"
            className="input name"
            {...register("name")}
          />
        </label>
        <label htmlFor="lastName" className="label">
          Last name
          <input
            type="text"
            id="lastName"
            className="lastName input"
            {...register("last name")}
          />
        </label>
        <label htmlFor="email" className="label">
          Email
          <input
            type="email"
            id="email"
            className="input email"
            {...register("email")}
          />
        </label>
        <label htmlFor="profile" className="label">
          Profile
          <input
            id="profile"
            type="text"
            className="input profile"
            {...register("profile")}
          />
        </label>
        <label htmlFor="password" className="label">
          Password
          <input
            type="password"
            className="input"
            id="password"
            {...register("password")}
          />
        </label>
        <label htmlFor="repeatPassword" className="label">
          Repeat password
          <input
            type="password"
            className="input"
            id="repeatPassword"
            {...register("repeat password")}
          />
        </label>
        <input type="submit" className="button-send input" value="CREATE" />
      </form>
    </div>
  );
}

export default SignUp;
