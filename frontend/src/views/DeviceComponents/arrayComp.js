import React from "react";
import { Table } from "react-bootstrap";

function arrayComp({ array }) {
  return (
    <div>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Device</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>Get latest telemetry data</th>
          </tr>
        </thead>
        <tbody>
          <tr key={Array.device_id}>
            <td>{Array.device_id}</td>
            <td>{Array.latitude}</td>
            <td>{Array.longitude}</td>
            <button>Get latest Telemetry data</button>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default arrayComp;
