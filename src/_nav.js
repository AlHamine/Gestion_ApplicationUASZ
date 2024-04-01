import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBalanceScale,
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilLineStyle,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "",
    to: "/",
    icon: (
      <img
        src={require("./Logo_uasz-bg-w.jpg")}
        alt="Icône"
        // className="nav-icon"
        style={{ width: "200px", height: "150px", borderRadius: "70%" }}
      />
    ),
    // icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavItem,
    name: "Gestion Application UASZ",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

    // icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },

  //--------------------------- DAOS ---------------------------
  // --------------------------- LES ELEMENTS DE MAQUETTE ---------------------------

  {
    component: CNavItem,
    name: "Maquette",
    to: "/maquette",
    icon: <CIcon icon={cilLineStyle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Application",
        icon: <CIcon icon={cilLineStyle} customClassName="nav-icon" />,
        to: "/application",
      },
      {
        component: CNavItem,
        name: "Licence",
        icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
        to: "/licence",
      },
      {
        component: CNavItem,
        name: "Deploiement",
        icon: <CIcon icon={cilBalanceScale} customClassName="nav-icon" />,
        to: "/deploiement",
      },
      {
        component: CNavItem,
        name: "Rapport",
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
        to: "/rapport",
      },
      {
        component: CNavItem,
        name: "Documentaion",
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
        to: "/documentation",
      },
    ],
  },
];

export default _nav;
