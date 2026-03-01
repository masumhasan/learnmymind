import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { UserState } from '../types';

interface MuscleDashboardProps {
  userState: UserState;
  onBack: () => void;
}

export default function MuscleDashboard({ userState, onBack }: MuscleDashboardProps) {
  const { muscleProgress } = userState;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-bg z-[60] overflow-y-auto p-6 md:p-12 flex flex-col"
    >
      <div className="max-w-2xl mx-auto w-full">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-serif italic mb-2">Cognitive Muscles</h1>
            <p className="text-sm opacity-50">Repetition builds automatic strength.</p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={14} /> Back
          </button>
        </header>

        <div className="space-y-8">
          {muscleProgress && muscleProgress.length > 0 ? (
            muscleProgress.map((muscle) => (
              <div key={muscle.muscle_id} className="group">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-lg">{muscle.muscle_name}</h3>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-widest opacity-40 mr-2">Reps:</span>
                    <span className="font-mono font-bold">{muscle.rep_count}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-widest opacity-40">Sessions Trained:</span>
                  {muscle.sessions_trained.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {muscle.sessions_trained.sort((a, b) => a - b).map(session => (
                        <span key={session} className="px-2 py-0.5 bg-accent/5 rounded text-[10px] font-mono">
                          {session}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] italic opacity-30">None yet</span>
                  )}
                </div>
                
                <div className="h-px bg-line/10 w-full" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center opacity-40 italic">
              No muscle data available. Complete your first workout to begin.
            </div>
          )}
        </div>
        
        <footer className="mt-16 pt-8 border-t border-line/5 text-center">
          <p className="text-[10px] uppercase tracking-widest opacity-30">
            LearnMyMind — Cognitive Performance Lab
          </p>
        </footer>
      </div>
    </motion.div>
  );
}
