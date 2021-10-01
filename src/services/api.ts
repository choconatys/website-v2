import axios from "axios";
import { parseCookies } from "nookies";

const { "choconatys.token": token } = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3030/v1",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
