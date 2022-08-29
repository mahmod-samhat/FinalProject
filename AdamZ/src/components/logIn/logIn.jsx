import Footer from "../footer";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidationUsingJoi";
import Input from "../common/input";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import ResetPassword from "./resetPassword";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [error, setError] = useState("");
  const [isReset, setIsReset] = useState(false);
  const { teacher, login } = useAuth();
  const handleIsReset = () => setIsReset(!isReset);
  const navigate = useNavigate();

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
          navigate("/");
        }
      } catch (err) {
        if (err.response?.status === 400) setError(err.response?.data.message);
      }
    },
  });
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
          {!isReset ? (
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
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
                  <span className="btn " onClick={handleIsReset}>
                    Forgot password?
                  </span>
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
          ) : (
            <ResetPassword handleIsReset={handleIsReset} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default LogIn;
