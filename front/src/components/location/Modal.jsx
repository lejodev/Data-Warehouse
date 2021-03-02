import React, { useState } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import { createPortal } from "react-dom";

const FormModal = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState(null);

  console.log("INSIDEEEEEEEE");
  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={props.showModal ? true : false}
      onRequestClose={() => props.modalStatus(false)}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "grey",
          // opacity: 0.5
        },
        content: {
          backgroundColor: "red",
          opacity: 10,
        },
      }}
    >
      <h1>{props.title}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (data === "") {
            return false;
          }
          props.onAdd(data);
          setData("");
          props.modalStatus(false);
        }}
      >
        <div className="form_control">
          <label htmlFor="dataInput"></label>
          <input
            type="text"
            id="dataInput"
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <input type="submit" value="ADD" />
      </form>
      <Button
        onClick={() => {
          setData("");
          props.modalStatus(false);
        }}
      >
        Cancel
      </Button>
    </Modal>
  );
};

export default FormModal;
