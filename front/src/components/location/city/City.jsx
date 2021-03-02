import React, { useState } from "react";
import Button from "../../buttons/Button";
import FormModal from "../Modal";

const City = (props) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [cities, setCities] = useState([]);

  const modalStatus = () => {
    console.log("toggleForm", toggleForm);
    return setToggleForm(!toggleForm);
  };

  const addData = (name) => {
    // console.log("name", name);
    // let reqBody = {
    //   region: name,
    // };
    // fetch("http://localhost:3080/location/region", {
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
    console.log(name);
  };

  return (
    <div className="city">
      <div className="city-header">
        <h2>{props.name}</h2>
        <Button text1="Edit" onToggleFunction={modalStatus} />
        <Button text1="Delete" onToggleFunction={modalStatus} />
        <FormModal
          showModal={toggleForm}
          title="Add Region"
          modalStatus={modalStatus}
          onAdd={addData}
        />
      </div>
    </div>
  );
};

export default City;
