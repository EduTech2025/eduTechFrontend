'use client';
import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'other', timestamp: new Date().toLocaleTimeString() },
    { id: 2, text: 'Just checking out the chat feature!', sender: 'user', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInput('');

    // Mock response (replace with API call in production)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: 'Got your message! How else can I assist?',
          sender: 'other',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[90%] flex-1 text-white">
      <h1 className="text-2xl font-bold my-4">Doubts Chat</h1>
      <div className="flex-1 space-y-4 pr-2 overflow-y-auto custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                  : 'bg-white/10'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-50">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center mx-4 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-white/10 text-white p-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-400"
        />
        <button
          type="submit"
          className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-r-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-400"
        >
          <Send size={20} />
        </button>
      </form>
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 0; /* Chrome, Safari, Edge */
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
        }
      `}</style>
    </div>
  );
}