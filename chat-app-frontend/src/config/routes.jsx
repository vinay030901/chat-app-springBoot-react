import { Route, Routes } from "react-router";
import App from "../App";
import ChatPage from "../components/ChatPage";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/join" element={<App />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
