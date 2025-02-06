import { useEffect, useRef, useState, useCallback } from "react";
import Header from "./Header";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { MdAttachment, MdCameraAlt, MdSend } from "react-icons/md";
import { chatWithBot, loadMessages } from "../services/BotService";
import useBotContext from "../context/BotContext";

const BotChatPage = () => {
  const { roomId, currentUser, connected, senderId } = useChatContext();
  const { botId, botAvatar, userName, botName } = useBotContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!connected) navigate("/join");
  }, [roomId, currentUser, connected, navigate]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [newMessageAdded, setNewMessageAdded] = useState(false);
  const chatBoxRef = useRef(null);

  const getMessages = useCallback(async () => {
    setMessages(await loadMessages(botId, senderId));
  }, [botId, senderId]);
  useEffect(() => {
    getMessages();
  }, []);
  const sendMessage = async () => {
    if (input.trim()) {
      const botChatRequest = {
        userId: senderId,
        userName: currentUser,
        message: input,
        botId: botId,
      };
      console.log("sent data: " + JSON.stringify(botChatRequest));
      try {
        const response = await chatWithBot(botChatRequest);
        console.log("got response: " + JSON.stringify(response));
        setMessages((prevMessages) => [...prevMessages, ...response]);
        // console.log("updated messages: " + JSON.stringify(messages));

        setInput("");
        setNewMessageAdded(true);
      } catch (error) {
        console.log(error);
        toast.error("Error sending message");
      }
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    };
    scrollToBottom();
    setNewMessageAdded(false);
  }, [newMessageAdded]);

  return (
    <div>
      <Header chat="botChat" />
      <main
        ref={chatBoxRef}
        className="py-20 w-2/3 dark:bg-[#1e1c41] mx-auto border h-screen overflow-auto"
      >
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.senderId === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`m-2 p-2 rounded max-w-sm ${
                  message.senderId === senderId
                    ? "bg-[#075E54]"
                    : "bg-[#1A2426]"
                }`}
              >
                <div className="flex flex-row gap-2">
                  <img
                    className="h-10 w-10"
                    src={`${
                      message.senderId === senderId
                        ? "https://avatar.iran.liara.run/public"
                        : `https://www.botlibre.com/${botAvatar}`
                    }`}
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">
                      {`${message.senderId === senderId ? userName : botName}`}
                    </p>
                    <p>{message.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className="fixed bottom-2 w-full h-16">
        <div className="flex items-center justify-between gap-4 h-full w-2/3 rounded-full mx-auto p-2">
          <div className="flex items-center gap-4 w-full bg-gray-800 rounded-full p-2">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              type="text"
              placeholder="Message"
              className="w-full focus:outline-none h-full p-2 text-lg text-white bg-gray-800"
            />
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 flex justify-center items-center p-2 rounded-full">
                <MdCameraAlt size={30} color="#fff" />
              </button>
              <button className="h-10 w-10 flex justify-center items-center p-2 rounded-full">
                <MdAttachment size={35} color="#fff" />
              </button>
            </div>
          </div>
          <button className="bg-green-500 h-10 w-10 flex justify-center items-center p-2 rounded-full">
            <MdSend onClick={sendMessage} size={30} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotChatPage;
