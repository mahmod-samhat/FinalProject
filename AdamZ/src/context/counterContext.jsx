import { useEffect, useState, useContext, createContext } from "react";
import classRoomService from "../services/classRoomServices";
import lessonService from "../services/lessonServices";
import studentService from "../services/studentServices";
import subjectService from "../services/subjectServices";
import teacherServices from "../services/teacherServices";

export const counterContext = createContext(null);
counterContext.displayName = "counter-context";

export const CounterProvider = ({ children }) => {
  const [teachersCounter, setTeachersCounter] = useState(null);
  const [studentsCounter, setStudentsCounter] = useState(null);
  const [classRoomsCounter, setClassRoomsCounter] = useState(null);
  const [subjectsCounter, setsubjectsCounter] = useState(null);
  const [lessonsCounter, setLessonsCounter] = useState(null);

  const increaseTeacherCounter = () => {
    setTeachersCounter(teachersCounter + 1);
  };
  const increaseStudentsCounter = () => {
    setStudentsCounter(studentsCounter + 1);
  };
  const increaseClassRoomsCounter = () => {
    setClassRoomsCounter(classRoomsCounter + 1);
  };
  const increaseLessonsCounter = () => {
    setLessonsCounter(lessonsCounter + 1);
  };
  const increaseSubjectsCounter = () => {
    setsubjectsCounter(subjectsCounter + 1);
  };
  const DecreaseTeacherCounter = () => {
    setTeachersCounter(teachersCounter - 1);
  };
  const DecreaseStudentsCounter = () => {
    setStudentsCounter(studentsCounter - 1);
  };
  const DecreaseClassRoomsCounter = () => {
    setClassRoomsCounter(classRoomsCounter - 1);
  };
  const DecreaseLessonsCounter = () => {
    setLessonsCounter(lessonsCounter - 1);
  };

  useEffect(() => {
    teacherServices.getAllTeachers().then((res) => {
      setTeachersCounter(res.data.length);
    });
    studentService.getAllStudents().then((res) => {
      setStudentsCounter(res.data.length);
    });
    classRoomService.getAllClassRooms().then((res) => {
      setClassRoomsCounter(res.data.length);
    });
    subjectService.getAllSubjects().then((res) => {
      setsubjectsCounter(res.data.length);
    });
    lessonService.getAllLessons().then((res) => {
      setLessonsCounter(res.data.length);
    });
  }, []);

  return (
    <counterContext.Provider
      value={{
        teachersCounter,
        studentsCounter,
        classRoomsCounter,
        subjectsCounter,
        lessonsCounter,
        increaseTeacherCounter,
        increaseStudentsCounter,
        increaseClassRoomsCounter,
        increaseLessonsCounter,
        increaseSubjectsCounter,
        DecreaseTeacherCounter,
        DecreaseStudentsCounter,
        DecreaseClassRoomsCounter,
        DecreaseLessonsCounter,
      }}
    >
      {children}
    </counterContext.Provider>
  );
};

export const useCounter = () => {
  return useContext(counterContext);
};
