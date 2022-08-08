import httpService from "./httpServices";
export function createLesson(lesson) {
  return httpService.post("/lessons/newlesson", lesson);
}
export async function getAllLessons() {
  return httpService.get("/lessons");
}
export async function deleteLesson(lesson) {
  return httpService.delete(`/lessons/delete/${lesson._id}`);
}
const lessonService = {
  createLesson,
  deleteLesson,
  getAllLessons,
};
export default lessonService;
