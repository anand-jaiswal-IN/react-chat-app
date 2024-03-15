import { useState } from "react";
import "./App.css";
function App() {
  const [error, seterror] = useState(null);
  const [chatHistory, setchatHistory] = useState([]);
  const [message, setmessage] = useState("");

  const [isFetchingData, setisFetchingData] = useState(false);

  const randomChattingQuestions = [
    "What's the most interesting thing you've learned recently?",
    "If you could travel anywhere in the world right now, where would you go and why?",
    "What's your favorite way to relax and unwind after a long day?",
    "Do you have any hobbies or interests that you're passionate about?",
    "What's the best book you've read or movie you've watched recently?",
    "If you could meet any historical figure, who would it be and what would you ask them?",
    "What's your favorite type of cuisine or food to eat?",
    "Are there any goals or aspirations you're currently working towards?",
    "What's the most adventurous thing you've ever done?",
    "If you could have any superpower, what would it be and how would you use it?",
    "What's a skill or talent you've always wanted to learn?",
    "Do you have any pets? If not, do you want any?",
    "What's a place you've always wanted to visit but haven't had the chance to yet?",
    "Are you a morning person or a night owl?",
    "If you could relive any moment from your past, what would it be and why?",
  ];

  const getLatestTime = () => {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const timeString = `${hours}:${minutes} ${meridiem}`;

    return timeString;
  };
  const handleSend = async () => {
    try {
      const backendUrl = "http://localhost:8080/gemini";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, chatHistory }),
      };

      setisFetchingData(true);

      const response = await fetch(backendUrl, options);

      const data = await response.json();
      setchatHistory((prev) => [
        ...prev,
        { role: "user", parts: message, chatTime: getLatestTime() },
        { role: "model", parts: data.text, chatTime: getLatestTime() },
      ]);
      setmessage("");
    } catch (err) {
      seterror(data.err);
    } finally {
      setisFetchingData(false);
    }
  };
  return (
    <>
      <div className="wrapper bg-black text-white">
        <header className="py-4 px-[15rem] bg-light-black">
          <h1 className="text-3xl mb-2">
            Chat Application Using{" "}
            <span className="bg-sky-600 px-2 py-1 rounded-md">
              {" "}
              Generative AI by Google
            </span>
          </h1>
        </header>
        <br />
        <main className="px-[15rem]">
          <div>
            <p className="text-xl">
              What do you want? &nbsp;
              <button
                className="bg-orange-400 hover:bg-orange-600 px-2 py-1 rounded-md"
                onClick={() => {
                  setmessage(
                    randomChattingQuestions[
                      Math.floor(Math.random() * randomChattingQuestions.length)
                    ]
                  );
                }}
              >
                Surprise
              </button>
            </p>
          </div>
          <br />
          <div className="chat-history max-h-[250px] overflow-y-scroll overflow-x-hidden border-[0.5px] p-4 rounded-md scroll-smooth">
            {chatHistory.map((item, index) => (
              <div key={index} className="mb-2">
                <p
                  className={`${
                    item.role === "user"
                      ? "text-right text-gray-100"
                      : "text-orange-400"
                  } bg-light-black px-4 py-2 text-md rounded-md`}
                >
                  <span>{item.parts}</span>
                  &nbsp;
                  <span className="border-red-500 border-[1px] py-1 px-2 text-white rounded-xl">
                    {item.chatTime}
                  </span>
                </p>
              </div>
            ))}
            {isFetchingData && <p className="text-center font-bold">Generating...</p>}
          </div>
          <br />
          <div className="flex">
            <input
              type="text"
              className="w-[100%] outline-none border-none text-gray-800 px-2"
              placeholder="When is the Christmas?"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
            />
            {!error && (
              <button
                className="bg-green-600 hover:bg-green-800 px-2 py-1 text-2xl"
                onClick={handleSend}
              >
                Send
              </button>
            )}
          </div>
          <br />
          <button
            className="bg-red-600 hover:bg-red-800 px-2 py-1 text-xl rounded-md"
            onClick={() => {
              setchatHistory([]);
              seterror(null);
              setmessage(null);
            }}
          >
            Clear
          </button>
          <br />
          <br />

          <div className="errors">
            {error && (
              <>
                <h2 className="text-3xl font-bold text-red-600">Error : </h2>
                <p className="text-xl text-red-400">{error}</p>
              </>
            )}
          </div>
        </main>
        <br />
        <br />
      </div>
    </>
  );
}

export default App;
