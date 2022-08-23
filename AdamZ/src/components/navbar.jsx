import DropList from "./common/droplist";
import { NavLink, Link } from "react-router-dom";

import "../css/main.css";
const Navbar = () => {
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
                link="addScores"
              />
            </li>

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
            <li className="nav-item d-flex">
              <NavLink to="/check" className="nav-link text-white">
                <i className="bi bi-check"></i>check
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
