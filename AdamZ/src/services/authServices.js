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
export function register(admin) {
  return httpService.post("/auth/register", admin);
}
export function getAdmin() {
  return httpService.get("/auth/getAdmin");
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

export async function getUser(token) {
  try {
    const userToken = jwtDecode(token);
    const { data } = await httpService.get(`/auth/userById/${userToken._id}`);
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
  getUser,
  getAdmin,
};
export default authServices;
