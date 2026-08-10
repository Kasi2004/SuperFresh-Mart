import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

export default function Breadcrumb({ paths = [] }) {
  return (
    <nav className="flex py-4 text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            <FaHome className="w-3.5 h-3.5 mr-2" />
            Home
          </Link>
        </li>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          return (
            <li key={index} className="flex items-center">
              <FaChevronRight className="w-2.5 h-2.5 mx-1.5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
              {isLast ? (
                <span className="text-slate-400 dark:text-slate-500 truncate max-w-[150px] md:max-w-xs" aria-current="page">
                  {path.name}
                </span>
              ) : (
                <Link
                  to={path.link}
                  className="text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors truncate max-w-[120px] md:max-w-xs"
                >
                  {path.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
