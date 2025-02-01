import { Route, Routes } from "react-router";
import App from "../App";
import ChatPage from "../components/ChatPage";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import JoinChoosePage from "../components/JoinChoosePage";
import BotList from "../components/BotList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/join/room" element={<App />} />
      <Route path="/join/chatWithAI" element={<BotList />} />
      <Route path="/join" element={<JoinChoosePage />} />
      <Route path="/users/register" element={<RegisterPage />} />
      <Route path="/users/login" element={<LoginPage />} />

      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
