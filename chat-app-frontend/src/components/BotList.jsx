import { useState, useEffect } from "react";
import axios from "axios";

function BotList() {
  const [bots, setBots] = useState([]);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    const xmlData = '<browse application="8909803789232193318"></browse>';
    const headers = {
      "Content-Type": "application/xml",
      "Content-Length": xmlData.length,
      Host: "www.botlibre.com",
    };

    axios
      .post("https://www.botlibre.com/rest/api/get-bots", xmlData, { headers })
      .then((response) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const instances = xmlDoc.getElementsByTagName("instance");
        const botList = [];
        for (let i = 0; i < instances.length; i++) {
          const instance = instances[i];
          const bot = {
            id: instance.getAttribute("id"),
            name: instance.getAttribute("name"),
            alias: instance.getAttribute("alias"),
            avatar: instance.getElementsByTagName("avatar")[0].textContent,
            description:
              instance.getElementsByTagName("description")[0].textContent,
            tags: instance.getElementsByTagName("tags")[0].textContent,
          };
          botList.push(bot);
        }
        setBots(botList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShowMore = (id) => {
    setShowMore((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <div className="flex flex-wrap justify-center">
      {bots.map((bot) => (
        <div key={bot.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`https://www.botlibre.com/${bot.avatar}`}
              alt={bot.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-bold mb-2">{bot.name}</h2>
            <p className="text-gray-600 mb-4">{bot.alias}</p>
            <button
              onClick={() => handleShowMore(bot.id)}
              className="text-blue-500 hover:text-blue-700 mb-4"
            >
              {showMore[bot.id] ? "Show Less" : "Show More"}
            </button>
            {showMore[bot.id] && (
              <div>
                <p className="text-gray-600 mb-2">{bot.description}</p>
                <p className="text-gray-600 mb-4">Tags: {bot.tags}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BotList;
