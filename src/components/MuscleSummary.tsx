import React from 'react';
import { UserState } from '../types';
import { TrendingUp, Award, Zap, Activity } from 'lucide-react';

export default function MuscleSummary({ state }: { state: UserState }) {
  const muscles = Object.entries(state.stats);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">Subject Profile</p>
          <h2 className="font-serif italic text-4xl">Performance Data</h2>
        </div>
        <div className="font-mono text-xl opacity-40">LVL 04</div>
      </header>

      <div className="grid grid-cols-2 gap-6">
        <div className="premium-card p-6 flex flex-col justify-between aspect-square bg-accent text-white border-none">
          <Award size={20} strokeWidth={1.5} className="opacity-60" />
          <div className="space-y-1">
            <div className="text-[9px] font-mono uppercase opacity-50 tracking-widest">Aggregate Reps</div>
            <div className="data-value text-4xl font-light">
              {state.progress.reduce((acc, p) => acc + p.reps, 0)}
            </div>
          </div>
        </div>
        <div className="premium-card p-6 flex flex-col justify-between aspect-square bg-surface">
          <TrendingUp size={20} strokeWidth={1.5} className="text-accent opacity-60" />
          <div className="space-y-1">
            <div className="text-[9px] font-mono uppercase opacity-40 tracking-widest">Modules Completed</div>
            <div className="data-value text-4xl font-light">{state.progress.length}</div>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="col-header">Neural Development</h3>
          <Activity size={12} className="opacity-20" />
        </div>
        <div className="divide-y divide-line border-t border-b border-line">
          {muscles.length > 0 ? (
            muscles.map(([name, value]) => (
              <div key={name} className="py-4 flex justify-between items-center group hover:px-2 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Zap size={12} className="opacity-20 group-hover:text-accent group-hover:opacity-100 transition-all" />
                  <span className="text-sm font-medium tracking-tight">{name}</span>
                </div>
                <span className="font-mono text-xs opacity-60">{value} PTS</span>
              </div>
            ))
          ) : (
            <div className="py-16 text-center border border-dashed border-line rounded-xl">
              <p className="text-[10px] font-mono opacity-30 uppercase tracking-widest">No developmental data recorded</p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="col-header">Historical Log</h3>
        <div className="space-y-3">
          {state.progress.slice(-5).reverse().map((p, i) => (
            <div key={i} className="font-mono text-[9px] flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity duration-300 py-1 border-b border-line/50">
              <span className="tracking-widest">MODULE_ID_{p.workout_id.toString().padStart(2, '0')}</span>
              <span className="tracking-tighter">{p.reps} REPS // {new Date(p.completed_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
