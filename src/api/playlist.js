import axios from "./axios";

export const fetchPlaylistInfo = async (url) => {
  const res = await axios.post("/playlist/fetch", { url });
  return res.data;
};

export const downloadPlaylist = async (url, format) => {
  const response = await axios.post("/playlist/download", { url, format }, {
    responseType: "blob", // important for downloading files
  });

  const blob = new Blob([response.data], { type: "application/zip" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `playlist-${Date.now()}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
