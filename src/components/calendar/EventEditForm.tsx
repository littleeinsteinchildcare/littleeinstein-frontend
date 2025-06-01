import { useState } from "react";
import { useTranslation } from "react-i18next";
import ParentSelector from "./ParentSelector";
import { CalendarEvent } from "@/services/eventService";
import { format } from "date-fns";

interface EventEditFormProps {
  event: CalendarEvent;
  onSubmit?: (event: CalendarEvent) => void;
  onCancel?: () => void;
  onDelete?: (eventId: string) => void;
  compact?: boolean; // Optional prop for compact layout
}

const EventEditForm = ({
  event,
  onSubmit,
  onCancel,
  onDelete,
  compact = false,
}: EventEditFormProps) => {
  const { t } = useTranslation();

  // Convert dates back to form format
  const formatDateForInput = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
  };

  const formatTimeForInput = (date: Date): string => {
    return format(date, "HH:mm");
  };

  const [formData, setFormData] = useState({
    id: event.id,
    title: event.title,
    date: formatDateForInput(event.start),
    startTime: formatTimeForInput(event.start),
    endTime: formatTimeForInput(event.end),
    location: event.location || "",
    description: event.description || "",
    color: event.color || "#4CAF50",
    invitedParents: event.invitedParents || [],
    createdBy: event.createdBy,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showParentSelector, setShowParentSelector] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = t("events.errorTitle");
    }

    if (!formData.date) {
      newErrors.date = t("events.errorDate");
    }

    if (!formData.startTime) {
      newErrors.startTime = t("events.errorStartTime");
    }

    if (!formData.endTime) {
      newErrors.endTime = t("events.errorEndTime");
    }

    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      newErrors.endTime = t("events.errorTimeRange");
    }

    if (!formData.location.trim()) {
      newErrors.location = t("events.errorLocation");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleColorChange = (color: string) => {
    setFormData({
      ...formData,
      color,
    });
  };

  const handleParentSelection = (selectedParents: string[]) => {
    setFormData({
      ...formData,
      invitedParents: selectedParents,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // Convert form data back to CalendarEvent
      const [year, month, day] = formData.date.split("-").map(Number);
      const [startHours, startMinutes] = formData.startTime
        .split(":")
        .map(Number);
      const [endHours, endMinutes] = formData.endTime.split(":").map(Number);

      const start = new Date(year, month - 1, day, startHours, startMinutes);
      const end = new Date(year, month - 1, day, endHours, endMinutes);

      const updatedEvent: CalendarEvent = {
        id: formData.id,
        title: formData.title,
        start,
        end,
        allDay: false,
        color: formData.color,
        invitedParents: formData.invitedParents,
        location: formData.location,
        description: formData.description,
        createdBy: formData.createdBy,
      };

      onSubmit?.(updatedEvent);
    }
  };

  return (
    <div
      className={`bg-white ${
        !compact && "shadow-lg rounded-lg p-6"
      } w-full max-w-2xl mx-auto`}
    >
      {!compact && (
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {t("events.editEvent")}
        </h2>
      )}

      {showParentSelector ? (
        <ParentSelector
          onSelect={(parents) => {
            handleParentSelection(parents);
            setShowParentSelector(false);
          }}
        />
      ) : (
        <form
          onSubmit={handleSubmit}
          className={compact ? "grid grid-cols-2 gap-x-6 gap-y-3" : "space-y-4"}
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("events.title")}*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.title ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("events.date")}*
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.date ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            )}
          </div>

          {/* Time inputs - these should be separate in the grid layout */}
          <div className={compact ? "" : "grid grid-cols-2 gap-4"}>
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("events.startTime")}*
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.startTime ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("events.endTime")}*
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.endTime ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.endTime && (
              <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
            )}
          </div>

          <div className={compact ? "col-span-2" : ""}>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("events.location")}*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.location ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder={t("events.enterLocation")}
            />

            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          <div className={compact ? "col-span-2" : ""}>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("events.description")}
            </label>
            <textarea
              id="description"
              name="description"
              rows={compact ? 2 : 4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className={compact ? "col-span-2 mb-4" : "mb-4"}>
            <label
              htmlFor="color"
              className={`block text-sm font-medium text-gray-700 ${
                compact ? "mr-3 min-w-20" : "mb-1"
              }`}
            >
              {t("events.color")}
            </label>
            <div
              className={`flex flex-wrap items-center space-x-2 mt-2 ${
                !compact && "mt-2"
              }`}
            >
              {[
                "#4CAF50",
                "#2196F3",
                "#FF9800",
                "#E91E63",
                "#9C27B0",
                "#607D8B",
              ].map((color) => (
                <div
                  key={color}
                  className={`${
                    compact ? "w-6 h-6" : "w-8 h-8"
                  } rounded-full cursor-pointer transition-transform ${
                    formData.color === color
                      ? "ring-2 ring-offset-1 ring-gray-500 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>

          <div className={compact ? "col-span-2 mb-4" : "mb-4"}>
            <label
              className={`block text-sm font-medium text-gray-700 ${
                compact ? "mr-3 min-w-20" : "mb-1"
              }`}
            >
              {t("events.invitedParents")}
            </label>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">
                {formData.invitedParents.length} {t("events.parentsSelected")}
              </span>
              <button
                type="button"
                onClick={() => setShowParentSelector(true)}
                className="text-sm text-green-600 hover:text-green-800"
              >
                {formData.invitedParents.length > 0
                  ? t("events.editInvitations")
                  : t("events.addInvitations")}
              </button>
            </div>
          </div>

          <div
            className={`${
              compact ? "col-span-2" : ""
            } flex justify-end space-x-3 ${compact ? "pt-2" : "pt-4"}`}
          >
            {/* Don't show cancel button in compact mode since we have X in the header */}
            {!compact && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {t("events.cancel")}
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className={`${
                  compact ? "px-3 py-1" : "px-4 py-2"
                } bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500`}
              >
                {t("events.delete")}
              </button>
            )}
            <button
              type="submit"
              className={`${
                compact ? "px-3 py-1" : "px-4 py-2"
              } bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              {t("events.update")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EventEditForm;
