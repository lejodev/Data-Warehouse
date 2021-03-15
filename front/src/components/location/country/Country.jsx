import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import City from "../city/City";
import FormModal from "../../modal/Modal";

const Country = (props) => {
  const id = props.Country.id;
  const [toggleForm, setToggleForm] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async (CountryId) => {
      await fetch(`http://localhost:3080/location/city/${CountryId}`)
        .then((resp) => {
          return resp.status === 200 ? resp : Promise.reject("Empty response");
        })
        .then((resp) => resp.json())
        .then((data) => {
          setCities(data);
        })
        .catch((err) => {});
    };
    getCities(id);
  }, []);

  const modalStatus = () => {
    return setToggleForm(!toggleForm);
  };

  let show = true;
  const deleteCountry = () => (show = false);

  const addData = (name) => {
    let reqBody = {
      name: name,
      countryId: id,
    };
    console.log("reqBody", reqBody);
    fetch("http://localhost:3080/location/city", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Data", data);
        let newCity = {
          id: data.lastId++,
          name: name,
        };
        console.log("newCity", newCity);
        setCities([...cities, newCity]);
      })
      .catch((err) => {
        console.log("ERROR____------", err);
      });
  };

  const editCountry = (id) => {
    alert(`Edit. Country id: : ${id}`);
  };

  function useModal() {
    console.log(show);
    return (
      <FormModal
        showModal={toggleForm}
        title="Add City"
        modalStatus={modalStatus}
        onAdd={addData}
      />
    );
  }

  const deleteCity = (id) => {
    fetch(`http://localhost:3080/location/city/${id}`, {
      method: "DELETE",
    }).then((resp) => {
      if (resp.status === 200) {
        setCities(
          cities.filter((city) => {
            if (city.id != id) {
              return city;
            }
          })
        );
      }
    });
  };

  return show ? (
    <div className="country">
      <div className="country-header">
        <h2>{props.Country.name}</h2>
        <Button
          text1="Edit"
          modalStatus={modalStatus}
          onToggleFunction={editCountry}
          id={id}
        />
        <Button
          text1="Delete"
          onToggleFunction={() => {
            props.onDelete(id);
          }}
        />
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
          <City
            key={city.id}
            name={city.name}
            city={city}
            onDelete={deleteCity}
          />
        ))}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Country;
