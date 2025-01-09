import { Route, Routes } from "react-router";
import App from "../App";
import ChatPage from "../components/chatPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="chat" element={<ChatPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
