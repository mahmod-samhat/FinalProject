import httpService from "./httpServices";

export function createStudent(student) {
  return httpService.post("/students/newstudent", student);
}
export async function getAllStudents() {
  return httpService.get("/students");
}
export async function studentsByClassRoom(_id) {
  return httpService.get(`/students/studentsByClassRoom/${_id}`);
}
export function getStudentById(id) {
  return httpService.get(`/students/studentById/${id}`);
}
export function deleteStudent(student) {
  return httpService.delete(`/students/delete/${student._id}`);
}
export function updateStudent(student) {
  return httpService.put(`/students/update/${student.id}`, student);
}
const studentService = {
  updateStudent,
  deleteStudent,
  createStudent,
  getStudentById,
  getAllStudents,
  studentsByClassRoom
};
export default studentService;
