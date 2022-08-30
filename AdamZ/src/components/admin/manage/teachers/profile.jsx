import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../../../utils/formikValidationUsingJoi";
import Input from "../../../common/input";
import { useState, useEffect } from "react";
import { useCounter } from "../../../../context/counterContext";

import {
  updateTeacher,
  getTeachersById,
  deleteTeacher,
} from "../../../../services/teacherServices";
import { getLessonsByTeacher } from "../../../../services/lessonServices";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TeacherProfile = () => {
  const { DecreaseTeacherCounter } = useCounter();

  const [error, setError] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [lessons, setLessons] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTeachersById(id).then((resTeacher) => {
      getLessonsByTeacher(resTeacher.data._id).then((resLessons) => {
        setLessons(resLessons.data);
      });
      setTeacher(resTeacher.data);
    });
  }, []);

  const form = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: {
      id: teacher ? teacher.id : "",
      email: teacher ? teacher.email : "",
      password: teacher ? teacher.password : "",
      fName: teacher ? teacher.fName : "",
      lName: teacher ? teacher.lName : "",
      birth: teacher ? teacher.birth : "",
      adress: teacher ? teacher.adress : "",
      phone: teacher ? teacher.phone : "",
      post: teacher ? teacher.post : "",
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
      id: Joi.string().max(1024).required(),
    }),
    async onSubmit(values) {
      try {
        await updateTeacher({ ...teacher, ...values });
        toast.info("👍 נשמר בהצלחה");
        navigate("/teachers");
      } catch ({ response }) {
        if (response.status === 400) setError(response.data.message);
      }
    },
  });

  return (
    <div className="d-flex p-2 w-100">
      <div className="w-75">
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
                  readOnly
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
                readOnly
                {...form.getFieldProps("password")}
                error={form.touched.password && form.errors.password}
              />

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
            className="btn btn-lg my-2 text-danger"
            onClick={() => navigate(-1)}
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
      {teacher && (
        <div className="card m-4 bg-light w-50 h-75">
          <div className="card-body">
            <div className="d-flex">
              <div>
                <u>
                  <h5 className="card-title">
                    {teacher.fName + " " + teacher.lName}
                  </h5>
                </u>
                <p className="card-text">{teacher.id}</p>
                <p className="card-text fw-bold">
                  <span className="badge bg-success">
                    {teacher.subject.name}
                  </span>
                </p>
                <span className="mt-5 text-succsess">מחנך : </span>
                {teacher.room_id ? (
                  teacher.room_id.id
                ) : (
                  <i className="bi bi-x-circle text-danger"></i>
                )}
              </div>
              <img
                src={teacher.imageURL}
                className="card-img-end me-auto h-50 w-50"
                alt="teacher photo"
              />
            </div>
          </div>
          <p className="mx-2 fw-bold">כיתות לימוד :</p>
          {lessons.map((lesson, index) => {
            return (
              <div key={index} className="card-body py-0">
                {lesson && (
                  <li className="list-group-item">{lesson.classRoom.id}</li>
                )}
              </div>
            );
          })}
          <ul className="list-group list-group-flush ">
            <div className="card-body text-center">
              <NavLink
                to="/teachers"
                className="card-link mx-2"
                onClick={() => {
                  deleteTeacher(teacher.id);
                  DecreaseTeacherCounter();
                  toast.error("👍 נמחק בהצלחה");
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
export default TeacherProfile;
