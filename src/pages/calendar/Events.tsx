import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EventForm from "@/components/calendar/EventForm";
import { useEventContext } from "@/context/EventContext";

const EventsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const { addEvent } = useEventContext();

  const handleSubmit = async (eventData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    color: string;
    invitedParents: string[];
  }) => {
    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      // Add the event using our context
      const newEvent = await addEvent(eventData);
      console.log("Event submitted:", newEvent);

      // Reset form and show success message
      setResetForm(true);
      setShowSuccess(true);

      // Reset the resetForm flag after a short delay
      setTimeout(() => {
        setResetForm(false);
      }, 100);

      // Hide success message after 3 seconds and navigate back
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/calendar");
      }, 3000);
    } catch (error) {
      console.error("Failed to submit event:", error);

      // Extract error message
      let message = "An unexpected error occurred";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      setErrorMessage(message);
      setShowError(true);

      // Hide error message after 5 seconds
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-[#FFFBCF]">
      <div className="container mx-auto px-4">
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 max-w-2xl mx-auto text-center">
            <strong className="font-bold">{t("events.successTitle")}</strong>
            <span className="block sm:inline">
              {" "}
              {t("events.successMessage")}
            </span>
          </div>
        )}

        {showError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 max-w-2xl mx-auto text-center">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        {isSubmitting && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4 max-w-2xl mx-auto text-center">
            <strong className="font-bold">Creating event...</strong>
            <span className="block sm:inline"> Please wait</span>
          </div>
        )}

        <EventForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          resetForm={resetForm}
        />
      </div>
    </div>
  );
};

export default EventsPage;
