import { useState } from "react";
import { useTranslation } from "react-i18next";
import ParentSelector from "./ParentSelector";

interface EventFormProps {
  onSubmit?: (event: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    color: string;
    invitedParents: string[];
  }) => void;
}

const EventForm = ({ onSubmit }: EventFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    color: "#4CAF50", // Default green color
    invitedParents: [] as string[],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = t("events.errorTimeRange");
    }
    
    if (!formData.location.trim()) {
      newErrors.location = t("events.errorLocation");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      onSubmit?.(formData);
      setFormData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        description: "",
        color: "#4CAF50",
        invitedParents: [],
      });
    }
  };

  const [showParentSelector, setShowParentSelector] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {t("events.createEvent")}
      </h2>

      {showParentSelector ? (
        <ParentSelector onSelect={(parents) => {
          handleParentSelection(parents);
          setShowParentSelector(false);
        }} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
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

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
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
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
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
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            {t("events.description")}
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
            {t("events.color")}
          </label>
          <div className="flex space-x-2 mt-2">
            {["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0", "#607D8B"].map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full cursor-pointer transition-transform ${
                  formData.color === color ? "ring-2 ring-offset-2 ring-gray-500 scale-110" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {t("events.cancel")}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {t("events.submit")}
          </button>
        </div>
      </form>
      )}
    </div>
  );
};

export default EventForm;