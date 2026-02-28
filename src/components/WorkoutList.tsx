import React from 'react';
import { Workout } from '../types';
import { WORKOUTS } from '../constants';
import { Play, ChevronRight } from 'lucide-react';

interface WorkoutListProps {
  onSelect: (workout: Workout) => void;
}

export default function WorkoutList({ onSelect }: WorkoutListProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="col-header mb-4">Available Workouts</h2>
        <div className="space-y-1">
          {WORKOUTS.map((workout) => (
            <div
              key={workout.id}
              onClick={() => onSelect(workout)}
              className="data-row group"
            >
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <span className="data-value text-xl opacity-30 group-hover:opacity-100 transition-opacity">
                    0{workout.id}
                  </span>
                  <div>
                    <h3 className="font-medium tracking-tight">{workout.title}</h3>
                    <p className="text-xs opacity-60 line-clamp-1">{workout.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] uppercase opacity-40">Difficulty</div>
                    <div className="data-value text-xs">Lvl {workout.difficulty}</div>
                  </div>
                  <ChevronRight size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
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
