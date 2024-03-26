import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CFormInput,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { SERVER_URL } from 'src/constantURL'
import { Link } from 'react-router-dom'
// import { DocsExample } from 'src/components'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Alert } from '@coreui/coreui'
export default function Repartition() {
  const [listRepartition, setListRepartition] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage] = useState(10) // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1) // La page courante
  const handleSearchChange = (libelle) => {
    setSearchTerm(libelle.target.value)
  }
  const lastPageNumber = Math.ceil(listRepartition.length / itemsPerPage)

  const handleChangePaginate = (value) => {
    if (value === -100) {
      setCurrentPage(currentPage + 1)
    } else if (value === -200) {
      setCurrentPage(currentPage - 1)
    } else setCurrentPage(value)
  }
  // Index de la dernière UE à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage
  // Index de la première UE à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage
  // Liste des UE à afficher sur la page actuelle
  const currentPER = listRepartition
    .filter(
      (ue) =>
        ue.enseignement.classe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignement.groupe?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignement.module?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignement.libelle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignement.semestre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignant.grade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignant.matricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignant.specialite?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ue.enseignant.prenom.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(indexOfFirstUE, indexOfLastUE)
  useEffect(() => {
    fetchRepartition()
  }, [])

  const fetchRepartition = () => {
    fetch(SERVER_URL + 'repartition/repartition')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => setListRepartition(data))
      .catch((error) => console.error('Error fetching Repartition:', error))
  }

  const onDelClick = (id) => {
    // console.log(typeof id)
    if (window.confirm('Are you sure to delete?')) {
      fetch(SERVER_URL + `repartition/repartition/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            // response.json().then((data = {}))
            alert('Repartition supprimée avec succès')
            if (SERVER_URL == 'http://localhost:8080/')
              fetch(SERVER_URL + `emploi/repartition/${id}`, { method: 'DELETE' }).then(
                (reponse) => {
                  if (reponse.ok) alert('Cote Slave aussi')
                },
              )
            fetchRepartition()
          } else {
            alert("Une erreur s'est produite lors de la suppression.")
          }
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <CRow>
      <div className="d-grid gap-2 col-6 mx-auto" style={{ marginBottom: '10px' }}>
        <div className="text-center">
          <Link to={'/repartition/repartition/AjouterRepartition'}>
            <CButton color="primary" style={{ fontWeight: 'bold' }}>
              Ajouter un Repartition
            </CButton>
          </Link>
        </div>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h3>Repartition des Unites d{"'"}Enseignement de la classe</h3>
            <CFormInput
              type="text"
              size="sm"
              placeholder="Rechercher Enseignant ou par Enseignant	Libelle	Classe	Module	Semestre"
              aria-label="sm input example"
              onChange={handleSearchChange}
            />
          </CCardHeader>
          <CCardBody>
            {/* <DocsExample href="components/table#table-head"> */}
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  {/* <CTableHeaderCell style={{ width: '0px' }}>#</CTableHeaderCell> */}
                  <CTableHeaderCell style={{ maxWidth: '100px' }} scope="col">
                    Intitulés
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Semestre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Credit</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Duree cours</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Enseignant</CTableHeaderCell>
                  <CTableHeaderCell scope="col">CM</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Responsable TD</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Responsable TP</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TD</CTableHeaderCell>
                  <CTableHeaderCell scope="col">TP</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Details</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentPER.map((Repartition, index) => (
                  <CTableRow key={index}>
                    {/* <CTableHeaderCell style={{ width: '0px' }}>{index + 1}</CTableHeaderCell> */}
                    <CTableDataCell style={{ maxWidth: '100px' }}>
                      {Repartition.enseignement.libelle_ue
                        ? Repartition.enseignement.libelle_ue
                        : Repartition.enseignement.module}
                    </CTableDataCell>
                    <CTableDataCell>{Repartition.enseignement.semestre}</CTableDataCell>

                    <CTableDataCell>
                      {Repartition.enseignement.credit_ue == 0
                        ? Repartition.enseignement.credit_ue
                        : 4}{' '}
                      {/* {Repartition.enseignement.groupe
                        ? ` - Groupe : ${Repartition.enseignement.groupe}`
                        : ''} */}
                    </CTableDataCell>
                    <CTableDataCell>
                      {Repartition.enseignement.dure == 0 ? Repartition.enseignement.dure : 36}{' '}
                    </CTableDataCell>
                    {/* <CTableDataCell>{Repartition.enseignement.groupe.libelle} </CTableDataCell> */}
                    {/* <CTableDataCell>{Repartition.enseignement.module}</CTableDataCell> */}
                    <CTableDataCell style={{ minWidth: '100px' }}>
                      {Repartition.enseignant.prenom} {Repartition.enseignant.nom}{' '}
                    </CTableDataCell>

                    <CTableDataCell>
                      {Repartition.enseignement.cm == 0 ? Repartition.enseignement.cm : 12}
                    </CTableDataCell>
                    <CTableDataCell style={{ minWidth: '100px' }}>
                      {Repartition.enseignant.prenom} {Repartition.enseignant.nom}{' '}
                    </CTableDataCell>
                    <CTableDataCell style={{ minWidth: '100px' }}>
                      {Repartition.enseignant.prenom} {Repartition.enseignant.nom}{' '}
                    </CTableDataCell>

                    <CTableDataCell>
                      {Repartition.enseignement.td == 0 ? Repartition.enseignement.td : '12'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {Repartition.enseignement.tp == 0 ? Repartition.enseignement.tp : 12}
                    </CTableDataCell>

                    {/* <CTableDataCell className="text-center">{Repartition.grade}</CTableDataCell> */}
                    <CTableDataCell className="text-center">
                      <Link to={`/repartition/repartition/ModifierRepartition/${Repartition.id}`}>
                        <CButton color="primary" style={{ fontWeight: 'bold', marginRight: '5px' }}>
                          <EditIcon className="icon4" />
                        </CButton>
                      </Link>
                      <CButton
                        style={{ color: 'white' }}
                        color="danger"
                        onClick={() => onDelClick(Repartition.id)}
                      >
                        <DeleteIcon className="icon3" />
                      </CButton>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CButton color="info">Detail</CButton>
                    </CTableDataCell> */}
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
                    <CPaginationItem onClick={() => handleChangePaginate(1)}>1</CPaginationItem>
                  )}
                  {currentPage === lastPageNumber ? (
                    <CPaginationItem disabled>2</CPaginationItem>
                  ) : (
                    <CPaginationItem onClick={() => handleChangePaginate(2)}>2</CPaginationItem>
                  )}
                  {currentPage === lastPageNumber ? (
                    <CPaginationItem disabled>3</CPaginationItem>
                  ) : (
                    <CPaginationItem onClick={() => handleChangePaginate(3)}>3</CPaginationItem>
                  )}
                  {currentPage === lastPageNumber ? (
                    <CPaginationItem disabled>Fin</CPaginationItem>
                  ) : (
                    <CPaginationItem onClick={() => handleChangePaginate(lastPageNumber)}>
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
            {/* </DocsExample> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
