import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CalendarEvent } from '@/services/eventService';
import { useEventContext } from '@/context/EventContext';
import { format } from 'date-fns';

interface EventsSidebarProps {
  onEditEvent?: (event: CalendarEvent) => void;
}

const EventsSidebar: React.FC<EventsSidebarProps> = ({ onEditEvent }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { events, deleteEvent, canEditEvent, canDeleteEvent } = useEventContext();
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  // Use the events from context which are already user-specific
  const displayedEvents = events;

  const handleEdit = (event: CalendarEvent) => {
    if (canEditEvent(event) && onEditEvent) {
      onEditEvent(event);
    }
  };

  const handleDelete = (event: CalendarEvent) => {
    if (canDeleteEvent(event)) {
      setShowConfirmDelete(event.id);
    }
  };

  const confirmDelete = (id: string) => {
    deleteEvent(id);
    setShowConfirmDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(null);
  };

  const formatEventDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };

  const formatEventTime = (date: Date) => {
    return format(date, 'h:mm a');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {t('events.yourEvents')}
      </h2>
      
      {displayedEvents.length === 0 ? (
        <p className="text-gray-500 text-center py-4">{t('events.noEvents')}</p>
      ) : (
        <div className="space-y-3">
          {displayedEvents.map((event) => (
            <div 
              key={event.id} 
              className="p-3 bg-gray-50 rounded-md border-l-4 hover:bg-gray-100 transition-colors" 
              style={{ borderLeftColor: event.color || '#4CAF50' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {formatEventDate(event.start)} | {formatEventTime(event.start)} - {formatEventTime(event.end)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {event.location}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  {canEditEvent(event) && (
                    <button 
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {t('events.edit')}
                    </button>
                  )}
                  {canDeleteEvent(event) && (
                    <button 
                      onClick={() => handleDelete(event)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      {t('events.delete')}
                    </button>
                  )}
                  {!canEditEvent(event) && (
                    <span className="text-xs text-gray-500 italic">
                      Invited
                    </span>
                  )}
                </div>
              </div>
              
              {showConfirmDelete === event.id && (
                <div className="mt-2 border-t pt-2">
                  <p className="text-sm text-gray-700 mb-2">{t('events.confirmDelete')}</p>
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => confirmDelete(event.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      {t('events.yes')}
                    </button>
                    <button 
                      onClick={cancelDelete}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                    >
                      {t('events.no')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <button 
          onClick={() => navigate('/calendar/events')}
          className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          {t('events.createNew')}
        </button>
      </div>
    </div>
  );
};

export default EventsSidebar;