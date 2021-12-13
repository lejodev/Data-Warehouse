import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import ModalAdd from "../../modals/add/Modal.Add";
import City from "../city/City";
import ModalUpdate from "../../modals/update/Modal.Update";

const Country = (props) => {
  const id = props.Country._id;
  const [cities, setCities] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [name, setName] = useState(props.Country.name); //Common

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

  // Modularize
  function onUpdate(data) {
    const id = props.Country._id;
    const reqBody = {
      name: data.input,
    };
    fetch(`http://localhost:3050/location/country/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) =>
        resp.ok ? resp.json() : Promise.reject("Can not update")
      )
      .then((_) => {
        setName(data.input);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function onDeleteCity(city) {
    const deletedCity = cities.indexOf(city);
    cities.splice(deletedCity, 1);
    // var updatedListOfCities =
    console.log(cities);
    setCities(cities);
  }

  return (
    <div className="country">
      <div className="country-header">
        <h2>{name}</h2>
        <button id={id} onClick={() => setIsOpenUpdate(true)}>
          Edit
        </button>
        <ModalUpdate
          open={isOpenUpdate}
          onClose={() => setIsOpenUpdate(false)}
          onUpdate={onUpdate}
        >
          UPDATE
        </ModalUpdate>
        <Button text1="Delete" />
        <button className="btnAdd" onClick={() => setIsOpenAdd(true)}>
          Add city
        </button>
        <ModalAdd
          open={isOpenAdd}
          onClose={() => setIsOpenAdd(false)}
          onSetData={onSetData}
        >
          children
        </ModalAdd>
      </div>
      <div className="country-body">
        {cities.map((city) => (
          <City key={city._id} City={city} onDeleteCity={onDeleteCity} />
        ))}
      </div>
    </div>
  );
};

export default Country;
