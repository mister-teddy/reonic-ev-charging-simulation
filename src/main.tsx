import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Task1 from "./pages/task-1";
import Task2a from "./pages/task-2a";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {new URLSearchParams(location.search).has("logic") ? <Task1 /> : <Task2a />}
    <Toaster />
  </StrictMode>
);
