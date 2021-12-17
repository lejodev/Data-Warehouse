import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../modalStyles/_formCompany.scss";

const ModalAddCompany = ({ onAddOpen, onClose, onAddCompany }) => {
  const { register, handleSubmit, reset } = useForm();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    function getCities() {
      fetch("http://localhost:3050/location/city/")
        .then((resp) =>
          resp.ok ? resp.json() : Promise.reject("Can't update company")
        )
        .then((cities) => {
          console.log(cities);
          setCities(cities);
        })
        .catch((err) => {
          alert(err);
        });
    }
    getCities();
  }, []);

  const onSubmit = (data) => {
    onAddCompany(data);
    const getCityName = cities.filter((city) => city._id == data.city);
    data.cityName = getCityName[0].name
    console.log(data);
    reset();
    onClose();
  };

  if (onAddOpen) {
    return (
      <div className="form-company-container">
        <form className="form-company" onSubmit={handleSubmit(onSubmit)}>
          <h1>{}</h1>
          <label htmlFor="name">
            NAME
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
          </label>
          {/* <label htmlFor="city">
            <input
              type="text"
              id="city"
              {...register("city", { required: true })}
            />
          </label> */}
          <label htmlFor="city">
            CITY
            <select id="city" {...register("city", { required: true })}>
              {cities.map((city) => (
                <option value={city._id} key={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="address">
            ADDRESS
            <input
              type="address"
              id="address"
              {...register("address", { required: true })}
            />
          </label>
          <label htmlFor="email">
            EMAIL
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
          </label>
          <label htmlFor="phone">
            PHONE
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
