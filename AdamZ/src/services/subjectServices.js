import httpService from "./httpServices";

export function createSubject(subject) {
  return httpService.post("/subjects/newSubject", subject);
}
export async function getAllSubjects() {
  return httpService.get("/subjects");
}

export function deleteSubject(id) {
  return httpService.delete(`/subjects/delete/${id}`);
}
export function updateSubject(subject) {
  return httpService.put(`/subjects/update/${subject._id}`, subject);
}
const subjectService = {
  createSubject,
  deleteSubject,
  updateSubject,

  getAllSubjects,
};
export default subjectService;
