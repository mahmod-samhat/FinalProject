import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import MainHome from "./mainHome";
import { CounterProvider } from "../context/counterContext";

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const loggedIn = isLoggedIn();
  return loggedIn ? (
    <CounterProvider>
      <MainHome>{children}</MainHome>
    </CounterProvider>
  ) : (
    <Navigate to="/logIn" replace />
  );
};
export default RequireAuth;
