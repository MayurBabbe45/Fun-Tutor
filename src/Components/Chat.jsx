import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Use Socratic way of study , start with an easy, relatable example. Make the conversation interactive and keep it short, using questions to guide the student to the answer (e.g., What can you say about the difference between this test case and the ones that passed?). Use bullets for scenarios to prompt curiosity. Don't directly give answers, and avoid complex explanations. End by appreciating their effort: You’re doing great! With time, things will get easier. Keep going! 💪 Add emojis for engagement, and keep the tone positive and motivational.",
  });

  const generationConfig = {
    temperature: 1.9,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const formatResponse = (response) => {

    return response
      .split('\n')
      .map(line => {
        if (line.trim().startsWith('*')) {
          const content = line.trim().substring(1).trim();
            const formattedContent = content
            .replace(/`([^`]+)`/g, '<code>$1</code>')  
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') 
            .replace(/\*([^*]+)\*/g, '<strong>$1</strong>'); 
          return `<li>${formattedContent}</li>`;
        }
        
        if (line.trim() === "") {
          return "<br/>";
        }

        const formattedLine = line
          .replace(/`([^`]+)`/g, '<code>$1</code>')  
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); 
        return `<p>${formattedLine}</p>`;
      })
      .join('');
  };
  
  const sendMessage = async (e) => {
    e.preventDefault();

    const userMessage = { role: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
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

      if (result && result.response) {
        const responseText = await result.response.text();

        const formattedResponse = formatResponse(responseText);
        setMessages((prev) => [
          ...prev,
          { role: "model", text: formattedResponse },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "system", text: "Oops! Something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <section className="p-4 sm:p-8 md:p-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-20 sm:mt-30 md:mt-40 flex items-center justify-center text-white">
        <img src={girl} alt="Girl" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mr-2 sm:mr-3 md:mr-4" />
        Chat with Fun Tutor
      </h1>
      <div className="chat-container max-w-full sm:max-w-3xl md:max-w-5xl p-2 sm:p-4 md:p-6 mt-10 sm:mt-12 md:mt-14 mx-auto bg-white shadow-md rounded-lg">
        <div className="chat-box h-96 sm:h-112 md:h-128 overflow-y-auto mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 md:p-4 border border-gray-300 rounded-lg" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message mb-1 sm:mb-2 md:mb-3 p-1 sm:p-2 md:p-3 max-w-[80%] flex items-start ${
                msg.role === "user"
                  ? "ml-auto bg-blue-100 text-right max-w-fit"
                  : "mr-auto bg-gray-100 text-left max-w-fit flex items-start"
              }`}
            >
              {msg.role === "model" && (
                <img
                  src={funTutorLogo}
                  alt="Fun Tutor Logo"
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full mr-1 sm:mr-2 md:mr-3"
                />
              )}
              <div>
                <strong className="block font-semibold">
                  {msg.role === "user" ? "You" : "Fun Tutor"}:
                </strong>
                <div
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="chat-input-form flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Fun Tutor something..."
            className="flex-grow p-1 sm:p-2 md:p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-1 sm:p-2 md:p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
