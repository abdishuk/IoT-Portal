import React, { useEffect, useState } from "react";

import Axios from "axios";
import { Table } from "react-bootstrap";

function Telemetry() {
  const [newData, setData] = useState({});

  // const getLatest = () => {
  //   console.log("newData", newData.latitude);
  //   let newlatitude = Number(newData.latitude) + 1;
  //   let newlongitude = Number(newData.longitude) + 1;

  //   newData.latitude = newlatitude;
  //   newData.longitude = newlongitude;

  //   console.log("newData", newData);
  //   setNewData(newData);

  //   // let i = 0;
  //   // i++;
  //   // let obj = {
  //   //   device_id: Array,
  //   //   latitude: 21.23 + i,
  //   //   longitude: 23.45 + i,
  //   // };
  //   // setArray(obj);
  //   // console.log(Array);
  // };
  function getRandomlLatitude(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
  function getRandomLongitude(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  setInterval(function () {
    console.log("latitude", getRandomlLatitude(10.655, 12.665));
    console.log("longitude", getRandomLongitude(4.55, 8.99));
  }, 3000);

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
          <tr key={newData.device_id}>
            <td>{newData.device_id}</td>
            <td>{newData.latitude}</td>
            <td>{newData.longitude}</td>
            <button>Get latest Telemetry data</button>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Telemetry;
