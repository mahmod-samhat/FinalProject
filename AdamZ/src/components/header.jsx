import Dropdown from "./common/dropdown";
import scoolInfo from "../schoolInfo.json";
import "../css/main.css";
import { updateYear } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
export const Header = ({ updateLogInState, updateIsAdminState }) => {
  const { logout } = useAuth();

  const currentyear = useContext(updateYear);

  const navigate = useNavigate();

  return (
    <div className="container-fluid header h-25">
      <h3 className="m-2">
        AdamZ <i className="bi bi-stack"></i>
      </h3>
      <ul className="d-flex">
        <Dropdown items={[scoolInfo.name]} />
        <Dropdown
          items={["2021/2022", "2022/2023"]}
          onChange={currentyear.setCurrentYear}
        />
      </ul>
      <ul className="d-flex me-auto sm-0 mt-2">
        <h4>
          <i className="bi bi-gear mx-2"></i>
          <i className="bi bi-globe mx-2"></i>
          <i className="bi bi-arrows-fullscreen mx-2"></i>
          <i className="bi bi-grid-3x3-gap mx-2"></i>

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle mx-2"></i>
            </button>
            <ul
              className="dropdown-menu bg-light"
              onClick={() => {
                logout();
                updateLogInState(false);
                updateIsAdminState(false);
                navigate("/");
              }}
            >
              <li>
                <button className="dropdown-item" type="button">
                  יציאה
                  <i className="bi bi-door-open"></i>
                </button>
              </li>
            </ul>
          </div>
        </h4>
      </ul>
    </div>
  );
};
