"use client";
import { ArrowRight, Sparkles, Layers, Cpu } from 'lucide-react';

export const HomeTab = ({ onNavigate }: { onNavigate: (tab: any) => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Top Banner */}
      <div className="mb-12 rounded-2xl bg-gradient-to-r from-corporate-800 to-corporate-900 text-white p-8 flex flex-col sm:flex-row items-center justify-between border border-corporate-700 shadow-xl">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-accent-indigo" />
            New Release
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Lumina-1 Architecture is Live</h1>
          <p className="text-gray-400 text-sm">Experience the next generation of cognitive multi-modal reasoning. The executive core has been officially deployed to the central hub.</p>
        </div>
        <button 
          onClick={() => onNavigate('live')}
          className="mt-6 sm:mt-0 px-6 py-3 bg-white text-corporate-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          Initialize App <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feature 1: Bento-Box Ecosystem Grid instead of boring lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="edge-lit-card p-6 md:col-span-2 min-h-[250px] flex flex-col justify-between">
          <div>
            <Layers className="w-6 h-6 text-accent-indigo mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upcoming Model Integrations</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              The front-end infrastructure is currently scaling to support multi-modal agents, vision integrations, and the complete AGI System Directorate suite.
            </p>
          </div>
          <div className="flex gap-2 mt-6">
            <span className="px-2.5 py-1 text-xs font-medium border border-gray-200 dark:border-corporate-700 rounded-md">Nexus Framework</span>
            <span className="px-2.5 py-1 text-xs font-medium border border-gray-200 dark:border-corporate-700 rounded-md">Visual Cortex v2</span>
          </div>
        </div>

        <div className="edge-lit-card p-6 flex flex-col justify-between bg-gray-50 dark:bg-corporate-800/50">
          <div>
            <Cpu className="w-6 h-6 text-gray-600 dark:text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">System Status</h3>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Inference Engine</span>
                <span className="text-green-500 font-medium">Operational</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Frontal Lobe</span>
                <span className="text-green-500 font-medium">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
