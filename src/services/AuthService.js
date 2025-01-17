import axios from "axios";

export const authenticate = async (passCode) => {
  const response = await axios.post(
    `${import.meta.env.BASE_URL}/api/auth`,
    { passCode },
    {
      headers: {
        "Content-Type": "application/json", // Ensure proper content type
      },
    }
  );

  return response.data;
};
