import { useEffect, useState } from "react";
import { setClassRoomTeacher } from "../../../../services/classRoomServices";
import { getAllTeachers } from "../../../../services/teacherServices";

const ClassRoomTeacher = ({ classRoom, text }) => {
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    getAllTeachers().then((res) => {
      const availableTeachers = res.data.filter((teacher) => !teacher.room_id);
      setTeachers(availableTeachers);
    });
  }, []);
  return (
    <>
      <button
        type="button"
        className="btn btn-link btn-rounded"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <span>
          <i className="bi bi-magic"></i>
        </span>
        {text}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " data-direction="right">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                שפץ מחנך לכיתה
              </h5>
              <button
                type="button"
                className="btn-close ms-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              בחר מחנך לכיתה :
              <span className="badge bg-success fs-5">{classRoom?.id}</span>
              <div>
                <form>
                  <div id="group1" className="w-50 p-3">
                    {teachers.map((teacher) => {
                      return (
                        <div
                          className="form-check"
                          onClick={() => {
                            console.log(teacher);
                            console.log(classRoom);
                            setTeacher(teacher);
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id={teacher.id}
                          />
                          <label className="form-check-label" for={teacher.id}>
                            <div classNameName="d-flex align-items-center">
                              <img
                                src="https://akim.org.il/wp-content/uploads/2019/09/akim_pics-15.png"
                                alt=""
                                style={{
                                  width: "45px",
                                  height: "45px",
                                }}
                                className="rounded-circle"
                              />
                              <p className="fw-bold mb-1">
                                {teacher.fName + " " + teacher.lName}
                              </p>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                ביטול
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  teacher
                    ? setClassRoomTeacher(classRoom, teacher._id)
                    : alert("תבחר מחנך לכיתה!!");
                }}
              >
                שפץ מחנך
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassRoomTeacher;
