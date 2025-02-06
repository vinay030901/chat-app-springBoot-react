import { useState, useEffect } from "react";
import { getAllBots } from "../services/BotService";
import { useNavigate } from "react-router";
import useChatContext from "../context/ChatContext";
import useBotContext from "../context/BotContext";

function BotList() {
  const [bots, setBots] = useState([]);
  const [popupBot, setPopupBot] = useState(null);
  const navigate = useNavigate();
  const { setConnected } = useChatContext();
  const { setBotName, setBotAvatar, setBotId, userName } = useBotContext();
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const botsData = await getAllBots();
        setBots(botsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBots();
  }, []);

  const handleToggleExpansion = (bot) => {
    setPopupBot(bot);
  };

  const handleClosePopup = () => {
    setPopupBot(null);
  };

  const handleStartChat = (bot) => {
    // set bot image
    setBotAvatar(bot.avatar);
    setConnected(true);
    setBotId(bot.id);
    setBotName(bot.name);
    navigate(`/chat/${bot.id}`);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {bots.map((bot) => (
        <div key={bot.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`https://www.botlibre.com/${bot.avatar}`}
              alt={bot.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold mb-2">{bot.name}</h2>
            <p className="text-gray-600 mb-4">{bot.tags}</p>
            <button
              onClick={() => handleToggleExpansion(bot)}
              className="text-blue-500 hover:text-blue-700 mb-4 mr-24 md:mr-0"
            >
              Show More
            </button>
            <button
              onClick={() => handleStartChat(bot)}
              className="text-blue-500 hover:text-blue-700 md:ml-4"
            >
              Start Chat
            </button>
          </div>
        </div>
      ))}
      {popupBot && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-md rounded p-4 w-1/2">
            <h2 className="text-lg font-bold mb-2">{popupBot.name}</h2>
            <p className="text-gray-600 mb-2">{popupBot.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>Creator:</strong> {popupBot.creator}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Creation Date:</strong> {popupBot.creationDate}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Connects:</strong> {popupBot.connects}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Stars:</strong> {popupBot.stars}
            </p>
            <button
              onClick={handleClosePopup}
              className="text-blue-500 hover:text-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotList;
