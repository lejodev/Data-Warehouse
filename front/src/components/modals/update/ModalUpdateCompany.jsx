import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ModalUpdateCompany = ({ onUpdateOpen, onUpdate, onClose, company }) => {
  const { register, handleSubmit, reset } = useForm();

  const [cities, setCities] = useState([]);
  const [currentCity, setcurrentCity] = useState({});

  useEffect(() => {
    function getCities() {
      fetch("http://localhost:3050/location/city/")
        .then((resp) =>
          resp.ok ? resp.json() : Promise.reject("Can't update company")
        )
        .then((cities) => {
          console.log(cities);
          console.log(company);
          setCities(cities);
          setcurrentCity(cities.filter((city) => city.name == company.city));
        })
        .catch((err) => {
          alert(err);
        });
    }
    getCities();
  }, []);

  function onSubmit(data) {
    const getCityName = cities.filter((city) => city._id == data.city);
    data.cityName = getCityName[0].name;
    onUpdate(data);
    reset();
    onClose();
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
            CITY
            <select id="city" {...register("city", { required: true })}>
              {cities.map((city) =>
                city.name == company.city ? (
                  <option value={city._id} key={city._id} selected>
                    {city.name}
                  </option>
                ) : (
                  <option value={city._id} key={city._id}>
                    {city.name}
                  </option>
                )
              )}
            </select>
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
