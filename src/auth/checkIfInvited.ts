import { API_BASE_URL } from "@/utils/api";

export const checkIfInvited = async (email: string) => {
  const res = await fetch(
    `${API_BASE_URL}/check-invited?email=${encodeURIComponent(email)}`,
  );
  const data = await res.json();
  console.log("Check invited response:", data);
  return data.invited;
};
