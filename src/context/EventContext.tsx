import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CalendarEvent,
  getEvents,
  getEventsSync,
  addEvent as addEventService,
  addEventSync,
  deleteEvent as deleteEventService,
  updateEvent as updateEventService,
  getEventById,
  getUserEvents,
  getUserEventsSync,
  resetEvents
} from '@/services/eventService';
import { useAuthListener } from '@/auth/useAuthListener';

interface EventContextType {
  events: CalendarEvent[];
  addEvent: (event: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    color: string;
    invitedParents: string[];
    createdBy?: string;
  }) => CalendarEvent;
  deleteEvent: (id: string) => boolean;
  updateEvent: (event: CalendarEvent) => CalendarEvent | null;
  getEvent: (id: string) => CalendarEvent | undefined;
  getUserEvents: (userId: string) => CalendarEvent[];
  refreshEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const user = useAuthListener();

  const refreshEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Failed to refresh events:", error);
      setEvents(getEventsSync());
    }
  };

  const addEvent = async (eventData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    color: string;
    invitedParents: string[];
    createdBy?: string;
  }) => {
    try {
      const newEvent = await addEventService({
        ...eventData,
        createdBy: user?.uid || eventData.createdBy || 'current-user'
      });
      await refreshEvents();
      return newEvent;
    } catch (error) {
      console.error("Failed to add event:", error);
      const newEvent = addEventSync({
        ...eventData,
        createdBy: user?.uid || eventData.createdBy || 'current-user'
      });
      setEvents(getEventsSync());
      return newEvent;
    }
  };

  const deleteEvent = (id: string) => {
    const result = deleteEventService(id);
    if (result) {
      refreshEvents();
    }
    return result;
  };

  const updateEvent = (event: CalendarEvent) => {
    const result = updateEventService(event);
    if (result) {
      refreshEvents();
    }
    return result;
  };

  const getEvent = (id: string) => {
    return getEventById(id);
  };

  const getUserEventsData = async (userId: string) => {
    try {
      return await getUserEvents(userId);
    } catch (error) {
      console.error("Failed to get user events:", error);
      return getUserEventsSync(userId);
    }
  };

  // Load events when the provider mounts
  useEffect(() => {
    refreshEvents();
    
    // Reset events when the provider unmounts (for demo purposes)
    return () => {
      resetEvents();
    };
  }, []);

  return (
    <EventContext.Provider value={{
      events,
      addEvent,
      deleteEvent,
      updateEvent,
      getEvent,
      getUserEvents: getUserEventsData,
      refreshEvents
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};