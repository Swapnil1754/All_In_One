import React, { useState } from 'react';
import './Chat_Bot.css';
import { FaComments } from 'react-icons/fa'; // Import an icon from react-icons library

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // For toggling chat window

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sender: 'user', message }),
    });
    const data = await response.json();
    setResponses((prevResponses) => [
      ...prevResponses,
      { sender: 'user', text: message },
      ...data,
    ]);
    setMessage('');
  };

  const clearChat = () => {
    setResponses([]);
  };

  return (
    <div>
  <button className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
    <FaComments size={24} color="white" />
  </button>

  {isOpen && (
    <div className="chatbot-window">
      <div className="chatbot-messages">
        {responses.map((res, index) => (
          <p key={index} className={res.sender === 'user' ? 'user-message' : 'bot-message'}>
            {res.text}
          </p>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
              e.preventDefault(); // Prevents Enter key from inserting a new line
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearChat} className="clear-chat">Clear</button>
      </div>
    </div>
  )}
</div>

  );
};

export default Chatbot;
