import React from "react";
import "./_company.scss";

const Company = (props) => {
  return (
    <ul className="company">
      <li>{props.company.name}</li>
      <li>{props.company.city}</li>
      <li>{props.company.address}</li>
      <li>ACTIONS</li>
    </ul>
  );
};

export default Company;
