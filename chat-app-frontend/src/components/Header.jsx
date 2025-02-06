import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import useChatContext from "../context/ChatContext";
import useBotContext from "../context/BotContext";

const Header = ({ stompClient, chat }) => {
  const {
    roomId,
    currentUser,
    setConnected,
    setRoomId,
    setCurrentUser,
    setToken,
  } = useChatContext();
  const { botName, userName } = useBotContext();
  const navigate = useNavigate();

  function handleLogout() {
    if (stompClient) stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    setToken(null);
    navigate("/join");
  }
  return (
    <header className="fixed w-full flex justify-around items-center p-4 bg-gray-200 dark:bg-gray-800 shadow">
      <div>
        <h1 className="text-xl font-semibold">
          Room: <span>{`${chat === "botChat" ? botName : roomId}`}</span>
        </h1>
      </div>
      {/* chat messages  */}
      <div>
        <h1 className="text-xl font-semibold">
          User: <span>{`${chat === "botChat" ? userName : currentUser}`}</span>
        </h1>
      </div>
      {/* button to leave room  */}
      <div>
        <button
          className="dark:bg-red-500 dark:hover:bg-red-700 text-white px-4 py-2 rounded-full"
          onClick={handleLogout}
        >
          Leave Room
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  stompClient: PropTypes.object,
  chat: PropTypes.string,
};

export default Header;
