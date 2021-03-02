import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import City from "../city/City";
import FormModal from "../Modal";

const Country = (props) => {
  const id = props.Country.id;
  const [toggleForm, setToggleForm] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = (CountryId) => {
      fetch(`http://localhost:3080/location/city/${CountryId}`)
        .then((resp) => resp.json())
        .then((data) => {
          console.log("DATA", data);
          setCities(data);
        });
    };
    getCities(id);
  }, []);

  console.log("CITIES", cities);

  const modalStatus = () => {
    console.log("toggleForm", toggleForm);
    return setToggleForm(!toggleForm);
  };

  const addData = (name) => {
    console.log("name", name);
    let reqBody = {
      name: name,
      regionid: 0,
    };
    console.log("RegionId", id);
    // fetch("http://localhost:3080/location/city/${id}", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(reqBody),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log("Data", data);
    //     let newRegion = {
    //       id: data.lastId++,
    //       name: name,
    //     };
    //     console.log("newRegion", newRegion);
    //     setRegions([...regions, newRegion]);
    //   })
    //   .catch((err) => {
    //     console.log("ERROR____------", err);
    //   });
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
        {cities.map((city) => (
          <City key={city.id} name={city.name} />
        ))}
      </div>
    </div>
  );
};

export default Country;
