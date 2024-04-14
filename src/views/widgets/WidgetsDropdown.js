import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from "@coreui/react";
import { getStyle } from "@coreui/utils";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";
import { SERVER_URL } from "src/constantURL";
import { Link } from "react-router-dom";
const WidgetsDropdown = () => {
  const [rapport, setRapport] = useState({});

  useEffect(() => {
    const fetchRapport = () => {
      // Récupérer le jeton d'authentification depuis le stockage de session
      const token = sessionStorage.getItem("jwt");

      // Effectuer une requête GET vers l'URL du serveur + "rapport/last"
      fetch(SERVER_URL + "rapport/last", {
        headers: { Authorization: token }, // Inclure le jeton d'authentification dans les en-têtes
      })
        .then((response) => {
          // Vérifier si la réponse du serveur est réussie (200 OK)
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Convertir la réponse en JSON
          return response.json();
        })
        .then((data) => {
          // Mettre à jour le state 'rapport' avec les données récupérées
          setRapport(data);
        })
        .catch((error) => {
          // Gérer les erreurs survenues lors de la requête ou du traitement des données
          console.error("Error fetching Rapport:", error);
        });
    };
    fetchRapport(); // Appeler la fonction fetchRapport une seule fois lors du montage du composant
  }, []);

  return (
    <>
      <CRow>
        <CCol sm={6}>
          <CWidgetStatsA
            className="mb-4"
            color="success"
            value={
              <>
                {rapport.nbApplication} Applications **
                {rapport.nbApplicationPayante} gratuites <br />
                **{rapport.nbLicence} payantes <br />
                {/* <span className="fs-6 fw-normal">
              (-12.4% <CIcon icon={cilArrowBottom} />)
            </span> */}
              </>
            }
            title="Application(s)"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  <CIcon
                    icon={cilOptions}
                    className="text-high-emphasis-inverse"
                  />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                    <Link to={`/application`}>Voir</Link>
                  </CDropdownItem>
                  <CDropdownItem disabled>Application</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: getStyle("--cui-primary"),
                      data: [65, 59, 84, 84, 51, 55, 40],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={
              <>
                {rapport.nbLicence} Licences
                {/* <span className="fs-6 fw-normal">
              (40.9% <CIcon icon={cilArrowTop} />)
            </span> */}
              </>
            }
            title="Licence(s)"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle
                  color="transparent"
                  caret={false}
                  className="p-0"
                >
                  <CIcon
                    icon={cilOptions}
                    className="text-high-emphasis-inverse"
                  />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                    <Link to={`/licence`}>Voir ... </Link>
                  </CDropdownItem>
                  <CDropdownItem disabled>....</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      pointBackgroundColor: getStyle("--cui-info"),
                      data: [1, 18, 9, 17, 34, 22, 11],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={12}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={
              <>
                {rapport.nbDeploiement} Deploiements <br />
              </>
            }
            title="Deploiement(s)"
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="green" caret={false} className="p-0">
                  <CIcon
                    icon={cilOptions}
                    className="text-high-emphasis-inverse"
                  />
                </CDropdownToggle>
                <CDropdownMenu>
                  <Link to={`/deploiement`}>
                    <CDropdownItem>Voir ...</CDropdownItem>
                  </Link>
                  <CDropdownItem disabled>+</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: "70px" }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
      </CRow>
    </>
  );
};

export default WidgetsDropdown;
