import { useContext } from "react";
import { useAuth } from "../context/authContext";
const Home = () => {
  const { teacher } = useAuth();
  return (
    <div className="wellcome">
      <span>
        שלום
        <span className="fw-bold fs-5">
          
          {teacher.fName} {teacher.lName}
        </span>
        , ברוך הבא בגרסה החדשה של מערכת אדאמז
      </span>
      <div className="wellcome-card">
        <h3>ברוך הבא במערכת אדאמז</h3>
        <span>מאחל לך עבודה נעימה תודה שבחרת במערכת ,תהנו בכלים החדשים</span>
      </div>
    </div>
  );
};
export default Home;
