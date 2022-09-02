import { useEffect, useState, useContext, createContext } from "react";
import teacherServices from "../services/teacherServices";
import authServices from "../services/authServices";
import schoolInfo from "../schoolInfo.json";

export const authContext = createContext(null);
authContext.displayName = "auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const updateUserContext = async () => {
    if (user) return;
    const newUser = await authServices.getUser(
      localStorage.getItem("token")
    );
    refreshUser(newUser);
  };

  const refreshUser = (user) => {
    setUser(user);
  };
  const login = async (credentials) => {
    const token = await authServices.loginTeacher(credentials);
    const user = await authServices.getUser(token);
    await refreshUser(user);
    return user;
  };

  const logout = () => {
    authServices.logout();
    refreshUser();
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <authContext.Provider
      value={{ login, logout, user, isLoggedIn, updateUserContext }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
