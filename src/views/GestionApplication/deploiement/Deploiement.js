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
} from "@coreui/react";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import DeleteIcon from '@mui/icons-material/Delete'
import { PersonAdd, Email, Lock } from "@mui/icons-material";
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
} from "@mui/material";
export default function Deploiement() {
  const [listDeploiement, setListDeploiement] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1); // La page courante
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchDeploiement();
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
  // Index de la dernière Deploiement à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage;
  // Index de la première Deploiement à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage;
  // Liste des Deploiement à afficher sur la page actuelle
  const currentUEs = listDeploiement
    .filter((dep) =>
      dep.serveur?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <DialogTitle> Nouveau Client </DialogTitle>
            <DialogContent>
              <Container>
                <TextField
                  id="nom"
                  label="Nom"
                  variant="outlined"
                  type="text"
                  fullWidth
                  onChange={(event) => setNom(event.target.value)}
                  // value={client.nom}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonAdd />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="prenom"
                  type="text"
                  // value={client.prenom}
                  label="Prénom"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={(event) => setPrenom(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonAdd />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="mail"
                  type="email"
                  label="Email"
                  // value={client.mail}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => setMail(event.target.value)}
                />
                <TextField
                  id="password"
                  label="Mot de passe"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  // value={client.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                  id="confirmPassword"
                  label="Confirmer Mot de passe"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  // value={client.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <TextField
                  id="file"
                  label="Fichier"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FileIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>
                <CancelSharpIcon color="error" />
              </Button>
              <Button
              // onClick={handleSubmit}
              >
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
                    <CTableDataCell>{dep?.application}</CTableDataCell>
                    <CTableDataCell>{dep.serveur}</CTableDataCell>
                    <CTableDataCell>
                      {" "}
                      {extractDateOnly(dep.date_deploiement)}
                    </CTableDataCell>
                    <CTableDataCell>{dep.utisateur}</CTableDataCell>
                    {/* <CTableDataCell>
                      {dep.description?.length > 15
                        ? `${dep.description.substring(0, 15)}...`
                        : dep.description}
                    </CTableDataCell> */}
                    <CTableDataCell className="text-center">
                      <Link to={`/maquette/dep/ModifierDeploiement/${dep.id}`}>
                        <CButton
                          color="primary"
                          style={{ fontWeight: "bold", marginRight: "5px" }}
                        >
                          <EditIcon className="icon4" />
                        </CButton>
                      </Link>
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
                      <Link to={`/maquette/dep/classeDetails/${dep.id}`}>
                        <CButton
                          color="info"
                          style={{
                            fontWeight: "bold",
                            marginRight: "5px",
                            marginLeft: "0px",
                          }}
                        >
                          Detail
                        </CButton>
                      </Link>
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
