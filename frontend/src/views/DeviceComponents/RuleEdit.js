import axios from "axios";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import FormContainer from "./FormContainer";
import Message from "./Message";

function RuleEdit({ match }) {
  const [device, setDevice] = useState({});
  const [id, setID] = useState("");

  const [formData, setFormdata] = useState({
    MinLat: "",
    MinLng: "",
    MaxLat: "",
    MaxLng: "",
    Action: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // /device/:id/rule
    const fetchData = async () => {
      const device_id = match.params.id;
      console.log(device_id);
      const { data } = await axios.get(`/device/${device_id}/rule`);

      //console.log("fetchedData", data);
      setID(device_id);
      setFormdata({
        MinLat: data.minLat,
        MinLng: data.minLang,
        MaxLat: data.maxLat,
        MaxLng: data.maxLang,
        Action: data.Action,
      });
    };

    fetchData();
  }, [match.params.id]);

  const { MinLat, MinLng, MaxLat, MaxLng, Action } = formData;

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .put(
        `/device/rule/${id}`,
        { MinLat, MinLng, MaxLat, MaxLng, Action },
        config
      )
      .then(() => {
        setSubmitted(true);
      });
    console.log("submitted");
  };

  return (
    <div>
      <>
        {submitted && (
          <Message var="success" message="Device edited successfully" />
        )}

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
            <Button type="submit">Edit </Button>
          </Form>
        </FormContainer>
      </>
    </div>
  );
}

export default RuleEdit;
