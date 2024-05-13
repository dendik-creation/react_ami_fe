import React, { ChangeEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Transition } from '@headlessui/react';
import { HeaderData } from '../../Auditor/NewAudit/NewAuditInterface';
import { api } from '../../../api/histori_audit';
import {
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiMail,
  FiSearch,
} from 'react-icons/fi';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import LoadFetch from '../../../common/Loader/LoadFetch';
import toast from 'react-hot-toast';
import { credential } from '../../../utils/constant';
import { parseDateHaha } from '../../../api/date_parser';
import TableFilteringReal from '../../../common/Loader/TableFilteringReal';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

interface metaPagination {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

interface AuditsList {
  all_audits_count: number;
  all_audits: HeaderData[];
  meta: metaPagination;
}

const HistoriAllAudit: React.FC = () => {
  const [audits, setAudits] = useState<AuditsList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [disabledBtnSendingEmail, setDisabled] = useState<number>(0);
  const [isPaginating, setPaginating] = useState<boolean>(false);
  const [broadcasting, setBroadcasting] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [isAvailabletoBroadcast, setAvailableBroadcast] =
    useState<boolean>(false);
  useEffect(() => {
    api
      .auditsAll(setLoading, 1, setPaginating)
      .then((res) => {
        setAudits({
          all_audits_count: res?.all_audits_count,
          all_audits: res?.all_audits,
          meta: res?.meta,
        });
        res?.all_audits?.some((item: any) =>
          item?.is_responded == '0'
            ? setAvailableBroadcast(true)
            : setAvailableBroadcast(false),
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      if (search.length > 3) {
        setPaginating(true);
        api
          .auditsAll(setLoading, 1, setPaginating, search)
          .then((res) => setAudits(res));
      } else if (search.length == 0) {
        setPaginating(true);
        api
          .auditsAll(setLoading, 1, setPaginating, search)
          .then((res) => setAudits(res));
      }
    }, 400);
  }, [search]);

  const handlePaginate = (target_page: number | any) => {
    setPaginating(true);
    api
      .auditsAll(setLoading, target_page, setPaginating)
      .then((res) => {
        setAudits({
          all_audits_count: res?.all_audits_count,
          all_audits: res?.all_audits,
          meta: res?.meta,
        });
      })
      .catch((err) => console.log(err));
  };

  const navigate: NavigateFunction = useNavigate();

  const handleDetail = (header_id: number, action: string) => {
    if (action == 'detail') {
      navigate(`/monitoring/audit/detail/${header_id}`);
    } else if (action == 'edit') {
      navigate(`/monitoring/audit/edit/${header_id}`);
    }
  };

  const handleReminder = (auditee_id: number, auditee_name: string) => {
    setDisabled(auditee_id);
    toast.promise(
      api.sendEmailAudit(auditee_id, setDisabled),
      {
        loading: `Mengirim email ke ${auditee_name}...`,
        success: `Pengingat berhasil dikirim ke ${auditee_name}`,
        error: `Pengingat gagal dikirim ke ${auditee_name}`,
      },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      },
    );
  };

  const handleBroadcasting = () => {
    setBroadcasting(true);
    toast.promise(
      api.broadcastEmailAuditee(setBroadcasting),
      {
        loading: `Broadcasting ke Auditee...`,
        success: 'Broadcast ke Auditee berhasil',
        error: 'Broadcast ke Auditee gagal',
      },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      },
    );
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
      <div className="mb-12">
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[100ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="text-slate-700 font-bold flex items-center flex-col md:flex-row justify-between"
        >
          <Breadcrumb
            pageName="Seluruh Histori Audit"
            description={
              'Seluruh histori dan keterlibatan pihak dalam proses audit akan ditampilkan'
            }
          />
          {audits?.all_audits?.length > 0 && isAvailabletoBroadcast ? (
            <div className="group relative transition-all inline-block">
              <button
                onClick={handleBroadcasting}
                disabled={broadcasting}
                className="flex text-white disabled:cursor-wait group bg-yellow-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-yellow-700 transition-all"
              >
                <div className="group-disabled:block hidden">
                  <l-zoomies size={165} speed={1} color={'#FFF'} />
                </div>
                <div className="group-disabled:hidden flex justify-start gap-3 items-center">
                  <FiMail className="text-2xl" />
                  <span className="font-medium">Broadcast Auditee</span>{' '}
                </div>
              </button>
              <div className="absolute right-full top-1/2 z-20 mr-3 group-hover:cursor-help -translate-y-1/2 w-[300px] rounded bg-black px-4.5 py-1.5 text-sm font-medium text-white opacity-0 group-hover:opacity-100">
                <span className="absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black"></span>
                Mengingatkan Seluruh Auditee Untuk Penyelesaian Audit via Email
              </div>
            </div>
          ) : (
            ''
          )}
        </Transition>

        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[100ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="relative mt-4 mb-6 ms-4"
        >
          <FiSearch className="absolute h-full flex items-center text-slate-600 -top-0.5 text-lg" />
          <input
            type="search"
            name="search"
            autoComplete="off"
            id="search"
            required
            value={search}
            onChange={handleSearch}
            placeholder="Cari Berdasarkan No PLPP"
            className="w-full font-semibold text-slate-600 rounded-sm border-b-2 ps-9 bg-transparent px-3 py-2 outline-none focus:border-blue-500 border-slate-500"
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
                      {/*  */}
                    </th>
                    <th className="min-w-[50px] p-3 font-medium text-white">
                      No
                    </th>
                    <th className="min-w-[50px] p-3 font-medium text-white">
                      No PLPP
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Periode & Tahun
                    </th>
                    <th className="min-w-[50px] p-3 font-medium text-white">
                      ISO
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
                      Auditee
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Dept Auditee
                    </th>
                    <th className="min-w-[150px] p-3 font-medium text-white">
                      Tanggal Target
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
                  {isPaginating
                    ? Array(3)
                        .fill([])
                        .map((basoka: any, theindex: number) => (
                          <tr key={theindex}>
                            {Array(14)
                              .fill([])
                              .map((aduhai: any, auindex: number) => (
                                <TableFilteringReal key={auindex} />
                              ))}
                          </tr>
                        ))
                    : audits?.all_audits.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <div className="flex justify-start items-center gap-2">
                              {item?.kategori_temuan?.some(
                                (cat: string) => cat == 'mayor',
                              ) ? (
                                <div className="group relative transition-all inline-block">
                                  <span className="px-2.5 py-[0.25px] rounded-full bg-red-400"></span>
                                  <div className="absolute transition-all left-0 top-full z-20 mt-2 w-[150px] rounded bg-black border-white px-3.5 py-1.5 text-sm font-medium text-white scale-0 group-hover:scale-100">
                                    <span className="absolute top-[-2px] left-2 z-10 h-2 w-2 rotate-45 rounded-sm bg-black"></span>
                                    {
                                      item?.kategori_temuan?.filter(
                                        (cihuy: string) => cihuy == 'mayor',
                                      ).length
                                    }{' '}
                                    Temuan Mayor
                                  </div>
                                </div>
                              ) : (
                                ''
                              )}
                              {item?.kategori_temuan?.some(
                                (cat: string) => cat == 'minor',
                              ) ? (
                                <div className="group relative transition-all inline-block">
                                  <span className="px-2.5 py-[0.25px] rounded-full bg-yellow-400"></span>
                                  <div className="absolute transition-all left-0 top-full z-20 mt-2 w-[150px] rounded bg-black border-white px-3.5 py-1.5 text-sm font-medium text-white scale-0 group-hover:scale-100">
                                    <span className="absolute top-[-2px] left-2 z-10 h-2 w-2 rotate-45 rounded-sm bg-black"></span>
                                    {
                                      item?.kategori_temuan?.filter(
                                        (cihuy: string) => cihuy == 'minor',
                                      ).length
                                    }{' '}
                                    Temuan Minor
                                  </div>
                                </div>
                              ) : (
                                ''
                              )}
                              {item?.kategori_temuan?.some(
                                (cat: string) => cat == 'observasi',
                              ) ? (
                                <div className="group relative transition-all inline-block">
                                  <span className="px-2.5 py-[0.25px] rounded-full bg-blue-400"></span>
                                  <div className="absolute transition-all left-0 top-full z-20 mt-2 w-[170px] rounded bg-black border-white px-3.5 py-1.5 text-sm font-medium text-white scale-0 group-hover:scale-100">
                                    <span className="absolute top-[-2px] left-2 z-10 h-2 w-2 rotate-45 rounded-sm bg-black"></span>
                                    {
                                      item?.kategori_temuan?.filter(
                                        (cihuy: string) => cihuy == 'observasi',
                                      ).length
                                    }{' '}
                                    Temuan Observasi
                                  </div>
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </td>

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
                              {item?.periode} | {item?.tahun}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.static_data?.iso?.kode}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.static_data?.grup_auditor?.nama_grup ??
                                '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.static_data?.grup_auditor?.auditor_list[0]
                                ?.user?.nama_lengkap ?? '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.static_data?.grup_auditor?.auditor_list[0]
                                ?.user?.departemen?.nama_departemen ?? '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.static_data?.auditee?.user?.nama_lengkap ??
                                '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.static_data?.auditee?.user?.departemen
                                ?.nama_departemen ?? '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.end_at ? parseDateHaha(item?.end_at) : '-'}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {new Date() <= new Date(item?.end_at) ? (
                                <span className="rounded-md px-2 bg-lime-300 py-1">
                                  Open
                                </span>
                              ) : (
                                <span className="rounded-md px-2 bg-red-300 py-1">
                                  Close
                                </span>
                              )}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.is_responded == '1' ? (
                                <BsCheckCircleFill className="text-lime-500 text-2xl" />
                              ) : (
                                <BsXCircleFill className="text-red-500 text-2xl" />
                              )}
                            </h5>{' '}
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <div className="flex justify-start items-center gap-2">
                              <button
                                onClick={() => handleDetail(item?.id, 'detail')}
                                className="flex w-full text-white bg-blue-500 px-2.5 py-1.5 rounded-md justify-center items-center gap-3 hover:bg-blue-800 transition-all"
                              >
                                <FiEye className="" />
                                <span className="font-medium">Detail</span>
                              </button>
                              {item?.is_responded == '0' ? (
                                <button
                                  onClick={() =>
                                    handleReminder(
                                      item?.auditee_id,
                                      item?.static_data?.auditee?.user
                                        ?.nama_lengkap,
                                    )
                                  }
                                  disabled={
                                    disabledBtnSendingEmail == item?.auditee_id
                                  }
                                  className="flex text-white disabled:cursor-wait group bg-emerald-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-emerald-800 transition-all"
                                >
                                  <div className="group-disabled:block hidden">
                                    <l-zoomies
                                      size={95}
                                      speed={1}
                                      color={'#FFF'}
                                    />
                                  </div>
                                  <div className="group-disabled:hidden flex justify-start gap-3 items-center">
                                    <FiBell className="" />
                                    <span className="font-medium">
                                      Ingatkan
                                    </span>
                                  </div>
                                </button>
                              ) : (
                                ''
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>

              {/* Meta Paginate */}
              <div className="m-2 sticky left-0">
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
                      Total {audits?.all_audits_count} Audit
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

export default HistoriAllAudit;
