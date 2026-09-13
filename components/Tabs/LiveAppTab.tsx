"use client";
import { useState, useRef, useEffect } from 'react';
import { client } from "@gradio/client";
import { Send, Bot, User, Command } from 'lucide-react';

export const LiveAppTab = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{role: 'user' | 'agent', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Feature 3: Context-Aware Prompt Chips
  const suggestedPrompts = [
    "Define the core architecture of Lumina-1.",
    "Explain the semantic graph memory structure.",
    "Initialize standard cognitive reasoning test."
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    
    setInput('');
    setHistory(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      // Connects to your specific HF Space via API endpoint seen in Screenshot
      const app = await client("ai-sovereign-x/Lumina-1-Executive-Core");
      const result = await app.predict("/process_pass", { text });
      
      // result.data[0] is the efferent string response based on your grad ui tuple
      const responseText = (result.data as any[])[0] as string;
      setHistory(prev => [...prev, { role: 'agent', text: responseText }]);
    } catch (error) {
      setHistory(prev => [...prev, { role: 'agent', text: "Error: Inference engine timeout. Check API endpoint." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="h-[75vh] flex flex-col edge-lit-card">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-corporate-700 flex justify-between items-center bg-gray-50/50 dark:bg-corporate-800/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-corporate-900 dark:bg-white flex items-center justify-center">
            <Command className="w-4 h-4 text-white dark:text-corporate-900" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Lumina Executive Core</h2>
            <p className="text-xs text-gray-500">v1.0.0-rc | Stable</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-corporate-800 flex items-center justify-center mb-6 shadow-sm">
               <Bot className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Welcome to Lumina</h3>
            <p className="text-sm text-gray-500 mb-8">Initialize interaction sequence by typing a query or selecting a pre-configured architecture prompt below.</p>
            
            <div className="flex flex-col w-full gap-3">
              {suggestedPrompts.map((p, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(p)}
                  className="px-4 py-3 text-sm text-left border border-gray-200 dark:border-corporate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-corporate-800 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          history.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'agent' && (
                <div className="w-8 h-8 rounded-full bg-corporate-100 dark:bg-corporate-800 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`px-4 py-3 max-w-[80%] rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-corporate-900 text-white dark:bg-white dark:text-corporate-900' 
                  : 'bg-gray-100 text-gray-900 dark:bg-corporate-800 dark:text-gray-100 border border-gray-200 dark:border-corporate-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex gap-4 justify-start">
             <div className="w-8 h-8 rounded-full bg-corporate-100 dark:bg-corporate-800 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-corporate-800 text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150" />
              </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-corporate-900 border-t border-gray-200 dark:border-corporate-700">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-center"
        >
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Lumina..."
            className="w-full bg-gray-100 dark:bg-corporate-800 border-none rounded-full py-3.5 pl-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-accent-indigo"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 rounded-full bg-corporate-900 dark:bg-white text-white dark:text-corporate-900 disabled:opacity-50 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
