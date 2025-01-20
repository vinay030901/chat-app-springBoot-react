import { useState } from "react";
import chatIcon from "../assets/meetme.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
const JoinCreateChat = () => {
  const [details, setDetails] = useState({
    roomId: "",
    userName: "",
  });

  const {
    roomId,
    currentUser,
    connected,
    setRoomId,
    setCurrentUser,
    setConnected,
  } = useChatContext();
  const navigate = useNavigate();
  function handleFormInputChange(event) {
    setDetails({
      ...details,
      [event.target.name]: event.target.value, // this function will bring the object in the square bracket and then only change that keys' value
    });
  }
  function validateForm() {
    if (!details.userName || !details.roomId) {
      toast.error("Please fill all the fields");
      return false;
    }
    return true;
  }
  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinChatApi(details.roomId);
        toast.success("Connected to room");
        setCurrentUser(details.userName);
        setConnected(true);
        setRoomId(room.roomId);
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) toast.error(error.response.data);
        else toast.error("Error connecting to room");
        console.error(error);
      }

      // call api to create room on backend
    }
  }
  async function createRoom() {
    if (validateForm()) {
      console.log(details);
      try {
        const response = await createRoomApi(details.roomId);
        toast.success("Room created successfully");
        console.log(response);

        setCurrentUser(details.userName);
        setRoomId(response.roomId);
        setConnected(true);
        console.log("forward to chat page");
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) toast.error("Room id already exists");
        else {
          console.log(error);

          toast.error("Failed to create room");
        }
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 dark:border-gray-700 border w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow">
        <div>
          <img src={chatIcon} alt="chat-icon" className="h-24 w-24 mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-center">
          Join Room / Create Room
        </h1>
        {/* name div */}
        <div className="">
          <label htmlFor="name" className="block font-medium mb-2">
            Your name
          </label>
          <input
            onChange={handleFormInputChange}
            value={details.name}
            name="userName"
            placeholder="Your name"
            type="text"
            id="name"
            className="w-full px-4 py-2 dark:bg-gray-800 rounded-lg border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* room id div */}
        <div className="">
          <label htmlFor="name" className="block font-medium mb-2">
            Room ID
          </label>
          <input
            onChange={handleFormInputChange}
            value={details.roomId}
            name="roomId"
            placeholder="Your Room ID"
            type="text"
            id="roomid"
            className="w-full px-4 py-2 dark:bg-gray-800 rounded-lg border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={joinChat}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-800 "
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-800 "
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
