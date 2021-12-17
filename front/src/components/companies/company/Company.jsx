import React, { useState, useEffect } from "react";
import "./_company.scss";
import { MdEdit, MdClear } from "react-icons/md";
import ModalUpdateCompany from "../../modals/update/ModalUpdateCompany";

const Company = (props) => {
  const id = props.company._id;
  const [display, setDisplay] = useState(true);
  const [isOpenUpdateCompany, setIsOpenUpdateCompany] = useState(false);
  const [company, setCompany] = useState({});

  useEffect(() => {
    function renderCompany() {
      setCompany(props.company);
    }
    renderCompany();
  }, []);

  function onDeleteCompany() {
    fetch(`http://localhost:3050/company/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        resp.ok ? setDisplay(false) : Promise.reject("Cannot delete");
      })
      .catch((err) => {
        alert(err);
      });
    console.log(`DELETE: ${id}`);
  }

  function onUpdateCompany(data) {
    console.log(data)
    // let reqBody = JSON.stringify(data);
    // fetch(`http://localhost:3050/company/${company._id}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "PATCH",
    //   body: reqBody,
    // })
    //   .then((resp) => {
    //     resp.ok ? setCompany(data) : Promise.reject("Can't update company");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert(err);
    //   });
  }

  return display ? (
    <ul className="company">
      <li>{company.name}</li>
      <li>{company.city}</li>
      <li>{company.address}</li>
      <li className="actions">
        <MdEdit
          className="icon edit"
          onClick={() => {
            setIsOpenUpdateCompany(true);
            // onUpdateCompany;
          }}
        />
        <ModalUpdateCompany
          onUpdateOpen={isOpenUpdateCompany}
          onClose={() => setIsOpenUpdateCompany(false)}
          company={props.company}
          onUpdate={onUpdateCompany}
        />
        <MdClear className="icon delete" onClick={() => onDeleteCompany()} />
      </li>
    </ul>
  ) : null;
};

export default Company;
