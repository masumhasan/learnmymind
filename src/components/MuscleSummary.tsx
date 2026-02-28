import React from 'react';
import { UserState } from '../types';
import { TrendingUp, Award, Zap } from 'lucide-react';

export default function MuscleSummary({ state }: { state: UserState }) {
  const muscles = Object.entries(state.stats);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="font-serif italic text-3xl">Profile</h2>
          <p className="text-xs opacity-50 uppercase tracking-widest">Cognitive Muscle Summary</p>
        </div>
        <div className="data-value text-xl">LVL 04</div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-accent text-bg p-4 rounded-2xl flex flex-col justify-between aspect-square">
          <Award size={24} strokeWidth={1.5} />
          <div>
            <div className="text-[10px] uppercase opacity-50">Total Reps</div>
            <div className="data-value text-3xl">
              {state.progress.reduce((acc, p) => acc + p.reps, 0)}
            </div>
          </div>
        </div>
        <div className="border border-line p-4 rounded-2xl flex flex-col justify-between aspect-square">
          <TrendingUp size={24} strokeWidth={1.5} />
          <div>
            <div className="text-[10px] uppercase opacity-50">Workouts</div>
            <div className="data-value text-3xl">{state.progress.length}</div>
          </div>
        </div>
      </div>

      <section>
        <h3 className="col-header mb-4">Muscle Development</h3>
        <div className="space-y-1">
          {muscles.length > 0 ? (
            muscles.map(([name, value]) => (
              <div key={name} className="data-row py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Zap size={14} className="opacity-30" />
                  <span className="font-medium tracking-tight">{name}</span>
                </div>
                <span className="data-value text-sm">{value} pts</span>
              </div>
            ))
          ) : (
            <div className="py-12 text-center border border-dashed border-line/20 rounded-2xl">
              <p className="text-xs opacity-40 uppercase tracking-widest">No training data yet</p>
            </div>
          )}
        </div>
      </section>

      <section className="pt-4">
        <h3 className="col-header mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {state.progress.slice(-3).reverse().map((p, i) => (
            <div key={i} className="text-[10px] font-mono flex justify-between opacity-50">
              <span>WORKOUT_ID_{p.workout_id}</span>
              <span>{p.reps} REPS // {new Date(p.completed_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
