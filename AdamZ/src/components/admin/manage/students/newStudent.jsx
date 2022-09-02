import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../../../../utils/formikValidationUsingJoi";
import Input from "../../../common/input";
import { useEffect, useState, useRef } from "react";
import { createStudent } from "../../../../services/studentServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import schoolInfo from "../../../../schoolInfo.json";
import { getAllClassRooms } from "../../../../services/classRoomServices";
import { useCounter } from "../../../../context/counterContext";

const NewStudent = () => {
  const { increaseStudentsCounter } = useCounter();
  const { grades } = schoolInfo;
  const [grade, setGrade] = useState(null);
  const [classRooms, setClassRooms] = useState([]);
  const [subClassRooms, setSubClassRooms] = useState([]);
  const [classRoom, setClassRoom] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getAllClassRooms().then((res) => setClassRooms(res.data));
  }, []);

  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,

    initialValues: {
      id: "",
      gender: "",
      fName: "",
      lName: "",
      birth: "",
      adress: "",
      phone: "",
    },
    validate: formikValidateUsingJoi({
      id: Joi.string().min(9).max(10).required(),
      gender: Joi.string().max(1024).required(),
      fName: Joi.string().max(1024).required(),
      lName: Joi.string().max(1024).required(),
      adress: Joi.string().max(1024).required(),
      birth: Joi.date().required(),
      phone: Joi.string().min(10).max(10).required(),
    }),
    async onSubmit(values) {
      try {
        if (!grade || !classRoom) setError("בחר שכבה וכיתה לתלמיד!!");
        else {
          const res = await createStudent({
            ...values,
            grade,
            classRoom: classRoom._id,
          });
          toast.info("👍 נשמר בהצלחה");
          increaseStudentsCounter();
          navigate(-1);
        }
      } catch ({ response }) {
        if (response.status === 400) setError(response.data.message);
      }
    },
  });
  return (
    <div className="container">
      <div className="w-75 p-3">
        <u>
          <h4>הוספת תלמיד חדש למערכת</h4>
        </u>
        <form onSubmit={form.handleSubmit}>
          {error && <div className="alert alert-danger fs-5">{error}</div>}
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
                <div className="d-flex h-50 justify-content-around align-items-center w-75">
                  <select
                    className="form-select w-25"
                    onChange={(e) => {
                      setGrade(e.target.value);
                      const sub = classRooms.filter(
                        (classRoom) => classRoom.grade == e.target.value
                      );
                      setSubClassRooms(sub);
                    }}
                  >
                    <option defaultValue>שכבה</option>
                    {grades &&
                      grades.map((grade, index) => {
                        return (
                          <option key={index} value={grade}>
                            {grade}
                          </option>
                        );
                      })}
                  </select>
                  <select
                    className="form-select w-25"
                    onChange={(e) => {
                      setError("");
                      setClassRoom(
                        classRooms.find(
                          (classRoom) => classRoom.id === e.target.value
                        )
                      );
                    }}
                  >
                    <option defaultValue>כיתה</option>
                    {subClassRooms &&
                      subClassRooms.map((classRoom, index) => {
                        return (
                          <option key={index} value={classRoom.id}>
                            {classRoom.id}
                          </option>
                        );
                      })}
                  </select>
                </div>
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
    </div>
  );
};
export default NewStudent;
