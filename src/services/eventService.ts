import { Event } from "react-big-calendar";
import { getAllEvents, getUserEvents as getBackendUserEvents, createEvent as createBackendEvent, BackendEvent, BackendUser } from "@/api/client";
import { auth } from "@/firebase";

// Define our custom event type that includes color and invitedParents
export interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  invitedParents?: string[];
  location?: string;
  description?: string;
  createdBy?: string; // To track who created the event
}

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Convert backend event to frontend event format
const convertBackendEvent = (backendEvent: BackendEvent): CalendarEvent => {
  const [year, month, day] = backendEvent.date.split("-").map(Number);
  const [startHours, startMinutes] = backendEvent.starttime.split(":").map(Number);
  const [endHours, endMinutes] = backendEvent.endtime.split(":").map(Number);

  const start = new Date(year, month - 1, day, startHours, startMinutes);
  const end = new Date(year, month - 1, day, endHours, endMinutes);

  // Handle invitees safely - they might be null, undefined, or an empty array
  const invitedParents = Array.isArray(backendEvent.invitees) 
    ? backendEvent.invitees.map(user => user.ID)
    : [];

  return {
    id: backendEvent.id,
    title: backendEvent.eventname,
    start,
    end,
    allDay: false,
    color: backendEvent.color || "#4CAF50", // Use backend color or default
    invitedParents,
    location: backendEvent.location || "", // Use backend location
    description: backendEvent.description || "", // Use backend description
    createdBy: backendEvent.creator.ID,
  };
};

// Event service functions - only use backend, no local storage
export const getEvents = async (userId?: string): Promise<CalendarEvent[]> => {
  const backendEvents = await getAllEvents();
  return backendEvents.map(convertBackendEvent);
};

export const getUserEvents = async (userId: string): Promise<CalendarEvent[]> => {
  const backendEvents = await getBackendUserEvents(userId);
  return backendEvents.map(convertBackendEvent);
};

export const addEvent = async (event: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  color: string;
  invitedParents: string[];
  createdBy?: string;
}): Promise<CalendarEvent> => {
  const eventId = generateId();
  
  console.log("Attempting to create event on backend:", {
    id: eventId,
    eventname: event.title,
    date: event.date,
    starttime: event.startTime,
    endtime: event.endTime,
    invitees: event.invitedParents.join(",")
  });
  
  const backendEvent = await createBackendEvent({
    id: eventId,
    eventname: event.title,
    date: event.date,
    starttime: event.startTime,
    endtime: event.endTime,
    location: event.location,
    description: event.description,
    color: event.color,
    invitees: event.invitedParents.join(",")
  });
  
  console.log("✅ Event created successfully on backend:", backendEvent);
  return convertBackendEvent(backendEvent);
};

// Remove all other functions that dealt with local storage
export const updateEvent = async (updatedEvent: CalendarEvent): Promise<CalendarEvent | null> => {
  // TODO: Implement backend update when the API is ready
  throw new Error("Event updating not implemented yet - backend API needed");
};

export const removeEvent = async (eventId: string): Promise<void> => {
  // TODO: Implement backend delete when the API is ready
  throw new Error("Event deletion not implemented yet - backend API needed");
};