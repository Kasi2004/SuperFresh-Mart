import React from 'react';

export default function Loader({ size = 'medium', fullPage = false }) {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4'
  };

  const spinner = (
    <div className="relative flex items-center justify-center">
      <div className={`${sizeClasses[size]} rounded-full border-slate-200 dark:border-slate-800`}></div>
      <div className={`${sizeClasses[size]} rounded-full border-t-primary-500 border-r-secondary-500 animate-spin absolute`}></div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
        {spinner}
        <p className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 animate-pulse uppercase">
          Loading Freshness...
        </p>
      </div>
    );
  }

  return spinner;
}
