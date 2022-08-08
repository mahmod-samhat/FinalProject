import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import usersService from "../../../../services/teacherServices";
const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const { getAllTeachers } = usersService;
  const navigate = useNavigate();
  useEffect(() => {
    getAllTeachers().then((res) => {
      setAllTeachers(res.data);
      setTeachers(res.data);
    });
  }, []);
  return (
    <div className="d-flex justify-content-start h-100 w-100">
      <div className="w-100" style={{ height: "100vh" }}>
        <div class="input-group p-3">
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => navigate("/addTeacher")}
          >
            <i class="bi bi-person-plus"></i> מורה חדש
          </button>
          <div class="form-outline me-auto">
            <input
              type="search"
              placeholder="חיפוש מורה"
              id="form1"
              class="form-control"
              // onBlur={(e) => setTeachers(allTeachers)}
              onChange={(e) => {
                setTeachers(
                  allTeachers.filter(
                    (teacher) =>
                      teacher.fName.includes(e.target.value) ||
                      teacher.id.includes(e.target.value)
                  )
                );
              }}
            />
          </div>
          <button type="button" class="btn">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <div className="overflow-auto h-75">
          <table
            className="table align-middle caption-top mb-0 bg-white"
            style={{ height: "500px" }}
          >
            <caption className="text-center fs-5 pt-0">רשימת מורים</caption>
            <thead className="bg-light">
              <tr>
                <th>מורה</th>
                <th>יצירת קשר</th>
                <th>מחנך</th>
                <th>מקצוע</th>
                <th>עדכון</th>
              </tr>
            </thead>
            <tbody>
              {teachers &&
                teachers.map((teacher) => {
                  return (
                    <tr
                      onClick={() => setTeacher(teacher)}
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
                              {teacher.fName + " " + teacher.lName}
                            </p>
                            <p className="text-muted mb-0">{teacher.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{teacher.phone}</p>
                        <p className="text-muted mb-0">{teacher.adress}</p>
                      </td>
                      <td>
                        {teacher.room_id ? (
                          <i class="bi bi-check-circle text-success"></i>
                        ) : (
                          <i class="bi bi-x-circle text-danger"></i>
                        )}
                      </td>
                      <td>{teacher.subject.name}</td>
                      <td>{teacher.updatedAt}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {teacher && (
        <div className="card m-4 bg-light w-50 h-75">
          <div class="card-body">
            <div className="d-flex">
              <div>
                <u>
                  <h5 class="card-title">
                    {teacher.fName + " " + teacher.lName}
                  </h5>
                </u>
                <p class="card-text">{teacher.id}</p>
                <p class="card-text fw-bold">
                  <span class="badge bg-success"> {teacher.subject.name}</span>
                </p>
              </div>
              <img
                src={teacher.imageURL}
                class="card-img-end me-auto h-50 w-50"
                alt="..."
              />
            </div>
          </div>

          <ul class="list-group list-group-flush ">
            <div className="d-flex m-2">
              <i class="bi bi-telephone"></i>
              <p class="card-text">{teacher.phone}</p>
            </div>
            <div className="d-flex m-2">
              <i class="bi bi-envelope"></i>
              <p class="card-text">{teacher.email}</p>
            </div>
            <div className="d-flex m-2">
              <i class="bi bi-geo-alt-fill"></i>
              <p class="card-text">{teacher.adress}</p>
            </div>
          </ul>
          <div class="card-body fw-bold">
            {teacher.room_id && (
              <li class="list-group-item">{teacher.room_id.id}</li>
            )}
          </div>
          <div class="card-body text-center">
            <NavLink to={`profile/${teacher.id}`} className="card-link mx-2">
              <i className="bi bi-pencil"></i>
              עריכה
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
export default Teachers;