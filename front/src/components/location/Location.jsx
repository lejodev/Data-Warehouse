import React, { useEffect, useState } from "react";
import Region from "./region/Region";
import "./_location.scss";
import FormModal from "../modal/Modal";

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
      .catch((err) => {
        console.log("ERROR____------", err);
      });
  };

  const deleteRegion = (id) => {
    fetch(`http://localhost:3080/location/region/${id}`, {
      method: "DELETE",
    }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        setRegions(
          regions.filter((region) => {
            if (region.id != id) {
              return region;
            }
          })
        );
      }
    });
    // console.log(regions);
    // alert(`Delete ${id}`);
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
          <Region key={region.id} Region={region} onDelete={deleteRegion} />
        ))}
      </div>
    </div>
  );
};

export default Location;
