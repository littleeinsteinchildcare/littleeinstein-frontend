import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EventForm from "@/components/calendar/EventForm";
import { useEventContext } from "@/context/EventContext";

const EventsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const { addEvent } = useEventContext();

  const handleSubmit = (eventData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    color: string;
    invitedParents: string[];
  }) => {
    // Add the event using our context
    const newEvent = addEvent(eventData);
    console.log("Event submitted:", newEvent);

    // Show success message
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      // Navigate back to calendar
      navigate("/calendar");
    }, 3000);
  };
  
  return (
    <div className="min-h-screen py-12 bg-green-200">
      <div className="container mx-auto px-4">
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 max-w-2xl mx-auto text-center">
            <strong className="font-bold">{t("events.successTitle")}</strong>
            <span className="block sm:inline"> {t("events.successMessage")}</span>
          </div>
        )}
        
        <EventForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default EventsPage;