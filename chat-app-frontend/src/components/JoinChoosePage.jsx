import { useState } from "react";
import { useNavigate } from "react-router";
import useChatContext from "../context/ChatContext";
import useBotContext from "../context/BotContext";

function JoinChoosePage() {
  const navigate = useNavigate();

  const { setConnected, setCurrentUser, setSenderId, setToken } =
    useChatContext();
  const { setUserName } = useBotContext();
  const [error] = useState(null);

  const handleJoinRoom = () => {
    navigate("/join/room");
  };

  const handleChatWithAI = () => {
    navigate("/join/chatWithAi");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setSenderId(null);
    setUserName(null);
    setConnected(false);
    setCurrentUser(null);
    navigate("/users/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/3">
        <h1 className="text-3xl text-white font-bold mb-4">Chat-Room App</h1>
        <p className="text-lg text-white mb-4">Choose an option to continue:</p>
        <div className="flex justify-between">
          <button
            onClick={handleJoinRoom}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Join a Room
          </button>
          <button
            onClick={handleChatWithAI}
            className="ml-3 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Chat with AI
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 mt-4"
        >
          Logout
        </button>
        {error && <p className="text-red-500 text-lg mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default JoinChoosePage;
