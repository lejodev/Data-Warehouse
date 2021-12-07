import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import Country from "../country/Country";
import Modal from "../../modals/form/ModalAdd";

const Region = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState([]);
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

  const addData = (name) => {
    let reqBody = {
      name: name,
      regionId: id,
    };
    fetch("http://localhost:3050/location/country", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // let newCountry = {
        //   id: data.lastId++,
        //   name: name,
        // };
        // setCountries([...countries, newCountry]);
      })
      .catch((err) => {});
  };
  const addCountry = (id) => {
    alert(id);
  };

  const editRegion = (id) => {
    alert(`id ${id}`);
  };

  const deleteRegion = (id) => {
    alert(`Delete ${id}`);
  };

  return (
    <div className="region">
      <div className="region-header">
        <h2>{props.Region.name}</h2>
        <Button text1="Edit" onToggleFunction={editRegion} id={id} />
        <Button text1="Delete" onToggleFunction={deleteRegion} id={id} />
        <Button
          additional_class="btnAdd"
          text1="Add Country"
          id={id}
          onClick={() => {alert("sdfg")}}
        />
        <Modal open={isOpen}>children</Modal>
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
