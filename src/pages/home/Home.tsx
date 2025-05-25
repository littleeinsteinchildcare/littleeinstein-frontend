import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
// home page components
import WelcomeSection from "@/components/home/welcome";
import LocationInfo from "@/components/home/location";
import Tour from "@/components/home/tour";
import About from "@/components/home/about";
import Expect from "@/components/home/expect";
import Art from "@/components/home/art";
import Testimonials from "@/components/home/testimonials";
const Homepage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  console.log(userId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged in Firebase user:", user);
        setUserId(user.uid);
      } else {
        console.log("User not signed in");
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
