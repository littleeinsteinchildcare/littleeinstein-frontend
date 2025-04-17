import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import CalendarPage from "@/pages/calendar/Calendar";
import SignInPage from "@/pages/signIn/SignIn.tsx";
import Homepage from "@/pages/home/Home.tsx";
import ResourcesPage from "@/pages/resources/Resources.tsx";
//import AboutPage from '@/pages/aboutPage/AboutPage.tsx
import NWChildEnrollmentForm from "./pages/resources/NwChildEnrollment";
import ODEChildEnrollmentForm from "./pages/resources/ODEChildEnrollment";

// components
import Navbar from "@/components/Navbar.tsx";

const App = () => {
  return (
    <Router>
      <Navbar />
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
      </Routes>
    </Router>
  );
};

export default App;
