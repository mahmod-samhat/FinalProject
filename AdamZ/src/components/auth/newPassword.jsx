import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidationUsingJoi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Input from "../common/input";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../services/authServices";
import MainCover from "./mainCover";

const NewPassword = () => {
  const [error, setError] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      password: "",
    },
    validate: formikValidateUsingJoi({
      password: Joi.string().min(6).max(255).required(),
    }),
    async onSubmit(values) {
      try {
        resetPassword(values, token).then(() => {
          toast.info("👍 נשמר בהצלחה");
          navigate("/");
        });
      } catch ({ response }) {
        if (response.status === 401) {
          setError(response.data.error);
        }
      }
    },
  });
  return (
    <MainCover>
      <form onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          type="password"
          label="NewPassword : "
          placeholder="Enter a valid password"
          {...form.getFieldProps("password")}
          error={form.touched.password && form.errors.password}
        />

        {resetMsg && <div className="alert alert-success ">{resetMsg}</div>}

        <div className="text-center text-lg-start mt-4 pt-2">
          <button
            disabled={!form.isValid}
            type="submit"
            className="btn btn-success mx-2"
            style={{
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            Set Password
          </button>
        </div>
      </form>
    </MainCover>
  );
};
export default NewPassword;
