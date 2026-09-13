"use client";
import { Building2, Network, Globe } from 'lucide-react';

export const AboutTab = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-corporate-900 dark:bg-white flex items-center justify-center mb-6">
          <Building2 className="w-8 h-8 text-white dark:text-corporate-900" />
        </div>
        <h2 className="text-3xl font-semibold tracking-tight">AGI Systems Directorate</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Advancing cognitive frameworks and large language systems.</p>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-12">
          Founded and led by Ananya Soni, CEO of AGI Systems Directorate, our organization is dedicated to bridging the gap between theoretical biological architectures and applied machine learning. We engineer sophisticated AI agents, large language models, and robust multi-modal frameworks designed for autonomous reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="edge-lit-card p-6 bg-gray-50 dark:bg-corporate-800/40">
          <Network className="w-5 h-5 text-accent-indigo mb-3" />
          <h4 className="font-semibold mb-2">Neural Architecture</h4>
          <p className="text-sm text-gray-500">Developing next-generation transformers that map directly to advanced semantic networks.</p>
        </div>
        <div className="edge-lit-card p-6 bg-gray-50 dark:bg-corporate-800/40">
          <Globe className="w-5 h-5 text-accent-indigo mb-3" />
          <h4 className="font-semibold mb-2">Universal Deployment</h4>
          <p className="text-sm text-gray-500">Creating scalable, universally accessible front-ends to house our expanding ecosystem of models.</p>
        </div>
      </div>
    </div>
  );
};
