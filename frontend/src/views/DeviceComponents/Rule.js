import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
import Axios from "axios";
import Message from "./Message";

function Rule({ match }) {
  const id = match.params.id;
  console.log(id);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormdata] = useState({
    MinLat: "",
    MinLng: "",
    MaxLat: "",
    MaxLng: "",
    Action: "",
  });
  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const { MinLat, MinLng, MaxLat, MaxLng, Action } = formData;

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await Axios.post(
      `/device/rule/${id}`,
      { MinLat, MinLng, MaxLat, MaxLng, Action },
      config
    );
    console.log(data);
    if (data) {
      setSubmitted(true);
    }
  };

  return (
    <>
      {submitted && <Message var="success" message="Rule added successfully" />}
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

            <Form.Group controlId="Type">
              <Form.Label>Action </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Action"
                name="Action"
                value={Action}
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit">Add </Button>
          </Form>
        </FormContainer>
      </div>
    </>
  );
}

export default Rule;
