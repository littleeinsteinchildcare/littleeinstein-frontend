import { Event } from "react-big-calendar";
import { getAllEvents, getUserEvents as getBackendUserEvents, createEvent as createBackendEvent, BackendEvent, BackendUser } from "@/api/client";
import { auth } from "@/firebase";

// Define our custom event type that includes color and invitedParents
export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  invitedParents?: string[];
  location?: string;
  locationCoords?: Location;
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

  return {
    id: backendEvent.id,
    title: backendEvent.eventname,
    start,
    end,
    allDay: false,
    color: "#4CAF50", // Default color since backend doesn't store this yet
    invitedParents: backendEvent.invitees.map(user => user.id),
    location: "", // Backend doesn't store location yet
    description: "", // Backend doesn't store description yet
    createdBy: backendEvent.creator.id,
  };
};

// Mock events data
const initialEvents: CalendarEvent[] = [
  {
    id: generateId(),
    title: "Intro",
    start: new Date(2025, 2, 1, 10, 0),
    end: new Date(2025, 2, 1, 12, 0),
    allDay: false,
    color: "#4CAF50",
    location: "Main Room",
    locationCoords: {
      lat: 45.522894,
      lng: -122.989827,
      address: "1789 SE River RD Hillsboro OR 97123"
    },
    description: "Introduction to childcare services",
    createdBy: "admin",
  },
  {
    id: generateId(),
    title: "Child care meet",
    start: new Date(2025, 2, 11, 10, 0),
    end: new Date(2025, 2, 11, 11, 30),
    allDay: false,
    color: "#2196F3",
    location: "Conference Room",
    description: "Meeting with parents to discuss childcare program",
    createdBy: "admin",
  },
  {
    id: generateId(),
    title: "Playtime",
    start: new Date(2025, 2, 11, 10, 0), // Same time as child care meet
    end: new Date(2025, 2, 11, 12, 0),
    allDay: false,
    color: "#FF9800",
    location: "Playground",
    description: "Outdoor play activities for children",
    createdBy: "admin",
  },
];

// In-memory storage for events
let events: CalendarEvent[] = [...initialEvents];

// Event service functions
export const getEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const backendEvents = await getAllEvents();
    return backendEvents.map(convertBackendEvent);
  } catch (error) {
    console.error("Failed to fetch events from backend, using mock data:", error);
    return events;
  }
};

// Synchronous version for backwards compatibility
export const getEventsSync = (): CalendarEvent[] => {
  return events;
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
  
  try {
    // Try to create event on backend
    const backendEvent = await createBackendEvent({
      id: eventId,
      eventname: event.title,
      date: event.date,
      starttime: event.startTime,
      endtime: event.endTime,
      invitees: event.invitedParents.join(",")
    });
    
    return convertBackendEvent(backendEvent);
  } catch (error) {
    console.error("Failed to create event on backend, using local storage:", error);
    
    // Fallback to local storage
    const [year, month, day] = event.date.split("-").map(Number);
    const [startHours, startMinutes] = event.startTime.split(":").map(Number);
    const [endHours, endMinutes] = event.endTime.split(":").map(Number);

    const start = new Date(year, month - 1, day, startHours, startMinutes);
    const end = new Date(year, month - 1, day, endHours, endMinutes);

    const newEvent: CalendarEvent = {
      id: eventId,
      title: event.title,
      start,
      end,
      allDay: false,
      color: event.color,
      invitedParents: event.invitedParents,
      location: event.location,
      description: event.description,
      createdBy: event.createdBy || 'current-user',
    };

    events = [...events, newEvent];
    return newEvent;
  }
};

// Synchronous version for backwards compatibility
export const addEventSync = (event: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  color: string;
  invitedParents: string[];
  createdBy?: string;
}): CalendarEvent => {
  const [year, month, day] = event.date.split("-").map(Number);
  const [startHours, startMinutes] = event.startTime.split(":").map(Number);
  const [endHours, endMinutes] = event.endTime.split(":").map(Number);

  const start = new Date(year, month - 1, day, startHours, startMinutes);
  const end = new Date(year, month - 1, day, endHours, endMinutes);

  const newEvent: CalendarEvent = {
    id: generateId(),
    title: event.title,
    start,
    end,
    allDay: false,
    color: event.color,
    invitedParents: event.invitedParents,
    location: event.location,
    description: event.description,
    createdBy: event.createdBy || 'current-user',
  };

  events = [...events, newEvent];
  return newEvent;
};

export const updateEvent = (updatedEvent: CalendarEvent): CalendarEvent | null => {
  const index = events.findIndex(event => event.id === updatedEvent.id);

  if (index === -1) {
    return null; // Event not found
  }

  // Update the event in the array
  events[index] = updatedEvent;

  // Create a new array to trigger state updates
  events = [...events];

  return updatedEvent;
};

export const deleteEvent = (id: string): boolean => {
  const initialLength = events.length;
  events = events.filter(event => event.id !== id);

  // Return true if an event was removed
  return events.length < initialLength;
};

export const getEventById = (id: string): CalendarEvent | undefined => {
  return events.find(event => event.id === id);
};

// Get events created by a specific user
export const getUserEvents = async (userId: string): Promise<CalendarEvent[]> => {
  try {
    const backendEvents = await getBackendUserEvents(userId);
    return backendEvents.map(convertBackendEvent);
  } catch (error) {
    console.error("Failed to fetch user events from backend, using mock data:", error);
    return events.filter(event => event.createdBy === userId);
  }
};

// Synchronous version for backwards compatibility
export const getUserEventsSync = (userId: string): CalendarEvent[] => {
  return events.filter(event => event.createdBy === userId);
};

export const resetEvents = (): void => {
  events = [...initialEvents];
};