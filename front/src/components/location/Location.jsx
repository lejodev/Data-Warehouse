import React, { useEffect, useState } from "react";
import Region from "./region/Region";
import "./_location.scss";
import FormModal from "./Modal";

const Location = () => {
  const url = "http://localhost:3050/location/region";

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

  const modalStatus = () => {
    return setToggleForm(!toggleForm);
  };

  const addData = (name) => {
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
        let newRegion = {
          id: data.lastId++,
          name: name,
        };
        setRegions([...regions, newRegion]);
      })
      .catch((err) => {alert("Error")
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
          <Region key={region._id} Region={region} />
        ))}
      </div>
    </div>
  );
};

export default Location;
