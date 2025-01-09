import { useRef, useState } from "react";
import Header from "./Header";
import MessageContainer from "./MessageContainer";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { content: "Hello", sender: "Vinay" },
    { content: "Hi", sender: "Rahul" },
    { content: "How are you?", sender: "Vinay" },
    { content: "I am doing good, what about you?", sender: "Rahul" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Mohit" },
    { content: "Hi all, I am in party mood.", sender: "Vinay" },
  ]);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState("");
  const [roomId, setRoomId] = useState("");
  const [currentUser] = useState("Vinay");

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
      <MessageContainer />
    </div>
  );
};

export default ChatPage;
