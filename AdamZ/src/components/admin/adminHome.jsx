import WellcomeHeader from "../common/wellcomeHeader";
import BoxTitle from "./boxTitle";
import { Navigate } from "react-router-dom";
const AdminHome = () => {
  return (
    <div class="w-100 h-100">
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
          title="אירועים"
          iconClass="bi bi-journal-medical"
          counter={51}
          bgColor="bg-primary"
          link="/events"
        />
        <BoxTitle
          title="שיעורים"
          iconClass="bi bi-pencil"
          counter={765}
          bgColor="bg-gradient-info"
          link="/subjects"
        />
      </div>
      <div>
        <WellcomeHeader />
      </div>
    </div>
  );
};
export default AdminHome;
