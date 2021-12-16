import React, { useState } from "react";
import "./_company.scss";
import { MdEdit, MdClear } from "react-icons/md";
import ModalUpdateCompany from "../../modals/update/ModalUpdateCompany";

const Company = (props) => {
  const id = props.company._id;
  const [display, setDisplay] = useState(true);
  const [isOpenUpdateCompany, setIsOpenUpdateCompany] = useState(false);

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
    console.log(`UPDATE ${id}`);
  }

  return display ? (
    <ul className="company">
      <li>{props.company.name}</li>
      <li>{props.company.city}</li>
      <li>{props.company.address}</li>
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
        />
        <MdClear className="icon delete" onClick={() => onDeleteCompany()} />
      </li>
    </ul>
  ) : null;
};

export default Company;
