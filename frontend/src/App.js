import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Location from "./Components/Location";
import Telemetry from "./views/DeviceComponents/Telemetry";
import "./scss/style.scss";
import NewDeviceEdit from "./views/DeviceComponents/NewDeviceEdit";
import Data from "./views/DeviceComponents/Data";
import Rule from "./views/DeviceComponents/Rule";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
var mqtt = require("mqtt");

class App extends Component {
  componentDidMount() {
    var client = mqtt.connect("mqtt://test.mosquitto.org");

    client.on("connect", function () {
      client.subscribe("presence", function (err) {
        if (!err) {
          client.publish("presence", "Hello mqtt");
        }
      });
    });

    client.on("message", function (topic, message) {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });
  }
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route exact path="/devices/:id/edit" component={NewDeviceEdit} />
            <Route path="/devices/:id/data" component={Data} />
            <Route exact path="/devices/:id/rule" component={Rule} />

            <Route exact path="/devices/location" component={Location} />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
