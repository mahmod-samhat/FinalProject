import MainLogIn from "./mainLogIn";
import { useState } from "react";
import ResetPassword from "./resetPassword";
import { Route, Routes } from "react-router-dom";
import NewPassword from "./newPassword";
import Footer from "../footer";
import AboutUs from "../aboutUs";

const LogInComponent = ({ updateLogInState, updateIsAdminState }) => {
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom start direction-ltr">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="paper writing"
            />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <MainLogIn
                  updateLogInState={updateLogInState}
                  updateIsAdminState={updateIsAdminState}
                />
              }
            />
            <Route exact path="/resetPassword" element={<ResetPassword />} />
            <Route
              exact
              path="/resetPassword/newPassword"
              element={<NewPassword updateLogInState={updateLogInState} />}
            />
            <Route path="/aboutUs" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
};
export default LogInComponent;
