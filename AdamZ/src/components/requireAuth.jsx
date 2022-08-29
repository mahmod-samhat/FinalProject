import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Teachers from "./admin/manage/teachers/teachers";
import MainHome from "./mainHome";

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const loggedIn = isLoggedIn();
  return loggedIn ? (
    <MainHome>{children}</MainHome>
  ) : (
    <Navigate to="/logIn" replace />
  );
};
export default RequireAuth;
