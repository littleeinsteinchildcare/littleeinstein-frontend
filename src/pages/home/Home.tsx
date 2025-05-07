import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

// home page components
import WelcomeSection from "@/components/home/welcome";
import LocationInfo from "@/components/home/location";
import Tour from "@/components/home/tour";
import About from "@/components/home/about";
import Expect from "@/components/home/expect";
import Art from "@/components/home/art";
import Testimonials from "@/components/home/testimonials";

const Homepage = () => {
  const { instance } = useMsal();
  useEffect(() => {
    const activeAccount = instance.getActiveAccount();
    if (activeAccount) {
      console.log("Full idTokenClaims:", activeAccount.idTokenClaims);

      const objectId = activeAccount.idTokenClaims?.oid;
      console.log("User Object ID:", objectId);
    } else {
      console.log("No active account. User is not signed in.");
    }
  }, [instance]);

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      {/* Welcome v1 */}
      <div className="flex flex-col md:flex-row items-start gap-12 max-w-6xl mx-auto mt-10">
        {/* Welcome Message */}
        <WelcomeSection />
        {/* Location Info (Map + Address + Image) */}
        <LocationInfo />
      </div>

      {/* Our Space */}
      <Tour />

      {/* About Us */}
      <About />

      {/* Enroll process + Schedule */}
      <Expect />

      {/* Children Art Slideshow */}
      <Art />

      {/* Testimonials + Reviews */}
      <Testimonials />
    </div>
  );
};

export default Homepage;
