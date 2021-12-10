import React, { useState, useEffect } from "react";
import Button from "../../buttons/Button";
import FormModal from "../../modals/add/Modal.Add";

const City = (props) => {
  return (
    <div className="city">
      <div className="city-header">
        <h2>{props.city.name}</h2>
        <Button text1="Edit" />
        <Button text1="Delete" />
        <FormModal />
      </div>
    </div>
  );
};

export default City;
