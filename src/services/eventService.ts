import { Event } from "react-big-calendar";

// Define our custom event type that includes color and invitedParents
export interface CalendarEvent extends Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  invitedParents?: string[];
  location?: string;
  description?: string;
}

// Mock events data
const initialEvents: CalendarEvent[] = [
  {
    title: "Intro",
    start: new Date(2025, 2, 1, 10, 0),
    end: new Date(2025, 2, 1, 12, 0),
    allDay: false,
    color: "#4CAF50",
  },
  {
    title: "Child care meet",
    start: new Date(2025, 2, 11, 10, 0),
    end: new Date(2025, 2, 11, 11, 30),
    allDay: false,
    color: "#2196F3",
  },
];

// In-memory storage for events
let events: CalendarEvent[] = [...initialEvents];

// Event service functions
export const getEvents = (): CalendarEvent[] => {
  return events;
};

export const addEvent = (event: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  color: string;
  invitedParents: string[];
}): CalendarEvent => {
  // Parse date and time strings into Date objects
  const [year, month, day] = event.date.split("-").map(Number);
  
  const [startHours, startMinutes] = event.startTime.split(":").map(Number);
  const [endHours, endMinutes] = event.endTime.split(":").map(Number);
  
  const start = new Date(year, month - 1, day, startHours, startMinutes);
  const end = new Date(year, month - 1, day, endHours, endMinutes);
  
  // Create new event
  const newEvent: CalendarEvent = {
    title: event.title,
    start,
    end,
    allDay: false,
    color: event.color,
    invitedParents: event.invitedParents,
    location: event.location,
    description: event.description,
  };
  
  // Add to events array
  events = [...events, newEvent];
  return newEvent;
};

export const resetEvents = (): void => {
  events = [...initialEvents];
};