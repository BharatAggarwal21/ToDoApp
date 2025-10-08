import axios from "axios";

const registerUser = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/user/register`, data);
};

const loginUser = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/user/login`, data);
};

const AuthServices = { registerUser, loginUser };

export default AuthServices;
