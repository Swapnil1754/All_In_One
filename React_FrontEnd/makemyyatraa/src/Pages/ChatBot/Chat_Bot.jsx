// src/components/ChatBot/ChatBot.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Chat_Bot.css";
import {ReactComponent as Chat_Bot } from '../../Common/Assets/chat-bot-svgrepo-com (1).svg';
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const openAiUrl = process.env.REACT_APP_OPENAI_URL;
  const openAiKey = process.env.REACT_APP_CHATBOT_APIKEY;

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };
  
const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { role: "user", content: input };
      setMessages([...messages, newMessage]);
  
      try {
        const response = await axios.post(
          openAiUrl,
          {
            model: "gpt-3.5-turbo",
            messages: [...messages, newMessage],
            max_tokens: 100,
          },
          {
            headers: {
              Authorization: `Bearer ${openAiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        const botReply = response.data.choices[0].message.content;
        setMessages([...messages, newMessage, { role: "bot", content: botReply }]);
        setInput("");
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    }
  };
  

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chatbot</h4>
            <button onClick={toggleChatBot}>X</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-button" onClick={toggleChatBot}>
        {/* <img src="/chat-" alt="Chatbot" /> */}
        <Chat_Bot />
      </button>
    </div>
  );
};

export default ChatBot;
