import React, { useState, useEffect, useRef, Children } from "react";
import { useForm } from "react-hook-form";
import "../modalStyles/_modalContacts.scss";
import configData from "../../../config/config.json";

const ModalUpdateContact = ({ isOpen, onClose, onUpdateContact, contact }) => {
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [companies, setCompanies] = useState([]);

  var currentRegion;
  var currentCountry;
  var cirrentCity;
  var getCities;
  var getRegions;
  var contactId = contact._id;

  useEffect(() => {
    async function setLocation() {
      getRegions = await fetch("http://localhost:3050/location/region");
      let regions = await getRegions.json();
      setRegions(regions);
    }
    console.log(contact);
    async function getCompanies() {
      let getCompanies = await fetch("http://localhost:3050/company");
      let companies = await getCompanies.json();
      setCompanies(companies);
    }
    setLocation();
    getCompanies();
    // getCountries();
  }, []);
  const { handleSubmit, register, reset } = useForm();

  function onSubmit(data) {
    const body = JSON.stringify(data);
    fetch(
      `${configData.API_HOST}:${configData.API_PORT}/contact/${contactId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: body,
      }
    );
    // console.log(data);
    onUpdateContact(data);
    onClose();
    reset();
  }

  if (isOpen) {
    return (
      <div className="modal-contact">
        UPDATE
        <form onSubmit={handleSubmit(onSubmit)} className="modal-contact-form">
          <div className="main">
            <label htmlFor="name">
              name
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={contact.name}
                {...register("name", { required: true })}
              />
            </label>
            <label htmlFor="lastName">
              lastName
              <input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={contact["last name"]}
                {...register("lastName", { required: true })}
              />
            </label>
            <label htmlFor="occupation">
              position
              <input
                type="text"
                name="occupation"
                id="occupation"
                defaultValue={contact.occupation}
                {...register("occupation", { required: true })}
              />
            </label>
            <label htmlFor="email">
              email
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={contact.email}
                {...register("email", { required: true })}
              />
            </label>
            <select
              name="company"
              id="company"
              className="company"
              {...register("company", { required: true })}
            >
              <option key={1} value={""}>
                Select a company
              </option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="location">
            <select
              name="region"
              id="region"
              {...register("region", { required: true })}
              onChange={(e) => {
                let regionId = e.target.value;
                console.log(e.target.value);
                fetch(`http://localhost:3050/location/country/${regionId}`)
                  .then((resp) => resp.json())
                  .then((countries) => {
                    setCountries(countries);
                    console.log(countries);
                  });
              }}
              onClick={(e) => {
                console.log(e.target.value);
                console.log(countries);
              }}
            >
              <option key={1} value={""}>
                Select Region
              </option>
              {regions.map((region) => (
                <option key={region._id} value={region._id}>
                  {region.name}
                </option>
              ))}
            </select>
            <select
              name="country"
              id="country"
              {...register("country", { required: true })}
              onChange={(e) => {
                let countryId = e.target.value;
                fetch(`http://localhost:3050/location/city/${countryId}`)
                  .then((resp) => resp.json())
                  .then((cities) => {
                    setCities(cities);
                  });
              }}
            >
              <option key={1} value={""}>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
            <select
              name="city"
              id="city"
              {...register("city", { required: true })}
            >
              <option key={1} value={""}>
                Select a city
              </option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="address">
            address
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={contact.address}
              {...register("address", { required: true })}
            />
          </label>
          <select
            name="interest"
            id="interest"
            {...register("interest", { required: true })}
          >
            <option value="0">0</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
          <input type="submit" value="SAVE CONTACT" />
        </form>
        <button onClick={onClose}>CLOSE</button>
      </div>
    );
  } else {
    return null;
  }
};

export default ModalUpdateContact;
