import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import CalendarPage from "@/pages/calendar/Calendar";
import SignInPage from "@/pages/signIn/SignIn.tsx";
import Homepage from "@/pages/home/Home.tsx";
import ResourcesPage from "@/pages/resources/Resources.tsx";
import AboutUsPage from "@/pages/aboutUs/AboutUs.tsx";
import ContactUsPage from "@/pages/contactUs/ContactUs.tsx";
import NWChildEnrollmentForm from "@/pages/resources/NwChildEnrollment";
import ODEChildEnrollmentForm from "@/pages/resources/ODEChildEnrollment";
import DocsPage from "@/pages/docs/Docs.tsx"; // Import the new DocsPage component
import Profile from "./pages/profile/Profile";

// components
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const App = () => {
  const isLoggedIn = true;

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
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
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/docs" element={<DocsPage />} />{" "}
        <Route
          path="*"
          element={<h1 className="text-center p-20">404 - Page Not Found</h1>}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
