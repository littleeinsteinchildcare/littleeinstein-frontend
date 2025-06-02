import { API_BASE_URL } from "@/utils/api";
export const postUserToBackend = async (token: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to create user in backend:", errorText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.error("POST /api/user error:", err);
  }
};
