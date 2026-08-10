import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Rating({ value = 0, text = '', size = 'sm' }) {
  const stars = [];
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const starSize = sizeClasses[size] || sizeClasses.sm;

  // Calculate full, half and empty stars
  const fullStars = Math.floor(value);
  const hasHalf = value % 1 >= 0.25 && value % 1 <= 0.75;
  const adjustFull = value % 1 > 0.75 ? 1 : 0;
  const totalFull = fullStars + adjustFull;

  for (let i = 1; i <= 5; i++) {
    if (i <= totalFull) {
      stars.push(<FaStar key={i} className={`${starSize} text-amber-400 fill-current`} />);
    } else if (i === totalFull + 1 && hasHalf) {
      stars.push(<FaStarHalfAlt key={i} className={`${starSize} text-amber-400 fill-current`} />);
    } else {
      stars.push(<FaRegStar key={i} className={`${starSize} text-slate-300 dark:text-slate-600`} />);
    }
  }

  return (
    <div className="flex items-center gap-1.5 font-medium">
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${value} out of 5 stars`}>
        {stars}
      </div>
      {text && (
        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
          {text}
        </span>
      )}
    </div>
  );
}
