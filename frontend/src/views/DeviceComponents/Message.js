import React from "react";
import { Alert } from "react-bootstrap";

function Message(props) {
  return (
    <Alert variant={props.var}>
      <p>{props.message}</p>
    </Alert>
  );
}

export default Message;
