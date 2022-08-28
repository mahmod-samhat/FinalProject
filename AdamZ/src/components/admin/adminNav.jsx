import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <div
      className="d-flex flex-column p-3 bg-light h-100"
      style={{ width: "15rem" }}
    >
      <i className="bi me-2" width="40" height="32"></i>
      <span className="fs-5">ניהול מערכת</span>

      <hr className="m-2" />
      <ul className="nav flex-column mb-auto pe-2">
        <li className="hover">
          <NavLink to="/teachers" className="nav-link link-dark">
            <i className="bi me-2" width="16" height="16"></i>
            מורים
          </NavLink>
        </li>
        <li className="hover">
          <NavLink to="/students" className="nav-link link-dark">
            <i className="bi me-2" width="16" height="16"></i>
            תלמידים
          </NavLink>
        </li>
        <li className="hover">
          <NavLink to="/classRooms" className="nav-link link-dark">
            <i className="bi me-2" width="16" height="16"></i>
            כיתות
          </NavLink>
        </li>
        <li className="hover">
          <NavLink to="/subjects" className="nav-link link-dark">
            <i className="bi me-2" width="16" height="16"></i>
            מקצועות
          </NavLink>
        </li>
        <li className="hover">
          <NavLink to="/lessons" className="nav-link link-dark">
            <i className="bi me-2" width="16" height="16"></i>
            שיעורים
          </NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
};
export default AdminNav;
