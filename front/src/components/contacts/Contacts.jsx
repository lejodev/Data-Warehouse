import React, { useState, useEffect } from "react";
import ModalAddContact from "../modals/add/ModalAddContact";
import Search from "./search/Search";
import ExportImport from "./export-import-add/ExportImport";
import ContactsTable from "./contacts-table/ContactsTable";
import "./_contacts.scss";

const Contacts = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  function onClose() {
    setmodalIsOpen(false);
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
      <ModalAddContact isOpen={modalIsOpen} onClose={onClose} />
      <ContactsTable />
    </div>
  );
};

export default Contacts;
