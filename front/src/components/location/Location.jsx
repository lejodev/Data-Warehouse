import React, { useEffect, useState } from "react";
import Region from "./region/Region";
import "./_location.scss";
import Modal from "../modals/form/ModalAdd";
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

  // function onAddRegion() {
  //   setAddRegion(!addRegion);
  // }

  const addData = (name) => {
    let reqBody = {
      region: name,
    };
    fetch("http://localhost:3050/location/region", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let newRegion = {
          id: data.lastId++,
          name: name,
        };
        setRegions([...regions, newRegion]);
      })
      .catch((err) => {
        alert("Error");
      });
  };

  return (
    <div className="location_container">
      <div className="head">
        <button className="add_region_btn" onClick={() => setIsOpen(true)}>
          Add region
        </button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          children
        </Modal>
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
