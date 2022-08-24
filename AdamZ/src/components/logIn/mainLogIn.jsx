import { NavLink, Link } from "react-router-dom";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidationUsingJoi";
import Input from "../common/input";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import ResetPassword from "./resetPassword";
const MainLogIn = ({ updateLogInState, updateIsAdminState }) => {
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
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>

      <div className="divider d-flex align-items-center mb-4">
        <p className="display-4 fw-bold text-center px-3 text-primary">
          <i className="bi bi-stack"></i> AdamZ
        </p>
      </div>
      <form onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
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
          <NavLink to="/resetPassword" className="text-body">
            Forgot password?
          </NavLink>
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
  );
};
export default MainLogIn;
