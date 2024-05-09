import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Transition } from '@headlessui/react';
import { api } from '../../../api/respon_audit';
import { NewAuditType } from '../../Auditor/NewAudit/NewAuditInterface';
import {
  FiAlertOctagon,
  FiCheckCircle,
  FiEdit,
  FiInfo,
  FiMessageCircle,
  FiThumbsUp,
  FiXCircle,
} from 'react-icons/fi';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { isAvailableToRespon, parseDateHaha } from '../../../api/date_parser';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

const ResponAudit: React.FC = () => {
  const [respondList, setRespondList] = useState<NewAuditType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    api
      .auditeeRespondList(setLoading)
      .then((res) => setRespondList(res))
      .catch((err) => console.log(err));
  }, []);

  const navigate: NavigateFunction = useNavigate();

  const handleRespon = (id: number) => {
    navigate(`/respon-audit/respon/${id}`);
  };
  return (
    <DefaultLayout>
      <Transition
        show={loading}
        enter="transform transition duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-300 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="w-full h-full flex justify-center items-center"
      >
        <LoadFetch />
      </Transition>
      <div className="mb-6">
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[100ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="text-slate-700 font-bold"
        >
          <Breadcrumb
            pageName="Respon Audit"
            description={
              'Data dibawah adalah proses audit yang belum Anda selesaikan'
            }
          />
        </Transition>

        {/* Respon Audit List */}
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[300ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={'mb-8'}
        >
          <div className="rounded-md shadow-default bg-white px-5 py-5">
            <div className="max-w-full overflow-x-auto">
              {/* Tables */}
              <table className="w-full table-auto mb-4">
                <thead>
                  <tr className="bg-slate-700 text-left">
                    <th className="min-w-[50px] p-3 font-medium text-white">
                      No
                    </th>
                    <th className="min-w-[120px] p-3 font-medium text-white">
                      No PLPP
                    </th>
                    <th className="min-w-[120px] p-3 font-medium text-white">
                      Standar ISO
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Grup Auditor
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Ketua Auditor
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Tanggal Target
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Banyak Temuan
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Status Waktu
                    </th>
                    <th className="min-w-[200px] p-3 font-medium text-white">
                      Status Respon
                    </th>
                    <th className="p-3 font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {respondList?.length > 0 ? (
                    respondList?.map(
                      (item: NewAuditType | any, index: number) => (
                        <tr key={index}>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {index + 1}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.header_audit?.no_plpp}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium italic text-black dark:text-white">
                              {item?.header_audit?.static_data?.iso?.kode}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.header_audit?.static_data?.grup_auditor
                                ?.nama_grup ?? '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.header_audit?.static_data?.grup_auditor
                                ?.auditor_list[0]?.user?.nama_lengkap ?? '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.header_audit?.end_at
                                ? parseDateHaha(item?.header_audit?.end_at)
                                : '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-semibold text-lg text-black dark:text-white">
                              {item?.detail_audit?.length}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-sm dark:text-white">
                              {new Date() <=
                              new Date(item?.header_audit?.end_at) ? (
                                <span className="rounded-md px-2 bg-lime-300 py-1">
                                  Open
                                </span>
                              ) : (
                                <span className="rounded-md bg-red-300 px-2 py-1">
                                  Close
                                </span>
                              )}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.header_audit?.is_responded != 0 ? (
                                <BsCheckCircleFill className="text-lime-500 text-2xl" />
                              ) : (
                                <BsXCircleFill className="text-red-500 text-2xl" />
                              )}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            {isAvailableToRespon(item?.header_audit?.end_at) ? (
                              <button
                                onClick={() =>
                                  handleRespon(item?.header_audit?.id)
                                }
                                className={`flex text-white ${
                                  item?.header_audit?.is_responded != 0
                                    ? 'w-36'
                                    : 'w-26'
                                } bg-blue-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-blue-800 transition-all`}
                              >
                                {item?.header_audit?.is_responded != 0 ? (
                                  <>
                                    <FiEdit className="" />
                                    <span className="font-medium">
                                      Edit Respon
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FiMessageCircle className="" />
                                    <span className="font-medium">Respon</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <button
                                disabled
                                className={`flex cursor-help text-white ${
                                  item?.header_audit?.is_responded != 0
                                    ? 'w-40'
                                    : 'w-56'
                                } bg-stone-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3   hover:bg-stone-800 transition-all`}
                              >
                                {item?.header_audit?.is_responded != 0 ? (
                                  <>
                                    <FiThumbsUp className="" />
                                    <span className="font-medium">
                                      Audit Selesai
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FiAlertOctagon className="" />
                                    <span className="font-medium">
                                      Hubungi PDD
                                    </span>
                                  </>
                                )}
                              </button>
                            )}
                          </td>
                        </tr>
                      ),
                    )
                  ) : (
                    <tr className="">
                      <td className="text-start w-full p-6 " colSpan={10}>
                        <div className="flex justify-start items-center gap-3">
                          <FiInfo />
                          <span className="text-slate-700">
                            Semua Audit Anda Terselesaikan
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default ResponAudit;
