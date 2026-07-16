import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force Celestix dark theme always
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
