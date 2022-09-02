import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidationUsingJoi";
import Input from "../common/input";
import { useState } from "react";
import { forgotPassword } from "../../services/authServices";
import { trackPromise } from "react-promise-tracker";
import MainCover from "./mainCover";

const ResetPassword = ({ handleIsReset }) => {
  const [error, setError] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
    }),
    async onSubmit(values) {
      try {
        trackPromise(
          forgotPassword(values.email)
            .then(() => {
              setError("");
              setResetMsg(
                `Email had sent to you!! please check your email to complete reset password for ${values.email}`
              );
            })
            .catch(({ response }) => {
              setResetMsg("");
              setError(response.data.error);
            })
        );
      } catch ({ response }) {
        if (response.status === 401) {
          setError(response.data.error);
        }
      }
    },
  });
  return (
    <>
      <form onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          type="email"
          label="Email : "
          placeholder="Enter a valid email address"
          {...form.getFieldProps("email")}
          error={form.touched.email && form.errors.email}
        />

        {resetMsg && <div className="alert alert-success ">{resetMsg}</div>}

        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            disabled={!form.isValid}
            type="submit"
            className="btn btn-warning mx-2"
            style={{
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-danger mx-2"
            style={{
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
            onClick={handleIsReset}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
export default ResetPassword;
