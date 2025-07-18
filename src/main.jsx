import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "~/styles/main.css";
import Providers from "~/components/Providers";
import App from "~/components/App";

const appElement = document.getElementById("app");

createRoot(appElement).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);