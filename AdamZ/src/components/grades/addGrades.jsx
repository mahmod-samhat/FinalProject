import React, { useContext, useEffect, useState } from "react";
import schoolInfo from "../../schoolInfo.json";
import { NavLink, useNavigate } from "react-router-dom";
import teacherService from "../../services/teacherServices";
import classRoomService from "../../services/classRoomServices";
import { useAuth } from "../../context/authContext";
import Grade from "./grade";
import lessonService from "../../services/lessonServices";
import scoreService from "../../services/scoreServices";
// import { yearContext } from "../header";
const AddGrades = ({ year }) => {
  //   const yearr = useContext(yearContext);
  const navigate = useNavigate();
  const [semester, setSemester] = useState(false);
  const [teachers, setTeachers] = useState(null);
  const [teacherr, setTeacherr] = useState(null);
  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState([]);
  const [lesson, setLesson] = useState(null);

  const { teacher } = useAuth();

  useEffect(() => {
    if (teacher.isAdmin)
      teacherService.getAllTeachers().then((res) => setTeachers(res.data));
    else
      teacherService
        .getTeachersById(teacher._id)
        .then((res) => setTeachers([res.data]));
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
              setSemester(e.target.value);
              setLesson(null);
              setTeacherr(null);
              setTeachers([]);
            }}
          >
            <option defaultValue>בחר...</option>
            {schoolInfo.semester.map((semester, index) => (
              <option key={index} value={semester}>
                {semester}
              </option>
            ))}
          </select>
          <label htmlFor="floatingSelect">סמסטר</label>
        </div>
        {semester && (
          <div className="form-floating m-3 w-25">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={(e) =>
                setTeacherr(
                  teachers.find((teacher) => teacher._id == e.target.value)
                )
              }
            >
              <option selected>בחר...</option>
              {teachers?.map((teacher, index) => (
                <option key={index} value={teacher._id}>
                  {teacher.fName + " " + teacher.lName}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">מורים</label>
          </div>
        )}
        {semester && (
          <div className="form-floating m-3 w-25">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              onChange={(e) => {
                lessonService.getLessonById(e.target.value).then((res) => {
                  setLesson(res.data);
                });
              }}
            >
              <option defaultValue>בחר...</option>
              {teacherr &&
                teacherr.lessons.map((lesson, index) => (
                  <option key={index} value={lesson._id}>
                    {lesson.classRoom.id + " " + teacherr.subject.name}
                  </option>
                ))}
            </select>
            <label htmlFor="floatingSelect">קבוצות לימוד</label>
          </div>
        )}
      </div>
      <div className="overflow-auto h-75">
        <table
          className="table align-middle caption-top mb-0 bg-white"
          style={{ height: "500px" }}
        >
          <caption className="text-center fs-5 pt-0">רשימת תלמידים</caption>
          <thead className="bg-light">
            <tr>
              <th>#</th>
              <th>שם</th>
              <th>ת.ז</th>
              <th>הציון הסופי</th>
              <th>הערכה מילולית</th>
              <th>היגד</th>
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
        <div className="text-lg pt-2">
          <button
            type="btn"
            className="btn btn-lg bg-primary my-2 text-light mx-2"
            onClick={() => {
              scoreService
                .setScores(scores)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
            }}
          >
            <span>
              <i className="bi bi-check2-circle"></i>
            </span>
            שמור
          </button>
          <button
            className="btn btn-lg my-2 bg-danger text-light mx-2"
            onClick={() => navigate(-1)}
          >
            <span>
              <i className="bi bi-x-lg"></i>
            </span>
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddGrades;
