import React, { useEffect, useState } from "react";
import Region from "./region/Region";
import "./_location.scss";
import FormModal from "./Modal";

const Location = () => {
  const url = "http://localhost:3080/location/region";

  const [regions, setRegions] = useState([]);
  // const [addRegion, setAddRegion] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);

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

  console.log("regions", regions);
  const modalStatus = () => {
    console.log("toggleForm", toggleForm);
    return setToggleForm(!toggleForm);
  };

  const addData = (name) => {
    console.log("name", name);
    let reqBody = {
      region: name,
    };
    fetch("http://localhost:3080/location/region", {
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
        console.log("newRegion", newRegion);
        setRegions([...regions, newRegion]);
      })
      .catch((err) => {
        console.log("ERROR____------", err);
      });
  };

  return (
    <div className="location_container">
      <div className="head">
        <button onClick={modalStatus} className="add_region_btn">
          Add Region
        </button>
        <FormModal
          showModal={toggleForm}
          title="Add Region"
          modalStatus={modalStatus}
          onAdd={addData}
        />
      </div>
      <div className="body">
        {regions.map((region) => (
          <Region key={region.id} Region={region} />
        ))}
      </div>
    </div>
  );
};

export default Location;
