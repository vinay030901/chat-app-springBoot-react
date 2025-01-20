import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import MessageContainer from "./MessageContainer";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { baseURL } from "../config/AxiosHelper";
import toast from "react-hot-toast";
import { MdAttachment, MdCameraAlt, MdSend } from "react-icons/md";

const ChatPage = () => {
  const { roomId, currentUser, connected } = useChatContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) navigate("/");
  }, [roomId, currentUser, connected, navigate]);

  const [messages, setMessages] = useState([
    { content: "Hello", sender: "Vinay" },
    { content: "Hi", sender: "Rahul" },
    { content: "How are you?", sender: "Vinay" },
    { content: "I am doing good, what about you?", sender: "Rahul" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
  ]);

  // page init: load the messages

  // initialisation of stomp client
  useEffect(() => {
    const connectWebSocket = () => {
      // sock js
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("connected");
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const data = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, data]);
        });
      });
    };
    connectWebSocket();
  }, [roomId]);

  // send message handle
  const sendMessage = async (e) => {
    e.preventDefault();
    if (stompClient && connected && input.trim()) {
      console.log(input);
    }
    stompClient.send(
      `/app/sendMessage/${roomId}`,
      {},
      JSON.stringify({ content: input, sender: currentUser, roomId: roomId })
    );
    setInput("");
  };

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState("");

  return (
    <div>
      <Header />
      <main className="py-20 w-2/3 dark:bg-[#1e1c41] mx-auto border h-screen overflow-auto">
        <div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === currentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`m-2 p-2 rounded max-w-sm ${
                  message.sender === currentUser
                    ? "bg-[#075E54]"
                    : "bg-[#1A2426]"
                }`}
              >
                <div className="flex flex-row gap-2">
                  <img
                    className="h-10 w-10"
                    src="https://avatar.iran.liara.run/public"
                    alt=""
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">{message.sender}</p>
                    <p>{message.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* input message container */}
      <div className="fixed bottom-2 w-full h-16">
        <div className="flex items-center justify-between gap-4 h-full w-2/3 rounded-full mx-auto p-2">
          <div className="flex items-center gap-4 w-full bg-gray-800 rounded-full p-2">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
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

export default ChatPage;
