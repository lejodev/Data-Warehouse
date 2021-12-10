import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import { useForm } from "react-hook-form";
import Modal from "../../modals/add/Modal.Add";
import City from "../city/City";
import FormModal from "../../modals/add/Modal.Add";

const Country = (props) => {
  const id = props.Country._id;
  const [toggleForm, setToggleForm] = useState(false);
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getCities = (CountryId) => {
      fetch(`http://localhost:3050/location/city/${CountryId}`)
        .then((resp) => resp.json())
        .then((data) => {
          setCities(data);
        });
    };
    getCities(id);
  }, []);

  // Modularize
  function onSetData(data) {
    const reqBody = {
      name: data.input,
      countryId: props.Country._id,
    };
    fetch("http://localhost:3050/location/city/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.json())))
      .then((data) => {
        setCities([...cities, data.city]);
      })
      .catch(async (err) => {
        const errorMessage = await err;
        alert(errorMessage.Message);
      });
  }

  const editCountry = (id) => {
    alert(`Edit. Country id: : ${id}`);
  };

  return (
    <div className="country">

      <div className="country-header">
        <h2>{props.Country.name}</h2>

        {/* <Button
          text1="Edit"
          modalStatus={modalStatus}
          onToggleFunction={editCountry}
          id={id}
        /> */}
        <Button text1="Delete" />
        <button className="btnAdd" onClick={() => setIsOpen(true)}>
          Add city
        </button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSetData={onSetData}
        >
          children
        </Modal>
      </div>
      <div className="country-body">
        {cities.map((city) => (
          <City key={city._id} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Country;
