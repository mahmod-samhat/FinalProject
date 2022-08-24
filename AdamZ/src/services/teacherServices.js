import httpService from "./httpServices";


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
  
  getAllTeachers,
  teachersBySubject,
  getTeachersById,
  deleteTeacher,
  updateTeacher,
};
export default teacherService;
