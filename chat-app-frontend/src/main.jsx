import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import AppRoutes from "./config/routes.jsx";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./context/ChatContext.jsx";
import { BotProvider } from "./context/BotContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <ChatProvider>
      <BotProvider>
        <AppRoutes />
      </BotProvider>
    </ChatProvider>
  </BrowserRouter>
);
