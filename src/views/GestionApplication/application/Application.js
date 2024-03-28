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

export default function Application() {
  const [listApplication, setListApplication] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10); // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1); // La page courante

  useEffect(() => {
    fetchApplication();
    // console.log(listApplication);
  }, []);

  const handleSearchChange = (libelle) => {
    setSearchTerm(libelle.target.value);
  };
  const lastPageNumber = Math.ceil(listApplication.length / itemsPerPage);

  const handleChangePaginate = (value) => {
    if (value === -100) {
      setCurrentPage(currentPage + 1);
    } else if (value === -200) {
      setCurrentPage(currentPage - 1);
    } else setCurrentPage(value);
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
      .catch((error) => console.error("Error fetching Application:", error));
  };

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
  function extractDateOnly(dateTimeString) {
    // Vérifier si la chaîne est vide ou null
    if (!dateTimeString) {
      return null;
    }

    // Extraire la date uniquement
    const dateOnly = dateTimeString.substring(0, 10);

    return dateOnly;
  }

  // Index de la dernière Application à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage;
  // Index de la première Application à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage;
  // Liste des Application à afficher sur la page actuelle
  //   const currentUEs = listApplication
  //     .filter((application) =>
  //       application.serveur?.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //     .slice(indexOfFirstUE, indexOfLastUE);

  const currentApplications = listApplication
    .filter((application) =>
      application.nom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstUE, indexOfLastUE);

  return (
    <CRow>
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
