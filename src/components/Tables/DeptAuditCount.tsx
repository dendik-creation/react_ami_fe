import { useEffect, useState } from 'react';
import {
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiXCircle,
} from 'react-icons/fi';
import TableFilteringGrid from '../../common/Loader/TableFilteringGrid';
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';

const DeptAuditCount = ({
  dept_sortby_not_audited,
  filterDept,
  setFilterDept,
  onFiltering,
}: any) => {
  const [sorted, setSorted] = useState<any>();

  useEffect(() => {
    if (dept_sortby_not_audited && !onFiltering) {
      const sortedData = dept_sortby_not_audited.sort(
        (a: number | any, b: number | any) => a.audit_count - b.audit_count,
      );
      setSorted(sortedData);
    }
  }, [filterDept, onFiltering]);

  const prevPeriode = () => {
    setFilterDept((prev: any) => ({
      periode: prev.periode == 2 ? 1 : 2,
      tahun: prev.periode == 2 ? prev.tahun : prev.tahun - 1,
    }));
  };

  const nextPeriode = () => {
    setFilterDept((prev: any) => ({
      periode: prev.periode == 2 ? 1 : 2,
      tahun: prev.periode == 2 ? prev.tahun + 1 : prev.tahun,
    }));
  };

  return (
    <div className="rounded-lg w-full bg-white shadow-lg p-5">
      <div className="flex mb-6 w-full justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Status Audit Departemen | Periode {filterDept?.periode} -{' '}
          {filterDept?.tahun}
        </h4>
        <div className="flex justify-start gap-3 items-center">
          <button
            type="button"
            onClick={prevPeriode}
            className="rounded-md bg-blue-200 hover:bg-blue-300 transition-all p-2"
          >
            <FiChevronLeft className="font-bold text-xl" />
          </button>
          <button
            type="button"
            onClick={nextPeriode}
            className="rounded-md bg-blue-200 hover:bg-blue-300 transition-all p-2"
          >
            <FiChevronRight className="font-bold text-xl" />
          </button>
        </div>
      </div>

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
              Telah Audit
            </h5>
          </div>
        </div>
        {sorted?.length > 0 ? (
          !onFiltering ? (
            sorted?.map((item: any, key: number) => (
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
                  <p className="text-black dark:text-white">
                    {item?.departemen}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2">
                  <p className="text-black dark:text-white">{item?.unit}</p>
                </div>
                <div className="flex items-center justify-center p-2">
                  <p className="text-black dark:text-white">
                    {item?.audit_count > 0 ? (
                      <BsFillCheckCircleFill className="text-lime-500 text-xl" />
                    ) : (
                      <BsFillXCircleFill className="text-red-500 text-xl" />
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <TableFilteringGrid cols_count={4} />
          )
        ) : (
          <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="flex items-center justify-center p-2 col-span-5">
              <p className="text-black dark:text-white">
                Seluruh Audit Departemen Telah Diaudit
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeptAuditCount;
