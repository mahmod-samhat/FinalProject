import React, { useEffect, useState } from "react";
import schoolInfo from "../../schoolInfo.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import teacherService from "../../services/teacherServices";
import classRoomService from "../../services/classRoomServices";
import { useAuth } from "../../context/authContext";
import Grade from "./grade";
import lessonService from "../../services/lessonServices";
import scoreService from "../../services/scoreServices";

const AddGrades = () => {
  const navigate = useNavigate();
  const [semester, setSemester] = useState(false);
  const [teachers, setTeachers] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const updateLesson = (_id) => {
    lessonService.getLessonById(_id).then((res) => {
      setLesson(res.data);
    });
  };
  useEffect(() => {
    if (user.kind == "Admin")
      teacherService.getAllTeachers().then((res) => setTeachers(res.data));
    else setTeacher(user);
  }, [semester]);

  useEffect(() => {
    if (lesson != null)
      classRoomService.getClassRoomById(lesson.classRoom._id).then((res) => {
        setStudents(res.data.students);
      });
  }, [lesson]);

  return (
    <div className="h-100 w-100">
      <div className="d-flex justify-content-start w-100">
        <div className="form-floating m-3 w-25">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            onChange={(e) => {
              console.log("user", user);
              console.log("teacher", teacher);
              setTeacher(null);
              setSemester(e.target.value);
              setTeachers([]);
              setLesson(null);
            }}
          >
            <option defaultValue>??????...</option>
            {schoolInfo.semester.map((semester, index) => (
              <option key={index} value={semester}>
                {semester}
              </option>
            ))}
          </select>
          <label htmlFor="floatingSelect">??????????</label>
        </div>
        {user.kind == "Admin" && (
          <div className="form-floating m-3 w-25">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={(e) =>
                setTeacher(
                  teachers.find((teacher) => teacher._id == e.target.value)
                )
              }
            >
              <option defaultValue>??????...</option>
              {teachers?.map((teacher, index) => (
                <option key={index} value={teacher._id}>
                  {teacher.fName + " " + teacher.lName}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">??????????</label>
          </div>
        )}
        {teacher && (
          <div className="form-floating m-3 w-25">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={(e) => {
                updateLesson(e.target.value);
              }}
            >
              <option defaultValue>??????...</option>
              {teacher &&
                teacher.lessons.map((lesson, index) => (
                  <option key={index} value={lesson._id}>
                    {lesson.classRoom.id + " " + teacher.subject.name}
                  </option>
                ))}
            </select>
            <label htmlFor="floatingSelect">???????????? ??????????</label>
          </div>
        )}
      </div>
      <div className="overflow-auto h-75">
        {error && <div className="alert alert-danger fs-10">{error}</div>}
        <div className="overflow-auto h-75">
          <table className="table align-middle caption-top mb-0 bg-white">
            <caption className="text-center fs-5 pt-0">?????????? ??????????????</caption>
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>????</th>
                <th>??.??</th>
                <th>?????????? ??????????</th>
                <th>?????????? ??????????????</th>
                <th>????????</th>
              </tr>
            </thead>
            <tbody>
              {lesson &&
                students.map((student, index) => {
                  return (
                    <Grade
                      key={index}
                      student={student}
                      index={index}
                      updateScores={(scores) => setScores(scores)}
                      scores={scores}
                      semester={semester}
                      lesson={lesson}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        {lesson && (
          <div className="text-lg">
            <button
              type="btn"
              className="btn btn-lg bg-primary my-2 text-light mx-2"
              onClick={() => {
                scoreService
                  .setScores(scores)
                  .then((res) => {
                    toast.info("???? ???????? ????????????");
                    navigate("/");
                  })
                  .catch((err) => setError(err.response.data.message));
              }}
            >
              <span>
                <i className="bi bi-check2-circle"></i>
              </span>
              ????????
            </button>
            <button
              className="btn btn-lg my-2 bg-danger text-light mx-2"
              onClick={() => navigate(-1)}
            >
              <span>
                <i className="bi bi-x-lg"></i>
              </span>
              ??????????
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default AddGrades;
