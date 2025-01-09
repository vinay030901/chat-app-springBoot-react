const Header = () => {
  return (
    <header className="fixed w-full flex justify-around items-center p-4 bg-gray-200 dark:bg-gray-800 shadow">
      {/* chat room name  */}
      <div>
        <h1 className="text-xl font-semibold">Room: family</h1>
      </div>
      {/* chat messages  */}
      <div>
        <h1 className="text-xl font-semibold">
          User: <span>Vinay Kumar</span>
        </h1>
      </div>
      {/* button to leave room  */}
      <div>
        <button className="dark:bg-red-500 dark:hover:bg-red-700 text-white px-4 py-2 rounded-full">
          Leave Room
        </button>
      </div>
    </header>
  );
};

export default Header;
