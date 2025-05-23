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
    throw new Error("API request failed");
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
    throw new Error("API request failed");
  }

  return response.json();
}

export interface BackendUser {
  id: string;
  name: string;
  email: string;
  role: string;
  images: string[];
}

export interface BackendEvent {
  id: string;
  eventname: string;
  date: string;
  starttime: string;
  endtime: string;
  creator: BackendUser;
  invitees: BackendUser[];
}

export async function getUsers(): Promise<BackendUser[]> {
  return apiGet("/api/users");
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
  invitees: string;
}): Promise<BackendEvent> {
  return apiPost("/api/event", eventData);
}
