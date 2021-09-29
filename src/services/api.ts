import axios from "axios";

export const api = axios.create({
  baseURL: "https://choconatys.herokuapp.com/v1",
});
