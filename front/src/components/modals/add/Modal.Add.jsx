import React, { useState } from "react";
import "./_form.scss";
import { useForm } from "react-hook-form";

import { createPortal } from "react-dom";

//ADD - EDIT
const ModalAdd = ({ open, children, onClose, onSetData }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    reset({ input: "" });
    onSetData(data);
    onClose();
  };

  if (open) {
    return (
      <div className="modalForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>{children}</h1>
          <label htmlFor="input">
            <input type="text" id="input" {...register("input")} />
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

export default ModalAdd;
