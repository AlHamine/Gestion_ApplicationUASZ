import React, { useEffect, useState } from "react";
import {
  // Import des composants d'interface utilisateur
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CPagination,
  CPaginationItem,
  CFormInput,
  CPopover,
} from "@coreui/react";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import DeleteIcon from '@mui/icons-material/Delete'
import { Email, Lock } from "@mui/icons-material";
import serveurIcon from "./icons8-server-24.png";
import calendrier from "./icons8-calendar-12-24.png";
import FileIcon from "@mui/icons-material/FileCopy";
import { SERVER_URL } from "src/constantURL";
import { Link } from "react-router-dom";
import { maxWidth } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField, InputAdornment, Container } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
// Définition du composant Deploiement
/**
 * Component React  pour gerer  and afficher les donnees des  deploiements.
 *
 * @component
 * @AlHamine
 */
export default function Deploiement() {
  // Déclaration des états locaux avec useState
  const [listDeploiement, setListDeploiement] = useState([]); // Liste des déploiements
  const [listApplication, setListApplication] = useState([]); // Liste des applications
  const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1); // La page courante
  const [open, setOpen] = useState(false); // État pour ouvrir/fermer la boîte de dialogue d'ajout
  const [open2, setOpen2] = useState(false); // État pour ouvrir/fermer la boîte de dialogue de modification
  const [serveur, setServeur] = useState(""); // Serveur
  const [dateDeploiement, setDateDeploiement] = useState(""); // Date de déploiement
  const [chargerDeploiement, setChargerDeploiement] = useState(null); // Déploiement à charger pour la modification
  const [selectedOption, setSelectedOption] = useState("def"); // Option sélectionnée dans la liste déroulante d'application

  // Utilisation du hook useEffect pour effectuer des opérations au chargement initial
  useEffect(() => {
    fetchDeploiement(); // Récupérer la liste des déploiements depuis le serveur
    fetchApplication(); // Récupérer la liste des applications depuis le serveur

    // Construction des options à partir de listApplication
    const newOptions = listApplication.map((application) => ({
      value: application.nom,
      label: application.nom,
      icon: serveur, // Utilisation de votre image serveur
    }));

    // Mise à jour de l'état des options
    // setOptions(newOptions, ...options);
    // console.log(options);
  }, []);

  /**
   * Fonction pour gérer le changement dans le champ de recherche.
   * @param {Object} event - Événement de changement de saisie.
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  /**
   * Calcule le numéro de la dernière page pour la pagination en fonction du nombre total d'éléments de déploiement et du nombre d'éléments par page.
   */
  const lastPageNumber = Math.ceil(listDeploiement.length / itemsPerPage);

  /**
   * Fonction pour gérer le changement de page dans la pagination.
   * @param {number} value - Valeur associée à l'action de pagination.
   *                        Si la valeur est -100, la page suivante est sélectionnée.
   *                        Si la valeur est -200, la page précédente est sélectionnée.
   *                        Sinon, la valeur correspond au numéro de la page sélectionnée.
   */
  const handleChangePaginate = (value) => {
    // Vérifier la valeur de 'value' pour déterminer l'action de pagination
    if (value === -100) {
      // Sélectionner la page suivante
      setCurrentPage(currentPage + 1);
    } else if (value === -200) {
      // Sélectionner la page précédente
      setCurrentPage(currentPage - 1);
    } else {
      // Sélectionner la page correspondant à 'value'
      setCurrentPage(value);
    }
  };

  // Fonction de gestion du changement de sélection dans la liste déroulante d'application
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  /**
   * Fonction pour récupérer les déploiements depuis le serveur
   * Effectue une requête pour récupérer les déploiements depuis le serveur.
   * Les données récupérées sont triées par date de création en ordre décroissant.
   * Les déploiements sont stockés dans le state 'listDeploiement'.
   */
  const fetchDeploiement = () => {
    // Récupérer le jeton d'authentification depuis le stockage de session
    const token = sessionStorage.getItem("jwt");

    // Effectuer une requête GET vers l'URL du serveur + "deploiement"
    fetch(SERVER_URL + "deploiement", {
      headers: { Authorization: token }, // Inclure le jeton d'authentification dans les en-têtes
    })
      .then((response) => {
        // Vérifier si la réponse du serveur est réussie (200 OK)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Convertir la réponse en JSON
        return response.json();
      })
      .then((data) => {
        // Mettre à jour le state 'listDeploiement' avec les données récupérées
        setListDeploiement(data);
      })
      .catch((error) => {
        // Gérer les erreurs survenues lors de la requête ou du traitement des données
        console.error("Error fetching Deploiement:", error);
      });
  };

  /**
   * Fonction pour récupérer les applications depuis le serveur
   * Effectue une requête pour récupérer les applications depuis le serveur.
   * Les données récupérées sont triées par date de création en ordre décroissant.
   * Les applications sont stockées dans le state 'listApplication'.
   */
  const fetchApplication = () => {
    // Récupérer le jeton d'authentification depuis le stockage de session
    const token = sessionStorage.getItem("jwt");

    // Effectuer une requête GET vers l'URL du serveur + "application"
    fetch(SERVER_URL + "application", {
      headers: { Authorization: token }, // Inclure le jeton d'authentification dans les en-têtes
    })
      .then((response) => {
        // Vérifier si la réponse du serveur est réussie (200 OK)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Convertir la réponse en JSON
        return response.json();
      })
      .then((data) => {
        // Mettre à jour le state 'listApplication' avec les données récupérées
        setListApplication(data);
      })
      .catch((error) => {
        // Gérer les erreurs survenues lors de la requête ou du traitement des données
        console.error("Error fetching APPLICATION:", error);
      });
  };
  /**
   * Fonction pour formater une date au format français.
   * @param {string} dateISO - Chaîne représentant une date au format ISO (ex: "2024-04-14T12:30:00Z").
   * @returns {string} - Chaîne représentant la date formatée en français.
   */
  function toDateFr(dateISO) {
    // Créer un objet Date à partir de la chaîne ISO
    var dateObj = new Date(dateISO);

    // Options pour le formatage de la date
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    // Formater la date en français
    var dateFrancaise = dateObj.toLocaleString("fr-FR", options);

    return dateFrancaise;
  }

  /**
   * Fonction pour ajouter un déploiement en envoyant une requête POST au serveur.
   */
  const ajouterDeploiement = () => {
    // Récupérer le jeton d'authentification depuis le stockage de session
    const token = sessionStorage.getItem("jwt");

    // Données à envoyer dans la requête POST
    const donnee = {
      application: { id: selectedOption },
      date_deploiement: dateDeploiement,
      serveur: serveur,
      utilisateur: { id: sessionStorage.getItem("id") },
    };

    // Effectuer une requête POST vers l'URL du serveur + "deploiement"
    fetch(SERVER_URL + "deploiement", {
      method: "POST", // Méthode POST
      headers: {
        "Content-Type": "application/json", // Type de contenu JSON
        Authorization: token, // Jeton d'authentification dans les en-têtes
      },
      body: JSON.stringify(donnee), // Convertir les données en JSON
    })
      .then((response) => {
        // Vérifier si la réponse du serveur est réussie (status 200 OK)
        if (response.ok) {
          // Afficher un message de succès
          alert("Déploiement ajouté avec succès");
          // Recharger la page pour mettre à jour les données
          window.location.reload();
        } else {
          // Afficher un message en cas d'erreur
          alert("Une erreur s'est produite");
        }
      })
      .catch((err) => {
        // Gérer les erreurs survenues lors de l'envoi de la requête
        console.error(err);
      });
  };

  
  /**
   * Fonction pour modifier un déploiement en envoyant une requête PATCH au serveur.
   * @param {string} id - Identifiant du déploiement à modifier.
   */
  const modifierDeploiement = (id) => {
    // Récupérer le jeton d'authentification depuis le stockage de session
    const token = sessionStorage.getItem("jwt");

    // Données à envoyer dans la requête PATCH
    const donnee = {
      id: id,
      application: { id: selectedOption },
      date_deploiement: dateDeploiement,
      serveur: serveur,
      utilisateur: { id: sessionStorage.getItem("id") },
    };

    // Effectuer une requête PATCH vers l'URL du serveur + "deploiement/{id}"
    fetch(SERVER_URL + "deploiement/" + id, {
      method: "PATCH", // Méthode PATCH
      headers: {
        "Content-Type": "application/json", // Type de contenu JSON
        Authorization: token, // Jeton d'authentification dans les en-têtes
      },
      body: JSON.stringify(donnee), // Convertir les données en JSON
    })
      .then((response) => {
        // Vérifier si la réponse du serveur est réussie (status 200 OK)
        if (response.ok) {
          // Afficher un message de succès
          alert("Déploiement modifié avec succès");
          // Recharger la page pour mettre à jour les données
          window.location.reload();
        } else {
          // Afficher un message en cas d'erreur
          alert("Une erreur s'est produite");
        }
      })
      .catch((err) => {
        // Gérer les erreurs survenues lors de l'envoi de la requête
        console.error(err);
      });
  };

  /**
   * Fonction pour gérer la suppression d'un déploiement en envoyant une requête DELETE au serveur.
   * Affiche une boîte de dialogue de confirmation avant de supprimer.
   * @param {string} id - Identifiant du déploiement à supprimer.
   */
  const onDelClick = (id) => {
    // Afficher une boîte de dialogue de confirmation avant la suppression
    if (window.confirm("Êtes-vous sûr de vouloir supprimer le déploiement?")) {
      // Récupérer le jeton d'authentification depuis le stockage de session
      const token = sessionStorage.getItem("jwt");

      // Effectuer une requête DELETE vers l'URL du serveur + "deploiement/{id}"
      fetch(SERVER_URL + `deploiement/${id}`, {
        method: "DELETE", // Méthode DELETE
        headers: {
          "Content-Type": "application/json", // Type de contenu JSON
          Authorization: token, // Jeton d'authentification dans les en-têtes
        },
      })
        .then((response) => {
          // Vérifier si la réponse du serveur est réussie (status 200 OK)
          if (response.ok) {
            // Actualiser la liste des déploiements après la suppression
            fetchDeploiement();
          } else {
            // Afficher un message en cas d'erreur
            alert("Une erreur s'est produite lors de la suppression.");
          }
        })
        .catch((err) => {
          // Gérer les erreurs survenues lors de l'envoi de la requête
          console.error(err);
        });
    }
  };

  /**
   * Fonction pour extraire la date uniquement à partir d'une chaîne de date/heure.
   * @param {string} dateTimeString - Chaîne de date/heure au format ISO.
   * @returns {string|null} La date extraite ou null si la chaîne est vide.
   */
  function extractDateOnly(dateTimeString) {
    // Vérifier si la chaîne est vide ou null
    if (!dateTimeString) {
      return null;
    }

    // Extraire la date uniquement
    const dateOnly = dateTimeString.substring(0, 10);

    return dateOnly;
  }
  /**
   * Fonction pour ouvrir la boîte de dialogue.
   */
  const openDialog = () => {
    setOpen(true); // Mettre à jour l'état 'open' à true pour ouvrir la boîte de dialogue
  };

  /**
   * Fonction pour fermer la boîte de dialogue.
   */
  const closeDialog = () => {
    setOpen(false); // Mettre à jour l'état 'open' à false pour fermer la boîte de dialogue
  };

  /**
   * Fonction pour ouvrir une boîte de dialogue avec les détails d'un déploiement spécifique.
   * @param {string} id - Identifiant du déploiement à afficher dans la boîte de dialogue.
   */
  const openDialog2 = (id) => {
    // Filtrer le déploiement correspondant à l'ID donné
    const selectedDeploiement = listDeploiement.find((d) => d.id === id);

    // Mettre à jour les états avec les détails du déploiement sélectionné
    setChargerDeploiement((prev) => selectedDeploiement);
    setSelectedOption((prev) => selectedDeploiement?.application?.id);
    setServeur((prev) => selectedDeploiement?.serveur);
    setDateDeploiement((prev) => selectedDeploiement?.date_deploiement);

    // Ouvrir la boîte de dialogue
    setOpen2(true);
  };
  // Fonction pour fermer la boîte de dialogue de modification
  const closeDialog2 = () => {
    // setChargerDeploiement(null);
    // setServeur("");
    // setDateDeploiement(null);
    // setSelectedOption("def");
    setOpen2(false);
  };
  // Index de la dernière Deploiement à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage;
  // Index de la première Deploiement à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage;
  /**
   * Liste des déploiements actuellement filtrés et paginés en fonction du terme de recherche et des index de pagination.
   */
  const currentUEs = listDeploiement
    .filter(
      (dep) =>
        // Filtrer les déploiements en fonction du terme de recherche, en comparant les différentes propriétés en minuscules
        dep.serveur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dep.application?.nom
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        dep.application?.version
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        dep.date_deploiement
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        dep.utilisateur?.prenom
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        dep.utilisateur?.nom?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstUE, indexOfLastUE);

  return (
    /**
     * Composant représentant une rangée dans une mise en page.
     * Ce composant organise les éléments enfants en une rangée horizontale.
     */
    <CRow>
      {/* /**
       * Conteneur avec une grille de disposition pour les éléments enfants.
       * @param {Object} props - Propriétés du conteneur.
       * @param {string} [props.className="d-grid gap-2 col-6 mx-auto"] - Classes CSS à appliquer au conteneur pour le positionnement et la mise en page.
       * @param {Object} [props.style={{ marginBottom: "10px" }}] - Styles CSS à appliquer au conteneur pour les propriétés de mise en page.
       */}
      <div
        className="d-grid gap-2 col-6 mx-auto"
        style={{ marginBottom: "10px" }}
      >
        <div className="text-center">
          {/* <Link to={"/maquette/dep/AjouterDeploiement"}> */}
          <CButton
            color="primary"
            style={{ fontWeight: "bold" }}
            onClick={openDialog}
          >
            Ajouter un Deploiement
          </CButton>
          {/* </Link> */}
          <Dialog open={open} onClose={closeDialog}>
            <DialogTitle> Ajout d'un Nouveau Deploiement </DialogTitle>
            <DialogContent>
              <Container>
                <br></br>
                <InputAdornment position="start">
                  <img
                    src={serveurIcon}
                    alt="Serveur"
                    style={{ width: "24px", height: "24px" }}
                  />
                  Application
                </InputAdornment>

                {/* <InputAdornment position="start">Application</InputAdornment> */}
                <br></br>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOption}
                  onChange={(event) => setSelectedOption(event.target.value)}
                  fullWidth
                >
                  <MenuItem value={"def"} disabled>
                    Selectionner une application
                  </MenuItem>
                  {listApplication.map((application) => (
                    <MenuItem key={application.nom} value={application.id}>
                      {application.nom} {application.version}
                    </MenuItem>
                  ))}
                </Select>
                <br></br>
                <TextField
                  id="serveur"
                  type="text"
                  // value={client.prenom}
                  label="Serveur"
                  name="serveur"
                  variant="filled"
                  fullWidth
                  margin="dense"
                  onChange={(event) => setServeur(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={serveurIcon}
                          alt="Serveur"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <br></br>
                <TextField
                  id="date"
                  type="date"
                  label="Date de Deploiement"
                  // value={client.mail}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={calendrier}
                          alt="Calendrier"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => setDateDeploiement(event.target.value)}
                />
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>
                <CancelSharpIcon color="error" />
              </Button>
              <Button onClick={ajouterDeploiement}>
                <CheckCircleOutlineIcon color="success" />
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={open2} onClose={closeDialog2}>
            <DialogTitle> Modification d'un Deploiement </DialogTitle>
            <DialogContent>
              <Container>
                <br></br>
                <InputAdornment position="start">
                  <img
                    src={serveurIcon}
                    alt="Serveur"
                    style={{ width: "24px", height: "24px" }}
                  />
                  Application
                </InputAdornment>

                {/* <InputAdornment position="start">Application</InputAdornment> */}
                <br></br>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedOption}
                  onChange={(event) => setSelectedOption(event.target.value)}
                  fullWidth
                >
                  <MenuItem value={"def"} disabled>
                    Selectionner une application
                  </MenuItem>
                  {listApplication.map((application) => (
                    <MenuItem key={application.nom} value={application.id}>
                      {application.nom} {application.version}
                    </MenuItem>
                  ))}
                </Select>
                <br></br>
                <TextField
                  id="serveur"
                  type="text"
                  value={serveur}
                  label="Serveur"
                  name="serveur"
                  variant="filled"
                  fullWidth
                  margin="dense"
                  onChange={(event) => setServeur(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={serveurIcon}
                          alt="Serveur"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <br></br>
                <TextField
                  id="date"
                  type="date"
                  label="Date de Deploiement"
                  value={extractDateOnly(dateDeploiement)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={calendrier}
                          alt="Calendrier"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => setDateDeploiement(event.target.value)}
                />
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog2}>
                <CancelSharpIcon color="error" />
              </Button>
              <Button onClick={modifierDeploiement}>
                <CheckCircleOutlineIcon color="success" />
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div>
              <div>
                <strong style={{ display: "block", textAlign: "center" }}>
                  <h2> Liste des {listDeploiement?.length} Deploiements</h2>
                </strong>
              </div>
              <CFormInput
                type="text"
                size="sm"
                placeholder="Rechercher Deploiement par serveur | application | utilisateur | Date de deploiement"
                aria-label="sm input example"
                onChange={handleSearchChange}
              />
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col" style={{ maxWidth: "0px" }}>
                    #
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: "200px" }} scope="col">
                    Application
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Serveur</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Date Deploiement
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Utisateur</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Operation
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentUEs.map((dep, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell style={{ width: "0px" }} scope="row">
                      {dep.id}
                    </CTableHeaderCell>
                    <CTableDataCell>
                      {dep?.application?.nom} {dep?.application?.version}
                    </CTableDataCell>
                    <CTableDataCell>{dep.serveur}</CTableDataCell>
                    <CTableDataCell>
                      {" "}
                      {extractDateOnly(dep.date_deploiement)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {dep.utilisateur?.prenom} {dep.utilisateur?.nom}
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      {dep.description?.length > 15
                        ? `${dep.description.substring(0, 15)}...`
                        : dep.description}
                    </CTableDataCell> */}
                    <CTableDataCell className="text-center">
                      {/* <Link to={`/maquette/dep/ModifierDeploiement/${dep.id}`}> */}
                      <CButton
                        color="primary"
                        onClick={() => openDialog2(dep.id)}
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        <EditIcon className="icon4" />
                      </CButton>
                      {/* </Link> */}
                      <CButton
                        color="danger"
                        onClick={() => onDelClick(dep.id)}
                      >
                        <DeleteIcon
                          style={{ color: "white" }}
                          className="icon3"
                        />
                        {/* <DeleteIcon className="icon3" /> */}
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CPopover
                        content={
                          <div>
                            <p>
                              <strong>Serveur: </strong> {dep.serveur}
                            </p>
                            <p>
                              <strong>Date deploiement : </strong>{" "}
                              {toDateFr(dep.date_deploiement)}
                            </p>
                            <p>
                              <strong>Application: </strong> <br />
                              <b>Nom & Version: </b>
                              {dep?.application.nom} {dep?.application.version}
                              <br />
                              <b>Editeur: </b>
                              {dep?.application.editeur}
                              <br />
                              <b>Fonctionnalite: </b>
                              {dep?.application.fonctionnalite}
                              <br />
                              <b>Categorie: </b>
                              {dep?.application.categorie} <br />
                              <b>Installe le : </b>
                              {toDateFr(dep?.application.dateInstallation)}{" "}
                            </p>
                            <p>
                              <strong>Utilisateur: </strong>{" "}
                              {dep?.utilisateur?.prenom} {dep?.utilisateur?.nom}
                            </p>
                          </div>
                        }
                        placement="right"
                        title={
                          <div>
                            <strong>{dep.serveur}</strong>
                          </div>
                        }
                        trigger="focus"
                      >
                        <CButton color="info">Detail</CButton>
                      </CPopover>
                    </CTableDataCell>
                  </CTableRow>
                ))}
                <CPagination align="end" aria-label="Page navigation example">
                  {currentPage === 1 ? (
                    <CPaginationItem disabled>Previous</CPaginationItem>
                  ) : (
                    <CPaginationItem onClick={() => handleChangePaginate(-200)}>
                      Previous
                    </CPaginationItem>
                  )}
                  {currentPage === 1 ? (
                    <CPaginationItem disabled>1</CPaginationItem>
                  ) : (
                    <CPaginationItem onClick={() => handleChangePaginate(1)}>
                      1
                    </CPaginationItem>
                  )}
                  {currentPage === lastPageNumber ? (
                    <CPaginationItem disabled>2</CPaginationItem>
                  ) : (
                    <CPaginationItem onClick={() => handleChangePaginate(2)}>
                      2
                    </CPaginationItem>
                  )}
                  {currentPage === lastPageNumber ? (
                    <CPaginationItem disabled>3</CPaginationItem>
                  ) : (
                    <CPaginationItem onClick={() => handleChangePaginate(3)}>
                      3
                    </CPaginationItem>
                  )}
                  {currentPage === lastPageNumber ? (
                    <CPaginationItem disabled>Fin</CPaginationItem>
                  ) : (
                    <CPaginationItem
                      onClick={() => handleChangePaginate(lastPageNumber)}
                    >
                      Fin
                    </CPaginationItem>
                  )}
                  {currentPage === lastPageNumber ? (
                    <CPaginationItem disabled>Next</CPaginationItem>
                  ) : (
                    <CPaginationItem onClick={() => handleChangePaginate(-100)}>
                      Next
                    </CPaginationItem>
                  )}
                </CPagination>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}