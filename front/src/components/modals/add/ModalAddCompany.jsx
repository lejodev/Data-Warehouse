import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../modalStyles/_formCompany.scss";

const ModalAddCompany = ({ onAddOpen, onClose, onAddCompany }) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    onAddCompany(data);
    reset();
    onClose();
  };

  if (onAddOpen) {
    return (
      <div className="form-company-container">
        <form className="form-company" onSubmit={handleSubmit(onSubmit)}>
          <h1>{}</h1>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
          </label>
          <label htmlFor="city">
            <input
              type="text"
              id="city"
              {...register("city", { required: true })}
            />
          </label>
          <label htmlFor="address">
            <input
              type="address"
              id="address"
              {...register("address", { required: true })}
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
          </label>
          <label htmlFor="phone">
            <input
              type="phone"
              id="phone"
              {...register("phone", { required: true })}
            />
          </label>
          <input type="submit" value="SEND" />
        </form>
        <button onClick={onClose}>CANCEL</button>
      </div>
    );
  }
  return null;
};

export default ModalAddCompany;
