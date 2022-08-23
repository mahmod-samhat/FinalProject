import MainLogIn from "./mainLogIn";
import { useState } from "react";
import ResetPassword from "./resetPassword";

const LogIn = ({ updateLogInState, updateIsAdminState }) => {
  const [isReset, setIsReset] = useState(false);
  const handleReset = (value) => {
    setIsReset(value);
  };
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom start direction-ltr">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          {!isReset && (
            <MainLogIn
              updateLogInState={updateLogInState}
              updateIsAdminState={updateIsAdminState}
              handleReset={handleReset}
            />
          )}
          {isReset && <ResetPassword handleReset={handleReset} />}
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2022. All rights reserved.
        </div>
        <div>
          <a href="#!" className="text-white me-4">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="bi bi-google"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </section>
  );
};
export default LogIn;
