import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5001/clone-f5f06/us-central1/api",
  baseURL: "https://us-central1-clone-f5f06.cloudfunctions.net/api",
});

export default instance;
