import React, { useState, useEffect } from "react";
import ModalAddContact from "../modals/add/ModalAddContact";
import Search from "./search/Search";
import ExportImport from "./export-import-add/ExportImport";
import ContactsTable from "./contacts-table/ContactsTable";
import "./_contacts.scss";

const Contacts = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3050/contact")
      .then((resp) => resp.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  }, []);

  function onClose() {
    setmodalIsOpen(false);
  }

  function onAddContact(data) {
    let reqBody = JSON.stringify(data);
    fetch("http://localhost:3050/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    }).then((resp) => {
      if (resp.status == 200) {
        setContacts([...contacts, data]);
      }
    });
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
            setmodalIsOpen(true);
          }}
        >
          ADD
        </button>
      </div>
      <ModalAddContact
        isOpen={modalIsOpen}
        onClose={onClose}
        onAddContact={onAddContact}
      />
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
            <div key={contact._id} className="contact">
              <ul className="contact-row">
                <li>{contact.name}</li>
                <li>{contact.city}</li>
                <li>{contact.company}</li>
                <li>{contact.occupation}</li>
                <li>{contact.interest}</li>
                <li>ACTIONS</li>
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contacts;
