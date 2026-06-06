/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, RefreshCw, Send, Sparkles, X, Bot, ArrowRight, CornerDownRight } from 'lucide-react';
import { Product, AssistantMessage } from '../types';
import { generateAssistantResponse } from '../lib/assistantEngine';
import { motion, AnimatePresence } from 'motion/react';

interface AIShoppingAssistantProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const QUICK_PROMPTS = [
  'Find me a phone under ₹20000',
  'Best laptop for students',
  'Gift for mothers under ₹1000',
  'Highly-rated running shoes'
];

export function AIShoppingAssistant({ products, onSelectProduct }: AIShoppingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Greetings! I am your SwiftCart AI Shopping Assistant. 🛒✨\n\nI can parse our inventory and help you match budget smartphones, student devices, or special holiday gifts. Tap one of our custom query prompts below or enter details!",
      timestamp: '12:00 PM'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest chats
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and outputting matching recommendations
    setTimeout(() => {
      const response = generateAssistantResponse(text, products);
      const assistantMsg: AssistantMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProducts: response.recommendedProducts
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div id="ai-assistant-root" className="fixed bottom-6 right-6 z-45 flex flex-col items-end font-sans">
      {/* Expandable chat module */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-panel"
            initial={{ opacity: 0, scale: 0.90, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.90, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-[330px] sm:w-[380px] h-[480px] bg-slate-900 text-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-800 mb-3"
          >
            {/* Header Banner */}
            <div className="bg-slate-950 p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 bg-indigo-650 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-200" />
                </div>
                <div className="text-left">
                  <span className="font-black text-xs tracking-wider text-slate-100 flex items-center gap-1.5 uppercase">
                    SwiftCart AI Companion
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium">Interactive Shopping Assistant</p>
                </div>
              </div>
              <button
                id="close-ai-assistant"
                onClick={() => setIsOpen(false)}
                className="hover:bg-slate-800 text-slate-400 p-1.5 rounded transition cursor-pointer"
                aria-label="Close Assistant Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat List area */}
            <div id="ai-chat-history" ref={listRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-950/20">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  <div
                    className={`rounded-lg p-3 text-xs leading-relaxed text-left whitespace-pre-line ${
                      m.sender === 'user'
                        ? 'bg-indigo-600 text-white font-medium rounded-tr-none border border-indigo-500'
                        : 'bg-slate-850 text-slate-200 rounded-tl-none border border-slate-800/80'
                    }`}
                  >
                    {m.text}

                    {/* Inline product recommendations */}
                    {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                      <div className="mt-3.5 flex flex-col gap-2 border-t border-slate-800 pt-3">
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-1">
                          Matched Catalog Items:
                        </span>
                        {m.recommendedProducts.map((p) => (
                          <div
                            key={p.id}
                            id={`ai-recommendation-item-${p.id}`}
                            onClick={() => onSelectProduct(p)}
                            className="bg-slate-900 border border-slate-800 hover:border-indigo-500 rounded-lg p-2 cursor-pointer transition flex items-center justify-between gap-2 hover:bg-slate-850"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-8.5 h-8.5 object-contain bg-white rounded shrink-0 p-0.5"
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <span className="text-[10px] font-bold text-slate-200 block truncate w-[140px] sm:w-[180px]">{p.name}</span>
                                <span className="text-[8px] text-slate-500 font-semibold block uppercase tracking-wider">{p.brand} • {p.category}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                              <span className="text-[10px] font-black text-indigo-300">₹{p.price.toLocaleString('en-IN')}</span>
                              <ArrowRight className="w-2.5 h-2.5 text-indigo-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 font-mono">{m.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="self-start flex items-center gap-1 bg-slate-850 p-2.5 rounded-lg rounded-tl-none border border-slate-800">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Quick action chips list */}
            <div className="p-2 bg-slate-950 border-t border-slate-850 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
              {QUICK_PROMPTS.map((pText, idx) => (
                <button
                  key={idx}
                  id={`quick-ai-prompt-${idx}`}
                  onClick={() => handleSendMessage(pText)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10.5px] font-semibold text-slate-350 hover:text-white px-3 py-1.5 rounded transition shrink-0 cursor-pointer"
                >
                  {pText}
                </button>
              ))}
            </div>

            {/* Input Form Panel */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask model (e.g. laptop for students)..."
                id="ai-assistant-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-500 font-medium"
              />
              <button
                type="submit"
                id="ai-send-btn"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg transition cursor-pointer shrink-0"
                aria-label="Send Query Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button widget */}
      <motion.button
        id="trigger-ai-assistant"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-center cursor-pointer border border-slate-800 ring-4 ring-indigo-500/10 hover:ring-indigo-600/20 transition-all duration-200"
      >
        <Bot className="w-5.5 h-5.5 text-indigo-400" />
        <span className="font-black text-[10px] tracking-widest pl-2 uppercase block">
          AI Shop Companion
        </span>
      </motion.button>
    </div>
  );
}
