import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UrlProvider } from "./UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UrlProvider>
      <App />
    </UrlProvider>
  </StrictMode>
);
