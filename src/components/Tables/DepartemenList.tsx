import { useEffect, useState } from 'react';

interface DepartemenList {
  departemen: string;
  unit: string;
  audit_count: number;
}

const DepartemenList = ({ departementList }: DepartemenList[] | undefined) => {
  const [sorted, setSorted] = useState<DepartemenList[]>();
  const sortByAuditCount = (list: DepartemenList[]) => {
    return list.sort((a, b) => a.audit_count - b.audit_count);
  };
  useEffect(() => {
    if (departementList) {
      setSorted(sortByAuditCount(departementList));
    }
  }, []);

  return (
    <div className="rounded-lg w-full md:w-3/4 bg-white shadow-lg p-5 ">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        List Departemen
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">No</h5>
          </div>
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Departemen
            </h5>
          </div>
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Unit
            </h5>
          </div>
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Audit
            </h5>
          </div>
        </div>

        {sorted?.map((item, key) => (
          <div
            className={`grid grid-cols-4 ${
              key === sorted.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2">
              <p className="text-black dark:text-white">{key + 1}</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p className="text-black dark:text-white">{item.departemen}</p>
            </div>
            <div className="flex items-center justify-center p-2">
              <p className="text-black dark:text-white">{item.unit}</p>
            </div>

            <div className="flex items-center justify-center p-2">
              <p className="text-meta-3">{item.audit_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartemenList;
