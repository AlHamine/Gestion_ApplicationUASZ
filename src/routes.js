import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);

// Base
const Accordion = React.lazy(() => import("./views/base/accordion/Accordion"));
const Cards = React.lazy(() => import("./views/base/cards/Cards"));

// Icons
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));

// Notifications
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = React.lazy(() => import("./views/notifications/toasts/Toasts"));

const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

// Ajout de nouvelle routes

// ---------------------------- Deploiement ----------------------------
const Rapport = React.lazy(() =>
  import("./views/GestionApplication/rapport/Rapport")
);
const Licence = React.lazy(() =>
  import("./views/GestionApplication/Licence/Licence")
);
const Deploiement = React.lazy(() =>
  import("./views/GestionApplication/deploiement/Deploiement")
);
const Login = React.lazy(() => import("./views/pages/login/Login.js"));
const AjouterClasse = React.lazy(() =>
  import("./views/GestionApplication/deploiement/AjouterClasse")
);
const ModifierClasse = React.lazy(() =>
  import("./views/GestionApplication/deploiement/ModifierClasse")
);
const DetailsClasse = React.lazy(() =>
  import("./views/GestionApplication/deploiement/DetailsClasse")
);

// ---------------------------- Application ----------------------------
const Application = React.lazy(() =>
  import("./views/GestionApplication/application/Application")
);
const AjouterApplication = React.lazy(() =>
  import("./views/GestionApplication/application/AjouterApplication")
);
const ModifierApplication = React.lazy(() =>
  import("./views/GestionApplication/application/ModifierApplication")
);
const DetailsApplication = React.lazy(() =>
  import("./views/GestionApplication/application/DetailsApplication")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  { path: "/login", name: "Login", element: Login },

  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
  { path: "/base", name: "Base", element: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", element: Accordion },
  // --------------------- AJOUT DES ELEMENTS ---------------------
  // ########################## Maquette ##########################
  // ---------------------------- Deploiement ----------------------------
  { path: "/deploiement", name: "Deploiement", element: Deploiement },
  { path: "/licence", name: "Licence", element: Licence },
  { path: "/rapport", name: "Rapport", element: Rapport },
  {
    path: "/rapport/detailsRapport/:id",
    name: "DetailsApplication",
    element: DetailsApplication,
  },
  // ---------------------------- Application ----------------------------
  { path: "/application", name: "Application", element: Application },
  {
    path: "/maquette/application/ajouterApplication",
    name: "AjouterApplication",
    element: AjouterApplication,
  },
  {
    path: "/maquette/application/modifierApplication/:id",
    name: "ModifierApplication",
    element: ModifierApplication,
  },
  {
    path: "/maquette/application/detailsApplication/:id",
    name: "DetailsApplication",
    element: DetailsApplication,
  },
];

export default routes;
