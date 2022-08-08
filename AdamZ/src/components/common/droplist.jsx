import "../../css/main.css";
import { NavLink } from "react-router-dom";

const DropList = ({ title = "", titleIcon = "", items = [], icons = [] }) => {
  return (
    <span className="dropdown text-white nav-link">
      <span
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {titleIcon}
        {title}
      </span>

      <div
        className="dropdown-menu dropdown-menu-end text-end"
        aria-labelledby="dropdownMenuButton"
      >
        {items &&
          items.map((item, i) => {
            return (
              <div className="dropdown-item" key={item}>
                {/* <NavLink className=" text-decoration-none" to="addGrades"> */}
                <NavLink to="addGrades">
                  {icons[i]}
                  {item}
                </NavLink>
              </div>
            );
          })}
      </div>
    </span>
  );
};
export default DropList;
