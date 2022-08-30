import "../../css/main.css";
import { NavLink, useLinkClickHandler } from "react-router-dom";

const DropList = ({
  title = "",
  titleIcon = "",
  items = [],
  icons = [],
  link,
}) => {
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
                <NavLink to={link}>
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
