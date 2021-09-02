import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import FormContainer from "./FormContainer";

function NewDeviceEdit({ match }) {
  const [device, setDevice] = useState({});
  const [id, setID] = useState("");

  // console.log(device);
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
  useEffect(() => {
    const fetchData = async () => {
      const device_id = match.params.id;
      console.log(device_id);
      const { data } = await axios.get(`/device/${device_id}`);

      console.log("fetchedData", data);
      setID(device_id);
      setFormdata({
        Name: data?.Name,
        Type: data?.Type,
        asset: data?.ConnectedAssetName,
        category: data?.category,
        gateway: data?.Gateway_Name,
        model: data?.model,
        latitude: data?.static_Gps_Location?.latitude,
        longitude: data?.static_Gps_Location?.longitude,
      });
    };

    fetchData();
  }, [match.params.id]);
  const [checked, setChecked] = useState(false);
  console.log("formData", formData);
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
    const { data } = await axios.put(`/device/${id}/edit`, Device, config);

    alert("device updated successfully");
  };
  const { Name, Type, asset, category, gateway, model, latitude, longitude } =
    formData;

  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(checked);
  const ChangeCheckStatus = () => setChecked(!checked);

  return (
    <>
      <FormContainer>
        <h1>Add New Device</h1>
        <br />
        <Form onSubmit={onsubmitHandler}>
          <Form.Group controlId="Device Name">
            <Form.Label> Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Device Name"
              name="Name"
              defaultValue={Name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="Category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              name="category"
              value={category}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group controlId="Type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Type"
              name="Type"
              value={Type}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="Connected Asset Name">
            <Form.Label>Connected Asset Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Connected Asset Name "
              name="asset"
              value={asset}
              onChange={onChange}
            />
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
              type="text"
              placeholder="Enter Device's Latitude"
              name="latitude"
              value={latitude}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="Enter Device's Longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Device's Longitude"
              name="longitude"
              value={longitude}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group controlId="Model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Model Name"
              name="model"
              value={model}
              onChange={onChange}
            />
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
            Edit{" "}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default NewDeviceEdit;
