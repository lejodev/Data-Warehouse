import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import Country from "../country/Country";
import FormModal from "../../modal/Modal";

const Region = (props) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [countries, setCountries] = useState([]);
  const id = props.Region.id;

  useEffect(() => {
    const getcountries = (regionId) => {
      const res = fetch(`http://localhost:3080/location/country/${regionId}`);
      res
        .then((res) => {
          return res.status === 200
            ? res.json()
            : Promise.reject("Empty response");
        })
        .then((res) => {
          setCountries(res);
        })
        .catch((err) => {});
    };
    getcountries(id);
  }, []);

  const modalStatus = () => {
    return setToggleForm(!toggleForm);
  };

  const addData = (name) => {
    let reqBody = {
      name: name,
      regionid: id,
    };
    fetch("http://localhost:3080/location/country", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let newCountry = {
          id: data.lastId++,
          name: name,
        };
        setCountries([...countries, newCountry]);
      })
      .catch((err) => {});
  };
  const addCountry = (id) => {
    alert(id);
  };

  const editRegion = (id) => {
    alert(`id ${id}`);
  };

  const deleteCountry = (id) => {
    fetch(`http://localhost:3080/location/country/${id}`, {
      method: "DELETE",
    }).then((resp) => {
      if (resp.status === 200) {
        setCountries(
          countries.filter((country) => {
            if (country.id != id) {
              return country;
            }
          })
        );
      } else {
        return Promise.reject(new Error("Error while deleting your city"))
      }
    }).catch(err => {
      console.log(err);
      alert("Error")
    })
  };

  return (
    <div className="region">
      <div className="region-header">
        <h2>{props.Region.name}</h2>
        <Button text1="Edit" onToggleFunction={editRegion} id={id} />
        <Button
          text1="Delete"
          onToggleFunction={() => {
            props.onDelete(id);
          }}
          id={id}
        />
        <Button
          additional_class="btnAdd"
          text1="Add Country"
          onToggleFunction={modalStatus}
          id={id}
        />
        <FormModal
          showModal={toggleForm}
          title="Add Country"
          modalStatus={modalStatus}
          onAdd={addData}
        />
      </div>
      <div className="region-body">
        {countries.map((country) => (
          <Country
            key={country.id}
            Country={country}
            onDelete={deleteCountry}
          />
        ))}
      </div>
    </div>
  );
};

export default Region;
