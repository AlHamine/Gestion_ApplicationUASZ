import React, { useEffect, useState } from 'react'
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
} from '@coreui/react'
import { SERVER_URL } from 'src/constantURL'
import { Link, useParams } from 'react-router-dom'

export default function DetailsGroupe() {
  const { id } = useParams()
  const [listEnseignement, setListEnseignement] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage] = useState(10) // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1) // La page courante
  const [infobehind, setInfobehind] = useState({})

  const fetchInfobehind = () => {
    fetch(SERVER_URL + `maquette/enseignement/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setInfobehind(data)
      })
      .catch((error) => console.error('Error fetching Groupe:', error))
  }

  useEffect(() => {
    fetchEnseignement()
    fetchInfobehind()
  }, [])

  const handleSearchChange = (libelle) => {
    setSearchTerm(libelle.target.value)
  }
  const lastPageNumber = Math.ceil(listEnseignement.length / itemsPerPage)

  const handleChangePaginate = (value) => {
    if (value === -100) {
      setCurrentPage(currentPage + 1)
    } else if (value === -200) {
      setCurrentPage(currentPage - 1)
    } else setCurrentPage(value)
  }

  const fetchEnseignement = () => {
    fetch(SERVER_URL + `maquette/groupeDetailsEnseignement/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setListEnseignement(data)
      })
      .catch((error) => console.error('Error fetching Enseignement:', error))
  }

  const onDelClick = (id) => {
    if (window.confirm('Are you sure to delete the Enseignement?')) {
      fetch(SERVER_URL + `maquette/enseignement/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            fetchEnseignement()
          } else {
            alert("Une erreur s'est produite lors de la suppression.")
          }
        })
        .catch((err) => console.error(err))
    }
  }

  // Index de la dernière Enseignement à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage
  // Index de la première Enseignement à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage
  // Liste des Enseignement à afficher sur la page actuelle
  const currentEnseignement = listEnseignement
    .filter((enseignement) => enseignement.libelle.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstUE, indexOfLastUE)

  return (
    <CRow>
      <div className="d-grid gap-2 col-6 mx-auto" style={{ marginBottom: '10px' }}>
        <div className="text-center">
          <Link to={'/maquette/enseignement/AjouterEnseignement'}>
            <CButton color="primary" style={{ fontWeight: 'bold' }}>
              Ajouter un Enseignement
            </CButton>
          </Link>
        </div>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div>
              <div>
                <strong style={{ display: 'block', textAlign: 'center' }}>
                  Liste des Enseignements
                </strong>
                <h2>
                  Libelle : {infobehind?.libelle}, Description : {infobehind?.description}{' '}
                </h2>
              </div>
              <CFormInput
                type="text"
                size="sm"
                placeholder="Rechercher Enseignement par libelle"
                aria-label="sm input example"
                onChange={handleSearchChange}
              />
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Libelle</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Operation
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentEnseignement.map((enseignement, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row"> {enseignement.id} </CTableHeaderCell>
                    <CTableDataCell>
                      {enseignement.libelle.length > 15
                        ? `${enseignement.libelle.substring(0, 15)}...`
                        : enseignement.libelle}
                    </CTableDataCell>
                    <CTableDataCell>
                      {enseignement.description.length > 15
                        ? `${enseignement.description.substring(0, 15)}...`
                        : enseignement.description}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/maquette/enseignement/ModifierEnseignement/${enseignement.id}`}>
                        <CButton color="primary" style={{ fontWeight: 'bold', marginRight: '5px' }}>
                          Modifier
                        </CButton>
                      </Link>
                      <CButton color="danger" onClick={() => onDelClick(enseignement.id)}>
                        Supprimer
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      {/* <Link to={`/maquette/enseignement/${enseignement.id}/UEDetailsEC`}>
                        <CButton
                          color="info"
                          style={{ fontWeight: 'bold', marginRight: '5px', marginLeft: '0px' }}
                        >
                          Detail
                        </CButton>
                      </Link> */}
                      <CPopover
                        content={
                          <div>
                            <p>
                              <strong>Libellé: </strong> {enseignement.libelle}
                            </p>
                            <p>
                              <strong>Description: </strong> {enseignement.description}
                            </p>
                            <p>
                              <strong>Date:</strong> {enseignement.createdAt}
                            </p>
                          </div>
                        }
                        placement="right"
                        title={
                          <div>
                            <strong>{enseignement.libelle}</strong>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}