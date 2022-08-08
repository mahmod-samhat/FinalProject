import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const navigate = useNavigate();
  useEffect(() => {
    getAllSubjects().then((res) => setSubjects(res.data));
    getAllTeachers().then((res) => {
      setSubTeachers(res.data);
      setTeachers(res.data);
    });
  }, []);
  return (
    <div className="w-100">
      <div
        className="d-flex w-100 justify-content-between p-2"
        style={{ height: "10%" }}
      >
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => navigate("/newSubject")}
        >
          <i class="bi bi-person-plus"></i> מקצוע חדש
        </button>
        <div className="d-flex w-50 ms-5">
          <select
            className="form-select mx-2"
            // 888888 cannot read value for obect => result [object Object]
            onChange={(e) => {
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
            }}
          >
            <option defaultValue>מורה</option>
            {subTeachers.map((teacher, index) => {
              return (
                <option key={index} value={teacher.id}>
                  {teacher.lName + " " + teacher.lName}
                </option>
              );
            })}
          </select>
          <button
            type="button"
            className="btn w-100 btn-outline-success"
            onClick={() => {
              updateSubject({ ...subject, coordinator: teacher._id });
              navigate(-1);
            }}
          >
            <i class="bi bi-magic"></i>שפץ רכז
          </button>
        </div>
      </div>
      <div className="d-flex flex-wrap p-3 justify-content-evenly">
        {subjects &&
          subjects.map((subject) => {
            return (
              <div class="card m-2 bg-light" style={{ width: "18rem" }}>
                <div
                  className="bg-primary w-50 text-center fw-bold fs-5 pt-2 mx-auto text-light"
                  style={{ height: "5rem", width: "5rem" }}
                >
                  {subject.name}
                  <h4>
                    <span class="badge bg-warning">
                      {subject.teachers.length} מורים
                    </span>
                  </h4>
                </div>
                <div class="card-body">
                  <h5 class="card-title text-secondary">
                    צוות <span>{subject.name}</span>
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted-danger text-primary">
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
                <ul class="list-group list-group-flush">
                  {teachers
                    .filter((teacher) => teacher.subject.name == subject.name)
                    .map((teacher) => {
                      return (
                        <NavLink to="/" className="nav-link text-dark">
                          <i className="bi bi-person"></i>
                          {teacher.lName + " " + teacher.lName}
                          <span class="badge bg-secondary me-3">5 שיעורים</span>
                        </NavLink>
                      );
                    })}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Subjects;
