import httpService from "./httpServices";

export function forgotPassword(email) {
  return httpService.put("/auth/forgotPassword", { email });
}

const authServices = {
  forgotPassword,
};
export default authServices;
