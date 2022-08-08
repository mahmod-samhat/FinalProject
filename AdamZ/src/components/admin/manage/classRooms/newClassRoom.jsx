import { useState } from "react";
import { createClassRoom } from "../../../../services/classRoomServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import schoolInfo from "../../../../schoolInfo.json";

const NewClassRoom = () => {
  const [error, setError] = useState("");
  const [grade, setGrade] = useState("");
  const [classRoom, setClassRoom] = useState("");
  const navigate = useNavigate();

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
                <option selected>שכבה</option>

                {schoolInfo.grades.map((g) => (
                  <option value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  {grade ? grade + "-" : "שכבה-"}
                </span>
              </div>
              <div className="form-floating w-50 ">
                <select
                  className="form-select"
                  onChange={(e) => {
                    console.log(grade + "-" + e.target.value);
                    setClassRoom(grade + "-" + e.target.value);
                  }}
                >
                  <option selected>כיתה</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-floating">
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
            type="submit"
            className="btn btn-lg my-2 text-primary"
            onClick={() => {
              createClassRoom({ grade, id: classRoom })
                .then((res) => {
                  navigate(-1);
                })
                .catch((err) => {
                  setError("כיתה כבר נמצאת במערכת");
                });
            }}
          >
            <span>
              <i class="bi bi-plus-lg"></i>
            </span>
            הוסף
          </button>
          <button
            className="btn btn-lg my-2 text-danger"
            onClick={() => navigate(-1)}
          >
            <span>
              <i class="bi bi-x-lg"></i>
            </span>
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewClassRoom;
