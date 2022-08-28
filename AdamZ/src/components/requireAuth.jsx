import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Teachers from "./admin/manage/teachers/teachers";
import MainHome from "./mainHome";

const RequireAuth = ({ children }) => {
  const { teacher, isLoggedIn, updateTeacherContext } = useAuth();
  console.log("from RequireAuth teacher is", teacher);
  const loggedIn = isLoggedIn();
  return loggedIn ? (
    <MainHome>{children}</MainHome>
  ) : (
    <Navigate to="/logIn" replace />
  );
};
export default RequireAuth;
