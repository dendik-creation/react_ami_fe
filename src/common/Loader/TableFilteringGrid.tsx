import React from 'react';

const TableFilteringGrid: React.FC<{
  cols_count: number;
}> = ({ cols_count }) => {
  return (
    <div className={`grid grid-cols-${cols_count}`}>
      {Array(cols_count * 3)
        .fill([])
        .map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-center p-2">
            <div className="w-full rounded-lg p-4 table-animate"></div>
          </div>
        ))}
    </div>
  );
};

export default TableFilteringGrid;
