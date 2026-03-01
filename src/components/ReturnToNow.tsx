import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft } from 'lucide-react';

type RTNScreen = 'entry' | 'visual' | 'audio' | 'physical' | 'exit';

interface ReturnToNowProps {
  onComplete: () => void;
  onBackToWorkout?: () => void;
  isFromWorkout?: boolean;
}

export default function ReturnToNow({ onComplete, onBackToWorkout, isFromWorkout }: ReturnToNowProps) {
  const [screen, setScreen] = useState<RTNScreen>('entry');
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (['visual', 'audio', 'physical'].includes(screen)) {
      setShowContinue(false);
      const timer = setTimeout(() => {
        setShowContinue(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case 'entry':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-xs">
            <h2 className="font-serif italic text-4xl">Return To Now</h2>
            <div className="space-y-1">
              <p className="text-sm opacity-60">This does not change how you feel.</p>
              <p className="text-sm opacity-60">It changes where attention is placed.</p>
            </div>
            <div className="absolute bottom-12 left-6 right-6 flex justify-center">
              <button
                onClick={() => setScreen('visual')}
                className="bg-accent text-bg px-12 py-4 rounded-full font-medium hover:scale-105 active:scale-95 transition-all"
              >
                ▶ Begin
              </button>
            </div>
          </div>
        );
      case 'visual':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-xs">
            <h2 className="font-serif italic text-4xl">Look</h2>
            <div className="space-y-2">
              <p className="text-lg">Name 3 visible objects.</p>
              <p className="text-lg opacity-60">No story. Just label.</p>
            </div>
            <div className="space-y-1 text-xs opacity-40 uppercase tracking-widest">
              <p>“Chair.”</p>
              <p>“Light.”</p>
              <p>“Wall.”</p>
            </div>
            {showContinue && (
              <div className="absolute bottom-12 left-6 right-6 flex justify-center">
                <button
                  onClick={() => setScreen('audio')}
                  className="bg-accent text-bg px-12 py-4 rounded-full font-medium hover:scale-105 active:scale-95 transition-all"
                >
                  ▶ Continue
                </button>
              </div>
            )}
          </div>
        );
      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-xs">
            <h2 className="font-serif italic text-4xl">Listen</h2>
            <div className="space-y-2">
              <p className="text-lg">Notice 2 sounds.</p>
              <p className="text-lg opacity-60">Near or distant.</p>
              <p className="text-lg opacity-60">No interpretation.</p>
            </div>
            {showContinue && (
              <div className="absolute bottom-12 left-6 right-6 flex justify-center">
                <button
                  onClick={() => setScreen('physical')}
                  className="bg-accent text-bg px-12 py-4 rounded-full font-medium hover:scale-105 active:scale-95 transition-all"
                >
                  ▶ Continue
                </button>
              </div>
            )}
          </div>
        );
      case 'physical':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-xs">
            <h2 className="font-serif italic text-4xl">Contact</h2>
            <div className="space-y-4 text-lg">
              <p>Notice 1 physical point of contact.</p>
              <div className="opacity-60 space-y-1">
                <p>Feet on floor.</p>
                <p>Back on chair.</p>
                <p>Hands touching.</p>
              </div>
              <p className="text-sm opacity-40 pt-4">No adjustment. Just observe.</p>
            </div>
            {showContinue && (
              <div className="absolute bottom-12 left-6 right-6 flex justify-center">
                <button
                  onClick={() => setScreen('exit')}
                  className="bg-accent text-bg px-12 py-4 rounded-full font-medium hover:scale-105 active:scale-95 transition-all"
                >
                  ▶ Continue
                </button>
              </div>
            )}
          </div>
        );
      case 'exit':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-xs">
            <h2 className="font-serif italic text-4xl leading-tight">Attention Repositioned</h2>
            <div className="space-y-2 text-lg opacity-60">
              <p>Thoughts may still be present.</p>
              <p>Sensations may still be present.</p>
              <p className="text-ink opacity-100 font-medium pt-2">Attention is now here.</p>
            </div>
            <div className="absolute bottom-12 left-6 right-6 flex flex-col gap-4">
              <button
                onClick={onComplete}
                className="bg-accent text-bg py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
              >
                Return to Home
                <Home size={18} />
              </button>
              {isFromWorkout && onBackToWorkout && (
                <button
                  onClick={onBackToWorkout}
                  className="border border-line py-4 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-accent/5 transition-all text-accent"
                >
                  Back to Workout
                  <ArrowLeft size={18} />
                </button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-bg z-50 flex items-center justify-center p-8">
      {renderScreen()}
    </div>
  );
}
