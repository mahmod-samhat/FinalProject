import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidationUsingJoi";
import Input from "./common/input";
import { useState } from "react";
import { useAuth } from "../context/authContext";
const LogIn = ({ updateLogInState, updateIsAdminState }) => {
  const [error, setError] = useState("");
  const { teacher, login } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        const teacher = await login(values);

        if (teacher) {
          updateLogInState(true);
          if (teacher.isAdmin) updateIsAdminState(true);
        }
      } catch ({ response }) {
        if (response.status === 400) setError(response.data.message);
      }
    },
  });
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom start direction-ltr">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>

            <div className="divider d-flex align-items-center mb-4">
              <p className="display-4 fw-bold text-center px-3 text-primary">
                <i class="bi bi-stack"></i> AdamZ
              </p>
            </div>
            <form onSubmit={form.handleSubmit}>
              {error && <div className="alert alert-danger fs-10">{error}</div>}
              <Input
                type="email"
                label="email"
                placeholder="Enter a valid email address"
                {...form.getFieldProps("email")}
                error={form.touched.email && form.errors.email}
              />

              <Input
                type="password"
                label="password"
                placeholder="Enter password"
                {...form.getFieldProps("password")}
                error={form.touched.password && form.errors.password}
              />

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  disabled={!form.isValid}
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
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
            <i class="bi bi-google"></i>
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
