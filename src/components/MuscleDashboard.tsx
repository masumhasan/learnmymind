import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { UserState } from '../types';

interface MuscleDashboardProps {
  userState: UserState;
  onBack: () => void;
}

export default function MuscleDashboard({ userState, onBack }: MuscleDashboardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-bg z-[60] flex flex-col p-8 overflow-y-auto"
    >
      <header className="flex justify-between items-start mb-12">
        <div>
          <h1 className="font-serif italic text-4xl">Cognitive Muscles</h1>
          <p className="text-sm opacity-60 mt-1">Repetition builds automatic strength.</p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={14} /> Back
        </button>
      </header>

      <div className="space-y-12 max-w-md mx-auto w-full pb-24">
        {userState.muscleProgress.map((muscle) => (
          <div key={muscle.muscle_id} className="space-y-4">
            <div className="flex justify-between items-baseline">
              <h2 className="text-xl font-bold tracking-tight">{muscle.muscle_name}</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-xs opacity-40 uppercase tracking-widest">Reps:</span>
                <span className="data-value text-xl">{muscle.rep_count}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest opacity-40">Sessions Trained:</p>
              <div className="flex flex-wrap gap-2">
                {muscle.sessions_trained.length > 0 ? (
                  muscle.sessions_trained.map((sessionId) => (
                    <span 
                      key={sessionId}
                      className="text-[10px] font-mono bg-accent/5 px-2 py-1 rounded border border-accent/10"
                    >
                      SESSION_{sessionId}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] italic opacity-30">No sessions recorded</span>
                )}
              </div>
            </div>
            
            <div className="h-px bg-line/10 w-full" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
