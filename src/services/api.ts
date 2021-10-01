import axios from "axios";
import { parseCookies } from "nookies";

const { "choconatys.token": token } = parseCookies();

export const api = axios.create({
  baseURL: "https://choconatys.herokuapp.com/v1",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
