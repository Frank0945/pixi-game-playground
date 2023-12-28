import { StrictMode } from "react";
import { Stage } from "@pixi/react";
import { Color } from "pixi.js";
import { createRoot } from "react-dom/client";

import "./style.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Stage
      options={{
        backgroundColor: new Color({ r: 0, g: 0, b: 0 }).toArray(),
        resizeTo: window,
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <App />
    </Stage>
  </StrictMode>,
);
