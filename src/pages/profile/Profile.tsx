import { useAdminCheck } from "@/hooks/useAdminCheck";
import UserProfileSection from "@/components/dashboard/UserProfileSection";
import Admin from "@/components/dashboard/AdminDashboard";

const Profile = () => {
  const { isAdmin, loading } = useAdminCheck();

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <UserProfileSection />

        {!loading && isAdmin && <Admin />}
      </div>
    </div>
  );
};

export default Profile;
