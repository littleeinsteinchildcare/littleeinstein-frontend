import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getUsers } from "@/api/client";
import { useAuthListener } from "@/auth/useAuthListener";

interface Parent {
  id: string;
  name: string;
  email: string;
}

interface ParentSelectorProps {
  onSelect: (selectedParents: string[]) => void;
}


const ParentSelector = ({ onSelect }: ParentSelectorProps) => {
  const { t } = useTranslation();
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthListener();

  useEffect(() => {
    const fetchParents = async () => {
      if (!user) {
        setParents([]);
        setError("Please sign in to view other parents");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const users = await getUsers();
        
        // Filter out the current user and convert to Parent format
        if (users && Array.isArray(users) && users.length > 0) {
          const parentUsers = users.filter(user => 
            user.Role === "parent" || user.Role === "user" || user.Role === "admin"
          ).map(user => ({
            id: user.ID,
            name: user.Username || user.Email.split('@')[0] || 'Unknown User',
            email: user.Email
          }));
          
          setParents(parentUsers);
        } else {
          setParents([]);
          setError("No users found. Please contact an administrator to create user accounts.");
        }
      } catch (err) {
        console.error("❌ Failed to fetch users from backend:", err);
        setParents([]);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchParents();
  }, [user]);

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

  const filteredParents = parents.filter((parent) =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDone = () => {
    onSelect(selectedParents);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mt-4">
      <h3 className="text-xl font-semibold mb-4">{t("events.inviteParents")}</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded-md">
          <p className="text-sm text-red-800">
            {error}
          </p>
        </div>
      )}
      
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
        {loading ? (
          <div className="text-center py-4">
            <div className="text-gray-500">Loading parents...</div>
          </div>
        ) : filteredParents.length > 0 ? (
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
        ) : error ? (
          <p className="text-gray-500 text-center py-4">{error}</p>
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