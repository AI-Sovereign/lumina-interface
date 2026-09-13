"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Terminal, User, Send, Sun, Moon, Volume2, 
  Download, Zap, Activity, ShieldCheck, Play 
} from "lucide-react";

export default function App() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string; audio?: string; telemetry?: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiStatus, setApiStatus] = useState("Checking Core...");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); pingSpace(); }, []);
  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // HIDDEN FEATURE 1: Silent Space Cold-Start Ping
  const pingSpace = async () => {
    try {
      const res = await fetch("/api/lumina", { method: "POST", body: JSON.stringify({ text: "ping" }) });
      setApiStatus(res.ok ? "Status: Operational | < 45ms" : "Status: Degraded");
    } catch {
      setApiStatus("Status: Offline");
    }
  };

  const handleSend = async (overrideText?: string) => {
    const text = overrideText || input;
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsProcessing(true);

    try {
      const res = await fetch("/api/lumina", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      
      if (data.data) {
        setMessages(prev => [...prev, { 
          role: "agi", 
          content: data.data[0], 
          audio: data.data[1]?.url || data.data[1], 
          telemetry: typeof data.data[2] === 'string' ? data.data[2] : "Homeostasis Stabilized" 
        }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "agi", content: "System exception: Core unlinked." }]);
    }
    setIsProcessing(false);
  };

  // HIDDEN FEATURE 2: Telemetry Session Exporter
  const exportSession = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lumina_session_${new Date().getTime()}.json`;
    a.click();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-sm">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-border bg-accent/30 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center text-background">
              <Zap size={18} />
            </div>
            <h1 className="font-semibold tracking-wide text-md">LUMINA-1</h1>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: "home", label: "Executive Dashboard", icon: Home },
              { id: "live", label: "Core Interface", icon: Terminal },
              { id: "about", label: "Directorate", icon: User },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  activeTab === tab.id ? "bg-foreground text-background" : "hover:bg-accent text-foreground/70"
                }`}
              >
                <tab.icon size={16} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-foreground/50 px-2">
             {/* HIDDEN FEATURE 4: Diagnostic Ping Header UI */}
            <span className="flex items-center gap-2"><Activity size={12}/> {apiStatus}</span>
          </div>
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-accent border border-border"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            <span className="font-medium">Toggle Interface</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        
        {/* Home Tab */}
        {activeTab === "home" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 max-w-4xl mx-auto w-full overflow-y-auto">
            <div className="bg-foreground text-background rounded-xl p-8 mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">AGI Systems Directorate</h2>
                <p className="opacity-80 max-w-lg">The unified hub for next-generation cognitive architectures, framework deployments, and multi-modal autonomous systems.</p>
              </div>
              <ShieldCheck size={64} className="opacity-20" />
            </div>

            <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Upcoming Announcements & Deployments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 border border-border rounded-lg bg-accent/20">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2 block">Release v1.2</span>
                <h4 className="font-semibold mb-2">Nexus Framework Integration</h4>
                <p className="text-foreground/70 text-sm">Full whitepaper indexation and structural pipeline logic rollout.</p>
              </div>
              <div className="p-6 border border-border rounded-lg bg-accent/20">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2 block">Pending</span>
                <h4 className="font-semibold mb-2">Expanded Model Registry</h4>
                <p className="text-foreground/70 text-sm">Future architectures will be docked and accessible via this central interface.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Live App Tab */}
        {activeTab === "live" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full w-full max-w-5xl mx-auto">
            
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="font-semibold flex items-center gap-2"><Terminal size={18}/> Lumina-1 Interactive Protocol</h2>
              <button onClick={exportSession} className="text-xs flex items-center gap-2 bg-accent px-3 py-1.5 rounded border border-border hover:bg-foreground hover:text-background transition-colors">
                <Download size={12} /> Export Session
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-accent border-2 border-border flex items-center justify-center">
                    <Zap size={24} className="text-foreground/40" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">System Online</h3>
                    <p className="text-foreground/50 max-w-md">Try injecting one of these suggested structural inputs to initialize the cognitive pipeline.</p>
                  </div>
                  <div className="flex gap-3 flex-wrap justify-center">
                    {["Initialize base diagnostic parameters.", "Analyze current framework logic.", "What is the status of the plasticity engine?"].map(prompt => (
                      <button key={prompt} onClick={() => handleSend(prompt)} className="px-4 py-2 bg-accent/50 border border-border rounded-full hover:border-foreground/50 transition-colors">
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg p-4 ${msg.role === "user" ? "bg-foreground text-background" : "bg-accent border border-border"}`}>
                      <p className="leading-relaxed">{msg.content}</p>
                      {/* HIDDEN FEATURE 3: Clean Latent Audio Visualizer */}
                      {msg.audio && (
                         <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-3">
                            <button onClick={() => new Audio(msg.audio).play()} className="p-2 bg-background rounded-full hover:opacity-80"><Play size={14}/></button>
                            <span className="text-xs opacity-70 font-mono">Synthesized Vocal Output</span>
                         </div>
                      )}
                      {msg.telemetry && (
                        <div className="mt-2 text-[10px] uppercase font-mono tracking-wide opacity-50">
                          LOG: {msg.telemetry}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isProcessing && (
                 <div className="flex items-center gap-2 text-foreground/50 text-xs font-mono pl-4">
                   <Activity size={14} className="animate-pulse" /> Routing through frontal lobe...
                 </div>
              )}
              <div ref={scrollRef} />
            </div>

            <div className="p-6 bg-background">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Enter structural input command..."
                  className="w-full bg-accent border border-border rounded-lg pl-4 pr-12 py-4 focus:outline-none focus:border-foreground transition-colors"
                />
                <button onClick={() => handleSend()} className="absolute right-3 p-2 bg-foreground text-background rounded-md hover:opacity-90">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 max-w-3xl mx-auto overflow-y-auto">
             <div className="flex flex-col items-center text-center space-y-6 mb-12 mt-10">
                <div className="w-24 h-24 rounded-full border-4 border-foreground/10 bg-accent flex items-center justify-center">
                   <User size={40} className="text-foreground/30" />
                </div>
                <div>
                   <h2 className="text-3xl font-bold mb-2">Ananya Soni</h2>
                   <p className="text-lg text-foreground/60">Founder & CEO, AGI Systems Directorate</p>
                </div>
             </div>
             <div className="prose dark:prose-invert max-w-none text-foreground/80 space-y-6">
                <p>
                  At AGI Systems Directorate, we architect brain-inspired cognitive frameworks and bio-focused AI agents. 
                  Our focus is not just on producing large language models, but on engineering autonomous logic wrappers, 
                  plasticity engines, and reasoning gauntlets that push the boundaries of digital intelligence.
                </p>
                <p>
                  This interface serves as the central command node for current and upcoming multi-modal experiments.
                </p>
             </div>
          </motion.div>
        )}

      </main>
    </div>
  );
}
