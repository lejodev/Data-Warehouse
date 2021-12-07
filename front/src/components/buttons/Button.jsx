import React from "react";

const Button = (props) => {
  return (
    <button>
      <span>{props.text1}</span><span>{props.text2}</span>
    </button>
  );
};

export default Button;
