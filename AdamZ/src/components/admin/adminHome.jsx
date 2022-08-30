import BoxTitle from "./boxTitle";
import { Navigate } from "react-router-dom";
import AdminNav from "./adminNav";
const AdminHome = () => {
  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-row flex-wrap justify-content-center h-25 pt-2">
        <BoxTitle
          title="תלמידים"
          iconClass="bi bi-mortarboard"
          counter={462}
          bgColor="bg-success"
          link="/students"
        />

        <BoxTitle
          title="מורים"
          iconClass="bi bi-person-check"
          counter={54}
          bgColor="bg-info"
          link="/teachers"
        />
        <BoxTitle
          title="כיתות"
          iconClass="bi bi-person-video2"
          counter={460}
          bgColor="bg-warning"
          link="/classRooms"
        />

        <BoxTitle
          title="מקצועות"
          iconClass="bi bi-journal-medical"
          counter={51}
          bgColor="bg-primary"
          link="/subjects"
        />
        <BoxTitle
          title="שיעורים"
          iconClass="bi bi-pencil"
          counter={765}
          bgColor="bg-gradient-info"
          link="/lessons"
        />
      </div>
      <div className="card bg-dark text-white h-100 m-4">
        <img
          src="https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="card-img"
          alt="..."
          height="250px"
        />
        <div className="card-img-overlay">
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
            <span className="card-title position-absolute top-0 end-0 p-2">
              שלום <span className="fw-bold fs-5 ">מחמוד סמחאת</span>, ברוך הבא
              בגרסה החדשה של מערכת אדאמז
            </span>
            <h3 className="card-text">ברוך הבא במערכת אדאמז</h3>
            <span>
              מאחל לך עבודה נעימה תודה שבחרת במערכת ,תהנו בכלים החדשים
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
