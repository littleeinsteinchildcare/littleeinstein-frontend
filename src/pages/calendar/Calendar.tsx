import LittleCalendar from "@/components/calendar/Calendar";
import { useTranslation } from "react-i18next";

const CalendarPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FFFBCF] min-h-screen p-8">
      <h2 className="text-3xl font-bold text-black m-6 text-center max-w-5xl mx-auto">
        {t("calendar.title")}
      </h2>
      <div className="w-20 h-1 bg-green-800 mx-auto mb-6"></div>
      <LittleCalendar />
    </div>
  );
};

export default CalendarPage;
