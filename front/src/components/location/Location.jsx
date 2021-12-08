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
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return Promise.reject(new Error(resp.json()));
        }
      })
      .then(
        (data) => {
          setRegions([...regions, data.region]);
        },
        (err) => {
          throw new Error(err);
        }
      )
      .then(null, (err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
        // console.log(await err);
        // alert(err);
      });
  }

  return (
    <div className="location_container">
      <div className="head">
        <button className="add_region_btn" onClick={() => setIsOpen(true)}>
          Add region
        </button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onSetData={onSetData}
        >
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
