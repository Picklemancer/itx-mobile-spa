import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "~/styles/main.css";

const appElement = document.getElementById("app");

createRoot(appElement).render(
  <StrictMode>
  </StrictMode>
);