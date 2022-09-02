import { useState, createContext, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import AdminNav from "./admin/adminNav";
import { Header } from "./header";
import Navbar from "./navbar";
export const showLogInContext = createContext(true);
const MainHome = ({ children }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleOnIdle = () => {
    logout();
    updateLogInState(false);
    updateIsAdminState(false);
    navigate("/logIn");
  };

  useIdleTimer({
    timeout: 4 * 60 * 60 * 1000,
    onIdle: handleOnIdle,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function updateLogInState(value) {
    setIsLoggedIn(value);
  }

  function updateIsAdminState(value) {
    setIsAdmin(value);
  }
  return (
    <>
      <div className="app min-vh-100">
        {user && (
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
          {user?.kind == "Admin" && <AdminNav />}
          {children}
        </div>
      </div>
    </>
  );
};
export default MainHome;
