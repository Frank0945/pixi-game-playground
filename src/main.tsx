import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./style.css";
import "./game/initialize";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
