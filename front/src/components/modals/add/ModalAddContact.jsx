import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "../modalStyles/_modalContacts.scss";

const ModalAddContact = ({ isOpen, onClose, onAddContact }) => {
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [companies, setCompanies] = useState([]);

  var currentRegion;
  var currentCountry;
  var cirrentCity;
  var getCities;
  var getRegions;

  useEffect(() => {
    async function setLocation() {
      getRegions = await fetch("http://localhost:3050/location/region");
      let regions = await getRegions.json();
      setRegions(regions);
    }
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
    onAddContact(data)
  }

  if (isOpen) {
    return (
      <div className="modal-contact">
        <form onSubmit={handleSubmit(onSubmit)} className="modal-contact-form">
          <div className="main">
            <label htmlFor="name">
              <input
                type="text"
                name="name"
                id="name"
                {...register("name", { required: true })}
              />
            </label>
            <label htmlFor="lastName">
              <input
                type="text"
                name="lastName"
                id="lastName"
                {...register("lastName", { required: true })}
              />
            </label>
            <label htmlFor="position">
              <input
                type="text"
                name="position"
                id="position"
                {...register("position", { required: true })}
              />
            </label>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
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
            <input
              type="text"
              name="address"
              id="address"
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

export default ModalAddContact;
