import React, { useState, useEffect } from "react";
import Company from "./company/Company";
import ModalAddCompany from "../modals/add/ModalAddCompany";
import "./_companies.scss";

const Companies = (props) => {
  const [companies, setCompanies] = useState([]);
  const [isOpenAddCompany, setIsOpenAddCompany] = useState(false);

  // === TASK ==
  // Make a new modal (Add company)
  // Modify the setCompany and updateCompany methods
  // Finish CRUD

  // Modularize
  function onSetData(data) {
    const reqBody = {
      name: data.input,
      countryId: props.Country._id,
    };
    fetch("http://localhost:3050/location/city/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.json())))
      .then((data) => {
        // setCompanies([...companies, data.city]); // Fix
      })
      .catch(async (err) => {
        const errorMessage = await err;
        alert(errorMessage.Message);
      });
  }

  // Modularize
  function onUpdate(data) {
    const id = props.Country._id;
    const reqBody = {
      name: data.input,
    };
  }

  useEffect(() => {
    function getCompanies() {
      fetch(`http://localhost:3050/company`)
        .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.json())))
        .then((companies) => {
          setCompanies(companies);
          console.log(companies)
        })
        .catch(async (err) => {
          await err;
          console.log(err);
        });
    }
    getCompanies();
  }, []);

  function addCompany(data) {
    console.log(data);
    const reqBody = JSON.stringify(data);
    console.log(reqBody);
    fetch(`http://localhost:3050/company/${data.city}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) =>
        resp.ok ? resp.json() : Promise.reject("Can not update")
      )
      .then((resp) => {
        console.log(resp);
        setCompanies([...companies, resp.company]);
      })
      .catch((err) => {
        alert(err);
      });
  }

  function onClose() {
    return;
  }

  return (
    <div className="companies">
      <div className="main-container">
        <div className="title-button">
          <div className="title">Companies</div>
          <button className="btnAdd" onClick={() => setIsOpenAddCompany(true)}>
            Add
          </button>
          <ModalAddCompany
            onAddOpen={isOpenAddCompany}
            onClose={() => setIsOpenAddCompany(false)}
            onAddCompany={addCompany}
          />
        </div>
        <section className="companies-section-container">
          <ul className="companies-section-header">
            <li>Name</li>
            <li>Country</li>
            <li>Address</li>
            <li>Actions</li>
          </ul>
          <div className="companies-section-list-container">
            {companies.map((company) => (
              <Company key={company._id} company={company} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Companies;
