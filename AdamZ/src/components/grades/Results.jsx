import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import {
  getAllStudents,
  studentsByClassRoom,
} from "../../services/studentServices";
import {
  getAllClassRooms,
  getClassRoomById,
} from "../../services/classRoomServices";
const Results = () => {
  const { user } = useAuth();
  const resultsTable = useRef();
  const handlePrint = useReactToPrint({
    content: () => resultsTable.current,
    documentTitle: "Results",
  });

  const [semester, setSemester] = useState([]);
  const [students, setStudents] = useState([]);
  const [subStudents, setSubStudents] = useState([]);
  const [student, setStudent] = useState(null);
  const [classRooms, setClassRooms] = useState([]);

  const getAverage = () => {
    let counterResults = 0;
    let sumResults = student?.results.reduce((previousValue, result) => {
      if (result.semester === semester) {
        counterResults++;
        return previousValue + result.score;
      }
    }, 0);
    return (sumResults / counterResults).toFixed(1);
  };

  useEffect(() => {
    if (user.kind === "Admin")
      getAllClassRooms().then((r) => {
        getAllStudents().then((resStudents) => {
          setStudents(resStudents.data);
          setClassRooms(r.data);
        });
      });
    else
      getClassRoomById(user.room_id._id).then((resClassRoom) => {
        studentsByClassRoom(user.room_id._id).then((resStudents) => {
          setStudents(resStudents.data);
          setClassRooms([resClassRoom.data]);
        });
      });
  }, [semester]);

  return (
    <div className="d-flex justify-content-start h-100 w-100">
      <div className="w-100 h-100">
        <div className="overflow-auto h-75">
          <div className="input-group p-3">
            <div className="form-floating mx-3 w-25">
              <select
                className="form-select "
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => {
                  setSemester(e.target.value);
                }}
              >
                <option defaultValue>??????...</option>

                <option value="??">?? </option>
                <option value="??">?? </option>
                <option value="??">?? </option>
              </select>
              <label htmlFor="floatingSelect">??????????</label>
            </div>
            <div className="form-floating mx-3 w-25">
              <select
                className="form-select "
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => {
                  user.kind === "Admin"
                    ? setSubStudents(
                        students.filter(
                          (student) => student.classRoom._id === e.target.value
                        )
                      )
                    : setSubStudents(students);
                }}
              >
                <option defaultValue>??????...</option>
                {classRooms.map((classRoom, index) => (
                  <option key={index} value={classRoom._id}>
                    {classRoom.id}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelect">????????</label>
            </div>
            <div className="form-floating mx-3 w-25">
              <select
                className="form-select "
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => {
                  setStudent(
                    students.find((student) => student.id === e.target.value)
                  );
                }}
              >
                <option defaultValue>??????...</option>
                {subStudents.map((student, index) => (
                  <option key={index} value={student.id}>
                    {student.fName + " " + student.lName}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelect">??????????????</label>
            </div>
          </div>
        </div>
        <div ref={resultsTable}>
          {student && (
            <div>
              <div>
                <span className="me-3 fw-bold">???? ?????????? : </span>
                <span>{student.fName + " " + student.lName}</span>
                <span className="me-3 fw-bold">?????????? ???????? : </span>
                <span>{student.id}</span>

                <span className="me-3 fw-bold">???????? : </span>
                <span>{student.classRoom.id}</span>

                <span className="me-3 fw-bold">???????? :</span>
                <span>
                  {student.classRoom.classRoomTeacher?.fName +
                    " " +
                    student.classRoom.classRoomTeacher?.lName}
                </span>
                <span className="me-3 fw-bold">?????????? : </span>
                <span>{semester}</span>
              </div>
              <h3 className="text-center text-decoration-underline m-3 text-primary">
                * ?????????? ???????????? *
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">????????</th>
                    <th scope="col">????????</th>
                    <th scope="col">?????????? ??????????????</th>
                    <th scope="col">????????</th>
                  </tr>
                </thead>
                <tbody>
                  {student.results.map((result, index) => {
                    if (result.semester === semester) {
                      return (
                        <tr key={index}>
                          <td>{result.lesson.subject.name}</td>
                          <td>{result.score}</td>
                          <td>{result.textScore}</td>
                          <td>{result.heged}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
                <tbody>
                  {getAverage() != "NaN" && (
                    <tr className="border text-danger fw-bold">
                      <td>??????????</td>
                      {<td>{getAverage()}</td>}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {student && (
          <button
            type="btn"
            className="btn btn-lg bg-primary my-2 text-light mx-2"
            onClick={handlePrint}
          >
            <span>
              <i className="bi bi-printer"></i>
            </span>
            ????????
          </button>
        )}
      </div>
    </div>
  );
};

export default Results;
