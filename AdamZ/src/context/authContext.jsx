import { useEffect, useState, useContext, createContext } from "react";
import teacherServices from "../services/teacherServices";
import authServices from "../services/authServices";

export const authContext = createContext(null);
authContext.displayName = "auth-context";

// const createUser = (user) => {
//   return usersService.createUser(user);
// };

export const AuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);

  const refreshTeacher = (teacher) => {
    setTeacher(teacher);
  };
  const login = async (credentials) => {
    const token = await authServices.loginTeacher(credentials);
    const teacher = authServices.getTeacher(token);
    refreshTeacher(teacher);
    return teacher;
  };

  const logout = () => {
    authServices.logout();
    refreshTeacher();
  };

  useEffect(() => {
    refreshTeacher();
  }, []);

  return (
    <authContext.Provider value={{ login, logout, teacher }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
