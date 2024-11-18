import axios from "axios";

const BASE_URL = "https://api.cinewall.shop";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "http://3.38.104.1:8080",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

export default client;

