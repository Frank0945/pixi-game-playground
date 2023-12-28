import { StrictMode } from "react";
import { Color } from "pixi.js";
import { createRoot } from "react-dom/client";
import { Stage } from "react-pixi-fiber";

import "./style.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Stage
      options={{
        backgroundColor: new Color({ r: 0, g: 0, b: 0 }).toArray(),
        width: 1920,
        height: 1080,
      }}
    >
      <App />
    </Stage>
  </StrictMode>,
);
