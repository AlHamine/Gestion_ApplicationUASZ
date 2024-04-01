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
export default function Rapport() {
  const [listRapport, setListRapport] = useState([]);
  // const [listApplication, setListApplication] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1); // La page courante
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [serveur, setServeur] = useState("");
  const [dateRapport, setDateRapport] = useState("");
  const [chargerRapport, setChargerRapport] = useState(null);
  useEffect(() => {
    fetchRapport();
  }, []);

  const handleSearchChange = (libelle) => {
    setSearchTerm(libelle.target.value);
  };
  const lastPageNumber = Math.ceil(listRapport.length / itemsPerPage);

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
  const fetchRapport = () => {
    const token = sessionStorage.getItem("jwt");
    fetch(SERVER_URL + "rapport", {
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
        setListRapport(data);
      })
      .catch((error) => console.error("Error fetching Rapport:", error));
  };
  // const fetchApplication = () => {
  //   const token = sessionStorage.getItem("jwt");
  //   fetch(SERVER_URL + "application", {
  //     headers: { Authorization: token },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Trier les ateliers par date de création en ordre décroissant
  //       // data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //       setListApplication(data);
  //     })
  //     .catch((error) => console.error("Error fetching aPPLICATION:", error));
  // };
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
  const ajouterRapport = () => {
    const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL + "rapport", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      // body: JSON.stringify(donnee),
    })
      .then((response) => {
        if (response.ok) {
          alert("Rapport ajouter avec succes");
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };
  const modifierRapport = (id) => {
    const token = sessionStorage.getItem("jwt");
    const donnee = {
      id: chargerRapport.id,
      application: { id: selectedOption },
      date_rapport: dateRapport,
      serveur: serveur,
      utilisateur: { id: sessionStorage.getItem("id") },
    };
    fetch(SERVER_URL + "rapport/" + donnee.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(donnee),
    })
      .then((response) => {
        if (response.ok) {
          alert("Rapport modifie avec succes");
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.error(err));
  };

  const onDelClick = (id) => {
    if (window.confirm("Are you sure to delete de Rapport?")) {
      const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + `rapport/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            fetchRapport();
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
    const selectedRapport = listRapport.find((d) => d.id === id);

    // Mettre à jour les états avec les détails du déploiement sélectionné
    setChargerRapport((prev) => selectedRapport);
    setSelectedOption((prev) => selectedRapport?.application?.id);
    setServeur((prev) => selectedRapport?.serveur);
    setDateRapport((prev) => selectedRapport?.date_rapport);

    // Ouvrir la boîte de dialogue
    setOpen2(true);
  };

  const closeDialog2 = () => {
    // setChargerRapport(null);
    // setServeur("");
    // setDateRapport(null);
    // setSelectedOption("def");
    setOpen2(false);
  };
  // Index de la dernière Rapport à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage;
  // Index de la première Rapport à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage;
  // Liste des Rapport à afficher sur la page actuelle
  const currentUEs = listRapport
    .filter((dep) => dep.date?.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstUE, indexOfLastUE);
  function convertirDateFrancais(dateStr) {
    // Découper la date en parties
    const [annee, mois, jour] = dateStr.split("-");

    // Obtenir les noms des mois en français
    const moisEnFrancais = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    // Convertir le mois en nombre
    const moisNum = parseInt(mois) - 1;

    // Formater la date en français
    const dateFr = `${jour} ${moisEnFrancais[moisNum]} ${annee}`;

    // Retourner la date formatée
    return dateFr;
  }

  return (
    <CRow>
      <div
        className="d-grid gap-2 col-6 mx-auto"
        style={{ marginBottom: "10px" }}
      >
        <div className="text-center">
          {/* <Link to={"/maquette/dep/AjouterRapport"}> */}
          <CButton
            color="primary"
            style={{ fontWeight: "bold" }}
            onClick={ajouterRapport}
          >
            Ajouter un Rapport
          </CButton>
        </div>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div>
              <div>
                <strong style={{ display: "block", textAlign: "center" }}>
                  <h2> Liste des {listRapport?.length} Rapports</h2>
                </strong>
              </div>
              <CFormInput
                type="text"
                size="sm"
                placeholder="Rechercher Rapport par serveur | application | utilisateur | Date de rapport"
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
                    Nombre d'Applications
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Nombre d'Applications Gratuites
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Nombre de Licence
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Nombre de Deploiement
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Date du Rapport
                  </CTableHeaderCell>
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
                    <CTableDataCell>{dep?.nbApplication}</CTableDataCell>
                    <CTableDataCell>{dep.nbApplicationGratuite}</CTableDataCell>
                    <CTableDataCell>{dep.nbLicence}</CTableDataCell>

                    <CTableDataCell> {dep.nbDeploiement}</CTableDataCell>

                    <CTableDataCell>
                      {convertirDateFrancais(dep.date)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {/* <Link to={`/maquette/dep/ModifierRapport/${dep.id}`}> */}
                      {/* <CButton
                        color="primary"
                        onClick={() => openDialog2(dep.id)}
                        style={{ fontWeight: "bold", marginRight: "5px" }}
                      >
                        <EditIcon className="icon4" />
                      </CButton> */}
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
                              <strong>Rapport: </strong> {dep.serveur}
                            </p>
                            <p>
                              <strong>Date rapport : </strong>{" "}
                              {convertirDateFrancais(dep.date)}
                            </p>
                            {/* <p>
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
                            </p> */}
                            {/* <p>
                              <strong>Utilisateur: </strong>{" "}
                              {dep?.utilisateur?.prenom} {dep?.utilisateur?.nom}
                            </p> */}
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
