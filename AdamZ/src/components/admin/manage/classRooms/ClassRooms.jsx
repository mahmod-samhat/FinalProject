import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import classRoomService from "../../../../services/classRoomServices";
import schoolInfo from "../../../../schoolInfo.json";
import ClassRoomTeacher from "./classRoomTeacher";
const ClassRooms = () => {
  const [grade, setGrade] = useState(null);
  const [classRooms, setClassRooms] = useState([]);
  const [AllClassRooms, setAllClassRooms] = useState([]);
  const [classRoom, setClassRoom] = useState(null);
  const { getAllClassRooms, deleteClassRoom } = classRoomService;
  const navigate = useNavigate();
  useEffect(() => {
    getAllClassRooms().then((res) => {
      setAllClassRooms(res.data);
      setClassRooms(res.data);
    });
  }, []);
  return (
    <div className="h-100 w-100">
      <div className="w-100 d-flex">
        <div className="w-100">
          <div className="input-group p-3 w-100">
            <div className="form-floating mx-3 w-25">
              <select
                className="form-select"
                onChange={(e) => setGrade(e.target.value)}
              >
                <option key="0.0" selected>שכבה</option>

                {schoolInfo.grades.map((g, index) => (
                  <option key={index} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="btn btn-outline-success w-25"
              onClick={() => {
                setClassRooms(
                  AllClassRooms.filter((classRoom) =>
                    classRoom.id.includes(grade)
                  )
                );
              }}
            >
              <i class="bi bi-search"></i> חפש
            </button>
          </div>
          <div className="d-flex">
            <div className="overflow-auto w-100 px-2">
              <table
                className="table align-middle caption-top mb-0 bg-white"
                style={{ height: "500px" }}
              >
                <caption className="text-end fs-5 pt-0">
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-5"
                    onClick={() => navigate("/newClassRoom")}
                  >
                    <i class="bi bi-person-plus"></i> כיתה חדשה
                  </button>
                  <span className="mx-5">רשימת כיתות</span>
                </caption>
                <thead className="bg-light">
                  <tr className="p-0">
                    <th>כיתה</th>
                    <th> שכבה</th>
                    <th>מחנך</th>
                    <th>מס' תלמידים</th>
                    <th>עדכון</th>
                  </tr>
                </thead>
                <tbody>
                  {classRooms &&
                    classRooms.map((classRoom) => {
                      return (
                        <tr
                          onClick={() => setClassRoom(classRoom)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{classRoom.id}</td>
                          <td>{classRoom.grade}</td>

                          <td>
                            {classRoom.classRoomTeacher ? (
                              classRoom.classRoomTeacher.fName +
                              " " +
                              classRoom.classRoomTeacher.lName
                            ) : (
                              <i class="bi bi-x-circle text-danger"></i>
                            )}
                          </td>

                          <td>{classRoom.students.length}</td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-link btn-sm btn-rounded"
                              onClick={() => {
                                if (classRoom.students.length > 0)
                                  alert(
                                    "אתה לא יכול למחוק כיתה משופץ בתוכה תלמידים!!! כיתה צריכה להיות ריקה לפני מחיקה "
                                  );
                                else {
                                  deleteClassRoom(classRoom._id);
                                  navigate("/");
                                }
                              }}
                            >
                              <span>
                                <i class="bi bi-trash3"></i>
                              </span>
                              מחק
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {classRoom && (
          <div className="card m-3 h-75 w-50">
            <img
              src="https://akim.org.il/wp-content/uploads/2019/09/akim_pics-15.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h3 className="text-success">{classRoom?.id}</h3>
              <h5 class="card-title">
                מחנך :
                {classRoom.classRoomTeacher &&
                  classRoom.classRoomTeacher.fName +
                    " " +
                    classRoom.classRoomTeacher.lName}
                <ClassRoomTeacher
                  classRoom={classRoom}
                  text={classRoom.classRoomTeacher ? "עדכן" : "שפץ"}
                />
              </h5>
              <p class="card-text">
                מס תלמידים
                <span class="badge bg-primary fs-5 mx-2">
                  {classRoom?.students.length}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassRooms;
