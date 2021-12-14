import React, { useState, useEffect } from "react";
import Country from "../country/Country";
import ModalAdd from "../../modals/add/Modal.Add";
import ModalUpdate from "../../modals/update/Modal.Update";

const Region = (props) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState(props.Region.name); // Common
  const [deleted, setDeleted] = useState(false); // Common
  const id = props.Region._id;

  useEffect(() => {
    const getcountries = async (regionId) => {
      const res = await fetch(
        `http://localhost:3050/location/country/${regionId}`
      );
      const data = await res.json();
      setCountries(data);
    };
    getcountries(id);
  }, []);

  // Modularize
  function onSetData(data) {
    const reqBody = {
      name: data.input,
      regionId: props.Region._id,
    };
    fetch("http://localhost:3050/location/country", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.json())))
      .then((data) => {
        setCountries([...countries, data.country]);
      })
      .catch(async (err) => {
        const resp = await err;
        alert(resp.Message);
      });
  }

  // Modularize
  function onUpdate(data) {
    const id = props.Region._id;
    const reqBody = {
      name: data.input,
    };
    fetch(`http://localhost:3050/location/region/${id}`, {
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

  function deleteRegion() {
    fetch(`http://localhost:3050/location/region/${id}`, {
      method: "DELETE",
    })
      .then((resp) =>
        resp.ok ? setDeleted(true) : Promise.reject("Couldn't delete region")
      )
      .catch((err) => {
        console.log(err);
      });
  }

  return deleted ? null : (
    <div className="region">
      <div className="region-header">
        <h2>{name}</h2>
        <button className="btnUpdate" onClick={() => setIsOpenUpdate(true)}>
          Edit
        </button>
        <ModalUpdate
          open={isOpenUpdate}
          onClose={() => setIsOpenUpdate(false)}
          onUpdate={onUpdate}
          defaultText={name}
        >
          UPDATE
        </ModalUpdate>
        <button onClick={() => deleteRegion()}> Delete</button>
        <button className="btnAdd" onClick={() => setIsOpenAdd(true)}>
          Add Country
        </button>
        <ModalAdd
          open={isOpenAdd}
          onClose={() => setIsOpenAdd(false)}
          onSetData={onSetData}
        >
          children
        </ModalAdd>
      </div>
      <div className="region-body">
        {countries.map((country) => (
          <Country key={country._id} Country={country} />
        ))}
      </div>
    </div>
  );
};

export default Region;
