import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Transition } from '@headlessui/react';
import { HeaderData } from '../../Auditor/NewAudit/NewAuditInterface';
import { api } from '../../../api/my_audits';
import {
  FiXCircle,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from 'react-icons/fi';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import LoadFetch from '../../../common/Loader/LoadFetch';

interface metaPagination {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

interface AuditsList {
  my_audits_count: number;
  my_audits: HeaderData[];
  meta: metaPagination;
}

const MyHistoriAudit: React.FC = () => {
  const [audits, setAudits] = useState<AuditsList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaginating, setPaginating] = useState<boolean>(false);
  useEffect(() => {
    api
      .myAuditListAsAuditee(setLoading, 1, setPaginating)
      .then((res) => {
        setAudits({
          my_audits_count: res?.my_audits_count,
          my_audits: res?.my_audits,
          meta: res?.meta,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePaginate = (target_page: number | any) => {
    setPaginating(true);
    api
      .myAuditListAsAuditee(setLoading, target_page, setPaginating)
      .then((res) => {
        setAudits({
          my_audits_count: res?.my_audits_count,
          my_audits: res?.my_audits,
          meta: res?.meta,
        });
      })
      .catch((err) => console.log(err));
  };

  const navigate: NavigateFunction = useNavigate();

  const handleDetail = (header_id: number, action: string) => {
    if (action == 'detail') {
      navigate(`/monitoring/my-history-audits/detail/${header_id}`);
    }
  };

  const [successDelete, setSuccessDel] = useState<boolean>(false);

  useEffect(() => {
    if (successDelete == true) {
      api
        .myAuditListAsAuditor(setLoading, 1, setPaginating)
        .then((res) => {
          setAudits({
            my_audits_count: res?.my_audits_count,
            my_audits: res?.my_audits,
            meta: res?.meta,
          });
          setSuccessDel(false);
        })
        .catch((err) => console.log(err));
    }
  }, [successDelete]);

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
      <div className="mb-12">
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
            pageName="Histori Audit Saya"
            description={
              'Semua respon dan keterlibatan dalam proses audit ditampilkan disini'
            }
          />
        </Transition>

        {/* My Audit List */}
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
                    <th className="min-w-[50px] p-3 font-medium text-white">
                      No PLPP
                    </th>
                    <th className="min-w-[120px] p-3 font-medium text-white">
                      Grup Auditor
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Ketua Auditor
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Dept Ketua
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Status Waktu
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Status Respon
                    </th>
                    <th className="p-3 font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isPaginating ? (
                    <tr>
                      <td className="text-center w-full p-6" colSpan={7}>
                        <l-bouncy size={50} color={'#36454F'} />
                      </td>
                    </tr>
                  ) : (
                    audits?.my_audits.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] dark:border-strokedark p-3">
                          <h5 className="font-medium text-black dark:text-white">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark p-3">
                          <h5 className="font-medium text-black dark:text-white">
                            {item?.no_plpp}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark p-3">
                          <h5 className="font-medium text-black dark:text-white">
                            {item?.grup_auditor?.nama_grup ?? '-'}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark p-3">
                          <h5 className="font-medium text-black dark:text-white">
                            {item?.grup_auditor?.auditor_list[0]?.user
                              ?.nama_lengkap ?? '-'}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark p-3">
                          <h5 className="font-medium text-black dark:text-white">
                            {item?.grup_auditor?.auditor_list[0]?.user
                              ?.departemen?.nama_departemen ?? '-'}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark p-3">
                          <h5 className="font-medium text-black dark:text-white">
                            {new Date() <= new Date(item?.end_at) &&
                            !item?.is_responded ? (
                              <span className="rounded-md px-2 bg-lime-300 py-1">
                                Open
                              </span>
                            ) : new Date() <= new Date(item?.end_at) &&
                              item?.is_responded ? (
                              <span className="rounded-md px-2 bg-red-300 py-1">
                                Close
                              </span>
                            ) : (
                              <span className="rounded-md px-2 bg-lime-300 py-1">
                                Close
                              </span>
                            )}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark p-3">
                          <h5 className="font-medium text-black dark:text-white">
                            {item?.is_responded ? (
                              <FiCheckCircle className="text-lime-500 text-2xl" />
                            ) : (
                              <FiXCircle className="text-red-500 text-2xl" />
                            )}
                          </h5>{' '}
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark p-3">
                          <div className="flex justify-start items-center gap-2">
                            <button
                              onClick={() => handleDetail(item?.id, 'detail')}
                              className="flex text-white bg-blue-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-blue-800 transition-all"
                            >
                              <FiEye className="" />
                              <span className="font-medium">Detail</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Meta Paginate */}
              <div className="m-2">
                <nav className="flex justify-between items-center">
                  <ul className="flex flex-wrap items-center gap-3">
                    <li>
                      <button
                        disabled={audits?.meta?.current_page == 1}
                        onClick={() =>
                          handlePaginate(audits?.meta?.current_page - 1)
                        }
                        className="flex disabled:cursor-not-allowed disabled:opacity-40 h-9 gap-2 px-2 items-center justify-center rounded-md border border-stroke  hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
                      >
                        <FiChevronLeft className="text-2xl text-slate-600" />
                        <span className="text-black font-medium">Prev</span>
                      </button>
                    </li>
                    <li>
                      <button
                        disabled={
                          audits?.meta?.current_page == audits?.meta?.last_page
                        }
                        onClick={() =>
                          handlePaginate(audits?.meta?.current_page + 1)
                        }
                        className="flex h-9 disabled:cursor-not-allowed disabled:opacity-40 gap-2 px-2 items-center justify-center rounded-md border border-stroke  hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
                      >
                        <span className="text-black font-medium">Next</span>
                        <FiChevronRight className="text-2xl text-slate-600" />
                      </button>
                    </li>
                  </ul>
                  <div className="me-3 flex gap-3 items-center">
                    <div className="mt-1">
                      <span className="font-semibold text-xl">
                        {audits?.meta?.current_page}
                      </span>
                      <span className="mx-1">/</span>
                      <span className="">{audits?.meta?.last_page}</span>
                    </div>
                    <span className="text-3xl font-regular">|</span>
                    <div className="mt-1">
                      Total {audits?.my_audits_count} Audit
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default MyHistoriAudit;
