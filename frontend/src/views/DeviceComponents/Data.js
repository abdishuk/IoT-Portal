import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import Message from "./Message";

function Data({ location, match }) {
  //  const latitude=location.lat;
  // const longitude;
  const id = match.params.id;
  // console.log(location.lat.split("="));

  // const [cLat, setLatitude] = useState(latitude);
  // const [cLng, setLongitude] = useState(longitude);
  const [outRange, setoutRange] = useState(false);

  let i = 0;

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
      setoutRange(true);
      return true;
    }

    return false;

    // console.log(data);
  };

  function getRandomlLatitude(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    i++;

    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
  function getRandomLongitude(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  setInterval(async function () {
    //  console.log(i);
    // console.log(cLat);
    // console.log(cLng);
    // setLatitude(getRandomlLatitude(parseFloat(cLat), 78.665));
    // setLongitude(getRandomLongitude(cLng, 67.55));
    // const { data } = await Axios.put(`/device/${id}/LatLngedit`, {
    //   latitude: cLat,
    //   longitude: cLng,
    // });
    // checkData(data);
    // console.log(data);
  }, 10000);
  // SendData();
  // console.log(outRange);

  useEffect(() => {
    let lat = new URLSearchParams(location.search).get("lat");
    let lng = new URLSearchParams(location.search).get("lng");

    console.log("lt", lat, "lng", lng);
    console.log(parseFloat(lat));
    console.log(parseFloat(lng));
  }, []);

  return (
    <div>
      {/*
       <Message var="danger" message="Device out of range" />*/}

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Device id</th>
            <th>latitude</th>
            <th>longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr key={id}>
            <td>{id}</td>
            {/* <td>{cLat}</td> */}
            {/* <td>{cLng}</td> */}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Data;
