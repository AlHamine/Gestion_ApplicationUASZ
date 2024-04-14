import React, { useEffect, useState } from "react";
import {
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
import serveurIcon from "../deploiement/icons8-server-24.png";
import calendrier from "../deploiement/icons8-calendar-12-24.png";
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
/**
 * @Diagne14
 * Composant représentant la page d'affichage des applications.
 */
export default function Licence() {
  // Initialisation des états du composant
  const [listLicence, setListLicence] = useState([]);
  const [listApplication, setListApplication] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1); // La page courante
  const [open, setOpen] = useState(false); // Etat de la boîte de dialogue pour l'ajout de licence

  const [open2, setOpen2] = useState(false); // Etat de la boîte de dialogue pour la modification de licence
  const [serveur, setServeur] = useState(""); // Serveur sélectionné
  const [dateLicence, setDateLicence] = useState(""); // Date de la licence sélectionnée
  const [chargerLicence, setChargerLicence] = useState(null); // Licence sélectionnée à modifier

  // Effet de chargement initial pour récupérer les données des licences et des applications
  useEffect(() => {
    fetchLicence();
    fetchApplication();
  }, []);

  // Fonction pour gérer le changement de terme de recherche
  const handleSearchChange = (libelle) => {
    setSearchTerm(libelle.target.value);
  };

  // Calcul du nombre total de pages pour la pagination
  const lastPageNumber = Math.ceil(listLicence.length / itemsPerPage);

  // Fonction pour gérer le changement de page
  const handleChangePaginate = (value) => {
    if (value === -100) {
      setCurrentPage(currentPage + 1);
    } else if (value === -200) {
      setCurrentPage(currentPage - 1);
    } else setCurrentPage(value);
  };

  // Initialisation de l'option sélectionnée dans le formulaire
  const [selectedOption, setSelectedOption] = useState("def");

  // Fonction pour gérer le changement de sélection dans le formulaire
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Fonction pour récupérer les données des licences depuis le serveur
  const fetchLicence = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "licence", {
      headers: { Authorization: token },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setListLicence(data);
      })
      .catch((error) => console.error("Error fetching Licence:", error));
  };

  // Fonction pour récupérer les données des applications depuis le serveur
  const fetchApplication = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "application", {
      headers: { Authorization: token },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setListApplication(data);
      })
      .catch((error) => console.error("Error fetching APPLICATION:", error));
  };

  // Fonction pour formater la date en français
  function toDateFr(dateISO) {
    var dateObj = new Date(dateISO);
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
    var dateFrancaise = dateObj.toLocaleString("fr-FR", options);
    return dateFrancaise;
  }

  // Fonction pour ajouter une licence
  const ajouterLicence = () => {
    const token = sessionStorage.getItem("jwt");
    const donnee = {
      application: { id: selectedOption },
      date_Licence: dateLicence,
      serveur: serveur,
      utilisateur: { id: sessionStorage.getItem("id") },
    };
    fetch(SERVER_URL + "licence", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(donnee),
    })
      .then((response) => {
        if (response.ok) {
          alert("Licence ajoutée avec succès");
          window.location.reload();
        } else {
          alert("Une erreur s'est produite");
        }
      })
      .catch((err) => console.error(err));
  };

  // Fonction pour modifier une licence
  const modifierLicence = (id) => {
    const token = sessionStorage.getItem("jwt");
    const donnee = {
      id: chargerLicence.id,
      application: { id: selectedOption },
      date_Licence: dateLicence,
      serveur: serveur,
      utilisateur: { id: sessionStorage.getItem("id") },
    };
    fetch(SERVER_URL + "licence/" + donnee.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(donnee),
    })
      .then((response) => {
        if (response.ok) {
          alert("Licence modifiée avec succès");
          window.location.reload();
        } else {
          alert("Une erreur s'est produite");
        }
      })
      .catch((err) => console.error(err));
  };
  // Fonction pour supprimer une licence
  const onDelClick = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer la licence ?")) {
      const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + `Licence/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            fetchLicence();
          } else {
            alert("Une erreur s'est produite lors de la suppression.");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // Fonction pour extraire la date uniquement
  function extractDateOnly(dateTimeString) {
    if (!dateTimeString) {
      return null;
    }
    const dateOnly = dateTimeString.substring(0, 10);
    return dateOnly;
  }

  // Fonction pour ouvrir la boîte de dialogue d'ajout de licence
  const openDialog = () => {
    setOpen(true);
  };

  // Fonction pour fermer la boîte de dialogue d'ajout de licence
  const closeDialog = () => {
    setOpen(false);
  };

  // Fonction pour ouvrir la boîte de dialogue de modification de licence
  const openDialog2 = (id) => {
    const selectedLicence = listLicence.find((d) => d.id === id);
    setChargerLicence((prev) => selectedLicence);
    setSelectedOption((prev) => selectedLicence?.application?.id);
    setServeur((prev) => selectedLicence?.serveur);
    setDateLicence((prev) => selectedLicence?.date_Licence);
    setOpen2(true);
  };

  // Fonction pour fermer la boîte de dialogue de modification de licence
  const closeDialog2 = () => {
    setOpen2(false);
  };

  // Calcul de l'index de la dernière licence à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage;
  // Calcul de l'index de la première licence à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage;
  // Liste des licences à afficher sur la page actuelle
  const currentUEs = listLicence
    .filter(
      (licenceActuel) =>
        licenceActuel.serveur
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        licenceActuel.application?.nom
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        licenceActuel.application?.version
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        licenceActuel.date_Expiration
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        licenceActuel.utilisateur?.prenom
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        licenceActuel.utilisateur?.nom
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstUE, indexOfLastUE);

  // Fonction pour convertir la date en format français
  function convertirDateFrancais(dateStr) {
    var dateObj = new Date(dateStr);
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    var dateFrancaise = dateObj.toLocaleString("fr-FR", options);
    return dateFrancaise;
  }
  return (
    <CRow>
      <div
        className="d-grid gap-2 col-6 mx-auto"
        style={{ marginBottom: "10px" }}
      >
        <div className="text-center">
          {/* <Link to={"/maquette/licenceActuel/AjouterLicence"}> */}
          <CButton
            color="primary"
            style={{ fontWeight: "bold" }}
            onClick={openDialog}
          >
            Ajouter un Licence
          </CButton>
          {/* </Link> */}
          <Dialog open={open} onClose={closeDialog}>
            <DialogTitle> Ajout d'un Nouveau Licence </DialogTitle>
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
                  label="Date de Licence"
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
                  onChange={(event) => setDateLicence(event.target.value)}
                />
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>
                <CancelSharpIcon color="error" />
              </Button>
              <Button onClick={ajouterLicence}>
                <CheckCircleOutlineIcon color="success" />
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={open2} onClose={closeDialog2}>
            <DialogTitle> Modification d'un Licence </DialogTitle>
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
                  label="Date de Licence"
                  value={convertirDateFrancais(dateLicence)}
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
                  onChange={(event) => setDateLicence(event.target.value)}
                />
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog2}>
                <CancelSharpIcon color="error" />
              </Button>
              <Button onClick={modifierLicence}>
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
                  <h2> Liste des {listLicence.length} Licences</h2>
                </strong>
              </div>
              <CFormInput
                type="text"
                size="sm"
                placeholder="Rechercher Licence par Type | application | Date de Creation | Date de Licence"
                aria-label="sm input example"
                onChange={handleSearchChange}
              />
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  {/* <CTableHeaderCell scope="col" style={{ maxWidth: "4px" }}>
                    #
                  </CTableHeaderCell> */}

                  <CTableHeaderCell style={{ maxWidth: "50px" }} scope="col">
                    Type
                  </CTableHeaderCell>

                  <CTableHeaderCell style={{ maxWidth: "100px" }} scope="col">
                    Date_Expiration
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Serveur</CTableHeaderCell> */}
                  <CTableHeaderCell style={{ maxWidth: "90px" }} scope="col">
                    Cout(francs cfa)
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ maxWidth: "100px" }} scope="col">
                    Paiement
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col">
                    Nbre_Utilisateur
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Application</CTableHeaderCell>

                  <CTableHeaderCell scope="col" className="text-center">
                    Operation
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentUEs.map((licenceActuel, index) => (
                  <CTableRow key={index} style={{ padding: "0rem 0rem" }}>
                    {/* <CTableHeaderCell style={{ width: "0px" }} scope="row">
                      {licenceActuel.id}
                    </CTableHeaderCell> */}
                    <CTableDataCell>{licenceActuel?.type}</CTableDataCell>
                    <CTableDataCell>
                      {convertirDateFrancais(licenceActuel.date_Expiration)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {licenceActuel.cout_Licence}
                    </CTableDataCell>
                    <CTableDataCell>
                      {licenceActuel.methode_Paiement}
                    </CTableDataCell>
                    <CTableDataCell>
                      {licenceActuel.nbre_Utilisateur}
                    </CTableDataCell>
                    <CTableDataCell>
                      {licenceActuel?.application?.nom} version{" "}
                      {licenceActuel?.application?.version}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {/* <Link to={`/maquette/licenceActuel/ModifierLicence/${licenceActuel.id}`}> */}
                      <CButton
                        color="primary"
                        onClick={() => openDialog2(licenceActuel.id)}
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        <EditIcon className="icon4" />
                      </CButton>
                      {/* </Link> */}
                      <CButton
                        color="danger"
                        onClick={() => onDelClick(licenceActuel.id)}
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
                              <strong>Application: </strong> <br />
                              <b>Nom & Version: </b>
                              {licenceActuel?.application.nom}{" "}
                              {licenceActuel?.application.version}
                              <br />
                              <b>Editeur: </b>
                              {licenceActuel?.application.editeur}
                              <br />
                              <b>Fonctionnalite: </b>
                              {licenceActuel?.application.fonctionnalite}
                              <br />
                              <b>Categorie: </b>
                              {licenceActuel?.application.categorie} <br />
                              <b>Installe le : </b>
                              {toDateFr(
                                licenceActuel?.application.dateInstallation
                              )}{" "}
                            </p>
                            <p>
                              <strong>Utilisateur: </strong>{" "}
                              {licenceActuel?.application.utilisateur?.prenom}{" "}
                              {licenceActuel?.application.utilisateur?.nom}
                            </p>
                          </div>
                        }
                        placement="right"
                        title={
                          <div>
                            <strong>{licenceActuel.serveur}</strong>
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
