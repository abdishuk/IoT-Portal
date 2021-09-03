import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import Message from "./Message";

function Data({ location, match }) {
  const id = match.params.id;

  const [cLat, setLatitude] = useState();
  const [cLng, setLongitude] = useState();
  const [outRange, setoutRange] = useState(false);

  // check data function

  const checkData = async (info) => {
    //  get rule for the device

    const { data } = await Axios.get(`/device/${id}/rule`);
    const { minLat, maxLat, minLang, maxLang } = data;

    if (
      parseFloat(info.info.static_Gps_Location.latitude) > parseFloat(maxLat) ||
      parseFloat(info.info.static_Gps_Location.latitude) < parseFloat(minLat) ||
      parseFloat(info.info.static_Gps_Location.longitude) >
        parseFloat(maxLang) ||
      parseFloat(info.info.static_Gps_Location.longitude) < parseFloat(minLang)
    ) {
      return true;
    }

    return false;

    // console.log(data);
  };

  function getRandomlLatitude(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getRandomLongitude(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setInterval(async function () {
    setLatitude(getRandomlLatitude(28.45, 78.665));
    setLongitude(getRandomLongitude(23, 67.55));

    const { data } = await Axios.put(`/device/${id}/LatLngedit`, {
      latitude: cLat,
      longitude: cLng,
    });
    if (!checkData(data)) {
      setoutRange(true);
      clearInterval();
    }
    setoutRange(true);
    console.log(outRange);
    if (outRange) {
      clearInterval();
    }
  }, 10000);

  useEffect(() => {
    let lat = new URLSearchParams(location.search).get("lat");
    let lng = new URLSearchParams(location.search).get("lng");

    console.log("lt", lat, "lng", lng);
    setLatitude(parseFloat(lat));
    setLongitude(parseFloat(lng));
  }, [location.search]);

  return (
    <div>
      {outRange && <Message var="danger" message="Device out of range" />}

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Device id</th>
            <th>latitude</th>
            <th>longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{cLat}</td>
            <td>{cLng}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Data;
