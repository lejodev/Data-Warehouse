import React, { useState } from "react";

import {createUser, validateForm} from "./User.service";
import "./_signUp.scss";

function User() {
  const initialUserInformation = {
    name: "",
    lastName: "",
    email: "",
    profile: "",
    password: ""
  };

  // hoock to manage user json
  const [user, setUser] = useState(initialUserInformation);

  // hock for validate pass
  const [validatePass, setValidatePass] = useState('');

  const createUserEvent = (e) => {
    e.preventDefault();

    if(validateForm(user, validatePass)) {
        createUser(user);
    } else {
        alert("Pass does not match");
    }    
  };

  // change state of user json
  const handlerEventInputs = (e) => {
    const {name, value} = e.target;    

    let newUser = {
        ...user,
        [name]: value
    }
    setUser(newUser);
  };

  return (
    <div className="form-container">
      <form className="signUp-form" onSubmit={createUserEvent}>
        <h2 className="title">Create user</h2>
        <label className="label">
          Name
          <input
            type="text"
            className="input name"
            value={user.name}
            name="name"
            onChange={handlerEventInputs}
          />
        </label>
        <label className="label">
          Last Name
          <input 
            type="text" 
            className="input lastName"
            value={user.lastName}
            name="lastName"
            onChange={handlerEventInputs}/>
        </label>
        <label className="label">
          Email 
          <input 
            type="email" 
            className="input email"
            value={user.email}
            name="email"
            onChange={handlerEventInputs}/>
        </label>
        <label className="label">
          Profile 
          <input 
            type="text" 
            className="input profile"
            value={user.profile}
            name="profile"
            onChange={handlerEventInputs}/>
        </label>
        <label className="label">
          Password
          <input 
            type="password" 
            className="input" 
            value={user.password}
            name="password"
            onChange={handlerEventInputs}/>
        </label>
        <label className="label">
          Repeat Password
          <input
            type="password"
            value={validatePass}
            onChange={e => setValidatePass(e.target.value)}
            className="input"           
          />
        </label>
        <input type="submit" className="button-send input" value="CREATE" />
      </form>
    </div>
  );
}

export default User;
