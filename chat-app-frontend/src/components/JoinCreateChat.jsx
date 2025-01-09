import { useState } from "react";
import chatIcon from "../assets/meetme.png";
import toast from "react-hot-toast";
const JoinCreateChat = () => {
  const [details, setDetails] = useState({
    roomId: "",
    userName: "",
  });

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
  function joinChat() {
    if (validateForm()) {
      console.log(details);
      toast.success(JSON.stringify(details));
      // call api to create room on backend
    }
  }
  function createRoom() {
    if (validateForm()) {
      console.log(details);
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
