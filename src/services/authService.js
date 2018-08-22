import axios from "axios";
import { BASE_URL, API_HEADER } from "../constants/apiBaseUrl";
import { unauthorized, internalServerError } from "../containers/errors/statusCodeMessage";
import { encryptMd5 } from "../utils/cryptography";
class AuthService {
  async authenticate(email, password) {
    try {
      let response = await axios.post(BASE_URL + "/login", {
        login: email,
        password: encryptMd5(password)
      }, API_HEADER);

      return response;
    }
    catch (error) {
      if (error.response.data.code === 401) {
        let notification = "Inavalid Username/Email or Password";

        return unauthorized(notification);
      }

      return internalServerError();
    }
  }

  async hasTwoFactorAuth(token) {
    try {
      API_HEADER.headers.Authorization = token;
      let response = await axios.get(BASE_URL + "/user/2fa", API_HEADER);

      return response;
    }
    catch (error) {
      if (error.response.data.code === 401) {
        let notification = "Could not verify 2fa";

        return unauthorized(notification);
      }

      return internalServerError();
    }
  }

  async createTwoFactorAuth() {
    try {
      let response = await axios.post(BASE_URL + "/user/2fa", {}, API_HEADER);

      return response;
    }
    catch (error) {
      if (error.response.data.code === 500) {
        return unauthorized("Could not enable two-factor authentication");
      }

      return internalServerError();
    }
  }

  async verifyTwoFactoryAuth(token) {
    try {
      let response = await axios.post(
        BASE_URL + "/user/2fa/verify", { token }, API_HEADER);

      return response;
    }
    catch (error) {
      if (error.response.data.code === 401) {
        return unauthorized("Invalid 2FA token");
      }

      return internalServerError();
    }
  }
}

export default AuthService;
