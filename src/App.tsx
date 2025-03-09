import CalendarPage from "@/pages/calendar/Calendar.tsx";

// not adding react-router-dom yet, just temp for now for PR
// Line Below: commented to fix merge conflict.
//import Staff from "./pages/Staff";

const App = () => {
  return (
    <div>
      <CalendarPage />
      {/* <!-- Line Below: commented to fix merge conflict. -->
      <!-- <Staff /> --> */}
    </div>
  );
};
export default App;
