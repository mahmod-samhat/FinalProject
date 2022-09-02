import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import AdminNav from "./admin/adminNav";
import { Header } from "./header";
import Navbar from "./navbar";
const MainHome = ({ children }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleOnIdle = () => {
    logout();
    navigate("/logIn");
  };

  useIdleTimer({
    timeout: 4 * 60 * 60 * 1000,
    onIdle: handleOnIdle,
  });

  return (
    <>
      <div className="app min-vh-100">
        {user && (
          <>
            <Header />
            <Navbar />
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
