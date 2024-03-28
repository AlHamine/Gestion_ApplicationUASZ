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
export default function Deploiement() {
  const [listDeploiement, setListDeploiement] = useState([]);
  const [listApplication, setListApplication] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1); // La page courante
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [serveur, setServeur] = useState("");
  const [dateDeploiement, setDateDeploiement] = useState("");
  const [chargerDeploiement, setChargerDeploiement] = useState(null);
  useEffect(() => {
    fetchDeploiement();
    fetchApplication();

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

  const handleSearchChange = (libelle) => {
    setSearchTerm(libelle.target.value);
  };
  const lastPageNumber = Math.ceil(listDeploiement.length / itemsPerPage);

  const handleChangePaginate = (value) => {
    if (value === -100) {
      setCurrentPage(currentPage + 1);
    } else if (value === -200) {
      setCurrentPage(currentPage - 1);
    } else setCurrentPage(value);
  };

  const [selectedOption, setSelectedOption] = useState("def");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const fetchDeploiement = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "deploiement", {
      headers: { Authorization: token },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Trier les ateliers par date de création en ordre décroissant
        // data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setListDeploiement(data);
      })
      .catch((error) => console.error("Error fetching Deploiement:", error));
  };
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
        // Trier les ateliers par date de création en ordre décroissant
        // data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setListApplication(data);
      })
      .catch((error) => console.error("Error fetching aPPLICATION:", error));
  };
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
  const ajouterDeploiement = () => {
    const token = sessionStorage.getItem("jwt");
    const donnee = {
      application: { id: selectedOption },
      date_deploiement: dateDeploiement,
      serveur: serveur,
      utilisateur: { id: sessionStorage.getItem("id") },
    };
    fetch(SERVER_URL + "deploiement", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(donnee),
    })
      .then((response) => {
        if (response.ok) {
          alert("Deploiement ajouter avec succes");
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };
  const modifierDeploiement = (id) => {
    const token = sessionStorage.getItem("jwt");
    const donnee = {
      id: chargerDeploiement.id,
      application: { id: selectedOption },
      date_deploiement: dateDeploiement,
      serveur: serveur,
      utilisateur: { id: sessionStorage.getItem("id") },
    };
    fetch(SERVER_URL + "deploiement/" + donnee.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(donnee),
    })
      .then((response) => {
        if (response.ok) {
          alert("Deploiement modifie avec succes");
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const onDelClick = (id) => {
    if (window.confirm("Are you sure to delete de Deploiement?")) {
      const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + `deploiement/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            fetchDeploiement();
          } else {
            alert("Une erreur s'est produite lors de la suppression.");
          }
        })
        .catch((err) => console.error(err));
    }
  };
  function extractDateOnly(dateTimeString) {
    // Vérifier si la chaîne est vide ou null
    if (!dateTimeString) {
      return null;
    }

    // Extraire la date uniquement
    const dateOnly = dateTimeString.substring(0, 10);

    return dateOnly;
  }
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
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
  // Liste des Deploiement à afficher sur la page actuelle
  const currentUEs = listDeploiement
    .filter(
      (dep) =>
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
    <CRow>
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
                              {dep.date_deploiement}
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
