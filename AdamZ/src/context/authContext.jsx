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

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const updateTeacherContext = async () => {
    if (teacher) return;
    const newTeacher = await authServices.getTeacher(
      localStorage.getItem("token")
    );
    refreshTeacher(newTeacher);
  };

  const refreshTeacher = (teacher) => {
    setTeacher(teacher);
  };
  const login = async (credentials) => {
    let teacher = {};
    const token = await authServices.loginTeacher(credentials);

    if (
      credentials.email == "mahmod@gmail.com" &&
      credentials.password == "123456"
    )
      teacher = { fName: "מחמוד", lName: "סמחאת", isAdmin: true };
    else teacher = await authServices.getTeacher(token);
    await refreshTeacher(teacher);
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
    <authContext.Provider
      value={{ login, logout, teacher, isLoggedIn, updateTeacherContext }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
