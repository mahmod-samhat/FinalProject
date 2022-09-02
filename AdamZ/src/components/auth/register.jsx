import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../utils/formikValidationUsingJoi";
import Input from "../common/input";
import { useState, useEffect } from "react";
import { register } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdmin } from "../../services/authServices";
import MainCover from "./mainCover";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getAdmin().then((res) => {
      res.data.length > 0 && navigate("/logIn");
    });
  }, []);

  const form = useFormik({
    validateOnMount: true,
    enableReinitialize: true,

    initialValues: {
      id: "",
      email: "",
      password: "",
      fName: "",
      lName: "",
      birth: "",
      adress: "",
      phone: "",
      post: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(6).max(1024).required(),
      fName: Joi.string().max(1024).required(),
      lName: Joi.string().max(1024).required(),
      adress: Joi.string().max(1024).required(),
      birth: Joi.date().required(),
      phone: Joi.string().min(10).max(10).required(),
      post: Joi.number().max(1024).required(),
      id: Joi.string().min(9).max(10).required(),
    }),
    async onSubmit(values) {
      register(values)
        .then(async (res) => {
          toast.info("👍 נשמר בהצלחה");
          navigate("/");
        })
        .catch(({ response }) => {
          setError(response.data.message);
        });
    },
  });
  return (
    <MainCover>
      <div className="col-md-10 col-lg-8">
        <div className="divider d-flex align-items-center">
          <p className="display-4 fw-bold text-center px-3 text-primary">
            <i className="bi bi-stack"></i> AdamZ
          </p>
        </div>
        <div style={{ direction: "rtl" }}>
          <h4 className="text-success text-center">הוספת מנהל למערכת</h4>

          <form onSubmit={form.handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
              <div className="d-flex justify-content-between">
                <Input
                  type="text"
                  label="ת.ז"
                  placeholder="תעודת זהות.."
                  {...form.getFieldProps("id")}
                  error={form.touched.id && form.errors.id}
                />
                <Input
                  type="text"
                  label="שם פרטי"
                  placeholder="שם פרטי..."
                  {...form.getFieldProps("fName")}
                  error={form.touched.fName && form.errors.fName}
                />
                <Input
                  type="text"
                  label="שם משפחה"
                  placeholder="שם משפחה..."
                  {...form.getFieldProps("lName")}
                  error={form.touched.lName && form.errors.lName}
                />
                <Input
                  type="date"
                  label="תאריך לידה"
                  placeholder=""
                  {...form.getFieldProps("birth")}
                  error={form.touched.birth && form.errors.birth}
                />
              </div>
              <div className="d-flex justify-content-around">
                <Input
                  type="text"
                  label="פלפון"
                  placeholder="הכנס מספר פלפון"
                  {...form.getFieldProps("phone")}
                  error={form.touched.phone && form.errors.phone}
                />

                <Input
                  type="text"
                  label="כתובת"
                  placeholder="הכנס כתובת"
                  {...form.getFieldProps("adress")}
                  error={form.touched.adress && form.errors.adress}
                />

                <Input
                  type="text"
                  label="ת.ד"
                  placeholder=""
                  width="20px"
                  {...form.getFieldProps("post")}
                  error={form.touched.post && form.errors.post}
                />
              </div>
            </div>
            <div className="d-flex ">
              <Input
                type="email"
                label="דואר אלקטרוני"
                placeholder="הכנס דואר אלקטרוני"
                {...form.getFieldProps("email")}
                error={form.touched.email && form.errors.email}
              />

              <Input
                type="password"
                label="סיסמה"
                placeholder="הכנס סיסמה"
                {...form.getFieldProps("password")}
                error={form.touched.password && form.errors.password}
              />
            </div>
            <div className="text-center mt-4">
              <button
                disabled={!form.isValid}
                type="submit"
                className="btn btn-success btn-lg"
                style={{
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                }}
              >
                התחל
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainCover>
  );
};
export default Register;
