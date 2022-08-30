import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../../../utils/formikValidationUsingJoi";
import Input from "../../../common/input";
import { useCounter } from "../../../../context/counterContext";

import { useState, useEffect } from "react";
import {
  updateStudent,
  getStudentById,
  deleteStudent,
} from "../../../../services/studentServices";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const StudentProfile = () => {
  const { DecreaseStudentsCounter } = useCounter();

  const [error, setError] = useState("");
  const [student, setStudent] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getStudentById(id).then((res) => setStudent(res.data));
  }, []);

  const form = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: {
      id: student ? student.id : "",
      gender: student ? student.gender : "",
      fName: student ? student.fName : "",
      lName: student ? student.lName : "",
      birth: student ? student.birth : "",
      adress: student ? student.adress : "",
      phone: student ? student.phone : "",
      grade: student ? student.grade : "",
    },
    validate: formikValidateUsingJoi({
      id: Joi.string().max(1024).required(),
      gender: Joi.string().max(1024).required(),
      fName: Joi.string().max(1024).required(),
      lName: Joi.string().max(1024).required(),
      adress: Joi.string().max(1024).required(),
      birth: Joi.date().required(),
      phone: Joi.string().min(10).max(10).required(),
      grade: Joi.string().max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        await updateStudent({ ...student, ...values });
        toast.info("👍 נשמר בהצלחה");
        navigate(-1);
      } catch ({ response }) {
        if (response.status === 400) setError(response.data.message);
      }
    },
  });

  return (
    <div className="d-flex p-2 w-100">
      <div className="">
        <u>
          <h4>הוספת מורה חדש למערכת</h4>
        </u>
        <form onSubmit={form.handleSubmit}>
          {error && <div className="alert alert-danger fs-5">{error}</div>}
          <div className="d-flex justify-content-center align-items-center bg-light my-3">
            <div>
              <div className="d-flex justify-content-between">
                <Input
                  type="text"
                  label="ת.ז"
                  readOnly
                  placeholder="תעודת זהות.."
                  {...form.getFieldProps("id")}
                  error={form.touched.id && form.errors.id}
                />
                <Input
                  type="text"
                  label="מין"
                  placeholder="זכר/נקבה"
                  {...form.getFieldProps("gender")}
                  error={form.touched.gender && form.errors.gender}
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
                  readOnly
                  label="שכבה"
                  placeholder=""
                  width="20px"
                  {...form.getFieldProps("grade")}
                  error={form.touched.grade && form.errors.grade}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              תמונה
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="form-floating">
            <textarea
              className="form-control h-50"
              placeholder="Leave a comment here"
              id="floatingTextarea"
            ></textarea>
            <label htmlFor="floatingTextarea">הערות</label>
          </div>
          <button
            disabled={!form.isValid}
            type="submit"
            className="btn btn-lg my-2 text-primary"
            style={{
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            <span>
              <i className="bi bi-plus-lg"></i>
            </span>
            שמור
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-lg my-2 text-danger"
            style={{
              paddingLeft: "2.5rem",
              paddingRight: "2.5rem",
            }}
          >
            <span>
              <i className="bi bi-x-lg"></i>
            </span>
            ביטול
          </button>
        </form>
      </div>
      {student && (
        <div className="card m-4 bg-light w-50 h-75">
          <div className="card-body">
            <div className="d-flex">
              <div>
                <u>
                  <h5 className="card-title">
                    {student.fName + " " + student.lName}
                  </h5>
                </u>
                <p className="card-text">{student.id}</p>
                <p>
                  <span className="mt-5 text-succsess">מחנך : </span>
                  {student.classRoom.classRoomTeacher ? (
                    student.classRoom.classRoomTeacher?.fName +
                    " " +
                    student.classRoom.classRoomTeacher?.lName
                  ) : (
                    <i className="bi bi-x-circle text-danger"></i>
                  )}
                </p>

                <span className="mt-5 text-succsess">כיתה : </span>
                {student.classRoom ? (
                  student.classRoom.id
                ) : (
                  <i className="bi bi-x-circle text-danger"></i>
                )}
              </div>
              <img
                src={student.imageURL}
                className="card-img-end me-auto h-50 w-50"
                alt="student"
              />
            </div>
          </div>

          <ul className="list-group list-group-flush ">
            <div className="card-body text-center">
              <NavLink
                to="/students"
                className="card-link mx-2"
                onClick={() => {
                  deleteStudent(student);
                  toast.error("👍 נמחק בהצלחה");
                  DecreaseStudentsCounter();
                }}
              >
                <i className="bi bi-trash3"></i>
                מחיקה
              </NavLink>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};
export default StudentProfile;
