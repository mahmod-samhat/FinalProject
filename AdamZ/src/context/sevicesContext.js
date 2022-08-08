import { useEffect, useState, useContext, createContext } from "react";
import teacherServices from "../services/teacherServices";

export const servicesContext = createContext(null);
servicesContext.displayName = "services-context";

// const createUser = (user) => {
//   return usersService.createUser(user);
// };

export const ServicesProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);

  return <servicesContext.Provider>{children}</servicesContext.Provider>;
};
