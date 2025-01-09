import { MdAttachment, MdCameraAlt, MdSend } from "react-icons/md";

const MessageContainer = () => {
  return (
    <div className="fixed bottom-2 w-full h-16">
      <div className="flex items-center justify-between gap-4 h-full w-2/3 rounded-full mx-auto p-2">
        <div className="flex items-center gap-4 w-full bg-gray-800 rounded-full p-2">
          <input
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
          <MdSend size={30} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default MessageContainer;
