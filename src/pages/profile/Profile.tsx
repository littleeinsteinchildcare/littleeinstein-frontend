import { useAdminCheck } from "@/hooks/useAdminCheck";
import UserProfileSection from "@/components/dashboard/UserProfileSection";
import Admin from "@/components/dashboard/AdminDashboard";

const Profile = () => {
  const { isAdmin, loading } = useAdminCheck();

  return (
    <>
      <UserProfileSection />
      {!loading && isAdmin && <Admin />}
    </>
  );
};

export default Profile;
