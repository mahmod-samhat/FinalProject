import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import studentService from "../../../../services/studentServices";
import schoolInfo from "../../../../schoolInfo.json";
import { getAllClassRooms } from "../../../../services/classRoomServices";
const Students = () => {
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
    getAllStudents().then((res) => {
      setSubStudents(res.data);
      setStudents(res.data);
    });
    getAllClassRooms().then((res) => setClassRooms(res.data));
  }, []);
  return (
    <div className="d-flex justify-content-start h-100 w-100">
      <div className="w-100 h-100">
        <div className="overflow-auto h-75">
          <div class="input-group p-3">
            <div className="form-floating mx-3 w-25">
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
            </div>
            <div className="form-floating mx-3 w-25">
              <select
                className="form-select "
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => {
                  setSubStudents(
                    students.filter(
                      (student) => student.classRoom.id == e.target.value
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
      
      </div>

    
    </div>
  );
};
export default Students;
