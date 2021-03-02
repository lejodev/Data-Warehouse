import React from "react";

const Button = (props) => {

  return (
    <button className="btnAdd" onClick={() => props.onAddCountry(props.id)}>
      <span>Add</span> <span>Country</span>
    </button>
  );
};

export default Button;
