import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "./FormContainer";
import axios from "axios";
import "./Add_new.css";
import { Link } from "react-router-dom";
import Message from "./Message";

function Add_NewDevice() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormdata] = useState({
    Name: "",
    Type: "",
    asset: "",
    category: "",
    gateway: "",
    model: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);

  const { Name, Type, asset, category, gateway, model, latitude, longitude } =
    formData;
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const Device = {
      Name,
      Type,
      ConnectedAssetName: asset,
      category,
      Gateway_Name: gateway,
      model,
      latitude,
      longitude,
    };
    console.log(Device);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      const { data } = await axios.post("/device/add_device", Device, config);
      console.log(data);

      setSubmitted(true);
    }
  };

  const findFormErrors = () => {
    const newErrors = {};
    // name errors
    if (!Name || Name === "") newErrors.Name = "Name cannot be blank!";
    else if (Name.length > 30) newErrors.name = "name is too long!";
    // food errors
    if (!Type || Type === "") newErrors.Type = "select a Type!";
    // rating errors
    if (!asset || asset === "") newErrors.asset = "must assign an asset!";
    // comment errors
    if (!category || category === "")
      newErrors.category = " category cannot be blank!";
    if (!model || model === "") newErrors.model = " model cannot be blank!";

    if (!latitude || latitude === "")
      newErrors.latitude = " latitude cannot be blank!";

    if (!longitude || longitude === "")
      newErrors.longitude = " longitude cannot be blank!";

    return newErrors;
  };

  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
    if (!!errors[e.target.name])
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
  };
  console.log(checked);
  const ChangeCheckStatus = () => setChecked(!checked);
  return (
    <>
      <FormContainer>
        <h1>Add New Device</h1>
        <Form onSubmit={onsubmitHandler}>
          <Form.Group controlId="Device Name">
            <Form.Label>Device Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Device Name"
              name="Name"
              value={Name}
              onChange={onChange}
              isInvalid={!!errors.Name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              name="category"
              value={category}
              onChange={onChange}
              isInvalid={!!errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="Type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Type"
              name="Type"
              value={Type}
              onChange={onChange}
              isInvalid={!!errors.Type}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Type}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Connected Asset Name">
            <Form.Label>Connected Asset Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Connected Asset Name "
              name="asset"
              value={asset}
              isInvalid={!!errors.asset}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.latitude}
            </Form.Control.Feedback>
          </Form.Group>

          {!checked && (
            <Form.Group controlId=" Gateway Name">
              <Form.Label>Gateway Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Gateway Name"
                name="gateway"
                value={gateway}
                onChange={onChange}
              />
            </Form.Group>
          )}

          <Form.Group controlId="Enter Device's Latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="Number"
              placeholder="Enter Device's Latitude"
              name="latitude"
              value={latitude}
              isInvalid={!!errors.latitude}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.latitude}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="Enter Device's Longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="Number"
              placeholder="Enter Device's Longitude"
              name="longitude"
              value={longitude}
              onChange={onChange}
              isInvalid={!!errors.longitude}
            />
            <Form.Control.Feedback type="invalid">
              {errors.longitude}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="Model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Model Name"
              name="model"
              value={model}
              isInvalid={!!errors.model}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mode}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Is gateway"
              onClick={ChangeCheckStatus}
              checked={checked}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add{" "}
          </Button>
        </Form>
        {submitted && (
          <Message var="success" message="Device added successfully" />
        )}
      </FormContainer>
    </>
  );
}

export default Add_NewDevice;
