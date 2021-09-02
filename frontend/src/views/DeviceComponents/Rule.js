import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
import Axios from "axios";

function Rule({ match }) {
  const id = match.params.id;
  console.log(id);
  const [formData, setFormdata] = useState({
    MinLat: "",
    MinLng: "",
    MaxLat: "",
    MaxLng: "",
  });
  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const { MinLat, MinLng, MaxLat, MaxLng } = formData;

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await Axios.put(
      `/device/rule/${id}`,
      { MinLat, MinLng, MaxLat, MaxLng },
      config
    );
    alert("device updated successfully");
  };

  return (
    <>
      <div>
        <FormContainer>
          <h1>Add New Rule</h1>
          <Form onSubmit={onsubmitHandler}>
            <Form.Group controlId="Type">
              <Form.Label>Min Latitude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Type"
                name="MinLat"
                value={MinLat}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="Type">
              <Form.Label>Max Latitude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Max Latitude"
                name="MaxLat"
                value={MaxLat}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="Type">
              <Form.Label>Min Longitude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Min Longitude"
                name="MinLng"
                value={MinLng}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="Type">
              <Form.Label>Max Longitude</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Max Longitude"
                name="MaxLng"
                value={MaxLng}
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit">Edit </Button>
          </Form>
        </FormContainer>
      </div>
    </>
  );
}

export default Rule;
