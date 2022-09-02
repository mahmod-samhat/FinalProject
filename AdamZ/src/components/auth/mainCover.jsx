import Footer from "../footer";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidationUsingJoi";
import Input from "../common/input";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import ResetPassword from "./resetPassword";
import { useNavigate } from "react-router-dom";

const MainCover = ({ children }) => {
  return (
    <div className="vh-100">
      <div className="container h-custom">
        <div className="d-flex justify-content-center align-items-center h-100  direction-ltr">
          <div>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="paper writing"
            />
          </div>
          {children}
          
     
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default MainCover;
