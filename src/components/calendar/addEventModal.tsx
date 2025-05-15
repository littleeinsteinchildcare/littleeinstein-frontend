import moment from "moment";
import { CalendarEvent } from "@/context/EventContext";
import { useTranslation } from "react-i18next";

interface Props {
  position: { x: number; y: number };
  newEvent: CalendarEvent;
  setNewEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>;
  innerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onSave: () => void;
}

const AddEventModal: React.FC<Props> = ({
  position,
  newEvent,
  setNewEvent,
  innerRef,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation();

  const modalWidth = 380;
  const modalHeight = 160;
  const offsetX = 60;
  const offsetY = 10;

  const top = Math.min(position.y + offsetY, window.innerHeight - modalHeight);
  const left = Math.min(position.x + offsetX, window.innerWidth - modalWidth);

  return (
    <div
      ref={innerRef}
      style={{
        position: "absolute",
        top,
        left,
        zIndex: 50,
      }}
      className="bg-white shadow-2xl border border-gray-300 rounded-xl maw-w-[90vw] max-h-[90vh] p-6 md:w-96 md:p-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* event title input */}
      <input
        autoFocus
        type="text"
        placeholder={t("calendar.modalEventPlace")}
        className="bg-white w-full text-lg font-semibold border-b focus:outline-none mb-4 p-1"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
      />

      {/* start/end time picker */}
      <div className="text-sm text-gray-600 mb-4 space-y-4">
        <div>
          <label className="block font-medium mb-1">
            {t("calendar.modalStart")}
          </label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setNewEvent({ ...newEvent, start: new Date(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            {t("calendar.modalEnd")}
          </label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setNewEvent({ ...newEvent, end: new Date(e.target.value) })
            }
          />
        </div>
      </div>

      {/* all day checkbox */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          id="allDay"
          checked={newEvent.allDay}
          onChange={(e) =>
            setNewEvent({ ...newEvent, allDay: e.target.checked })
          }
        />
        <label htmlFor="allDay" className="text-sm font-medium">
          {t("calendar.modalAllDay")}
        </label>
      </div>

      {/* location input */}
      <input
        type="text"
        placeholder={t("calendar.modalLocationPlace")}
        className="w-full border-b focus:outline-none pb-1 mb-4"
        value={newEvent.location}
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
      />

      {/* save/cancel buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onClose}
          className="text-gray-700 hover:bg-gray-200 px-3 py-1 rounded"
        >
          {t("calendar.modalCancel")}
        </button>
        <button
          onClick={() => {
            onSave();
            onClose();
          }}
          className="bg-[#2A9D8F] text-white border border-[#003366] hover:bg-white hover:text-[#003366] px-4 py-1 rounded"
        >
          {t("calendar.modalSave")}
        </button>
      </div>
    </div>
  );
};

export default AddEventModal;
