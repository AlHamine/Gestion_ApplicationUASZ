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
  // const [rapport, setRapport] = useState({})
  const [maquette, setMaquette] = useState(0);
  const [repartition, setRapartition] = useState(0);
  const [rapport, setRapport] = useState({});

  useEffect(() => {
    const fetchRapport = async () => {
      try {
        let newData = {};

        if (SERVER_URL !== "http://localhost:8080/") {
          const rapportResponse = await fetch(`${SERVER_URL}rapport`).then(
            (response) => response.json()
          );
          newData = { ...newData, ...rapportResponse };
        } else {
          const [maquetteResponse, repartitionResponse, emploiResponse] =
            await Promise.all([
              fetch(`${SERVER_URL}rapport/maquette`).then((response) =>
                response.json()
              ),
              fetch(`${SERVER_URL}repartition/rapport`).then((response) =>
                response.json()
              ),
              fetch(`${SERVER_URL}emploi/rapport`).then((response) =>
                response.json()
              ),
            ]);
          newData = {
            ...newData,
            ...maquetteResponse,
            ...repartitionResponse,
            ...emploiResponse,
          };
        }

        setRapport((prevState) => ({ ...prevState, ...newData }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRapport();
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
                {rapport.nbFormation} Applications
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
                {rapport.nbFiliere} Licences
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
                {rapport.nbEnseignant} Deploiements <br />
                {/* **{rapport.nbPER} PER <br />
                 **{rapport.nbVac} Vacataires <br /> */}
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