import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import Message from "./Message";
import connectMqtt from "./mqtt";

function Data({ match }) {
  //for updated values
  const [initialDeviceLatitude, setinitialDeviceLatitude] = useState();
  const [initialDeviceLongitude, setinitialDeviceLongitude] = useState();

  const [updateDeviceLatitude, setupdateDeviceLatitude] = useState();
  const [updateDeviceLongitude, setupdateDeviceLongitude] = useState();

  const [isOutOfRange, setIsOutOfRange] = useState(false);

  //for update values
  const [minlat, setMinLat] = useState();
  const [minlang, setMinLang] = useState();
  const [maxlang, setMaxLang] = useState();
  const [firstime, setfirstime] = useState(true);

  const [maxlat, setMaxLat] = useState();

  const [Executed, setExecuted] = useState(false);

  // check data function

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
  const sendData = async (id) => {
    console.log("initialDeviceLatitude", initialDeviceLatitude);
    console.log("initialDeviceLongitude", initialDeviceLongitude);

    const randomLatitude = getRandomlLatitude(
      parseInt(minlat) - 1,
      parseInt(maxlat) + 1
    );
    console.log("minlat type ", typeof minlat, minlat);
    const randomLongitude = getRandomLongitude(
      parseInt(minlang) - 1,
      parseInt(maxlat) + 1
    );
    const { data } = await Axios.put(`/data/${id}`, {
      latitude: randomLatitude,
      longitude: randomLongitude,
    });
    console.log(data);
    let checkDataResult;
    setTimeout(async () => {
      checkDataResult = await checkData(data, false);
      console.log("checkdataResult", checkDataResult);
      setIsOutOfRange(checkDataResult);
      if (isOutOfRange) {
        const { data } = await Axios.post(`/send/email/${match.params.id}`, {
          message: `device with device id ${match.params.id} is out of range.Current latitude: ${updateDeviceLatitude}   Current Longitude: ${updateDeviceLongitude}`,
        });
        console.log(data);
      } else {
        setupdateDeviceLatitude(parseInt(data.location.latitude));
        setupdateDeviceLongitude(parseInt(data.location.longitude));
      }
    }, 10000);

    // if (checkDataResult) {
    //   setIsOutOfRange(true);
    //   clearInterval(sendData);
    // } else {
    // }

    // console.log(isOutOfRange);
  };

  // second use effect
  useEffect(() => {
    console.log("clat", initialDeviceLatitude);
    console.log("clang", initialDeviceLongitude);

    // check whether put data is in range in the checkdata
    sendData(match.params.id, false);
  }, [updateDeviceLatitude, updateDeviceLongitude]);

  console.log("minlatttt", minlat);
  const startUp = async () => {
    if (match.params.id) {
      let id = match.params.id;
      const res = await Axios.get(`/data/${match.params.id}`);
      let lat = res.data.latitude;
      let lng = res.data.longitude;

      console.log("responseData", res.data);

      console.log("lt", lat, "lng", lng);

      // get lat and long from data collection

      // get max,min Rule

      const { data } = await Axios.get(`/device/${id}/rule`);
      console.log(data);

      console.log("mimin", data.minLat);
      if (data) {
        setMinLat(data.minLat);
        setMinLang(data.minLang);
        setMaxLat(data.maxLat);
        setMaxLang(data.maxLang);

        // console.log(
        //   "useEffectminlat",
        //   minlat,
        //   "maxLat",
        //   maxlat,
        //   "maxlang",
        //   maxlang,
        //   "minlang",
        //   minlang
        // );
      }

      setinitialDeviceLatitude(parseFloat(lat));
      setinitialDeviceLongitude(parseFloat(lng));

      let checkDataResult = await checkData(
        { lat: parseFloat(lat), lang: parseFloat(lng) },
        true
      );

      console.log("checkDataresultttt", checkDataResult);
      setIsOutOfRange(checkDataResult);
      // if (checkDataResult) {
      //   setIsOutOfRange(true);
      // } else {
      //   setIsOutOfRange(true);
      // }
    }
  };
  const checkData = async (info) => {
    //  get rule for the device
    console.log("infor", info);
    console.log(
      "minlat",
      minlat,
      "maxLat",
      maxlat,
      "maxlang",
      maxlang,
      "minlang",
      minlang
    );
    if (firstime) {
      if (
        info.lat > maxlat ||
        info.lat < minlat ||
        info.lang > maxlang ||
        info.lang < minlang
      ) {
        return true;
      }

      setfirstime(false);
    } else {
      if (
        parseFloat(info.location?.latitude) > maxlat ||
        parseFloat(info.location?.latitude) < minlat ||
        parseFloat(info.location?.longitude) > maxlang ||
        parseFloat(info.location?.longitude) < minlang
      ) {
        return true;
      }
      return false;
    }
  };

  // console.log(data);

  // FİRST useeffect to start
  useEffect(() => {
    startUp();
  }, []);

  useEffect(() => {
    console.log(
      "useEffectminlat",
      minlat,
      "maxLat",
      maxlat,
      "maxlang",
      maxlang,
      "minlang",
      minlang
    );
    sendData(match.params.id);
  }, [minlat, maxlat, maxlang, minlang]);
  // if (isOutOfRange) {
  //   clearInterval(sendData);
  // }
  // useEffect(() => {
  //   clearInterval(sendData);
  // }, [isOutOfRange]);
  return (
    <div>
      {isOutOfRange ? (
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
            <td>{match.params.id}</td>
            <td>
              {updateDeviceLatitude
                ? updateDeviceLatitude
                : initialDeviceLatitude}
            </td>
            <td>
              {updateDeviceLongitude
                ? updateDeviceLongitude
                : initialDeviceLongitude}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Data;
