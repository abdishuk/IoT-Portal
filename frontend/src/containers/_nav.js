import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Devices",
    route: "/devices",
    icon: "cil puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Devices",
        to: "/devices/all_devices",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add a New Device",
        to: "/devices/add_new_device",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Telemetry Data",
    route: "/data",
    icon: "cil puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Data",
        to: "/data/tel",
      },
    ],
  },
];

export default _nav;
