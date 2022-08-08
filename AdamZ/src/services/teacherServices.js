import httpService from "./httpServices";
import jwtDecode from "jwt-decode";
const TOKEN_KEY = "token";
setTokenHeader();

export async function loginTeacher(credentials) {
  const { data } = await httpService.post("teachers/logIn", credentials);
  localStorage.setItem(TOKEN_KEY, data.token);
  setTokenHeader();
  return data.token;
}
export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}
function setTokenHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export function getTeacher(token) {
  try {
    const teacher = jwtDecode(token);
    return teacher;
  } catch {
    return "err: invalid token!!";
  }
}
export function createTeacher(teacher) {
  return httpService.post("/teachers/newTeacher", teacher);
}
export function getTeachersById(id) {
  return httpService.get(`/teachers/teacherById/${id}`);
}
export function deleteTeacher(id) {
  return httpService.delete(`/teachers/delete/${id}`);
}

export function updateTeacher(teacher) {
  return httpService.put(`/teachers/update/${teacher.id}`, teacher);
}
export async function getAllTeachers() {
  return httpService.get("/teachers");
}
export async function teachersBySubject(subjectName) {
  return httpService.get(`/teachers`);
}
const teacherService = {
  createTeacher,
  loginTeacher,
  logout,
  getTeacher,
  getAllTeachers,
  teachersBySubject,
  getTeachersById,
  deleteTeacher,
  updateTeacher,
};
export default teacherService;
