import moment from "moment";
import { CalendarEvent } from "@/context/EventContext";
import { useTranslation } from "react-i18next";

interface Props {
  position: { x: number; y: number };
  event: CalendarEvent;
  onClose: () => void;
}

const ViewEventModal: React.FC<Props> = ({ position, event, onClose }) => {
  const { t } = useTranslation();

  const modalWidth = 380;
  const modalHeight = 160;
  const offsetX = 10;
  const offsetY = 60;

  const top = Math.min(position.y + offsetY, window.innerHeight - modalHeight);
  const left = Math.min(position.x + offsetX, window.innerWidth - modalWidth);

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        zIndex: 50,
      }}
      className="bg-white shadow-xl rounded-xl border border-gray-300 maw-w-[90vw] max-h-[90vh] p-6 md:w-auto md:p-8"
      onClick={(e) => e.stopPropagation()} // prevent modal from closing if clicked inside
    >
      {/* title */}
      <h2 className="text-lg font-bold mb-4">{event.title}</h2>

      {/* start time */}
      <p className="text-sm text-gray-700 mb-4">
        <strong>{t("calendar.modalStart")}:</strong>{" "}
        {moment(event.start).format("MMMM Do YYYY, h:mm A")}
      </p>

      {/* end time */}
      <p className="text-sm text-gray-700 mb-4">
        <strong>{t("calendar.modalEnd")}:</strong>{" "}
        {moment(event.end).format("MMMM Do YYYY, h:mm A")}
      </p>

      {/* all day display */}
      {event.allDay && (
        <p className="text-sm font-bold text-green-600 mb-4">
          {t("calendar.modalAllDay")}
        </p>
      )}

      {/* location */}
      {event.location && (
        <p className="text-sm text-gray-700 mb-4">
          <strong>{t("calendar.modalLocationPlace")}:</strong> {event.location}
        </p>
      )}

      {/* Close button */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-[#2A9D8F] text-white border border-[#003366] hover:bg-white hover:text-[#003366] px-4 py-1 rounded"
        >
          {t("calendar.modalClose")}
        </button>
      </div>
    </div>
  );
};

export default ViewEventModal;
