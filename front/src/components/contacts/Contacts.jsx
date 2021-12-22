import React, { useState, useEffect } from "react";
import Search from "./search/Search";
import ExportImport from "./export-import-add/ExportImport";
import ContactsTable from "./contacts-table/ContactsTable";
import "./_contacts.scss";

const Contacts = () => {
  return (
    <div className="contacts-general-container">
      <Search />
      <ExportImport />
      <ContactsTable />
    </div>
  );
};

export default Contacts;
