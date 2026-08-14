import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { StudentProvider } from "./context/StudentContext";
import { NotificationProvider } from "./context/NotificationProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
  <NotificationProvider>
  <StudentProvider>
    <App />
  </StudentProvider>
</NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);