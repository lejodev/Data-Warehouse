import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import City from "../city/City";
import FormModal from "../../modals/form/ModalAdd";

const Country = (props) => {
  const id = props.Country._id;
  console.log(id)
  const [toggleForm, setToggleForm] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = (CountryId) => {
      fetch(`http://localhost:3050/location/city/${CountryId}`)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data)
          setCities(data);
        });
    };
    getCities(id);
  }, []);

  const modalStatus = () => {
    return setToggleForm(!toggleForm);
  };

  const addData = (name) => {
    let reqBody = {
      name: name,
      countryId: id,
    };
    fetch("http://localhost:3050/location/city/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Data", data);
        let newRegion = {
          id: data.lastId++,
          name: name,
        };
        console.log("City", data);
        setCities([...cities, newRegion]);
      })
      .catch((err) => {
        console.log("ERROR____------", err);
      });
  };

  const editCountry = (id) => {
    alert(`Edit. Country id: : ${id}`);
  };

  return (
    <div className="country">
      <div className="country-header">
        <h2>{props.Country.name}</h2>
        <Button
          text1="Edit"
          modalStatus={modalStatus}
          onToggleFunction={editCountry}
          id={id}
        />
        <Button text1="Delete" onToggleFunction={modalStatus} />
        <Button
          additional_class="btnAdd"
          text1="Add City"
          onToggleFunction={modalStatus}
          //   id={id}
        />
        <FormModal
          showModal={toggleForm}
          title="Add City"
          modalStatus={modalStatus}
          onAdd={addData}
        />
      </div>
      <div className="country-body">
        {/* {cities.map((city) => (
          <City key={city._id} city={city} />
        ))} */}
      </div>
    </div>
  );
};

export default Country;
