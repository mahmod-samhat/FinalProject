import httpService from "./httpServices";
import jwtDecode from "jwt-decode";
const TOKEN_KEY = "token";
setTokenHeader();

export async function loginTeacher(credentials) {
  const { data } = await httpService.post("auth/logIn", credentials);
  localStorage.setItem(TOKEN_KEY, data.token);
  setTokenHeader();
  return data.token;
}
export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}
function setTokenHeader() {
  httpService.setCommonHeader("x-access-token", getJWT());
}
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
}

export async function getTeacher(token) {
  try {
    const teacherToken = jwtDecode(token);
    const { data } = await httpService.get(
      `/teachers/teacherById/${teacherToken._id}`
    );
    return data;
  } catch {
    return "err: invalid token!!";
  }
}
export function forgotPassword(email) {
  return httpService.put("/auth/forgotPassword", { email });
}
export function resetPassword(newPassword, token) {
  return httpService.put("/auth/resetPassword", { newPassword, token });
}

const authServices = {
  forgotPassword,
  loginTeacher,
  logout,
  getTeacher,
};
export default authServices;
