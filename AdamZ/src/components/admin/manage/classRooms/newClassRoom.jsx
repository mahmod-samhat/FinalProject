import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCounter } from "../../../../context/counterContext";

import { createClassRoom } from "../../../../services/classRoomServices";
import { useNavigate } from "react-router-dom";
import schoolInfo from "../../../../schoolInfo.json";

const NewClassRoom = () => {
  const [isValidInputs, setIsValidInputs] = useState(false);
  const { increaseClassRoomsCounter } = useCounter();
  const [error, setError] = useState("");
  const [grade, setGrade] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    grade && classRoom && setIsValidInputs(true);
  }, [grade, classRoom]);

  return (
    <div className="w-75 p-3">
      <u>
        <h4>הוספת כיתה חדשה למערכת</h4>
      </u>
      <div className="container p-3 w-50">
        {error && <div className="alert alert-danger fs-5">{error}</div>}
        <div className="w-100">
          <div className="d-flex justify-content-center w-100">
            <div className="form-floating w-50 mx-5">
              <select
                className="form-select"
                onChange={(e) => setGrade(e.target.value)}
              >
                <option defaultValue>שכבה</option>

                {schoolInfo.grades.map((g, i) => (
                  <option key={i} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  {grade ? grade + "-" : "שכבה-"}
                </span>
              </div>
              <div className="form-floating w-50 ">
                <select
                  className="form-select"
                  onChange={(e) => {
                    setClassRoom(grade + "-" + e.target.value);
                  }}
                >
                  <option defaultValue>כיתה</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control h-50"
              placeholder="Leave a comment here"
              id="floatingTextarea"
            ></textarea>
            <label htmlFor="floatingTextarea">הערות</label>
          </div>
        </div>

        <div className="text-center text-lg pt-2">
          <button
            disabled={!isValidInputs}
            type="submit"
            className="btn btn-lg my-2 text-primary"
            onClick={() => {
              createClassRoom({ grade, id: classRoom })
                .then((res) => {
                  toast.info("👍 נשמר בהצלחה");
                  increaseClassRoomsCounter()
                  navigate("/classRooms");
                })
                .catch((err) => {
                  setError("כיתה כבר נמצאת במערכת");
                });
            }}
          >
            <span>
              <i className="bi bi-plus-lg"></i>
            </span>
            הוסף
          </button>
          <button
            className="btn btn-lg my-2 text-danger"
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
export default NewClassRoom;
