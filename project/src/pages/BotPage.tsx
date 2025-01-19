import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';

const BotPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm your Shield Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add user message
    setMessages((prev) => [...prev, { type: 'user', content: input }]);
    // Simulate bot response (replace with actual API integration)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: 'This is a placeholder response.',
        },
      ]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Chatbot Page</h1>
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-cyan-600">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Shield Assistant</h2>
          </div>
        </div>
        {/* Chat messages */}
        <div className="h-[600px] overflow-y-auto p-4 space-y-4 bg-gray-900">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-200'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        {/* Input form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cybersecurity..."
              className="flex-1 rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BotPage;