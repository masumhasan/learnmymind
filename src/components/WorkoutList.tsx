import React from 'react';
import { Workout } from '../types';
import { WORKOUTS } from '../constants';
import { Play, ChevronRight, Lock } from 'lucide-react';

interface WorkoutListProps {
  onSelect: (workout: Workout) => void;
  completedWorkouts: number[];
}

export default function WorkoutList({ onSelect, completedWorkouts }: WorkoutListProps) {
  const isUnlocked = (workoutId: number) => {
    if (workoutId === 0) return true;
    return completedWorkouts.includes(workoutId - 1);
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="col-header mb-4">Available Workouts</h2>
        <div className="space-y-1">
          {WORKOUTS.map((workout) => {
            const unlocked = isUnlocked(workout.id);
            return (
              <div
                key={workout.id}
                onClick={() => unlocked && onSelect(workout)}
                className={`data-row group ${!unlocked ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <span className="data-value text-xl opacity-30 group-hover:opacity-100 transition-opacity">
                      0{workout.id}
                    </span>
                    <div>
                      <h3 className="font-medium tracking-tight flex items-center gap-2">
                        {workout.title}
                        {!unlocked && <Lock size={12} className="opacity-40" />}
                      </h3>
                      <p className="text-xs opacity-60 line-clamp-1">
                        {unlocked 
                          ? workout.description 
                          : `🔒 Unlocks after Workout ${workout.id - 1}`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-[10px] uppercase opacity-40">Difficulty</div>
                      <div className="data-value text-xs">Lvl {workout.difficulty}</div>
                    </div>
                    {unlocked && <ChevronRight size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-accent text-bg p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-serif italic text-xl">Quick Reset</h3>
            <p className="text-xs opacity-60">3-minute cognitive recalibration</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-bg/20 flex items-center justify-center">
            <Play size={16} fill="currentColor" />
          </div>
        </div>
        <div className="flex gap-2">
          {['Focus', 'Clarity', 'Peace'].map((tag) => (
            <span key={tag} className="text-[9px] uppercase tracking-widest border border-bg/20 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
