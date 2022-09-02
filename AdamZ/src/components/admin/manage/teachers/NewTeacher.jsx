import { useFormik, Field, replace } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../../../utils/formikValidationUsingJoi";
import Input from "../../../common/input";
import { useEffect, useState, useRef } from "react";
import { createTeacher } from "../../../../services/teacherServices";
import { useCounter } from "../../../../context/counterContext";
import { useNavigate } from "react-router-dom";
import subjectService from "../../../../services/subjectServices";
import { toast } from "react-toastify";

const NewTeacher = () => {
  const { increaseTeacherCounter } = useCounter();
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState(null);
  const [subject, setSubject] = useState(null);
  const { getAllSubjects } = subjectService;
  const navigate = useNavigate();
  useEffect(() => {
    getAllSubjects().then((res) => setSubjects(res.data));
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
      if (!subject) setError("בחר מקצוע למורה!!");
      else {
        createTeacher({ ...values, subject: subject._id })
          .then(async (res) => {
            await increaseTeacherCounter();
            toast.info("👍 נשמר בהצלחה");
            navigate("/teachers");
          })
          .catch(({ response }) => {
            setError(response.data.message);
          });
      }
    },
  });
  return (
    <div className="container pt-2 px-5">
      <div className="mx-5">
        <u>
          <h4>הוספת מורה חדש למערכת</h4>
        </u>
        <form onSubmit={form.handleSubmit}>
          {error && <div className="alert alert-danger fs-10">{error}</div>}
          <div className="d-flex justify-content-center align-items-center bg-light my-3">
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
          </div>
          <div className="d-flex justify-content-center bg-light my-3">
            <div className="container">
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

              <select
                className="form-select w-25"
                onChange={(e) => {
                  setSubject(
                    subjects.find((subject) => subject.name == e.target.value)
                  );
                }}
              >
                <option>מקצוע</option>
                {subjects &&
                  subjects.map((subject, index) => {
                    return (
                      <option key={index} value={subject?.name}>
                        {subject?.name}
                      </option>
                    );
                  })}
              </select>
              <div className="form-floating">
                <textarea
                  className="form-control h-50"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                ></textarea>
                <label htmlFor="floatingTextarea">הערות</label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Profile Image
              </label>
              <input className="form-control" type="file" id="formFile" />
            </div>
          </div>

          <button
            disabled={!form.isValid}
            type="submit"
            className="btn btn-lg my-2 text-primary"
          >
            <span>
              <i className="bi bi-plus-lg"></i>
            </span>
            שמור
          </button>
          <button
            type="button"
            className="btn btn-lg my-2 text-danger"
            onClick={() => navigate("/teachers")}
          >
            <span>
              <i className="bi bi-x-lg"></i>
            </span>
            ביטול
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewTeacher;
