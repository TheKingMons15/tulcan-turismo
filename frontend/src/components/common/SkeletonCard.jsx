import React from 'react';

export function SkeletonCard() {
  return (
    <div className="rounded-2xl glass-panel-subtle overflow-hidden animate-pulse p-4 flex flex-col gap-4">
      <div className="h-48 w-full bg-slate-800/60 rounded-xl"></div>
      <div className="h-6 w-3/4 bg-slate-800/60 rounded-md"></div>
      <div className="h-4 w-full bg-slate-800/40 rounded-md"></div>
      <div className="h-4 w-2/3 bg-slate-800/40 rounded-md"></div>
      <div className="mt-auto flex justify-between items-center pt-2">
        <div className="h-8 w-24 bg-slate-800/60 rounded-full"></div>
        <div className="h-8 w-20 bg-slate-800/60 rounded-full"></div>
      </div>
    </div>
  );
}
