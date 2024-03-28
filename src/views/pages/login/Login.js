import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import DefaultLayout from "src/layout/DefaultLayout";
import { SERVER_URL } from "src/constantURL";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // const [role, setRole] = useState("");
  const [isAuthenticated, setAuth] = useState(false);
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const [open, setOpen] = useState(false);
  // Fonction de rappel pour mettre à jour estAuthentifie dans le composant parent
  // const setEstAuthentifieCallback = (newValue) => {
  //   setAuth(newValue);
  //   // Mettez à jour estAuthentifie dans le composant parent
  //   setEstAuthentifie(newValue);
  // };

  // Lorsque isAuthenticated change, appelez la fonction de rappel
  // useEffect(() => {
  //   setEstAuthentifieCallback(isAuthenticated);
  // }, [isAuthenticated]);

  const login = () => {
    fetch(SERVER_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
         if (!res.ok) {
           throw new Error("Network response was not ok");
         }
        return res.json();
      })
      .then((data) => {
       
        // const jwtToken = res.headers.get("Authorization");
        // const r = res.json();
        const jwtToken = data.token;
        const id = data.userId;
        // console.log(r)
        if (jwtToken != null) {
          sessionStorage.setItem("jwt", jwtToken);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("prenom", data.prenom);
          sessionStorage.setItem("nom", data.nom);
          sessionStorage.setItem("isLoggedIn", true);
          // sessionStorage.setItem("idClient", user.idc);
          sessionStorage.setItem("UserMail", user.username);
          // const decodedToken = jwtDecode(jwtToken);
          // const role = decodedToken.role;
          // sessionStorage.setItem("role", role);
          // console.log(decodedToken);
          // console.log(decodedToken.role);
          // console.log(decodedToken.sub);

          setAuth(true);
          window.location.href = "/dashboard";
        } else {
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };
  const token = sessionStorage.getItem("jwt");
  const estConnecte = sessionStorage.getItem("isLoggedIn");
  // sessionStorage.setItem("roleUser", role);
  const gmail = sessionStorage.getItem("UserMail");
  if (estConnecte == true) {
    window.location.href = "/"; // Vous pouvez utiliser React Router pour la navigation
  } else {
    console.log(estConnecte);
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Connexion</h1>
                      <p className="text-medium-emphasis">Connexion</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Mail"
                          autoComplete="username"
                          name="username"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          onChange={handleChange}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={() => {
                              login();
                              () => {
                                window.location.href = "/";
                              };
                            }}
                          >
                            Se connecter
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Mot de pass oublie?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-success py-5"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Inscription</h2>
                      <p>
                        Bienvenue sur notre plateforme de
                        <b> GESTION D'APPLICATION UASZ!</b> Nous sommes ravis de
                        vous accueillir parmi nous. Explorez nos fonctionnalités
                        pour partager, apprendre et interagir avec notre
                        communauté. Respect et courtoisie sont essentiels ici.
                        Nous encourageons un échange respectueux d'opinions.
                        N'hésitez pas à contacter notre équipe de support pour
                        toute question. Profitez pleinement de votre expérience
                        !
                      </p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                          disabled={true}
                        >
                          S'inscrire
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Echec de la connexion : Veuillez verifier votre username et Mot de Pass"
        />
      </div>
    );
  }
};

export default Login;
