import outputonlinepngtools from "@/assets/outputonlinepngtools.png";
import { useTranslation } from "react-i18next";
import drawing1 from "@/assets/temp1.png";
import drawing2 from "@/assets/outputonlinepngtools.png";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";

const Homepage = () => {
  const { t } = useTranslation();
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
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-6xl mx-auto">
        {/*Location picture component*/}
        <div className="bg-[#94EE8F] p-6 rounded-4xl">
          <img
            src={outputonlinepngtools}
            alt="Building"
            className="w-full h-auto bg-white rounded-4xl"
          />
        </div>

        {/*Side text */}
        <div className="p-6">
          <p className="text-black text-3xl font-semibold pb-5">
            {t("homepage.address")}
          </p>
          <p className="text-black text-lg mt-2 pb-5">
            <strong>{t("homepage.hoursLabel")}:</strong>{" "}
            {t("homepage.hoursValue")}
          </p>
          <p className="text-black text-lg mt-1 pb-5">
            <strong>{t("homepage.agesLabel")}:</strong>{" "}
            {t("homepage.agesValue")}
          </p>

          <div className="rounded overflow-hidden shadow-md mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.2186473211314!2d-122.96421139999998!3d45.505677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495101173d997db%3A0x8e7eb10eeaa48cd1!2s1789%20SE%20River%20Rd%2C%20Hillsboro%2C%20OR%2097123!5e0!3m2!1sen!2sus!4v1745055129136!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/*slideshow*/}
      <div className="overflow-hidden bg-[#94EE8F] min-h-[200px] mt-12 p-6 rounded-4xl items-center justify-center mx-auto md:max-w-6xl">
        <div className="flex animate-scroll gap-4 w-max">
          {[drawing1, drawing2, drawing1, drawing2].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Child drawing ${index + 1}`}
              className="h-40 w-auto rounded-2xl object-contain"
            />
          ))}

          {[drawing1, drawing2, drawing1, drawing2].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Child drawing ${index + 1}`}
              className="h-40 w-auto rounded-2xl object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
