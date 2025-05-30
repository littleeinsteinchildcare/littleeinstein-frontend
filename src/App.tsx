import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventProvider } from "@/context/EventContext";

// pages
import CalendarPage from "@/pages/calendar/Calendar";
import EventsPage from "@/pages/calendar/Events";
import Homepage from "@/pages/home/Home.tsx";
import ResourcesPage from "@/pages/resources/Resources.tsx";
import AboutUsPage from "@/pages/aboutUs/AboutUs.tsx";
import ContactUsPage from "@/pages/contactUs/ContactUs.tsx";
import NWChildEnrollmentForm from "@/pages/resources/NwChildEnrollment";
import ODEChildEnrollmentForm from "@/pages/resources/ODEChildEnrollment";
// import DocsPage from "@/pages/docs/Docs.tsx"; // Import the new DocsPage component
import Profile from "./pages/profile/Profile";

// components
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/admin/Banner";

// context
import { BannerContext } from "@/context/BannerContext";

// hooks
import AuthPage from "./pages/authentication/AuthPage";

const App = () => {
  // banner state
  const { banner } = useContext(BannerContext);

  // hook to check with backend to see if admin

  return (
    <>
      <Router>
        <EventProvider>
          <Navbar />
          {banner && <Banner type={banner.type} message={banner.message} />}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resources/" element={<ResourcesPage />} />
            <Route
              path="/resources/NWChildEnrollmentForm"
              element={<NWChildEnrollmentForm />}
            />
            <Route
              path="/resources/ODEChildEnrollmentForm"
              element={<ODEChildEnrollmentForm />}
            />
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendar/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            {/* <Route path="/docs" element={<DocsPage />} /> */}
          </Routes>
          <Footer />
        </EventProvider>
      </Router>
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
