import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Parent {
  id: string;
  name: string;
  email: string;
}

interface ParentSelectorProps {
  onSelect: (selectedParents: string[]) => void;
}

// Normally this data would come from an API
const mockParents: Parent[] = [
  { id: "1", name: "Maria Rodriguez", email: "maria.r@example.com" },
  { id: "2", name: "John Smith", email: "john.s@example.com" },
  { id: "3", name: "Sarah Johnson", email: "sarah.j@example.com" },
  { id: "4", name: "David Chen", email: "david.c@example.com" },
  { id: "5", name: "Fatima Ali", email: "fatima.a@example.com" },
];

const ParentSelector = ({ onSelect }: ParentSelectorProps) => {
  const { t } = useTranslation();
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleParent = (parentId: string) => {
    setSelectedParents((prev) => {
      if (prev.includes(parentId)) {
        return prev.filter((id) => id !== parentId);
      } else {
        return [...prev, parentId];
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredParents = mockParents.filter((parent) =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDone = () => {
    onSelect(selectedParents);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mt-4">
      <h3 className="text-xl font-semibold mb-4">{t("events.inviteParents")}</h3>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder={t("events.searchParents")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="max-h-60 overflow-y-auto mb-4">
        {filteredParents.length > 0 ? (
          filteredParents.map((parent) => (
            <div 
              key={parent.id}
              className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => handleToggleParent(parent.id)}
            >
              <input
                type="checkbox"
                checked={selectedParents.includes(parent.id)}
                onChange={() => {}}
                className="mr-3 h-4 w-4 text-green-500 focus:ring-green-400"
              />
              <div>
                <div className="font-medium">{parent.name}</div>
                <div className="text-sm text-gray-500">{parent.email}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">{t("events.noParentsFound")}</p>
        )}
      </div>
      
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">
          {t("events.selectedCount", { count: selectedParents.length })}
        </span>
        <button
          onClick={handleDone}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {t("events.done")}
        </button>
      </div>
    </div>
  );
};

export default ParentSelector;