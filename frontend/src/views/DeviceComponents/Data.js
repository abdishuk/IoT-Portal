import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import Message from "./Message";
import connectMqtt from "./mqtt";

function Data({ location, match }) {
  const id = match.params.id;

  const [cLat, setLatitude] = useState();
  const [cLng, setLongitude] = useState();
  const [outRange, setoutRange] = useState(false);
  const [minlat, setMinLat] = useState();
  const [minlang, setMinLang] = useState();
  const [maxlang, setMaxLang] = useState();
  const [maxlat, setMaxLat] = useState();

  // check data function

  const checkData = async (info, firstTime) => {
    //  get rule for the device

    if (firstTime) {
      if (
        info.lat > maxlat ||
        info.lat < minlat ||
        info.lang > maxlang ||
        info.lang < minlang
      ) {
        setoutRange(true);
        clearInterval(sendData);

        return true;
      }
    } else {
      if (
        parseFloat(info.location.latitude) > maxlat ||
        parseFloat(info.location.latitude) < minlat ||
        parseFloat(info.location.longitude) > maxlang ||
        parseFloat(info.location.longitude) < minlang
      ) {
        setoutRange(true);
        clearInterval(sendData);

        return true;
      }
    }
    setoutRange(false);
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
  const sendData = () => {
    setInterval(async function () {
      console.log("clat", cLat);
      console.log("clng", cLng);
      const { data } = await Axios.put(`/data/${id}`, {
        latitude: cLat,
        longitude: cLng,
      });

      if (checkData(data, false)) {
        setoutRange(true);
        clearInterval(sendData);
      } else {
        setoutRange(false);
      }

      setLatitude(
        // getRandomlLatitude(Math.floor(minlat - 6), Math.ceil(maxlat + 6))
        getRandomlLatitude(minlat, maxlat)
      );
      setLongitude(
        // getRandomLongitude(Math.floor(minlang - 8), Math.ceil(maxlang + 8))
        getRandomLongitude(minlang, maxlang)
      );

      // console.log(outRange);
    }, 10000);
  };
  useEffect(async () => {
    const res = await Axios.get(`/data/${match.params.id}`);
    let lat = res.data.latitude;
    let lng = res.data.longitude;
    sendData();
    console.log("lt", lat, "lng", lng);

    // get lat and long from data collection

    // get max,min Rule

    const { data } = await Axios.get(`/device/${id}/rule`);
    const { minLat, maxLat, minLang, maxLang } = data;
    setMinLat(parseFloat(minLat));
    setMinLang(parseFloat(minLang));
    setMaxLat(parseFloat(maxLat));
    setMaxLang(parseFloat(maxLang));

    setLatitude(parseFloat(lat));
    setLongitude(parseFloat(lng));
    if (checkData({ lat: parseFloat(lat), lang: parseFloat(lng) }, true)) {
      setoutRange(true);
    } else {
      setoutRange(true);
    }
  }, [location.search, checkData, id]);

  if (outRange) {
    clearInterval(sendData);
  }

  return (
    <div>
      {outRange ? (
        <Message var="danger" message="Device out of range" />
      ) : (
        <Message var="success" message="Device in allowed range" />
      )}

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
