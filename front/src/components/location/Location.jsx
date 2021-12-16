import React, { useEffect, useState } from "react";
import Region from "./region/Region";
import "./_location.scss";
import ModalAdd from "../modals/add/ModalAddLocation";
import Button from "../buttons/Button";

const Location = () => {
  const url = "http://localhost:3050/location/region";

  const [regions, setRegions] = useState([]);
  // const [addRegion, setAddRegion] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getRegions = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setRegions(data);
    };
    getRegions();
  }, []);

  //Modularize
  function onSetData(data) {
    console.log(data);
    const reqBody = {
      name: data.input,
    };
    console.log(reqBody);
    fetch("http://localhost:3050/location/region", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.json())))
      .then((data) => {
        setRegions([...regions, data.region]);
      })
      .catch(async (err) => {
        const resp = await err;
        alert(resp.Message);
      });
  }

  function onUpdateData (id, name) {
    
  }

  return (
    <div className="location_container">
      <div className="head">
        <button className="add_region_btn" onClick={() => setIsOpen(true)}>
          Add region
        </button>
        <ModalAdd
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSetData={onSetData}
        >
          children
        </ModalAdd>
      </div>
      <div className="body">
        {regions.map((region) => (
          <Region key={region._id} Region={region} />
        ))}
      </div>
    </div>
  );
};

export default Location;
