import "../../css/boxTitle.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BoxTitle = ({ title, counter, iconClass, bgColor, link }) => {
  const navigate=useNavigate()
  return (
    <div
      className={`box-title button zoom color-white d-flex ${bgColor}`}
      style={{ color: "white", width: "18%" }}
      onClick={() => navigate(link)}
    >
      <div
        className="d-flex flex-column justify-content-center text-center"
        style={{ width: "65%" }}
      >
        <h5>{title}</h5>
        <h3 className="fw-bold">{counter}</h3>
      </div>
      <div
        className="display-4 text-center"
        style={{
          fontWeight: "1px",
          width: "35%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <i className={`bi bi-${iconClass}`}></i>
      </div>
    </div>
  );
};
export default BoxTitle;
