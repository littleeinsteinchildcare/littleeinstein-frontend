import { auth } from "@/firebase";

export async function apiGet(path: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  const response = await fetch(`http://localhost:8080${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`API GET ${path} failed with status ${response.status}:`, errorData);
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function apiPost(path: string, data: any) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  const response = await fetch(`http://localhost:8080${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`API POST ${path} failed with status ${response.status}:`, errorData);
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function apiPut(path: string, data: any) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  const response = await fetch(`http://localhost:8080${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`API PUT ${path} failed with status ${response.status}:`, errorData);
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function apiDelete(path: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  const response = await fetch(`http://localhost:8080${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`API DELETE ${path} failed with status ${response.status}:`, errorData);
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  // DELETE typically returns 204 No Content, so don't parse JSON
  if (response.status === 204) {
    return;
  }
  return response.json();
}

export interface BackendUser {
  ID: string;
  Username: string;
  Email: string;
  Role: string;
  Images: string[];
}

export interface BackendEvent {
  id: string;
  eventname: string;
  date: string;
  starttime: string;
  endtime: string;
  location: string;
  description: string;
  color: string;
  creator: BackendUser;
  invitees: BackendUser[];
}

export async function getUsers(): Promise<BackendUser[]> {
  try {
    const result = await apiGet("/api/users");
    console.log("API call successful, received users:", result);
    return result;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

export async function getUserEvents(userId: string): Promise<BackendEvent[]> {
  return apiGet(`/api/events/user/${userId}`);
}

export async function getAllEvents(): Promise<BackendEvent[]> {
  return apiGet("/api/events");
}

export async function createEvent(eventData: {
  id: string;
  eventname: string;
  date: string;
  starttime: string;
  endtime: string;
  location: string;
  description: string;
  color: string;
  invitees: string;
}): Promise<BackendEvent> {
  return apiPost("/api/event", eventData);
}

export async function updateEvent(eventId: string, eventData: {
  id: string;
  eventname: string;
  date: string;
  starttime: string;
  endtime: string;
  location: string;
  description: string;
  color: string;
  invitees: string;
}): Promise<BackendEvent> {
  return apiPut(`/api/event/${eventId}`, eventData);
}

export async function deleteEvent(eventId: string): Promise<void> {
  return apiDelete(`/api/event/${eventId}`);
}

export async function syncFirebaseUser(userData: {
  uid: string;
  email: string;
  name?: string;
  displayName?: string;
}): Promise<BackendUser> {
  return apiPost("/api/user/sync", userData);
}
