import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-2af3c.firebaseio.com/"
});

export default instance;
