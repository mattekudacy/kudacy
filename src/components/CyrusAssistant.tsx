'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaInfoCircle } from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatResponse {
  response: string;
  questionsRemaining: number;
  limitReached?: boolean;
  error?: boolean;
}

export default function CyrusAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Cyrus Mante's AI assistant. I can help you learn about his background, experience, and projects by searching his LinkedIn profile and the web. You can ask up to 5 questions about Cyrus. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState(5);
  const [sessionId] = useState(() => {
    // Use a persistent session ID from localStorage or create one
    if (typeof window !== 'undefined') {
      let storedSessionId = localStorage.getItem('cyrus_chat_session_id');
      if (!storedSessionId) {
        storedSessionId = Date.now().toString();
        localStorage.setItem('cyrus_chat_session_id', storedSessionId);
      }
      return storedSessionId;
    }
    return Date.now().toString();
  });
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load question count from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCount = localStorage.getItem('cyrus_questions_asked');
      const questionsAsked = storedCount ? parseInt(storedCount, 10) : 0;
      const remaining = Math.max(0, 5 - questionsAsked);
      setQuestionsRemaining(remaining);
      setLimitReached(remaining === 0);
      
      console.log('Loaded from localStorage - Questions asked:', questionsAsked, 'Remaining:', remaining);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || limitReached || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputValue,
          sessionId 
        })
      });

      const data: ChatResponse = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setQuestionsRemaining(data.questionsRemaining);
      setLimitReached(data.limitReached || false);
      
      // Update localStorage with the new question count
      if (typeof window !== 'undefined') {
        const questionsAsked = 5 - data.questionsRemaining;
        localStorage.setItem('cyrus_questions_asked', questionsAsked.toString());
        console.log('Updated localStorage - Questions asked:', questionsAsked, 'Remaining:', data.questionsRemaining);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRobot size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {questionsRemaining}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[550px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <FaRobot className="text-white text-xl" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Cyrus's AI Assistant</h3>
                  <p className="text-cyan-100 text-xs">Powered by Tavily Search</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/20"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Questions Counter */}
            <div className={`px-4 py-2 text-center text-sm ${limitReached ? 'bg-red-500' : questionsRemaining <= 2 ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
              <FaInfoCircle className="inline mr-2" />
              {limitReached ? 'Question limit reached' : `${questionsRemaining} questions remaining`}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl shadow-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white ml-4'
                        : 'bg-gray-700 text-gray-100 mr-4'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-2 opacity-70 ${message.sender === 'user' ? 'text-cyan-100' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 text-gray-100 p-3 rounded-2xl mr-4 shadow-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={limitReached ? "Question limit reached..." : "Ask me about Cyrus..."}
                  disabled={limitReached}
                  className="flex-1 bg-gray-700 text-white p-3 rounded-xl border border-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={limitReached || !inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white p-3 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className={isTyping ? 'animate-pulse' : ''} />
                </button>
              </div>
              {limitReached && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-300 text-sm mt-2 p-3 bg-gray-700/50 rounded-lg"
                >
                  <p className="mb-2">📧 You've reached the 5-question limit.</p>
                  <p className="text-xs text-gray-400 mb-3">For more information, please email:</p>
                  <a 
                    href="mailto:cyrus2952@gmail.com?subject=Question about your portfolio" 
                    className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
                  >
                    Email Cyrus
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
