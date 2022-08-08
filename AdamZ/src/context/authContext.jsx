import { useEffect, useState, useContext, createContext } from "react";
import teacherServices from "../services/teacherServices";

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
    const token = await teacherServices.loginTeacher(credentials);
    const teacher = teacherServices.getTeacher(token);
    refreshTeacher(teacher);
    return teacher;
  };

  const logout = () => {
    teacherServices.logout();
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
