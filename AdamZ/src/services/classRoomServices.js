import httpService from "./httpServices";

export function createClassRoom(classRoom) {
  return httpService.post("/classRooms/newclassRoom", classRoom);
}
export async function getAllClassRooms() {
  return httpService.get("/classRooms");
}
export function deleteClassRoom(id) {
  return httpService.delete(`/classRooms/delete/${id}`);
}
export function setClassRoomTeacher(classRoom, teacher_id) {
  return httpService.patch(`/classRooms/setClassRoomTeacher/${classRoom._id}`, {
    teacher_id,
  });
}

const classRoomService = {
  setClassRoomTeacher,
  createClassRoom,
  deleteClassRoom,
  getAllClassRooms,
};
export default classRoomService;
