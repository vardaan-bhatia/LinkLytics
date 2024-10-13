import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UrlProvider } from "./UserContext.jsx";

// Render the application with StrictMode for highlighting potential issues
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* UrlProvider to manage state globally */}
    <UrlProvider>
      <App />
    </UrlProvider>
  </StrictMode>
);
