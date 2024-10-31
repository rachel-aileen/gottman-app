import React, { useState, useRef, useEffect } from "react";
import "./GottmanChat.css";

const GottmanChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate Gottman's response
    setTimeout(() => {
      const gottmanMessage = {
        role: "assistant",
        content:
          "I'm happy to help! However, I'm a demo version so I can only respond with this message. The actual implementation would connect to your AI backend.",
      };
      setMessages((prev) => [...prev, gottmanMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="gottman-container">
      <div className="chat-header">
        <div className="header-content">
          <h1>Chat with Gottman</h1>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome! How can I help you today?</h2>
            <p>
              I'm Gottman, an AI assistant. I'm happy to help with analysis,
              answering questions, writing, math, coding, and more.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-header">
                  {message.role === "assistant" ? (
                    <svg
                      className="avatar"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="10" r="3" strokeWidth="2" />
                      <path
                        d="M7 21v-2c0-2.2 2.2-4 5-4s5 1.8 5 4v2"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="avatar"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="7" r="4" strokeWidth="2" />
                    </svg>
                  )}
                  <span>
                    {message.role === "assistant" ? "Gottman" : "You"}
                  </span>
                </div>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message assistant">
                <div className="message-header">
                  <svg
                    className="avatar"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="10" r="3" strokeWidth="2" />
                    <path
                      d="M7 21v-2c0-2.2 2.2-4 5-4s5 1.8 5 4v2"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Gottman</span>
                </div>
                <div className="message-content typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Gottman..."
            className="message-input"
          />
          <button
            type="submit"
            className="send-button"
            disabled={!input.trim()}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="send-icon"
            >
              <path
                d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GottmanChat;
