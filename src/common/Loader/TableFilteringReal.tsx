import React from 'react';

const TableFilteringReal: React.FC<{
  cols_count?: number;
}> = ({ cols_count }) => {
  return (
    <td>
      <div className="flex items-center justify-center p-4">
        <div className="w-full rounded-lg p-4 bg-emerald-300 table-animate"></div>
      </div>
    </td>
  );
};

export default TableFilteringReal;
