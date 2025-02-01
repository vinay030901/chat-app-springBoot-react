import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState("");
  const [senderId, setSenderId] = useState("");
  return (
    <ChatContext.Provider
      value={{
        roomId,
        currentUser,
        connected,
        token,
        senderId,
        setRoomId,
        setCurrentUser,
        setConnected,
        setToken,
        setSenderId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const useChatContext = () => useContext(ChatContext);
export default useChatContext;
