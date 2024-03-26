import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// Ajout de nouvelle element
// const Ue = React.lazy(() => import('./views/base/ue/Ue'))
// const AddUe = React.lazy(() => import('./views/base/ue/AddUe'))
// const EditUe = React.lazy(() => import('./views/base/ue/EditUe'))
// Fin
const DetailsMaquette = React.lazy(() => import('./views/GestionApplication/maquette/DetailsMaquette.js'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Ajout de nouvelle routes

// ---------------------------- Deploiement ----------------------------
const Deploiement = React.lazy(() => import('./views/GestionApplication/deploiement/Deploiement'))
const AjouterClasse = React.lazy(() => import('./views/GestionApplication/deploiement/AjouterClasse'))
const ModifierClasse = React.lazy(() => import('./views/GestionApplication/deploiement/ModifierClasse'))
const DetailsClasse = React.lazy(() => import('./views/GestionApplication/deploiement/DetailsClasse'))
// ---------------------------- Cycle ----------------------------
const Cycle = React.lazy(() => import('./views/GestionApplication/cycle/Cycle'))
const AjouterCycle = React.lazy(() => import('./views/GestionApplication/cycle/AjouterCycle'))
const ModifierCycle = React.lazy(() => import('./views/GestionApplication/cycle/ModifierCycle'))
const DetailsCycle = React.lazy(() => import('./views/GestionApplication/cycle/DetailsCycle'))
// ---------------------------- EC ----------------------------
const EC = React.lazy(() => import('./views/GestionApplication/ec/EC'))
const AjouterEC = React.lazy(() => import('./views/GestionApplication/ec/AjouterEC'))
const ModifierEC = React.lazy(() => import('./views/GestionApplication/ec/ModifierEC'))
const DetailsEC = React.lazy(() => import('./views/GestionApplication/ec/DetailsEC'))

// ---------------------------- Enseignement ----------------------------
const Enseignement = React.lazy(() => import('./views/GestionApplication/enseignement/Enseignement'))
const AjouterEnseignement = React.lazy(() =>
  import('./views/GestionApplication/enseignement/AjouterEnseignement'),
)
const ModifierEnseignement = React.lazy(() =>
  import('./views/GestionApplication/enseignement/ModifierEnseignement'),
)
// ---------------------------- Filiere ----------------------------
const Filiere = React.lazy(() => import('./views/GestionApplication/filiere/Filiere'))
const AjouterFiliere = React.lazy(() => import('./views/GestionApplication/filiere/AjouterFiliere'))
const ModifierFiliere = React.lazy(() => import('./views/GestionApplication/filiere/ModifierFiliere'))
const FiliereDetails = React.lazy(() => import('./views/GestionApplication/filiere/FiliereDetails'))
// ---------------------------- Formation ----------------------------
const Formation = React.lazy(() => import('./views/GestionApplication/formation/Formation'))
const AjouterFormation = React.lazy(() => import('./views/GestionApplication/formation/AjouterFormation'))
const ModifierFormation = React.lazy(() => import('./views/GestionApplication/formation/ModifierFormation'))
const FormationDetails = React.lazy(() => import('./views/GestionApplication/formation/FormationDetails'))
// ---------------------------- Groupe ----------------------------
const Groupe = React.lazy(() => import('./views/GestionApplication/groupe/Groupe'))
const AjouterGroupe = React.lazy(() => import('./views/GestionApplication/groupe/AjouterGroupe'))
const ModifierGroupe = React.lazy(() => import('./views/GestionApplication/groupe/ModifierGroupe'))
const DetailsGroupe = React.lazy(() => import('./views/GestionApplication/groupe/DetailsGroupe'))
// ---------------------------- Maquette ----------------------------
const Maquette = React.lazy(() => import('./views/GestionApplication/maquette/Maquette'))
const AjouterMaquette = React.lazy(() => import('./views/GestionApplication/maquette/AjouterMaquette'))
const ModifierMaquette = React.lazy(() => import('./views/GestionApplication/maquette/ModifierMaquette'))
// ---------------------------- Module ----------------------------
const Module = React.lazy(() => import('./views/GestionApplication/module/Module'))
const AjouterModule = React.lazy(() => import('./views/GestionApplication/module/AjouterModule'))
const ModifierModule = React.lazy(() => import('./views/GestionApplication/module/ModifierModule'))
const ModuleDetails = React.lazy(() => import('./views/GestionApplication/module/ModuleDetails'))

// ---------------------------- Niveau ----------------------------
const Niveau = React.lazy(() => import('./views/GestionApplication/niveau/Niveau'))
const AjouterNiveau = React.lazy(() => import('./views/GestionApplication/niveau/AjouterNiveau'))
const ModifierNiveau = React.lazy(() => import('./views/GestionApplication/niveau/ModifierNiveau'))
const DetailsNiveau = React.lazy(() => import('./views/GestionApplication/niveau/DetailsNiveau'))

// ---------------------------- Semestre ----------------------------
const Semestre = React.lazy(() => import('./views/GestionApplication/semestre/Semestre'))
const AjouterSemestre = React.lazy(() => import('./views/GestionApplication/semestre/AjouterSemestre'))
const ModifierSemestre = React.lazy(() => import('./views/GestionApplication/semestre/ModifierSemestre'))
const SemestreDetails = React.lazy(() => import('./views/GestionApplication/semestre/SemestreDetails'))
// ########################## Emploi Du Temps ##########################
// ---------------------------- Batiment ----------------------------
const Batiment = React.lazy(() => import('./views/emploiDuTemps/batiment/Batiment'))
const AjouterBatiment = React.lazy(() => import('./views/emploiDuTemps/batiment/AjouterBatiment'))
const ModifierBatiment = React.lazy(() => import('./views/emploiDuTemps/batiment/ModifierBatiment'))
// ---------------------------- Deroulement ----------------------------
const Deroulement = React.lazy(() => import('./views/emploiDuTemps/deroulement/Deroulement'))
const AjouterDeroulement = React.lazy(() =>
  import('./views/emploiDuTemps/deroulement/AjouterDeroulement'),
)
const ModifierDeroulement = React.lazy(() =>
  import('./views/emploiDuTemps/deroulement/ModifierDeroulement'),
)
// ---------------------------- Emploi ----------------------------
const Emploi = React.lazy(() => import('./views/emploiDuTemps/emploi/Emploi'))
const AjouterEmploi = React.lazy(() => import('./views/emploiDuTemps/emploi/AjouterEmploi'))
const ModifierEmploi = React.lazy(() => import('./views/emploiDuTemps/emploi/ModifierEmploi'))
// ---------------------------- Salle ----------------------------
const Salle = React.lazy(() => import('./views/emploiDuTemps/salle/Salle'))
const BatimentSalle = React.lazy(() => import('./views/emploiDuTemps/salle/BatimentSalle'))

const AjouterSalle = React.lazy(() => import('./views/emploiDuTemps/salle/AjouterSalle'))
const AjouterSalleB = React.lazy(() => import('./views/emploiDuTemps/salle/BatimentSalleAjout'))
const ModifierSalle = React.lazy(() => import('./views/emploiDuTemps/salle/ModifierSalle'))
// ---------------------------- Seance ----------------------------
const Seance = React.lazy(() => import('./views/emploiDuTemps/seance/Seance'))
const SeanceEmploi = React.lazy(() => import('./views/emploiDuTemps/seance/SeanceEmploi'))
const AjoutSeanceEmploi = React.lazy(() => import('./views/emploiDuTemps/seance/AjoutSeanceEmploi'))
const ModifierSeanceEmploi = React.lazy(() =>
  import('./views/emploiDuTemps/seance/ModifierSeanceEmploi'),
)
const AjouterSeance = React.lazy(() => import('./views/emploiDuTemps/seance/AjouterSeance'))
const ModifierSeance = React.lazy(() => import('./views/emploiDuTemps/seance/ModifierSeance'))

// ########################## Repartition ##########################
// ---------------------------- Enseignant ----------------------------
const Enseignant = React.lazy(() => import('./views/repartition/enseignant/Enseignant'))
const AjouterEnseignant = React.lazy(() =>
  import('./views/repartition/enseignant/AjouterEnseignant'),
)
const ModifierEnseignant = React.lazy(() =>
  import('./views/repartition/enseignant/ModifierEnseignant'),
)
// ---------------------------- PER ----------------------------
const PER = React.lazy(() => import('./views/repartition/per/PER'))
const AjouterPER = React.lazy(() => import('./views/repartition/per/AjouterPER'))
const ModifierPER = React.lazy(() => import('./views/repartition/per/ModifierPER'))
// ---------------------------- Repartition ----------------------------
const Repartition = React.lazy(() => import('./views/repartition/repartition/Repartition'))
const AjouterRepartition = React.lazy(() =>
  import('./views/repartition/repartition/AjouterRepartition'),
)
const ModifierRepartition = React.lazy(() =>
  import('./views/repartition/repartition/ModifierRepartition'),
)
// ---------------------------- Vacataire ----------------------------
const Vacataire = React.lazy(() => import('./views/repartition/vacataire/Vacataire'))
const AjouterVacataire = React.lazy(() => import('./views/repartition/vacataire/AjouterVacataire'))
const ModifierVacataire = React.lazy(() =>
  import('./views/repartition/vacataire/ModifierVacataire'),
)

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },
  { path: "/base", name: "Base", element: Cards, exact: true },
  { path: "/base/accordion", name: "Accordion", element: Accordion },
  // --------------------- AJOUT DES ELEMENTS ---------------------
  // ########################## Maquette ##########################
  // ---------------------------- Deploiement ----------------------------
  { path: "/deploiement", name: "Classe", element: Deploiement },
  {
    path: "/maquette/classe/AjouterClasse",
    name: "AjouterClasse",
    element: AjouterClasse,
  },
  {
    path: "/maquette/classe/ModifierClasse/:id",
    name: "ModifierClasse",
    element: ModifierClasse,
  },
  {
    path: "/maquette/classe/classeDetails/:id",
    name: "DetailsClasse",
    element: DetailsClasse,
  },
];

export default routes
