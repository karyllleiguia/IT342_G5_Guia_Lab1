import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const register = (user) => {
  return axios.post(`${API_URL}/auth/register`, user);
};

export const login = (user) => {
  return axios.post(`${API_URL}/auth/login`, user);
};

export const getProfile = (username) => {
  return axios.get(`${API_URL}/user/me?username=${username}`);
};
