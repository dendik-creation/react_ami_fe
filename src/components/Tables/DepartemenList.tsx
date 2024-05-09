import { useEffect, useState } from 'react';
import { HeaderData } from '../../pages/Auditor/NewAudit/NewAuditInterface';
import { FiList } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { credential } from '../../utils/constant';

const DepartemenList = ({ deptAuditedNotResponded }: any | undefined) => {
  const [sorted, setSorted] = useState<HeaderData[]>();
  useEffect(() => {
    if (deptAuditedNotResponded) {
      setSorted(deptAuditedNotResponded);
    }
  }, []);

  return (
    <div className="rounded-lg w-full bg-white shadow-lg p-5">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Proses audit yang berlangsung
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
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
              Grup Auditor
            </h5>
          </div>
          <div className="text-center p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Auditee
            </h5>
          </div>
        </div>
        {sorted?.length > 0 ? (
          sorted?.map((item, key) => (
            <div
              className={`grid grid-cols-5 ${
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
                  {item.departemen?.nama_departemen}
                </p>
              </div>
              <div className="flex items-center justify-center p-2">
                <p className="text-black dark:text-white">
                  {item?.departemen?.unit?.nama_unit}
                </p>
              </div>
              <div className="flex items-center justify-center p-2">
                <p className="text-black dark:text-white">
                  {item?.grup_auditor?.nama_grup}
                </p>
              </div>

              <div className="flex items-center justify-center p-2">
                <p className="text-black">{item.auditee?.user?.nama_lengkap}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="flex items-center justify-center p-2 col-span-5">
              <p className="text-black dark:text-white">
                Seluruh Audit Telah Direspon
              </p>
            </div>
          </div>
        )}

        {credential?.meta?.active_role == 'pdd' ||
        credential?.meta?.active_role == 'management' ? (
          <NavLink
            to={'/history-all-audit'}
            className="inline-flex mt-4 rounded-md w-full items-center justify-center gap-2.5 bg-blue-200 px-2 py-2 text-center font-medium text-slate-800 hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <FiList className="text-xl" />
            <span className="text-xl">Selengkapnya</span>
          </NavLink>
        ) : credential?.meta?.active_role == 'auditor' ? (
          <NavLink
            to={'/monitoring/my-audits'}
            className="inline-flex mt-4 rounded-md w-full items-center justify-center gap-2.5 bg-blue-200 px-2 py-2 text-center font-medium text-slate-800 hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <FiList className="text-xl" />
            <span className="text-xl">Selengkapnya</span>
          </NavLink>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default DepartemenList;
