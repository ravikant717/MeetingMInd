import api from "./api";

export const getAllAudios = async () => {
  const response = await api.get("/audio");
  return response.data;
};

export const getAudioByID = async (audioId: string) => {
  const response = await api.get(`/audio/${audioId}`);
  return response.data;
};

export const uploadAudio = async (formData: FormData) => {
  const response = await api.post("/audio/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
