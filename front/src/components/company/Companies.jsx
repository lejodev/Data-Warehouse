import React, { useState, useEffect } from "react";
import Company from "./Company";
import Modal from "../modal/Modal";
import "./_companies.scss";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3080/company")
      .then((resp) => resp.json())
      .then((resp) => {
        setCompanies(resp);
      });
  }, []);

  return (
    <div className="companies">
      <div className="companies-header">
        <div className="title">Companies</div>
        <button>ADD</button>
      </div>
      <div className="companies-container">
        <div className="companies-container-header">
          <h1 className="name">Name</h1>
          <h1 className="country">Country</h1>
          <h1 className="address">Address</h1>
          <h1>Actions</h1>
        </div>
        <div className="companies-container-body">
          {companies.map((company) => (
            <Company key={company.id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
