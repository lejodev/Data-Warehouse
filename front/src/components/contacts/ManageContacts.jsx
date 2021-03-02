import "./_manage-contacts.scss";
import SearchContainer from "./search/Search";
import ContactsTable from "./contactsTable/ContactsTable"

const ContactsIO = () => {
  return (
    <div className="contactsIO">
      <div className="io_container">
        <div className="btn_import_contact center_component_row_direction">
          <i className="fas fa-upload"></i>
        </div>
        <div className="btn_export_contact center_component_row_direction">
          <span> Export contacts </span>
          <i className="arrow_down_import_contact fas fa-caret-down"></i>
        </div>
        <div className="btn_add_contact center_component_row_direction">
          Add contacts
        </div>
      </div>
    </div>
  );
};

const ManageContacts = () => {
  return (
    <div className="manageContacts">
      <SearchContainer />
      <ContactsIO />
      <ContactsTable />
    </div>
  );
};

export default ManageContacts;
