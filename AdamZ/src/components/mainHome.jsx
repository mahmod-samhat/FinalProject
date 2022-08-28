import { useState, createContext, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../context/authContext";
import AdminHome from "./admin/adminHome";
import AdminNav from "./admin/adminNav";
import { Header } from "./header";
import Navbar from "./navbar";
export const showLogInContext = createContext(true);
export const updateYear = createContext(null);
const MainHome = ({ children }) => {
  //   const navigate = useNavigate();
  const { logout, teacher } = useAuth();

  const handleOnIdle = () => {
    logout();
    updateLogInState(false);
    updateIsAdminState(false);
    // navigate("/logIn");
  };

  useIdleTimer({
    timeout: 4 * 60 * 60 * 1000,
    onIdle: handleOnIdle,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [yearState, setyearState] = useState("2021");
  const [isAdmin, setIsAdmin] = useState(false);

  function updateLogInState(value) {
    setIsLoggedIn(value);
  }

  function setYear(year) {
    setyearState(year);
  }

  function updateIsAdminState(value) {
    setIsAdmin(value);
  }
  return (
    <updateYear.Provider
      value={{ currentYear: yearState, setCurrentYear: setYear }}
    >
      <div className="app min-vh-100">
        {teacher && (
          <>
            <Header
              updateLogInState={updateLogInState}
              updateIsAdminState={updateIsAdminState}
            />
            <Navbar
              updateLogInState={updateLogInState}
              updateIsAdminState={updateIsAdminState}
            />
          </>
        )}

        <div className="d-flex h-100">
          {teacher?.isAdmin && <AdminNav />}
          {children}
        </div>
      </div>
      <ToastContainer />
    </updateYear.Provider>
  );
};
export default MainHome;
