import React from 'react';
import { Bot, Lock, Info } from 'lucide-react';

export default function AICoach() {
  return (
    <div className="space-y-8 h-[70vh] flex flex-col">
      <header className="flex items-center gap-4 p-4 border border-line rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-bg">
          <Bot size={24} />
        </div>
        <div>
          <h3 className="font-serif italic text-xl text-ink">AI Coach</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest opacity-50 text-ink">Read-Only Preview</span>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-2">
        <div className="flex gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-line flex items-center justify-center flex-shrink-0">
            <Bot size={16} className="opacity-40 text-ink" />
          </div>
          <div className="bg-line p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed text-ink">
            Hello. I am your LearnMyMind AI Coach. In future versions, I will be able to respond to your specific emotional states and guide you through stress in real-time.
          </div>
        </div>

        <div className="flex gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-line flex items-center justify-center flex-shrink-0">
            <Bot size={16} className="opacity-40 text-ink" />
          </div>
          <div className="bg-line p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed text-ink">
            For now, I am here as a preview of what's to come in Layer B. Continue your workouts to build the foundation.
          </div>
        </div>
      </div>

      <div className="p-6 bg-accent text-bg rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <Lock size={18} className="opacity-50" />
          <h4 className="font-medium tracking-tight">Layer B Feature</h4>
        </div>
        <p className="text-xs opacity-70 leading-relaxed">
          Full AI integration, including live response to stress and fear, will be available in the next expansion.
        </p>
        <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-50">
          <Info size={12} />
          <span>Subscription required for full access</span>
        </div>
      </div>
    </div>
  );
}
