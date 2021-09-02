import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "bootstrap";

function Alldevices({ history }) {
  const [devices, setDevices] = useState([]);
  const [Lat, setLat] = useState("");
  const [Lng, setLng] = useState("");

  const getDevices = async () => {
    const { data } = await Axios.get("/devices/all_devices");
    setDevices(data);
  };

  const updateDeviceList = (id) => {
    setDevices(devices.filter((device) => device._id !== id));
  };
  console.log(devices);
  const setLatLng = (lat, lng) => {
    console.log("latitude", lat);
    console.log("longitude", lng);
    setLat(lat);
    setLng(lng);
  };
  useEffect(() => {
    getDevices();
  }, []);
  const RuleHandler = (id) => {
    history.push(`/devices/${id}/rule`);
  };

  console.log(Lat);
  console.log(Lng);
  return (
    <>
      <h1>Devices</h1>
      {devices.length === 0 ? (
        <h3>No device found</h3>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Gateway Name</th>
              <th>Model</th>
              <th>Telemetry</th>Edit<th>Rule</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {console.log("inside body", devices)}{" "}
            {devices &&
              devices.map((device) => (
                <tr key={device._id}>
                  <td>{device.Name}</td>
                  <td>{device.Type}</td>
                  <td>{device.category}</td>
                  <td>{device.Gateway_Name}</td>
                  <td>{device.model}</td>
                  <td>
                    {" "}
                    {console.log("here", device.static_Gps_Location.latitude)}
                    <Link
                      to={`/devices/${device._id}/data/?lat=${device.static_Gps_Location.latitude}&lng=${device.static_Gps_Location.latitude}`}
                    >
                      Get Telemetry
                    </Link>
                  </td>

                  <td>
                    <Link to={`/devices/${device._id}/edit`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        RuleHandler(device._id);
                      }}
                    >
                      Add Rule
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={async () => {
                        alert("Are you sure you want to delete it");
                        const { data } = await Axios.delete(
                          `/device/${device._id}`
                        );
                        updateDeviceList(device._id);

                        console.log(data);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Alldevices;
