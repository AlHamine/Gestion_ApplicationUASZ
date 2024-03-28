import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  // CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CPagination,
  CPaginationItem,
  CFormInput,
} from '@coreui/react'
import { SERVER_URL } from 'src/constantURL'
import { Link, useParams } from 'react-router-dom'
// import { cilZoom } from '@coreui/icons'

export default function UEDetails() {
  const { id } = useParams()
  const [listEC, setListEC] = useState([])
  const [listModule, setListModule] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage] = useState(10) // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1) // La page courante
  const [infobehind, setInfobehind] = useState({})

  const fetchInfobehind = () => {
    fetch(SERVER_URL + `maquette/ue/${id}`)
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
    fetchInfobehind()
  }, [])

  useEffect(() => {
    fetchEC()
    fetchModule()
  }, [])

  const handleSearchChange = (libelle) => {
    setSearchTerm(libelle.target.value)
  }
  const lastPageNumber = Math.ceil(listEC.length / itemsPerPage)

  const handleChangePaginate = (value) => {
    if (value === -100) {
      setCurrentPage(currentPage + 1)
    } else if (value === -200) {
      setCurrentPage(currentPage - 1)
    } else setCurrentPage(value)
  }

  const fetchEC = () => {
    fetch(SERVER_URL + `maquette/uedetailsEC/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setListEC(data)
      })
      .catch((error) => console.error('Error fetching EC details for UE:', error))
  }

  const fetchModule = () => {
    fetch(SERVER_URL + `maquette/uedetailsModule/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        setListModule(data)
      })
      .catch((error) => console.error('Error fetching Module details for UE', error))
  }

  const onDelClickEC = (id) => {
    if (window.confirm('Are you sure to delete the EC?')) {
      fetch(SERVER_URL + `maquette/ec/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            fetchEC()
          } else {
            alert("Une erreur s'est produite lors de la suppression du EC.")
          }
        })
        .catch((err) => console.error(err))
    }
  }

  const onDelClickModule = (id) => {
    if (window.confirm('Are you sure to delete the Module?')) {
      fetch(SERVER_URL + `maquette/module/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            fetchModule()
          } else {
            alert("Une erreur s'est produite lors de la suppression du Module.")
          }
        })
        .catch((err) => console.error(err))
    }
  }

  // Index de la dernière EC à afficher sur la page
  const indexOfLastUE = currentPage * itemsPerPage
  // Index de la première EC à afficher sur la page
  const indexOfFirstUE = indexOfLastUE - itemsPerPage
  // Liste des EC à afficher sur la page actuelle
  const currentECs = listEC
    .filter((ec) => ec.libelle.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstUE, indexOfLastUE)

  return (
    <div>
      <CRow>
        <div className="d-grid gap-2 col-6 mx-auto" style={{ marginBottom: '10px' }}>
          <div className="text-center">
            <Link to={'/maquette/ec/AjouterUE'}>
              <CButton color="primary" style={{ fontWeight: 'bold' }}>
                Ajouter un EC
              </CButton>
            </Link>
          </div>
        </div>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div>
                <div>
                  <strong style={{ display: 'block', textAlign: 'center' }}>Liste des EC</strong>
                  <h2>
                    UE : {infobehind?.libelle}, Description : {infobehind?.description}{' '}
                  </h2>
                </div>

                <CFormInput
                  type="text"
                  size="sm"
                  placeholder="Rechercher EC par libelle"
                  aria-label="sm input example"
                  // icon={cilZoom}
                  onChange={handleSearchChange}
                />
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Libelle</CTableHeaderCell>
                    <CTableHeaderCell scope="col">CM</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TD</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TPE</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Coefficient</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Operation
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentECs.map((ec, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row"> {ec.id} </CTableHeaderCell>
                      <CTableDataCell>{ec.code}</CTableDataCell>
                      <CTableDataCell>
                        {ec.libelle.length > 15 ? `${ec.libelle.substring(0, 15)}...` : ec.libelle}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{ec.cm}</CTableDataCell>
                      <CTableDataCell className="text-center">{ec.td}</CTableDataCell>
                      <CTableDataCell className="text-center">{ec.tp}</CTableDataCell>
                      <CTableDataCell className="text-center">{ec.tpe}</CTableDataCell>
                      <CTableDataCell className="text-center">{ec.coefficient}</CTableDataCell>
                      <CTableDataCell className="text-center">{ec.description}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <Link to={`/maquette/ec/ModifierUE/${ec.id}`}>
                          <CButton
                            color="primary"
                            style={{ fontWeight: 'bold', marginRight: '5px' }}
                          >
                            Modifier
                          </CButton>
                        </Link>
                        <CButton color="danger" onClick={() => onDelClickEC(ec.id)}>
                          Supprimer
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        {/* <CButton color="info">Detail</CButton> */}
                        <Link to={`/maquette/ec/${ec.id}/UEDetailsEC`}>
                          <CButton
                            color="info"
                            style={{ fontWeight: 'bold', marginRight: '5px', marginLeft: '0px' }}
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
                    <CPaginationItem onClick={() => handleChangePaginate(1)}>1</CPaginationItem>
                    <CPaginationItem onClick={() => handleChangePaginate(2)}>2</CPaginationItem>
                    <CPaginationItem onClick={() => handleChangePaginate(3)}>3</CPaginationItem>
                    <CPaginationItem onClick={() => handleChangePaginate(lastPageNumber)}>
                      Fin
                    </CPaginationItem>
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

      <CRow>
        <div className="d-grid gap-2 col-6 mx-auto" style={{ marginBottom: '10px' }}>
          <div className="text-center">
            <Link to={'/maquette/module/AjouterModule'}>
              <CButton color="primary" style={{ fontWeight: 'bold' }}>
                Ajouter un Module
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
                    Liste des Module
                  </strong>
                </div>
                <CFormInput
                  type="text"
                  size="sm"
                  placeholder="Rechercher Module par nom"
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
                    <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
                    <CTableHeaderCell scope="col">UE</CTableHeaderCell>
                    <CTableHeaderCell scope="col">EC</CTableHeaderCell>
                    <CTableHeaderCell scope="col">MAQUETTE</CTableHeaderCell>
                    <CTableHeaderCell scope="col">SEMESTRE</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Operation
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {listModule.map((module, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row"> {module.id} </CTableHeaderCell>
                      <CTableDataCell>
                        {module.nom.length > 15 ? `${module.nom.substring(0, 15)}...` : module.nom}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {module.ue && module.ue.libelle}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {module.ec && module.ec.libelle}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {module.maquette && module.maquette.intitule}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {module.semestre && module.semestre.libelle}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <Link to={`/maquette/module/ModifierModule/${module.id}`}>
                          <CButton
                            color="primary"
                            style={{ fontWeight: 'bold', marginRight: '5px' }}
                          >
                            Modifier
                          </CButton>
                        </Link>
                        <CButton color="danger" onClick={() => onDelClickModule(module.id)}>
                          Supprimer
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <Link to={`/maquette/module/${module.id}/UEDetailsEC`}>
                          <CButton
                            color="info"
                            style={{ fontWeight: 'bold', marginRight: '5px', marginLeft: '0px' }}
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
    </div>
  )
}