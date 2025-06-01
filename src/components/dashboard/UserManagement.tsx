import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "@/firebase";
import { API_BASE_URL } from "@/utils/api";

type User = {
  _id: string;
  email: string;
};

type Props = {
  onRemove?: (email: string) => void;
};
type BackendUser = {
  Id: string;
  Email: string;
};
const UserManagement: React.FC<Props> = ({ onRemove }) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const token = await currentUser.getIdToken();
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const rawUsers = await response.json();
        console.log("Fetched users from backend:", rawUsers);
        const formattedUsers: User[] = (rawUsers as BackendUser[]).map((u) => ({
          _id: u.Id,
          email: u.Email,
        }));

        setUsers(formattedUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (user: User) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const token = await currentUser.getIdToken();

      const res = await fetch(
        `${API_BASE_URL}/api/user/${encodeURIComponent(user._id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prev) => prev.filter((u) => u._id !== user._id));

      onRemove?.(user.email);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <section className="bg-[#94EE8F] rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-2 text-black">
        {t("admin.userManage")}
      </h2>
      {loading ? (
        <p className="text-sm text-gray-600">Loading users...</p>
      ) : (
        <div className="text-sm text-gray-700">
          {users.map((user) => (
            <div
              key={user._id}
              className="group relative p-2 rounded hover:bg-green-200 transition duration-200 flex items-center justify-between whitespace-nowrap min-w-0 flex-grow"
            >
              <p className="overflow-hidden text-ellipsis">{user.email}</p>
              <button
                className="ml-2 text-red-500 opacity-0 hover:bg-green-100 hover:cursor-pointer rounded pl-2 pr-2 group-hover:opacity-100 transition duration-200 text-sm"
                onClick={() => handleDeleteUser(user)}
              >
                {t("admin.removeUser")}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UserManagement;
