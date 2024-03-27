import React, { Component, Suspense, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import EditUe from "./views/base/ue/EditUe";
import { StrictMode } from "react";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const EditUE = React.lazy(() => import("./views/base/ue/EditUe"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     estAuthentifie: false,
  //   };
  // }

  // handleAuthentificationChange = () => {
  //   this.setState({
  //     estAuthentifie: !this.state.estAuthentifie,
  //   });
  // };

  render() {
    const estConnecte = sessionStorage.getItem("isLoggedIn");

    return (
      <StrictMode>
        <HashRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route
                path="*"
                element={
                  sessionStorage.getItem("isLoggedIn") ? (
                    <DefaultLayout />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                exact
                path="/login"
                name="Login Page"
                element={<Login />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                element={<Register />}
              />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
              {/* <Route path="/base/ue/EditUe/:id" element={<EditUe />} /> */}
            </Routes>
          </Suspense>
        </HashRouter>
      </StrictMode>
    );
  }
}

export default App;
