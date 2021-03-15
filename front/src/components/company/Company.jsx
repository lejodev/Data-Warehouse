import React from "react";

const Company = (props) => {
  return (
    <div className="company">
      <span className="name">{props.company.name}</span>
      <span className="country">{props.company.city}</span>
      <span className="address">{props.company.address}</span>
      <div className="actions">
        <button>EDIT</button>
        <span>X</span>
      </div>
    </div>
  );
};

export default Company;
