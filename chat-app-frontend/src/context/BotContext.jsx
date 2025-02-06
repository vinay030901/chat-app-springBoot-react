import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import img from "../assets/defaultBot.png";

const BotContext = createContext();
export const BotProvider = ({ children }) => {
  const [botAvatar, setBotAvatar] = useState(img);
  const [userName, setUserName] = useState("");
  const [botId, setBotId] = useState("");
  const [botName, setBotName] = useState("");
  return (
    <BotContext.Provider
      value={{
        botId,
        botAvatar,
        botName,
        userName,
        setBotAvatar,
        setBotId,
        setBotName,
        setUserName,
      }}
    >
      {children}
    </BotContext.Provider>
  );
};
BotProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const useBotContext = () => useContext(BotContext);
export default useBotContext;
