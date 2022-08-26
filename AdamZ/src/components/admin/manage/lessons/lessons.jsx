import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import schoolInfo from "../../../../schoolInfo.json";
import { getAllClassRooms } from "../../../../services/classRoomServices";
import subjectService from "../../../../services/subjectServices";

import teacherService, {
  getAllTeachers,
} from "../../../../services/teacherServices";
import {
  createLesson,
  getAllLessons,
  deleteLesson,
} from "../../../../services/lessonServices";
const Lessons = () => {
  const navigate = useNavigate();

  const [grade, setGrade] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const [classRoom, setClassRoom] = useState(null);
  const [classRooms, setClassRooms] = useState([]);

  const { getAllSubjects } = subjectService;
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState(null);

  const { getAllTeachers } = teacherService;
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState(null);

  const [subTeachers, setSubTeachers] = useState([]);
  const [subClassRooms, setSubClassRooms] = useState([]);

  const [lessons, setLessons] = useState(null);
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
    getAllLessons().then((res) => setLessons(res.data));
    getAllSubjects().then((res) => setSubjects(res.data));
    getAllTeachers().then((res) => setTeachers(res.data));
    getAllClassRooms().then((res) => setClassRooms(res.data));
  }, [grade, refresh]);

  const filterTeachers = (subjectName) => {
    const subTeachers = teachers.filter(
      (teacher) => teacher.subject.name === subjectName
    );
    return subTeachers;
  };
  const filterClassRooms = (grade) => {
    const subClassRooms = classRooms.filter(
      (classRoom) => classRoom.grade === grade
    );
    return subClassRooms;
  };

  return (
    <div className="h-100 w-100">
      <div className="input-group w-100  p-3">
        <div className="form-floating mx-3" style={{ width: "15%" }}>
          <select
            className="form-select"
            onChange={(e) => {
              setSubClassRooms(filterClassRooms(e.target.value));
              setGrade(e.target.value);
            }}
          >
            <option defaultValue>שכבה</option>
            {schoolInfo.grades.map((grade, index) => {
              return (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-floating mx-3" style={{ width: "15%" }}>
          <select
            className="form-select"
            onChange={(e) => {
              setClassRoom(
                subClassRooms.find((item) => item.id == e.target.value)
              );
            }}
          >
            <option defaultValue>כיתה</option>

            {subClassRooms.map((classRoom, index) => {
              return (
                <option key={classRoom.id} value={classRoom.id}>
                  {classRoom.id}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-floating mx-3" style={{ width: "15%" }}>
          <select
            className="form-select"
            onChange={(e) => {
              setSubTeachers(filterTeachers(e.target.value));
              setSubject(subjects.find((item) => item.name == e.target.value));
            }}
          >
            <option>מקצוע</option>
            {subjects.map((subject, index) => {
              return (
                <option key={index} value={subject.name}>
                  {subject.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-floating mx-3" style={{ width: "15%" }}>
          <select
            className="form-select"
            onChange={(e) => {
              setTeacher(subTeachers.find((item) => item.id == e.target.value));
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
        </div>
        <div className="form-floating mx-3" style={{ width: "15" }}>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              {
                grade &&
                  subject &&
                  classRoom &&
                  teacher &&
                  createLesson({
                    grade,
                    classRoom: classRoom._id,
                    subject: subject._id,
                    teacher: teacher._id,
                  })
                    .then((res) => setRefresh(!refresh))
                    .catch((res) => alert(res.response.data.messege));
              }
            }}
          >
            <i className="bi bi-magic"></i> שפץ
          </button>
        </div>
      </div>
      <div className="overflow-auto w-75 px-2">
        <table
          className="table align-middle caption-top bg-white"
          style={{ height: "500px" }}
        >
          <caption className="text-center fs-5 pt-0">רשימת שיעורים </caption>
          <thead className="bg-light">
            <tr className="p-0">
              <th>מס'</th>
              <th> כיתה</th>
              <th>מקצוע</th>
              <th>מורה</th>
              <th>עדכון</th>
            </tr>
          </thead>
          {lessons &&
            lessons.map((lesson, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{++index}</td>
                    <td>{lesson.classRoom.id}</td>

                    <td>{lesson.subject.name}</td>

                    <td>{lesson.teacher.fName + " " + lesson.teacher.lName}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                        onClick={() => {
                          deleteLesson(lesson);
                          toast.error("👍 נמחק בהצלחה", toastOption);
                          setRefresh(!refresh);
                        }}
                      >
                        <span>
                          <i className="bi bi-trash3"></i>
                        </span>
                        מחק
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Lessons;
