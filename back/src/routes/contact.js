const express = require("express");
const ContactSchema = require("../models/Schema.Contact");
const contactExists = require("../utils/utils.common.queries").contactExists;

const router = express.Router();

router.get("/", async (req, res) => {
  await ContactSchema.find()
    .populate({
      path: "city",
    })
    .populate("company")
    .then((contacts) => {
      const contactsList = contacts.map((contact) => {
        return {
          name: contact.name,
          "last name": contact.lastName,
          occupation: contact.occupation,
          email: contact.email,
          company: contact.company.name,
          city: contact.city.name,
          address: contact.address,
          interest: contact.interest,
          _id: contact._id,
        };
      });
      res.status(200).json(contactsList);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ Error: err });
    });
});

router.post("/", async (req, res) => {
  const {
    name,
    lastName,
    occupation,
    email,
    company,
    city,
    address,
    interest,
  } = req.body;

  const contact = {
    name,
    lastName,
    occupation,
    email,
    company,
    city,
    address,
    interest,
  };

  const exists = await contactExists(contact);

  const saveContact = new ContactSchema(contact);

  if (!exists) {
    saveContact.save((err, doc) => {
      if (err) {
        res.status(400).json({ Error: err });
      } else {
        res.status(200).json({
          Success: "Contact saved successfully",
          contact: saveContact,
        });
      }
    });
  } else {
    res.status(400).json({ Message: "Contact already exists" });
  }
});

router.patch("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  const update = req.body;
  console.log(update);
  ContactSchema.findByIdAndUpdate(id, update)
    .then((_) => {
      res.status(200).json({ Success: "Contact updated successfully" });
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

router.delete("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  ContactSchema.findByIdAndDelete(id)
    .then((_) => {
      res.status(200).json({ Success: "Contact deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
});

module.exports = router;
