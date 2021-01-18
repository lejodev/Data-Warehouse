import InfoActionsRow from "./infoActionsRow/InfoActionsRow";
import ContactRow from "./contactsListTableBody/ContactsListTableBody";

function name(params) {}

function ContactsTable() {
  return (
    <div className="contactsList">
      <div className="contacts_list_table">
        <InfoActionsRow />
        <div className="contacts_list_table_header">
          <div className="checkbox_row_title col">
            <input
              type="checkbox"
              name=""
              id="select_all"
              className="select_all"
            />
          </div>
          <div className="contact_row_title col">
            <span className="title">Contact</span>
            <i className="fas fa-arrows-alt-v"></i>
          </div>
          <div className="country_region_row_title col">
            <span className="title">Country/Region</span>
            <i className="fas fa-arrows-alt-v"></i>
          </div>
          <div className="company_row_title col">
            <span className="title">Company</span>
            <i className="fas fa-arrows-alt-v"></i>
          </div>
          <div className="position_row_title col">
            <span className="title">Position</span>
            <i className="fas fa-arrows-alt-v"></i>
          </div>
          <div className="preferred_channel_row_title col">
            <span className="title">Preferred channel</span>
            <i className="fas fa-arrows-alt-v"></i>
          </div>
          <div className="interest_row_title col">
            <span className="title">Interest</span>
          </div>
          <div className="actions_row_title col">
            <span className="title">Actions</span>
          </div>
        </div>
        <div className="contacts_list_table_body">
            <ContactRow />
        </div>
      </div>
    </div>
  );
}

export default ContactsTable;
