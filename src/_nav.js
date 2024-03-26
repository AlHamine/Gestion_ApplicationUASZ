import React from 'react'
import CIcon from '@coreui/icons-react'
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
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: "Gestion DAOS",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
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
        name: "Documentaion",
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
        to: "/documentation",
      },
    ],
  },
];

export default _nav
