import React from "react";

const Button = (props) => {
  return (
    <button
      className={`button,  ${props.additional_class}`}
      onClick={() => {
        props.onToggleFunction(props.id);
      }}
    >
      <span>{props.text1}</span><span>{props.text2}</span>
    </button>
  );
};

export default Button;
