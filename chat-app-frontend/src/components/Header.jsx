import { useNavigate } from "react-router";
import useChatContext from "../context/ChatContext";

const Header = ({ stompClient }) => {
  const {
    roomId,
    currentUser,
    setConnected,
    setRoomId,
    setCurrentUser,
    setToken,
  } = useChatContext();
  const navigate = useNavigate();

  function handleLogout() {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    setToken(null);
    navigate("/login");
  }
  return (
    <header className="fixed w-full flex justify-around items-center p-4 bg-gray-200 dark:bg-gray-800 shadow">
      <div>
        <h1 className="text-xl font-semibold">
          Room: <span>{roomId}</span>
        </h1>
      </div>
      {/* chat messages  */}
      <div>
        <h1 className="text-xl font-semibold">
          User: <span>{currentUser}</span>
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

export default Header;
