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
} from '@coreui/react'
import { SERVER_URL } from 'src/constantURL'
import { Link } from 'react-router-dom'
// import { DocsExample } from 'src/components'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
export default function Seance() {
  const [listSeance, setListSeance] = useState([])

  useEffect(() => {
    fetchSeance()
  }, [])

  const fetchSeance = () => {
    fetch(SERVER_URL + 'emploi/seance')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => setListSeance(data))
      .catch((error) => console.error('Error fetching Seance:', error))
  }
  function extractHourAndMinute(dateString) {
    // Créer un objet Date à partir de la chaîne de caractères
    var dateObj = new Date(dateString)

    // Extraire l'heure et les minutes
    var heure = dateObj.getHours()
    var minute = dateObj.getMinutes()

    // Retourner un objet avec l'heure et les minutes
    return `${heure}h${minute} `
  }
  const onDelClick = (id) => {
    // console.log(typeof id)
    if (window.confirm('Are you sure to delete?')) {
      fetch(SERVER_URL + `emploi/seance/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            alert('Seance supprimer')
            fetchSeance()
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
          <Link to={'/emploiDuTemps/seance/AjouterSeance'}>
            <CButton color="primary" style={{ fontWeight: 'bold' }}>
              Ajouter un Seance
            </CButton>
          </Link>
        </div>
      </div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Liste </strong> <small>des Seance</small>
          </CCardHeader>
          <CCardBody>
            {/* <DocsExample href="components/table#table-head"> */}
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  {/* <CTableHeaderCell scope="col">#</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Enseignant</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Libelle</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Classe</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Module</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Semestre</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Batiment-Salle</CTableHeaderCell>
                  <CTableHeaderCell scope="col">HeureDebut</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Duree</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-center">
                    Operation
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Details</CTableHeaderCell> */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {listSeance.map((Seance, index) => (
                  <CTableRow key={index}>
                    {/* <CTableHeaderCell scope="row"> {index + 1} </CTableHeaderCell> */}
                    {/* <CTableDataCell>{Seance.numero}</CTableDataCell> */}
                    <CTableDataCell style={{ width: '6px' }}>
                      {Seance.prenom} {Seance.nom} {Seance.grade} en {Seance.specialite}
                    </CTableDataCell>
                    <CTableDataCell>{Seance.libelle}</CTableDataCell>
                    <CTableDataCell>
                      {Seance.classe} {Seance.groupe ? ` - Groupe : ${Seance.groupe}` : ''}
                    </CTableDataCell>
                    {/* <CTableDataCell>{Seance.enseignement.groupe.libelle} </CTableDataCell> */}
                    <CTableDataCell>{Seance.module}</CTableDataCell>
                    <CTableDataCell>{Seance.semestre}</CTableDataCell>

                    <CTableDataCell>
                      {Seance.salle.batimentNom}-{Seance.salle.numero}
                    </CTableDataCell>
                    <CTableDataCell>{Seance.heureDebut}</CTableDataCell>
                    <CTableDataCell>{Seance.dureee}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/emploiDuTemps/seance/ModifierSeance/${Seance.id}`}>
                        <CButton color="primary" style={{ fontWeight: 'bold', marginRight: '5px' }}>
                          <EditIcon className="icon4" />
                        </CButton>
                      </Link>
                      <CButton
                        style={{ color: 'white' }}
                        color="danger"
                        onClick={() => onDelClick(Seance.id)}
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
                  <CPaginationItem disabled>Previous</CPaginationItem>
                  <CPaginationItem>1</CPaginationItem>
                  <CPaginationItem>2</CPaginationItem>
                  <CPaginationItem>3</CPaginationItem>
                  <CPaginationItem>Next</CPaginationItem>
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
