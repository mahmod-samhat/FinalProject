import "./App.css";
import { Header } from "./components/header";
import AdminNav from "./components/admin/adminNav";
import Navbar from "./components/navbar";
import Home from "./components/home";
import AddGrades from "./components/grades/addGrades";
import Teachers from "./components/admin/manage/teachers/teachers";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";

import LogIn from "./components/logIn/logIn";
import { createContext } from "react";
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
import Check from "./components/check";
export const showLogInContext = createContext(true);
export const updateYear = createContext(null);

function App() {
  const handleOnIdle = () => console.log("OnIdle idle");

  useIdleTimer({
    timeout: 4 * 60 * 60 * 1000,
    onIdle: handleOnIdle,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [yearState, setyearState] = useState("2021");
  const [isAdmin, setIsAdmin] = useState(false);

  function updateLogInState(value) {
    setIsLoggedIn(value);
  }

  function setYear(year) {
    setyearState(year);
  }

  function updateIsAdminState(value) {
    setIsAdmin(value);
  }

  return !isLoggedIn ? (
    <LogIn
      updateLogInState={updateLogInState}
      updateIsAdminState={updateIsAdminState}
    />
  ) : (
    <updateYear.Provider
      value={{ currentYear: yearState, setCurrentYear: setYear }}
    >
      <div className="app min-vh-100">
        <Header
          updateLogInState={updateLogInState}
          updateIsAdminState={updateIsAdminState}
        />
        <Navbar />
        <div className="d-flex h-100">
          {isAdmin && <AdminNav />}

          <Routes>
            <Route
              path="/"
              exact
              element={isAdmin ? <AdminHome /> : <Home />}
            />
            <Route path="/addScores" element={<AddGrades />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/profile/:id" element={<TeacherProfile />} />
            <Route path="/classRooms" element={<ClassRooms />} />
            <Route path="/addTeacher" element={<NewTeacher />} />
            <Route path="/newClassRoom" element={<NewClassRoom />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/newSubject" element={<NewSubject />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/profile/:id" element={<StudentProfile />} />

            <Route path="/newStudent" element={<NewStudent />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/check" element={<Check />} />
          </Routes>
        </div>
      </div>
    </updateYear.Provider>
  );
}

export default App;
