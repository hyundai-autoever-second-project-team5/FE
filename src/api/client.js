import axios from "axios";

const PROXY = window.location.hostname === "localhost" 
  ? "https://api.cinewall.shop" 
  : "/proxy"; 
const URL = `${PROXY}`;

const client = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "http://3.38.104.1:8080",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

export default client;
