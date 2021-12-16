import React from "react";
import { useForm } from "react-hook-form";

const ModalUpdateCompany = ({ onUpdateOpen, onClose, company }) => {
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  if (onUpdateOpen) {
    return (
      <div className="form-company-container">
        <form className="form-company" onSubmit={handleSubmit(onSubmit)}>
          <h1>{}</h1>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              defaultValue={company.name}
              {...register("name", { required: true })}
            />
          </label>
          <label htmlFor="city">
            <input
              type="text"
              id="city"
              defaultValue={company.city}
              {...register("city", { required: true })}
            />
          </label>
          <label htmlFor="address">
            <input
              type="address"
              id="address"
              defaultValue={company.address}
              {...register("address", { required: true })}
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              defaultValue={company.email}
              {...register("email", { required: true })}
            />
          </label>
          <label htmlFor="phone">
            <input
              type="phone"
              id="phone"
              defaultValue={company.phone}
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

export default ModalUpdateCompany;
