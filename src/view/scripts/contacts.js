// Imports
import {Contact} from "../../model/contact-model.js";

// Variables
let checkboxes = document.getElementsByClassName("select");
let mainCheckbox = document.querySelector(".select_all");
let selectedAmount = document.querySelector(".selected_amount");
let infoActionRow = document.querySelector(".info_action_row");
let selectedCounter = 0;

// Methods
async function initLoad() {
  // TODO: implements load filter data
  // -------------------------------  
  
  // get contacs from API
  let contacts = await getContacts();

  // TODO: implements functionality for draw contacts in table
  drawConstacts(contacts);

  loadEventListeners();
  asignListenerForCheckboxes();
}

// search
function search() {
}

// Return contacts promise
function getContacts() {

    // TODO: call API for get contacs
    let contactsTest = [
        new Contact("Alejo", "Rincon", "ok@ok", "CO", "P1", "", 50),
        new Contact("Julian", "Rincon", "ok@ok", "CO", "P1", "", 50),
        new Contact("Daniela", "Rincon", "ok@ok", "CO", "P1", "", 50),
        new Contact("Pepito", "Rincon", "ok@ok", "CO", "P1", "", 50),
        new Contact("Fulanito", "Rincon", "ok@ok", "CO", "P1", "", 50)
    ];
    
    let contactsPromise = new Promise((resolve, reject) => {
        setTimeout(()=> resolve(contactsTest), 2000)
    });   
    //----------------------------------------------
    
    return contactsPromise;
}

function drawConstacts(contacs) {
    let tableContactsBody = document.querySelector(".contacts_list_table_body");

    contacs.forEach(contact => {
        tableContactsBody.appendChild(createContactRowNode(contact));
    });
}

function createContactRowNode(contact) {
    let contactRowTemp = document.querySelector("template#contact_row");
    let contactRow = contactRowTemp.content.cloneNode(true);

    contactRow.querySelector(".name").innerHTML = contact.name;
    contactRow.querySelector(".email").innerHTML = contact.email;
    contactRow.querySelector(".country").innerHTML = contact.country;
    contactRow.querySelector(".region").innerHTML = contact.region;
    contactRow.querySelector(".company").innerHTML = contact.company;

    console.log(contactRowTemp.content);

    return contactRow;
}

function loadEventListeners() {
    // Event Listener for mainCechbox 
  mainCheckbox.addEventListener("click", () => {
    if (mainCheckbox.checked) {
      for (const checkbox of checkboxes) {
        checkbox.checked = true;
      }
      selectedCounter = checkboxes.length;
    } else {
      selectedCounter = 0;
      for (const checkbox of checkboxes) {
        checkbox.checked = false;
      }
    }
    checkboxesStatus();
  });
}

function asignListenerForCheckboxes() {
    for (const checkbox of checkboxes) {
      let outerParent = checkbox.parentNode.parentNode;
      checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
          selectedCounter++;
        } else {
          selectedCounter--;
        }
        selectedCounter == 0
          ? (mainCheckbox.indeterminate = false)
          : (mainCheckbox.indeterminate = true);
        checkboxesStatus();
      });
    }
}


function checkboxesStatus() {
  if (checkboxes.length > 0) {
    for (const checkbox of checkboxes) {
      let row = checkbox.parentNode.parentNode;
      console.log(row);
      if (checkbox.checked) {
        row.style.backgroundColor = "red";
        selectedAmount.innerHTML = `${selectedCounter} Selected`;
      } else {
        row.style.backgroundColor = "#ffffff";
      }
    }
    selectedCounter == checkboxes.length
      ? (mainCheckbox.checked = true)
      : (mainCheckbox.checked = false);
    selectedCounter > 0
      ? (infoActionRow.style.visibility = "visible")
      : (infoActionRow.style.visibility = "hidden");
  }
}

// Initializations and event listeners
initLoad().then();

