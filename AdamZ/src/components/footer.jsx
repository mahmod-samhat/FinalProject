import { NavLink } from "react-router-dom";
import "../css/main.css";
const Footer = () => {
  return (
    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
      <div className="text-white mb-3 mb-md-0">
        Copyright © 2022. All rights reserved.
      </div>
      <div>
        <NavLink to="/aboutUs" className="text-white mx-2">
          <span className="mx-5">AboutUs</span>||
        </NavLink>
        <NavLink to="/#!" className="text-white mx-2">
          <i className="bi bi-facebook"></i>
        </NavLink>

        <NavLink to="/#!" className="text-white mx-2">
          <i className="bi bi-twitter"></i>
        </NavLink>
        <NavLink to="/#!" className="text-white mx-2">
          <i className="bi bi-google"></i>
        </NavLink>
        <NavLink to="/#!" className="text-white mx-2">
          <i className="bi bi-linkedin"></i>
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
