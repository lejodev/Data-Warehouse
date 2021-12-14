import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import ModalUpdate from "../../modals/update/Modal.Update";

const City = (props) => {
  const [name, setName] = useState(props.City.name); //Common
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // Modularize
  const id = props.City._id;
  function onUpdate(data) {
    const reqBody = {
      name: data.input,
    };
    fetch(`http://localhost:3050/location/city/${id}`, {
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

  function deleteCity() {
    fetch(`http://localhost:3050/location/city/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        resp.ok ? setDeleted(true) : Promise.reject("Couldn't delete");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return deleted ? null : (
    <div className="city">
      <div className="city-header">
        <h2>{name}</h2>
        <button onClick={() => setIsOpenUpdate(true)}> Edit </button>
        <ModalUpdate
          open={isOpenUpdate}
          onClose={() => setIsOpenUpdate(false)}
          onUpdate={onUpdate}
          defaultText={name}
        ></ModalUpdate>
        <button onClick={() => deleteCity()}>Delete</button>
      </div>
    </div>
  );
};

export default City;
