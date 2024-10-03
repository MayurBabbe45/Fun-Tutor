import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import funTutorLogo from '../assets/icons/bot.jpg'; // Import the Fun Tutor logo
import girl from '../assets/icons/girl.png'; 

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: "system", text: "Fun tutor is here! Let's learn something fun!" },
  ]);
  const [inputText, setInputText] = useState("");

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const chatBoxRef = React.useRef(null);

  React.useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
  
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "start with an easy, relatable example. Make the conversation interactive and keep it short, using questions to guide the student to the answer (e.g., What can you say about the difference between this test case and the ones that passed?). Use bullets for scenarios to prompt curiosity. Don't directly give answers, and avoid complex explanations.End by appreciating their effort: You’re doing great! With time, things will get easier. Keep going! 💪 Add emojis for engagement, and keep the tone positive and motivational.",

    
  });

  const generationConfig = {
    temperature: 1.9,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const userMessage = { role: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText(""); 

    const chatHistory = messages
      .filter((msg) => msg.role !== "system")
      .map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

    const chatSession = model.startChat({
      generationConfig,
      history: [...chatHistory, { role: "user", parts: [{ text: inputText }] }],
    });

    const result = await chatSession.sendMessage(inputText);

    setMessages((prev) => [
      ...prev,
      { role: "model", text: result.response.text() },
    ]);
  };

  return (
    <section>
      <h1 className="text-4xl font-bold text-center mt-40 flex items-center justify-center text-white ">
        <img src={girl} alt="Girl" className="w-14 h-14  mr-4" />
        Chat with Fun Tutor
      </h1>
      <div className="chat-container max-w-5xl p-4 mt-14 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        
        <div className="chat-box h-128 overflow-y-auto mb-4 p-4 border border-gray-300 rounded-lg" ref={chatBoxRef}>
          {messages.map((msg, index) => {
            const parts = [msg.text];

            return (
              <div
                key={index}
                className={`message mb-2 p-2 max-w-[80%] flex items-start ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-100 text-right max-w-fit" 
                    : "mr-auto bg-gray-100 text-left max-w-fit flex items-start" 
                }`}
              >
                
                {msg.role === "model" && (
                  <img
                    src={funTutorLogo}
                    alt="Fun Tutor Logo"
                    className="w-8 h-8 rounded-full mr-2" // Small circular logo
                  />
                )}
                <div>
                  <strong className="block font-semibold">
                    {msg.role === "user" ? "You" : "Fun Tutor"}:
                  </strong>
                  {parts.map((part, i) => (
                    <span key={i} className="block">
                      {part.split('**').map((subPart, j) => 
                        j % 2 === 1 ? <strong key={j}>{subPart}</strong> : subPart
                      )}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={sendMessage} className="chat-input-form flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Fun Tutor something..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
