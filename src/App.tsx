import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import CalendarPage from "@/pages/calendar/Calendar";
import SignInPage from "@/pages/signIn/SignIn.tsx";
import Homepage from "@/pages/home/Home.tsx";
import ResourcesPage from "@/pages/resources/Resources.tsx";
//import AboutPage from '@/pages/aboutPage/AboutPage.tsx

// components
import Navbar from "@/components/Navbar.tsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
};

export default App;
