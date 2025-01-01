import axios, { InternalAxiosRequestConfig } from "axios";

const backendUrl = "http://localhost:5001";  

const isServer = typeof window === "undefined";

const API = axios.create({
  baseURL: backendUrl,
  withCredentials: true, 
});


export default API;