import React, { useState } from "react";
import {chekInput} from "./login.service";
import "./_login.scss";

function Login() {

  const loginEvent = (e) => {
    e.preventDefault();
    console.log("Inside");
    console.log(loginData);
    chekInput(loginData);
  };

  const changeLoginData = (e) => {
      const elementName = e.target.name;
      const newValue = e.target.value;

      setLoginData({
        // Spread operator
          ...loginData,
        // Without ...(spread operator)
        // email: loginData.email,
        // password: loginData.password,
        [elementName]: newValue  // Assigns new value to the property that changes
      })
  }

  const loginInitialValues = {
    email: "",
    password: "",
  };

  // // Hook to manage login form status
  const [loginData, setLoginData] = useState(loginInitialValues);

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={loginEvent}>
        <h2 className="title">Welcome</h2>
        <input
          name="email"
          value={loginData.email}
          type="text"
          placeholder="User"
          className="input userName"
          onChange={changeLoginData}
          required
        />
        <input
          name="password"
          value={loginData.password}
          type="password"
          placeholder="Password"
          className="input password"
          onChange={changeLoginData}
          required
        />
        <input type="submit" className="button-send" value="SEND" />
      </form>
    </div>
  );
}

export default Login;
