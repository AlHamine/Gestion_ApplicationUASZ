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
// import DeleteIcon from '@mui/icons-material/Delete'
import { SERVER_URL } from "src/constantURL";
import { Link } from "react-router-dom";
import { maxWidth } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  Button,
  TextField,
  InputAdornment,
  Container,
} from "@mui/material";

/**
 * @gaye-00
 * Composant représentant la page d'affichage des applications.
 */
export default function Application() {
  // State pour stocker la liste des applications
  const [listApplication, setListApplication] = useState([]);
  // State pour gérer le terme de recherche
  const [searchTerm, setSearchTerm] = useState("");
  // Constante pour le nombre d'éléments par page
  const [itemsPerPage] = useState(10);
  // State pour gérer la page courante
  const [currentPage, setCurrentPage] = useState(1);
  // State pour gérer l'ouverture de l'alerte
  const [openAlert, setOpenAlert] = useState(false);
  // State pour stocker la liste des alertes d'expiration de licence
  const [listAppArt, setListAppArt] = useState([]);

  // Fonction pour fermer l'alerte
  const closeAlert = () => {
    setOpenAlert(false);
  };

  // Fonction pour vérifier l'expiration des licences
  function checkLicenseExpiry() {
    const currentDate = new Date();
    const newAlerts = [];

    listApplication.forEach((app) => {
      const expirationDate = new Date(app.licenceActuel?.date_Expiration);
      console.log(`La licence a expiré. ${expirationDate}`);

      // Comparaison de la date d'expiration avec la date actuelle
      if (expirationDate <= currentDate) {
        // Ajouter l'alerte à la liste si la licence est expirée
        newAlerts.push(`La licence pour ${app.nom} a expiré.`);
        openAlertFunction();
      } else if (expirationDate - currentDate < 15 * 24 * 60 * 60 * 1000) {
        const daysUntilExpiration = Math.ceil(
          (expirationDate - currentDate) / (24 * 60 * 60 * 1000)
        );
        // Ajouter l'alerte à la liste si la licence expire dans moins d'une semaine
        newAlerts.push(
          `Attention ! La licence pour ${app.nom} expire bientôt dans ${daysUntilExpiration} jours.`
        );
        setOpenAlert(true);
      }
    });
    setListAppArt(newAlerts);
  }

  // Fonction pour ouvrir l'alerte
  const openAlertFunction = () => {
    setOpenAlert(true);
  };

  // Effet pour récupérer la liste des applications lors du chargement du composant
  useEffect(() => {
    fetchApplication();
  }, []);

  // Effet pour vérifier l'expiration des licences à chaque mise à jour de la liste des applications
  useEffect(() => {
    checkLicenseExpiry();
  }, [listApplication]);

  // Fonction pour gérer le changement de terme de recherche
  const handleSearchChange = (libelle) => {
    setSearchTerm(libelle.target.value);
  };

  // Calcul du numéro de la dernière page
  const lastPageNumber = Math.ceil(listApplication.length / itemsPerPage);

  // Fonction pour gérer le changement de page
  const handleChangePaginate = (value) => {
    if (value === -100) {
      setCurrentPage(currentPage + 1);
    } else if (value === -200) {
      setCurrentPage(currentPage - 1);
    } else setCurrentPage(value);
  };

  // Fonction pour récupérer la liste des applications depuis le serveur
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
      .catch((error) => console.error("Error fetching Application:", error));
  };

  // Fonction pour supprimer une application
  const onDelClick = (id) => {
    if (window.confirm("Are you sure to delete de Application?")) {
      const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + `application/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            fetchApplication();
          } else {
            alert("Une erreur s'est produite lors de la suppression.");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // Fonction pour extraire uniquement la date d'une chaîne de date et heure
  function extractDateOnly(dateTimeString) {
    if (!dateTimeString) {
      return null;
    }
    const dateOnly = dateTimeString.substring(0, 10);
    return dateOnly;
  }

  // Index de la dernière Application à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage;
  // Index de la première Application à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage;
  // Liste des Application à afficher sur la page actuelle
  const currentApplications = listApplication
    .filter((application) =>
      application.nom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstUE, indexOfLastUE);

  return (
    <CRow>
      <Dialog
        open={openAlert}
        onClose={closeAlert}
        style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}
      >
        <DialogTitle
          style={{
            color: "#fff",
            fontSize: "24px",
            backgroundColor: "rgba(139, 0, 0, 0.5)",
            fontWeight: "bold",
          }}
        >
          Alert Expiration de Licence
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "rgba(139, 0, 0, 0.5)" }}>
          <Container style={{ backgroundColor: "rgba(139, 0, 0, 0.5)" }}>
            {listAppArt.map((alert, index) => (
              <div key={index}>
                <p
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {alert}
                </p>
              </div>
            ))}
            <p style={{ color: "#fff", fontSize: "16px" }}>
              Veuillez renouveler votre licence pour continuer à utiliser le
              produit.
            </p>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button className="btn btn-danger" onClick={closeAlert}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      <div
        className="d-grid gap-2 col-6 mx-auto"
        style={{ marginBottom: "10px" }}
      >
        <div className="text-center">
          <Link to={"/maquette/application/ajouterApplication"}>
            <CButton color="primary" style={{ fontWeight: "bold" }}>
              Ajouter un Application
            </CButton>
          </Link>
        </div>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div>
              <div>
                <strong style={{ display: "block", textAlign: "center" }}>
                  <h2> Liste des {listApplication?.length} Applications </h2>
                </strong>
              </div>
              <CFormInput
                type="text"
                size="sm"
                placeholder="Rechercher Application par nom | version"
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
                    Nom
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Version</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Fonctionnalite
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Editeur</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Operation
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentApplications.map((application, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell style={{ width: "0px" }} scope="row">
                      {application.id}
                    </CTableHeaderCell>
                    <CTableDataCell>{application?.nom}</CTableDataCell>
                    <CTableDataCell>{application.version}</CTableDataCell>
                    <CTableDataCell>
                      {application.fonctionnalite}
                    </CTableDataCell>
                    <CTableDataCell>{application.editeur}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link
                        to={`/maquette/application/modifierApplication/${application.id}`}
                      >
                        <CButton
                          color="primary"
                          style={{ fontWeight: "bold", marginRight: "5px" }}
                        >
                          <EditIcon className="icon4" />
                        </CButton>
                      </Link>
                      <CButton
                        color="danger"
                        onClick={() => onDelClick(application.id)}
                      >
                        <DeleteIcon
                          style={{ color: "white" }}
                          className="icon3"
                        />
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CPopover
                        content={
                          <div>
                            <p>
                              <strong>Editeur: </strong> {application.editeur}
                            </p>
                            <p>
                              <strong>Version: </strong> {application.version}
                            </p>
                            <p>
                              <strong>Fonctionnalite: </strong>{" "}
                              {application.fonctionnalite}
                            </p>
                            <p>
                              <strong>Categorie:</strong>{" "}
                              {application.categorie}
                            </p>
                            <p>
                              <strong>Date installation:</strong>{" "}
                              {application.dateInstallation}
                            </p>
                            <p>
                              <strong>Cout installation:</strong>{" "}
                              {application.coutInstallation} $
                            </p>
                          </div>
                        }
                        placement="right"
                        title={
                          <div>
                            <strong>{application.nom}</strong>
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
