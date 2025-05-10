import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

// pages
import CalendarPage from "@/pages/calendar/Calendar";
import EventsPage from "@/pages/calendar/Events";
import SignInPage from "@/pages/signIn/SignIn.tsx";
import Homepage from "@/pages/home/Home.tsx";
import ResourcesPage from "@/pages/resources/Resources.tsx";
import AboutUsPage from "@/pages/aboutUs/AboutUs.tsx";
import ContactUsPage from "@/pages/contactUs/ContactUs.tsx";
import NWChildEnrollmentForm from "@/pages/resources/NwChildEnrollment";
import ODEChildEnrollmentForm from "@/pages/resources/ODEChildEnrollment";
import DocsPage from "@/pages/docs/Docs.tsx"; // Import the new DocsPage component
import AdminPage from "@/pages/admin/Admin.tsx";

// components
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/admin/Banner";

import { useContext } from "react";
import { BannerContext } from "@/context/BannerContext";

const App = () => {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const { banner } = useContext(BannerContext);

  return (
    <Router>
      <Navbar />
      {banner && <Banner type={banner.type} message={banner.message} />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/resources/" element={<ResourcesPage />} />
        <Route
          path="/resources/NWChildEnrollmentForm"
          element={<NWChildEnrollmentForm />}
        />
        <Route
          path="/resources/ODEChildEnrollmentForm"
          element={<ODEChildEnrollmentForm />}
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/calendar/events" element={<EventsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPage /> : <Navigate to="/signin" />}
        />
        <Route
          path="*"
          element={<h1 className="text-center p-60">404 - Page Not Found</h1>}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
