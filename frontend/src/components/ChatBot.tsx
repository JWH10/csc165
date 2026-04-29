import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  preFillMessage?: string;
  userName: string;
}

const quickChips = [
  "What am I missing?",
  "How do I claim FSA?",
  "Maximize my 401k",
  "Remote work stipend help",
  "Gym reimbursement steps",
];

function formatMessage(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatBot({ isOpen, onToggle, preFillMessage, userName }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '0',
        role: 'assistant',
        content: `👋 Hi ${userName}! I'm your Benefits AI Assistant.\n\nI can help you discover unclaimed benefits, explain how to claim them, and maximize your compensation package.\n\nYou have an estimated **$22,460** in unclaimed benefits this year. Let's fix that! 💰\n\nWhat would you like to know?`,
        timestamp: new Date(),
      }]);
    }
  }, [userName]);

  useEffect(() => {
    if (preFillMessage && isOpen) {
      setInput(preFillMessage);
      inputRef.current?.focus();
    }
  }, [preFillMessage, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again!",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 z-40 ${
          isOpen ? 'bg-gray-700 rotate-45' : 'bg-[#1e3a5f] hover:bg-blue-800 hover:scale-110'
        }`}
      >
        {isOpen ? '×' : '💬'}
      </button>

      <div
        className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 z-40 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ height: '520px' }}
      >
        <div className="bg-[#1e3a5f] text-white p-4 rounded-t-2xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-lg">🤖</div>
          <div>
            <div className="font-semibold text-sm">Benefits AI Assistant</div>
            <div className="text-xs text-blue-300 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Online
            </div>
          </div>
          <button onClick={onToggle} className="ml-auto text-blue-300 hover:text-white text-xl">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`chat-message flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">🤖</div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#1e3a5f] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start chat-message">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-2 flex-shrink-0">🤖</div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: `${i * 0.15}s`}} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickChips.map(chip => (
              <button
                key={chip}
                onClick={() => sendMessage(chip)}
                className="flex-shrink-0 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 pt-2 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about your benefits..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="bg-[#1e3a5f] text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-800 disabled:opacity-50 transition-all"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
