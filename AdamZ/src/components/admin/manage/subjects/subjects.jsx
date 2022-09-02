import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllSubjects,
  updateSubject,
} from "../../../../services/subjectServices";
import { getAllTeachers } from "../../../../services/teacherServices";

const Subjects = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [subTeachers, setSubTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState([]);
  const [coordinator, setCoordinator] = useState(false);
  const [isValidInputs, setIsValidInputs] = useState(false);
  const navigate = useNavigate();
  const toastOption = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  };
  useEffect(() => {
    getAllSubjects().then((res) => setSubjects(res.data));
    getAllTeachers().then((res) => setTeachers(res.data));
  }, [coordinator]);
  return (
    <div className="w-100">
      <div className="d-flex w-100 justify-content-between p-2">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => navigate("/newSubject")}
        >
          <i className="bi bi-person-plus"></i> מקצוע חדש
        </button>
        <div className="d-flex w-50 ms-5">
          <select
            className="form-select mx-2"
            onChange={(e) => {
              setTeacher([]);
              setSubject(
                subjects.find((subject) => subject.name == e.target.value)
              );
              setSubTeachers(
                teachers.filter((teacher) => {
                  return teacher.subject.name == e.target.value;
                })
              );
            }}
          >
            <option defaultValue>מקצוע</option>
            {subjects.map((subject, index) => {
              return (
                <option key={index} value={subject.name}>
                  {subject.name}
                </option>
              );
            })}
          </select>
          <select
            className="form-select mx-2"
            onChange={(e) => {
              setTeacher(
                teachers.find((teacher) => teacher.id == e.target.value)
              );
              teacher && subject && subject(setIsValidInputs(true));
            }}
          >
            <option defaultValue>מורה</option>
            {subTeachers.map((teacher, index) => {
              return (
                <option key={index} value={teacher.id}>
                  {teacher.fName + " " + teacher.lName}
                </option>
              );
            })}
          </select>
          <button
            disabled={!isValidInputs}
            type="button"
            className="btn w-100 btn-outline-success"
            onClick={() => {
              updateSubject({ ...subject, coordinator: teacher._id }).then(
                (res) => {
                  setSubject(null);
                  setTeacher(null);
                  setTeachers([]);
                  setSubjects([]);
                  setSubTeachers([]);
                }
              );
              setCoordinator(!coordinator);
              setIsValidInputs(false);
              toast.success("👍 שופץ בהצלחה", toastOption);
            }}
          >
            <i className="bi bi-magic"></i>שפץ רכז
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap p-3 justify-content-evenly">
        {subjects &&
          subjects.map((subject, index) => {
            return (
              <div
                key={index}
                className="card m-2 bg-light"
                style={{ width: "18rem" }}
              >
                <div
                  className="bg-primary w-50 text-center fw-bold fs-5 pt-2 mx-auto text-light"
                  style={{ height: "5rem", width: "5rem" }}
                >
                  {subject.name}
                  <h4>
                    <span className="badge bg-warning">
                      {subject.teachers.length} מורים
                    </span>
                  </h4>
                </div>
                <div className="card-body flex-grow-0">
                  <h5 className="card-title text-secondary">
                    צוות <span>{subject.name}</span>
                  </h5>
                  <h6 className="card-subtitle  text-muted-danger text-primary">
                    רכז :
                    <u>
                      {!subject.coordinator
                        ? ""
                        : subject.coordinator?.fName +
                          " " +
                          subject.coordinator?.lName}
                    </u>
                  </h6>
                </div>
                <ul className="list-group">
                  {teachers
                    .filter((teacher) => teacher.subject.name == subject.name)
                    .map((teacher, index) => {
                      return (
                        <p key={index} className="m-0 mt-1">
                          <i className="bi bi-person"></i>
                          {teacher.fName + " " + teacher.lName}
                        </p>
                      );
                    })}
                </ul>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
};
export default Subjects;
