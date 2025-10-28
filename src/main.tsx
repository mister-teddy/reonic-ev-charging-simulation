import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Task1 from "./pages/task-1.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Task1 />
  </StrictMode>
);
