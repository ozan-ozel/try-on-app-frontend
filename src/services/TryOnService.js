import axios from "axios";

export const executeTryOn = async (file, modelImageUrl) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("modelImage", modelImageUrl);

  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/try-on/execute`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("try-on-app:accessToken")}`,
        "Content-Type": "multipart/form-data", // Ensure proper content type
      },
    }
  );

  return response.data;
};
