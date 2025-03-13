//import CalendarPage from "@/pages/calendar/Calendar.tsx";
//import ResourcesPage from "./pages/resourcesPage";
// not adding react-router-dom yet, just temp for now for PR
// Line Below: commented to fix merge conflict.
//import Staff from "./pages/Staff";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <div>
      <Homepage />
      {/*<ResourcesPage />
      <!-- Line Below: commented to fix merge conflict. -->
        <CalendarPage />
      <!-- <Staff /> --> */}
    </div>
  );
};
export default App;
