import React, { useEffect, useState } from "react";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3050/contact")
      .then((resp) => resp.json())
      .then((contacts) => {
        setContacts(contacts);
      });
  }, []);
  return (
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
  );
};

export default ContactsTable;
