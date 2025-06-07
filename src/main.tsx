import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import "./i18n";
//import { useAuthProvider } from "./auth/hooks/authProvider.tsx";
// import { AuthProvider } from "./auth/hooks/authProvider.tsx";
//const { AuthProvider } = useAuthProvider();

import { BannerProvider } from "./context/BannerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <BannerProvider>
        <App />
      </BannerProvider>
    </BrowserRouter>
  </StrictMode>,
);
