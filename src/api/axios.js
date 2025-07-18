import axios from "axios";

// https://yt-playlist-downloader-server.onrender.com
// http://localhost:5000

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default instance;
