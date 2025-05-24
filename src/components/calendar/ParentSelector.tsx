import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getUsers, BackendUser } from "@/api/client";
import { useAuthListener } from "@/auth/useAuthListener";

interface Parent {
  id: string;
  name: string;
  email: string;
}

interface ParentSelectorProps {
  onSelect: (selectedParents: string[]) => void;
}

// Mock data for testing - will be replaced by real data when backend is connected
const mockParents: Parent[] = [
  { id: "mock1", name: "Maria Rodriguez (Mock)", email: "maria.r@example.com" },
  { id: "mock2", name: "John Smith (Mock)", email: "john.s@example.com" },
  { id: "mock3", name: "Sarah Johnson (Mock)", email: "sarah.j@example.com" },
  { id: "mock4", name: "David Chen (Mock)", email: "david.c@example.com" },
  { id: "mock5", name: "Fatima Ali (Mock)", email: "fatima.a@example.com" },
];

const ParentSelector = ({ onSelect }: ParentSelectorProps) => {
  const { t } = useTranslation();
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [parents, setParents] = useState<Parent[]>(mockParents);
  const [loading, setLoading] = useState(false);
  const user = useAuthListener();

  useEffect(() => {
    const fetchParents = async () => {
      // Only try to fetch from backend if user is authenticated
      if (!user) {
        console.log("No authenticated user, using mock data");
        setParents(mockParents);
        return;
      }

      try {
        setLoading(true);
        console.log("User authenticated, attempting to fetch users from backend...");
        console.log("Current user:", user.uid, user.email);
        
        const users = await getUsers();
        console.log("Fetched users from backend:", users);
        
        // Handle case where backend returns empty array (no users created yet)
        if (users && Array.isArray(users) && users.length > 0) {
          const parentUsers = users.filter(user => 
            user.Role === "parent" || user.Role === "user" || user.Role === "admin"
          ).map(user => ({
            id: user.ID,
            name: user.Username || user.Email.split('@')[0] || 'Unknown User', // Use email prefix if username is empty
            email: user.Email
          }));
          
          if (parentUsers.length > 0) {
            console.log("✅ Using backend parent data:", parentUsers);
            setParents(parentUsers);
          } else {
            console.log("⚠️ No valid parent users found in backend data, using mock data");
            setParents(mockParents);
          }
        } else if (users && Array.isArray(users) && users.length === 0) {
          console.log("⚠️ Backend returned empty users array (no users created yet), using mock data");
          setParents(mockParents);
        } else {
          console.log("⚠️ No valid users array returned from backend, using mock data");
          setParents(mockParents);
        }
      } catch (err) {
        console.error("❌ Failed to fetch users from backend:", err);
        console.log("🔄 Falling back to mock data");
        setParents(mockParents);
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

  const usingMockData = parents.some(parent => parent.id.startsWith('mock'));

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mt-4">
      <h3 className="text-xl font-semibold mb-4">{t("events.inviteParents")}</h3>
      
      {usingMockData && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-md">
          <p className="text-sm text-yellow-800">
            ⚠️ Using mock data. {!user ? "Please sign in to load real users." : "No users found in backend - create some users first via the API."}
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