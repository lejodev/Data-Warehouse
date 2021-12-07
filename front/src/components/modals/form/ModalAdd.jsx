import React, { useState } from "react";
import "./_form.scss";
import { useForm } from "react-hook-form";

import { createPortal } from "react-dom";

//ADD - EDIT
const Modal = ({ open, children, onClose }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset({ input: "" });
    onClose();
  };

  if (open) {
    return (
      <div className="modalForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="input">
            {children}
            <input
              type="text"
              id="input"
              {...register("input")}
            />
          </label>
          <input type="submit" value="SEND" />
        </form>
        <button onClick={onClose}>CANCEL</button>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
