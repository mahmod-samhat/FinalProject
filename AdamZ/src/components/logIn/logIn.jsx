import MainLogIn from "./mainLogIn";
import { Route, Routes } from "react-router-dom";
import NewPassword from "./newPassword";
import Footer from "../footer";
import AboutUs from "../aboutUs";

const LogInComponent = ({ updateLogInState, updateIsAdminState }) => {
  return (
    <div className="vh-100">
      <div className="container h-custom">
        <Routes>
          <Route
            path="/"
            element={
              <MainLogIn
                updateLogInState={updateLogInState}
                updateIsAdminState={updateIsAdminState}
              />
            }
          ></Route>
          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
      </div>

      <Footer></Footer>
    </div>
  );
};
export default LogInComponent;
