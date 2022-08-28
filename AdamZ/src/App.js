import "./App.css";
import { Header } from "./components/header";
import AdminNav from "./components/admin/adminNav";
import Navbar from "./components/navbar";
import Home from "./components/home";
import AddGrades from "./components/grades/addGrades";
import Teachers from "./components/admin/manage/teachers/teachers";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Switch, Navigate } from "react-router-dom";

import { useIdleTimer } from "react-idle-timer";
import { useAuth } from "./context/authContext";

import LogIn from "./components/logIn/logIn";
import NewTeacher from "./components/admin/manage/teachers/NewTeacher";
import AdminHome from "./components/admin/adminHome";
import NewClassRoom from "./components/admin/manage/classRooms/newClassRoom";
import ClassRooms from "./components/admin/manage/classRooms/ClassRooms";
import Students from "./components/admin/manage/students/students";
import NewStudent from "./components/admin/manage/students/newStudent";
import Subjects from "./components/admin/manage/subjects/subjects";
import NewSubject from "./components/admin/manage/subjects/newSubject";
import Lessons from "./components/admin/manage/lessons/lessons";
import TeacherProfile from "./components/admin/manage/teachers/profile";
import StudentProfile from "./components/admin/manage/students/profile";
import Scores from "./components/grades/Results";
import { ToastContainer } from "react-toastify";
import MainHome from "./components/mainHome";
import RequireAuth from "./components/requireAuth";
import AboutUs from "./components/aboutUs";

function App() {
  const { teacher, updateTeacherContext, isLoggedIn } = useAuth();

  useEffect(() => {
    isLoggedIn() && updateTeacherContext();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/logIn" element={<LogIn />} />
        {/* <Route path="/" element={isLoggedIn ?<LogIn />} /> */}
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route
          path="/home"
          element={
            teacher?.isAdmin ? (
              <RequireAuth>
                <AdminHome />
              </RequireAuth>
            ) : (
              <RequireAuth>
                <Home />
              </RequireAuth>
            )
          }
        />
        <Route
          path="/addScores"
          element={
            <RequireAuth>
              <AddGrades />
            </RequireAuth>
          }
        />
        <Route
          path="/teachers"
          element={
            <RequireAuth>
              <Teachers />
            </RequireAuth>
          }
        />
        <Route
          path="/students"
          element={
            <RequireAuth>
              <Students />
            </RequireAuth>
          }
        />
        <Route
          path="/classRooms"
          element={
            <RequireAuth>
              <ClassRooms />
            </RequireAuth>
          }
        />
        <Route
          path="/teachers/profile/:id"
          element={
            <RequireAuth>
              <TeacherProfile />
            </RequireAuth>
          }
        />
        <Route
          path="addTeacher"
          element={
            <RequireAuth>
              <NewTeacher />
            </RequireAuth>
          }
        />
        <Route
          path="/newClassRoom"
          element={
            <RequireAuth>
              <NewClassRoom />
            </RequireAuth>
          }
        />
        <Route
          path="/subjects"
          element={
            <RequireAuth>
              <Subjects />
            </RequireAuth>
          }
        />
        <Route
          path="/newSubject"
          element={
            <RequireAuth>
              <NewSubject />
            </RequireAuth>
          }
        />
        <Route
          path="/newStudent"
          element={
            <RequireAuth>
              <NewStudent />
            </RequireAuth>
          }
        />
        <Route
          path="/students/profile/:id"
          element={
            <RequireAuth>
              <StudentProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/lessons"
          element={
            <RequireAuth>
              <Lessons />
            </RequireAuth>
          }
        />
        <Route
          path="/scores"
          element={
            <RequireAuth>
              <Scores />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
