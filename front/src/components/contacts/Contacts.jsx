import React, { useEffect } from "react";
import useState from "react-usestateref";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import configData from "../../config/config.json";
import ModalAddContact from "../modals/add/ModalAddContact";
import ModalUpdateContact from "../modals/update/ModalUpdateContact";
import Search from "./search/Search";
import Contact from "./contact/Contact";
import "./_contacts.scss";
import swal from "sweetalert";

const Contacts = () => {
  const [addModalIsOpen, setaddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectEditContact, setSelectEditContact] = useState({});
  const [parentIsSelected, setParentIsSelected, parentIsSelectedRef] =
    useState(false);
  const [selectedContacts, setSelectedContacts, selectedContactsRef] = useState(
    []
  );

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

  function handleSort(click, field) {
    let order = 1;
    fetch(
      `${configData.API_HOST}:${configData.API_PORT}/contact/sort?order=${click}&fieldParam=${field}`
    )
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((resp) => {
        setContacts(resp)
      });
  }

  const handleSelection = (id) => {
    if (!selectedContacts.includes(id)) {
      setSelectedContacts([...selectedContacts, id]);
      if (selectedContactsRef.current.length === contacts.length) {
        setParentIsSelected(true);
        console.log(selectedContactsRef.current.length, contacts.length);
      }
    } else {
      setParentIsSelected(false);
      setSelectedContacts(
        selectedContacts.filter((selected) => selected != id)
      );
    }
  };

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
      <section className="contacts-table">
        <header className="contacts-table-header">
          {selectedContactsRef.current.length > 0 ? (
            <div className="selectedInfo">
              <span>{selectedContacts.length} selected</span>
              <div
                className="delete-selected"
                onClick={() => {
                  let body = { selectedContacts: selectedContacts };
                  console.log(body, "HIJUEPUTAOMEEEEEEEEE");
                  fetch("http://localhost:3050/contact/", {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "DELETE",
                    body: JSON.stringify(body),
                  })
                    .then((resp) => resp.json())
                    .then((resp) => {
                      if (resp.Message == "Success") {
                        swal("DELETEEEEED GONORREAAAAA!");
                        setContacts(
                          contacts.filter(
                            (contact) => !selectedContacts.includes(contact._id)
                          )
                        );
                        setParentIsSelected(false);
                        setSelectedContacts([]);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      swal("Error");
                    });
                }}
              >
                <MdDelete /> Delete contacts
              </div>
            </div>
          ) : null}
          <ul className="contacts-table-header-menu">
            <li>
              <input
                type="checkbox"
                name="main-checkbox"
                id="main-checkbox"
                checked={parentIsSelectedRef.current}
                onChange={() => {
                  setParentIsSelected(!parentIsSelected);
                  if (parentIsSelectedRef.current) {
                    setSelectedContacts(contacts.map((contact) => contact._id));
                  } else {
                    setSelectedContacts([]);
                  }
                }}
              />
            </li>
            <li
              onClick={() => {
                handleSort(-1, "name");
              }}
            >
              Contact
            </li>
            <li
              onClick={() => {
                handleSort(-1, "city");
              }}
            >
              Country/Region
            </li>
            <li
              onClick={() => {
                handleSort(-1, "company");
              }}
            >
              Company
            </li>
            <li
              onClick={() => {
                handleSort(-1, "occupation");
              }}
            >
              Position
            </li>
            <li
              onClick={() => {
                handleSort(1, "interest");
                
              }}
            >
              Interest
            </li>
            <li>Actions</li>
          </ul>
        </header>
        <div className="contacts-table-body">
          {contacts.map((contact) =>
            // <Contact
            //   key={contact._id}
            //   contact={contact}
            //   mainparentIsSelected={mainCheckStatus}
            // />
            {
              return (
                <div key={contact._id} className="contact">
                  <ModalUpdateContact
                    UPDATE
                    isOpen={updateModalIsOpen}
                    onClose={onCloseUpdate}
                    onUpdateContact={onUpdateContact}
                    contact={selectEditContact}
                  />
                  <ul className="contact-row">
                    <li>
                      <input
                        type="checkbox"
                        name="child-checkbox"
                        id="child-checkbox"
                        checked={selectedContacts.includes(contact._id)}
                        onChange={() => {
                          handleSelection(contact._id);
                        }}
                      />
                    </li>
                    <li>{contact.name}</li>
                    <li>{contact.city}</li>
                    <li>{contact.company}</li>
                    <li>{contact.occupation}</li>
                    <li>{contact.interest}</li>
                    <li className="actions-container">
                      <BsThreeDots />
                      <div className="actions-dots">
                        <MdDelete
                          onClick={() => {
                            onDelete(contact._id);
                          }}
                        />
                        <MdEdit
                          onClick={() => {
                            console.log(contact);
                            setUpdateModalIsOpen(true);
                            setSelectEditContact(contact);
                          }}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};

export default Contacts;
