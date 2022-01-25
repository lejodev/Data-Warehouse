import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import configData from "../../config/config.json";
import ModalAddContact from "../modals/add/ModalAddContact";
import ModalUpdateContact from "../modals/update/ModalUpdateContact";
import Search from "./search/Search";
import Contact from "./contact/Contact";
import "./_contacts.scss";

const Contacts = () => {
  const [addModalIsOpen, setaddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    fetch(`${configData.API_HOST}:${configData.API_PORT}/contact/`)
      .then((resp) => resp.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  }, []);

  function onDelete(contactId) {
    fetch(
      `${configData.API_HOST}:${configData.API_PORT}/contact/${contactId}`,
      {
        method: "DELETE",
      }
    ).then((resp) => {
      if (resp.ok) {
        console.log(contacts);
        let updatedContacts = contacts.filter(
          (contact) => contact._id != contactId
        );
        setContacts(updatedContacts);
      }
    });
  }

  function onCloseAdd() {
    setaddModalIsOpen(false);
  }

  function onCloseUpdate() {
    setUpdateModalIsOpen(false);
  }

  function onAddContact(data) {
    console.log(data.city);
    let reqBody = JSON.stringify(data);
    fetch(`${configData.API_HOST}:${configData.API_PORT}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setContacts([...contacts, resp.contact]);
      });
    console.log(data);
  }

  function onUpdateContact(data) {
    console.log(data);
  }

  return (
    <div className="contacts-general-container">
      <Search />
      <div className="export-import">
        <button>IMPORT</button>
        <button>EXPORT</button>
        <button
          onClick={() => {
            setaddModalIsOpen(true);
            setSelectedContact({});
          }}
        >
          ADD
        </button>
      </div>
      <ModalAddContact
        ADD
        isOpen={addModalIsOpen}
        onClose={onCloseAdd}
        onAddContact={onAddContact}
      />
      ;
      <section className="contacts-table">
        <header className="contacts-table-header">
          <ul className="contacts-table-header-menu">
            <li>Contacts</li>
            <li>Country/Region</li>
            <li>Company</li>
            <li>Position</li>
            <li>Interest</li>
            <li>Actions</li>
          </ul>
        </header>
        <div className="contacts-table-body">
          {contacts.map((contact) => (
            <Contact key={contact._id} contact={contact} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contacts;
