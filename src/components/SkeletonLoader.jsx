import React from 'react';

export default function SkeletonLoader({ type = 'product', count = 1 }) {
  const shimmerClass = "animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl";

  const renderSkeleton = (index) => {
    if (type === 'product') {
      return (
        <div key={index} className="glass-card border border-slate-100 dark:border-slate-800 p-4 rounded-3xl flex flex-col gap-4">
          <div className={`${shimmerClass} h-48 w-full`} />
          <div className="flex flex-col gap-2">
            <div className={`${shimmerClass} h-4 w-1/3`} />
            <div className={`${shimmerClass} h-6 w-3/4`} />
            <div className={`${shimmerClass} h-4 w-1/2`} />
          </div>
          <div className="flex items-center justify-between gap-4 mt-auto">
            <div className={`${shimmerClass} h-8 w-20`} />
            <div className={`${shimmerClass} h-10 w-24 rounded-xl`} />
          </div>
        </div>
      );
    }

    if (type === 'category') {
      return (
        <div key={index} className="glass-card p-6 rounded-3xl flex flex-col items-center gap-3">
          <div className={`${shimmerClass} w-16 h-16 rounded-full`} />
          <div className={`${shimmerClass} h-4 w-20`} />
          <div className={`${shimmerClass} h-3 w-16`} />
        </div>
      );
    }

    if (type === 'details') {
      return (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col gap-4">
            <div className={`${shimmerClass} w-full aspect-square`} />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`${shimmerClass} aspect-square`} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className={`${shimmerClass} h-4 w-1/4`} />
            <div className={`${shimmerClass} h-10 w-3/4`} />
            <div className={`${shimmerClass} h-6 w-1/2`} />
            <div className={`${shimmerClass} h-24 w-full`} />
            <div className="flex gap-4">
              <div className={`${shimmerClass} h-12 w-28`} />
              <div className={`${shimmerClass} h-12 w-full rounded-xl`} />
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col gap-4">
              <div className={`${shimmerClass} h-6 w-1/3`} />
              <div className={`${shimmerClass} h-16 w-full`} />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {[...Array(count)].map((_, idx) => renderSkeleton(idx))}
    </>
  );
}
