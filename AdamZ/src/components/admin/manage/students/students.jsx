import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import studentService from "../../../../services/studentServices";
import teacherService from "../../../../services/teacherServices";
import schoolInfo from "../../../../schoolInfo.json";
import {
  getAllClassRooms,
  getClassRoomById,
} from "../../../../services/classRoomServices";
import { useAuth } from "../../../../context/authContext";
const Students = () => {
  const { teacher } = useAuth();
  const [teacherr, setTeacherr] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const { grades } = schoolInfo;
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [subStudents, setSubStudents] = useState([]);
  const [grade, setGrade] = useState(null);
  const [classRoom, setClassRoom] = useState(null);
  const [classRooms, setClassRooms] = useState([]);
  const [subClassRooms, setSubClassRooms] = useState([]);
  const { getAllStudents } = studentService;
  const navigate = useNavigate();
  useEffect(() => {
    teacherService.getTeachersById(teacher._id).then((res) => {
      if (res.data.isAdmin) {
        getAllStudents().then((res) => {
          setSubStudents(res.data);
          setStudents(res.data);
          setIsAdmin(true);
        });
        getAllClassRooms().then((res) => setClassRooms(res.data));
      } else if (res.data.room_id) {
        setClassRoom(res.data.room_id._id);

        studentService
          .studentsByClassRoom(res.data.room_id._id)
          .then((ress) => {
            setStudents(ress.data);
            setSubStudents(ress.data);
          });
      }
      setTeacherr(res.data);
    });
  }, []);
  return (
    <>
      {teacherr?.room_id ? (
        <div className="d-flex justify-content-start h-100 w-100">
          <div className="w-100 h-100">
            <div className="overflow-auto h-75">
              <div class="input-group p-3">
                <div className="form-floating mx-3 w-25">
                  {teacherr?.isAdmin ? (
                    <>
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => {
                          setGrade(e.target.value);
                          const sub = classRooms.filter(
                            (classRoom) => classRoom.grade == e.target.value
                          );
                          setSubStudents(
                            students.filter(
                              (student) => student.grade == e.target.value
                            )
                          );
                          setSubClassRooms(sub);
                          console.log("teacher", teacherr);
                          console.log("classRoom", classRooms);
                        }}
                      >
                        <option selected>בחר...</option>
                        {grades.map((grade, index) => (
                          <option key={index} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="floatingSelect">שכבה</label>
                    </>
                  ) : (
                    <span className="p-2 bg-light fs-5">
                      שכבה :
                      <span className="fw-bold fs-4 mx-2">
                        {teacherr?.room_id.grade}
                      </span>
                    </span>
                  )}
                </div>

                <div className="form-floating mx-3 w-25">
                  {teacherr?.isAdmin ? (
                    <>
                      <select
                        className="form-select "
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => {
                          setSubStudents(
                            students.filter(
                              (student) =>
                                student.classRoom.id == e.target.value
                            )
                          );
                        }}
                      >
                        <option selected>בחר...</option>
                        {subClassRooms.map((classRoom, index) => (
                          <option key={index} value={classRoom.id}>
                            {classRoom.id}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="floatingSelect">כיתה</label>
                    </>
                  ) : (
                    <span className="p-2 bg-light fs-5">
                      כיתה :
                      <span className="fw-bold fs-4 mx-2">
                        {teacherr?.room_id.id}
                      </span>
                    </span>
                  )}
                </div>
                <div class="form-outline me-auto">
                  <input
                    type="search"
                    placeholder="חיפוש תלמיד"
                    id="form1"
                    class="form-control"
                    onChange={(e) => {
                      setSubStudents(
                        students.filter(
                          (student) =>
                            student.fName.includes(e.target.value) ||
                            student.id.includes(e.target.value)
                        )
                      );
                    }}
                  />
                </div>
                <button type="button" class="btn">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
            <table
              className="table align-middle caption-top mb-0 bg-white "
              style={{ height: "500px" }}
            >
              <caption className="text-end fs-5 ">
                {teacherr?.isAdmin && (
                  <button
                    type="button"
                    class="btn btn-outline-primary ms-5 "
                    onClick={() => navigate("/newStudent")}
                  >
                    <i class="bi bi-person-plus"></i> תלמיד חדש
                  </button>
                )}
                <span className="mx-5"> רשימת תלמידים</span>
              </caption>

              <thead className="bg-light">
                <tr>
                  <th>מורה</th>
                  <th>ת.ז</th>
                  <th>כיתה</th>
                  <th>מחנך</th>
                  <th>יצירת קשר</th>
                  <th>עדכון</th>
                </tr>
              </thead>
              <tbody>
                {subStudents.map((student) => {
                  return (
                    <tr
                      onClick={() => setStudent(student)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src="https://akim.org.il/wp-content/uploads/2019/09/akim_pics-15.png"
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1">
                              {student.fName + " " + student.lName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-muted mb-0">{student.id}</p>
                      </td>
                      <td>
                        {student.classRoom ? (
                          <p className="text-muted mb-0">
                            {student.classRoom.id}
                          </p>
                        ) : (
                          <i class="bi bi-x-circle text-danger"></i>
                        )}
                      </td>
                      <td>
                        {student.classRoom ? (
                          <p className="text-muted mb-0">
                            {student.classRoom.classRoomTeacher?.fName +
                              " " +
                              student.classRoom.classRoomTeacher?.lName}
                          </p>
                        ) : (
                          <i class="bi bi-x-circle text-danger"></i>
                        )}
                      </td>
                      <td>
                        {student.phone}
                        <span className="pe-2">
                          <i class="bi bi-telephone-fill"></i>
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-link btn-sm btn-rounded"
                        >
                          ערוך
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {student && (
            <div className="card m-3 h-75 w-50 bg-light">
              <div class="card-body">
                <div className="d-flex">
                  <div>
                    <u>
                      <h5 class="card-title">
                        {student.fName + " " + student.lName}
                      </h5>
                    </u>
                    <p class="card-text">{student.id}</p>
                    <p class="card-text me-auto p-3 fw-bold">
                      {student.gender}
                    </p>
                  </div>
                  <img
                    src={student.imageURL}
                    class="card-img-top h-50 w-50"
                    alt="..."
                  />
                </div>
              </div>

              <ul class="list-group list-group-flush text-center p-0">
                <div className="d-flex justify-content-center m-2">
                  <i class="bi bi-geo-alt-fill"></i>
                  <p class="card-text">{student.adress}</p>
                </div>
              </ul>
              <div class="card-body fw-bold pb-0 mx-5 text-center">
                <li class="list-group-item my-2 bg-info rounded-pill">
                  כיתה : {student.classRoom.id}
                </li>
                <li className="list-group-item my-2 bg-success rounded-pill">
                  מחנך :
                  {!student.classRoom.classRoomTeacher
                    ? null
                    : student.classRoom.classRoomTeacher?.fName +
                      " " +
                      student.classRoom.classRoomTeacher?.lName}
                </li>
              </div>
              {teacherr?.isAdmin && (
                <div className="card-body text-center">
                  <NavLink
                    to={`profile/${student.id}`}
                    className="card-link mx-2"
                  >
                    עוד פרטים...
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <span className="m-5 text-danger fs-5">אין כיתה חינוך</span>
      )}
    </>
  );
};
export default Students;
