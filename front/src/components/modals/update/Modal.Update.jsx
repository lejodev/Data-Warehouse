import React from "react";
import { useForm } from "react-hook-form";

const ModalUpdate = ({ open, children, onClose, onUpdate, defaultText }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset({ input: "" });
    onUpdate(data);
    onClose();
  };

  if (open) {
    return (
      <div className="modalForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>{children}</h1>
          <label htmlFor="input">
            <input type="text" defaultValue={defaultText} id="input" {...register("input")} />
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

export default ModalUpdate;
