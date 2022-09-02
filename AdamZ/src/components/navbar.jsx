import DropList from "./common/droplist";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import "../css/main.css";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-sm navbar-light shadow-sm bg-primary"
      aria-label="Third navbar example"
    >
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          <span className="m-2">
            AdamZ <i className="bi bi-stack"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav mx-auto ">
            <li className="nav-item d-flex">
              <NavLink to="/" className="nav-link text-white">
                <i className="bi bi-house-door"></i>
                דף ראשי
              </NavLink>
            </li>
            <li className="nav-item d-flex">
              <DropList
                title={"ציונים"}
                titleIcon={<i className="bi bi-mortarboard-fill"></i>}
                items={["הציונים התקופתיים"]}
                icons={[<i className="bi bi-pencil"></i>]}
                link="/addScores"
              />
            </li>
            {(user.kind == "Admin" || user.room_id) && (
              <>
                <li className="nav-item d-flex">
                  <NavLink to="/students" className="nav-link text-white">
                    <i className="bi bi-people-fill"></i>
                    תיק כיתה
                  </NavLink>
                </li>
                <li className="nav-item d-flex">
                  <NavLink to="/scores" className="nav-link text-white">
                    <i className="bi bi-file-earmark-text"></i>תעודות
                  </NavLink>
                </li>
                <li className="nav-item d-flex d-sm-none">
                  <button
                    className="btn text-white bg-danger"
                    onClick={() => {
                      logout();
                      navigate("/logIn");
                    }}
                  >
                    <i className="bi bi-door-open"></i>
                    יציאה
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
