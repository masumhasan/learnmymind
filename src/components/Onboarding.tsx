import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ArrowRight, CheckCircle2, Mail, Chrome, Apple } from 'lucide-react';

interface OnboardingProps {
  onComplete: (username: string) => void;
  onLoginClick: () => void;
}

type OnboardingStep = 
  | 'welcome' 
  | 'what_is' 
  | 'what_is_not' 
  | 'how_it_works' 
  | 'layers' 
  | 'expectation' 
  | 'account';

export default function Onboarding({ onComplete, onLoginClick }: OnboardingProps) {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [username, setUsername] = useState('');
  const [agreed, setAgreed] = useState(false);

  const next = (nextStep: OnboardingStep) => setStep(nextStep);

  const renderScreen = () => {
    switch (step) {
      case 'welcome':
        return (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12 text-center max-w-xs"
          >
            <div className="w-16 h-16 bg-accent rounded-3xl mx-auto flex items-center justify-center text-bg">
              <Brain size={32} />
            </div>
            <div className="space-y-4">
              <h1 className="font-serif italic text-4xl tracking-tight text-ink">LearnMyMind</h1>
              <p className="text-xl opacity-60 text-ink">Train the mind you live in.</p>
            </div>
            <div className="space-y-2 text-sm opacity-40 uppercase tracking-widest text-ink">
              <p>Not therapy.</p>
              <p>Not motivation.</p>
              <p>Training.</p>
            </div>
            <div className="absolute bottom-12 left-6 right-6 flex flex-col gap-4">
              <button
                onClick={() => next('what_is')}
                className="w-full bg-accent text-bg py-4 rounded-2xl font-medium flex items-center justify-center gap-2 group hover:scale-105 active:scale-95 transition-all"
              >
                ▶ Begin
              </button>

              <button
                onClick={onLoginClick}
                className="text-[10px] opacity-30 uppercase tracking-widest hover:opacity-100 transition-opacity"
              >
                Already have an account? Login
              </button>
            </div>
          </motion.div>
        );

      case 'what_is':
        return (
          <motion.div
            key="what_is"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 max-w-xs"
          >
            <h2 className="font-serif italic text-3xl">What This Is</h2>
            <div className="space-y-6 text-lg opacity-80 leading-relaxed">
              <p>A structured mental training system.</p>
              <p>Built around cognitive workouts.</p>
              <p>Designed to strengthen attention and separation.</p>
            </div>
            <div className="absolute bottom-12 left-6 right-6">
              <button
                onClick={() => next('what_is_not')}
                className="w-full bg-accent text-bg py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                ▶ Continue
              </button>
            </div>
          </motion.div>
        );

      case 'what_is_not':
        return (
          <motion.div
            key="what_is_not"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 max-w-xs"
          >
            <h2 className="font-serif italic text-3xl">What This Isn’t</h2>
            <div className="space-y-4 text-lg opacity-80 leading-relaxed">
              <p>Not therapy.</p>
              <p>Not medical advice.</p>
              <p>Not emotional support.</p>
              <p>Not a quick fix.</p>
            </div>
            <div className="pt-8 space-y-1">
              <p className="text-xs opacity-40 uppercase tracking-widest leading-relaxed">
                It does not change how you feel.
              </p>
              <p className="text-xs opacity-40 uppercase tracking-widest leading-relaxed">
                It trains where attention goes.
              </p>
            </div>
            <div className="absolute bottom-12 left-6 right-6">
              <button
                onClick={() => next('how_it_works')}
                className="w-full bg-accent text-bg py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                ▶ Continue
              </button>
            </div>
          </motion.div>
        );

      case 'how_it_works':
        return (
          <motion.div
            key="how_it_works"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 max-w-xs"
          >
            <h2 className="font-serif italic text-3xl">How Training Works</h2>
            <div className="space-y-8">
              <div className="space-y-1">
                <h3 className="font-medium">Workouts</h3>
                <p className="text-sm opacity-60">Structured cognitive sessions.</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Skill Reps</h3>
                <p className="text-sm opacity-60">Short drills that strengthen control.</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Training Log</h3>
                <p className="text-sm opacity-60">Track what you noticed.</p>
              </div>
            </div>
            <p className="text-xs opacity-40 uppercase tracking-widest">Repetition builds automatic strength.</p>
            <div className="absolute bottom-12 left-6 right-6">
              <button
                onClick={() => next('layers')}
                className="w-full bg-accent text-bg py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                ▶ Continue
              </button>
            </div>
          </motion.div>
        );

      case 'layers':
        return (
          <motion.div
            key="layers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 max-w-xs"
          >
            <h2 className="font-serif italic text-3xl">Three Ways to Train</h2>
            <div className="space-y-8">
              <div className="space-y-1">
                <h3 className="font-medium">Workouts</h3>
                <p className="text-sm opacity-60">Build core mental muscles.</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Return To Now</h3>
                <p className="text-sm opacity-60">Neutral attention reset.</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Drift</h3>
                <p className="text-sm opacity-60">Pattern exposure through media.</p>
              </div>
            </div>
            <div className="absolute bottom-12 left-6 right-6">
              <button
                onClick={() => next('expectation')}
                className="w-full bg-accent text-bg py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                ▶ Continue
              </button>
            </div>
          </motion.div>
        );

      case 'expectation':
        return (
          <motion.div
            key="expectation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 max-w-xs"
          >
            <h2 className="font-serif italic text-3xl">What To Expect</h2>
            <div className="space-y-4 text-lg opacity-80 leading-relaxed">
              <p>Your system will still produce thoughts.</p>
              <p>Stories will still appear.</p>
              <p>Sensations will still exist.</p>
              <p className="italic pt-4">Pause.</p>
              <p>You will notice them sooner.</p>
              <p>And respond differently.</p>
            </div>
            <div className="absolute bottom-12 left-6 right-6">
              <button
                onClick={() => next('account')}
                className="w-full bg-accent text-bg py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                ▶ Create Account
              </button>
            </div>
          </motion.div>
        );

      case 'account':
        return (
          <motion.div
            key="account"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12 w-full max-w-sm"
          >
            <div className="text-center space-y-2">
              <h2 className="font-serif italic text-3xl">Account</h2>
              <p className="text-sm opacity-50">Simple.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="col-header">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-b border-line/20 py-2 focus:border-ink outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <button className="p-4 border border-line rounded-2xl flex items-center justify-center hover:bg-line transition-colors">
                  <Mail size={20} className="opacity-40" />
                </button>
                <button className="p-4 border border-line rounded-2xl flex items-center justify-center hover:bg-line transition-colors">
                  <Apple size={20} className="opacity-40" />
                </button>
                <button className="p-4 border border-line rounded-2xl flex items-center justify-center hover:bg-line transition-colors">
                  <Chrome size={20} className="opacity-40" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${agreed ? 'bg-accent border-accent' : 'border-line/20 group-hover:border-accent/40'}`}>
                    {agreed && <CheckCircle2 size={14} className="text-bg" />}
                  </div>
                </div>
                <span className="text-xs opacity-60 leading-relaxed">
                  I understand this is an educational training system.
                </span>
              </label>

            <div className="absolute bottom-12 left-6 right-6">
              <button
                disabled={!username || !agreed}
                onClick={() => onComplete(username)}
                className="w-full bg-accent text-bg py-4 rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-20 transition-all hover:scale-105 active:scale-95"
              >
                ▶ Enter Training Floor
              </button>
            </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-bg z-50 flex items-center justify-center p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
    </div>
  );
}
