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

export function getTeacher(token) {
  try {
    const teacher = jwtDecode(token);
    return teacher;
  } catch {
    return "err: invalid token!!";
  }
}
export function forgotPassword(email) {
  return httpService.put("/auth/forgotPassword", { email });
}

const authServices = {
  forgotPassword,
  loginTeacher,
  logout,
  getTeacher,
};
export default authServices;
