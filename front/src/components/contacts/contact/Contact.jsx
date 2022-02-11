import React, { useState, useEffect } from "react";
import { BsPersonPlus, BsThreeDots } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import ModalUpdateContact from "../../modals/update/ModalUpdateContact";
import configData from "../../../config/config.json";

const Contact = (props) => {
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState({});
  const [contact, setContact] = useState(props.contact);
  const [display, setDisplay] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    function handleParentState() {
      return !props.mainIsSelected()
        ? setIsSelected(false)
        : setIsSelected(true);
    }
    handleParentState();
  }, []);

  function onDelete(contactId) {
    fetch(
      `${configData.API_HOST}:${configData.API_PORT}/contact/${contactId}`,
      {
        method: "DELETE",
      }
    ).then((resp) => {
      if (resp.ok) {
        setDisplay(false);
      }
    });
  }

  function parentIsSelected() {
    props.mainCheckStatus ? setIsSelected(true) : setIsSelected(false);
  }

  const handleSelection = () => {
    setIsSelected(!isSelected);
    console.log(isSelected)
  };

  function onCloseUpdate() {
    setUpdateModalIsOpen(false);
  }

  function onUpdateContact(data) {
    setContact(data);
  }

  return display ? (
    <div key={contact._id} className="contact">
      <ModalUpdateContact
        UPDATE
        isOpen={updateModalIsOpen}
        onClose={onCloseUpdate}
        onUpdateContact={onUpdateContact}
        contact={selectedContact}
      />
      <ul className="contact-row">
        <li>
          <input
            type="checkbox"
            name="child-checkbox"
            id="child-checkbox"
            checked={isSelected}
            onChange={handleSelection}
          />
        </li>
        <li>{contact.name}</li>
        <li>{contact.city}</li>
        <li>{contact.company}</li>
        <li>{contact.occupation}</li>
        <li>{contact.interest}</li>
        <li className="actions-container">
          <div className="actions-dots">
            <BsThreeDots />
            <MdDelete
              onClick={() => {
                onDelete(contact._id);
              }}
            />
            <MdEdit
              onClick={() => {
                console.log(contact);
                setUpdateModalIsOpen(true);
                setSelectedContact(contact);
              }}
            />
          </div>
        </li>
      </ul>
    </div>
  ) : null;
};

export default Contact;
