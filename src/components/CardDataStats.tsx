import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  total: number | undefined;
  text: string | null;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  total,
  text,
  children,
}) => {
  return (
    <div className="rounded-lg bg-white py-6 px-7.5 shadow-lg h-full">
      <div className="flex h-13.5 w-13.5 items-center justify-center rounded-full text-blue-500 bg-blue-200/40 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-xl font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-md text-slate-600 font-medium">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
