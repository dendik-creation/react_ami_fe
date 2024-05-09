import React, { ChangeEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition } from '@headlessui/react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { api } from '../../../api/master_grup_auditor';
import {
  GrupAuditor,
  GrupAuditorList,
} from '../../Auditor/MonitoringDataGrupAuditor/GrupAuditorInterface';
import {
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiPenTool,
  FiPlusSquare,
  FiSearch,
  FiTrash,
} from 'react-icons/fi';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../../components/Modal/ConfirmDelete';
import TableFilteringReal from '../../../common/Loader/TableFilteringReal';
const MasterGrupAuditor: React.FC = () => {
  const [grupList, setGrups] = useState<GrupAuditorList>();
  const [detailGrup, setDetailGrup] = useState<GrupAuditor>();

  const [idDel, setIdDel] = useState<number | null>();
  const [successDelete, setSuccessDel] = useState<boolean>(false);
  const [modalConfirmDelete, setShowModal] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(true);
  const [grupDetail, setGrupDetail] = useState<any>({
    loading: false,
    detail: null,
  });
  const [isPaginating, setPaginating] = useState<boolean>(false);

  useEffect(() => {
    api
      .getGrupAuditorAll(setLoading, 1, setPaginating)
      .then((res) => setGrups(res));
  }, []);
  const handlePaginate = (target_page: number) => {
    setPaginating(true);
    api
      .getGrupAuditorAll(setLoading, target_page, setPaginating)
      .then((res) => setGrups(res));
  };

  const navigate: NavigateFunction = useNavigate();

  const handleRemove = (id: number) => {
    setIdDel(id);
    setShowModal(true);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      if (search.length > 3) {
        setPaginating(true);
        api
          .getGrupAuditorAll(setLoading, 1, setPaginating, search)
          .then((res) => setGrups(res));
      } else if (search.length == 0) {
        setPaginating(true);
        api
          .getGrupAuditorAll(setLoading, 1, setPaginating, search)
          .then((res) => setGrups(res));
      }
    }, 400);
  }, [search]);

  useEffect(() => {
    if (successDelete == true) {
      setLoading(true);
      api
        .getGrupAuditorAll(setLoading, 1, setPaginating)
        .then((res) => {
          setGrups(res);
          setShowModal(false);
        })
        .catch((err) => console.log(err));
    }
  }, [successDelete]);

  const handleDetail = (selectedIndex: number) => {
    setGrupDetail((prev: any) => ({
      ...prev,
      loading: true,
    }));
    setTimeout(() => {
      setGrupDetail({
        detail: grupList?.data[selectedIndex],
        loading: false,
      });
    }, 300);
  };
  return (
    <>
      <DefaultLayout>
        <ConfirmDelete
          id={idDel}
          modalConfirmDelete={modalConfirmDelete}
          setShowModal={setShowModal}
          target="DEL-GRUP-AUDITOR"
          message="Menghapus grup auditor dapat menghapus keanggotaan auditor didalamnya"
          setSuccessDel={setSuccessDel}
        />
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
          <LoadFetch />{' '}
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
              pageName="Data Grup Auditor"
              description={
                'Auditor mulai dari ketua dan anggotanya dikelompokkan berdasarkan grupnya'
              }
            />
            <button
              onClick={() => navigate('/master/grup-auditor/create')}
              className="flex text-white bg-yellow-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-yellow-700 transition-all"
            >
              <FiPlusSquare className="text-2xl" />
              <span className="font-medium">Grup Auditor Baru</span>
            </button>
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
              placeholder="Cari Berdasarkan Nama Grup"
              className="w-full font-semibold text-slate-600 rounded-sm border-b-2 ps-9 bg-transparent px-3 py-2 outline-none focus:border-blue-500 border-slate-500"
            />
          </Transition>

          {/* Grup Auditor List */}
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
                        Nama Grup
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Ketua
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Dept Ketua
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Unit Ketua
                      </th>
                      <th className="min-w-[60px] p-3 font-medium text-white">
                        Jumlah Anggota
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
                              {Array(7)
                                .fill([])
                                .map((aduhai: any, auindex: number) => (
                                  <TableFilteringReal key={auindex} />
                                ))}
                            </tr>
                          ))
                      : grupList?.data.map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {index + 1}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.nama_grup}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.auditor_list[0]?.user?.nama_lengkap ??
                                  '-'}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.auditor_list[0]?.user?.departemen
                                  ?.nama_departemen ?? '-'}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.auditor_list[0]?.user?.departemen?.unit
                                  ?.nama_unit ?? '-'}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.jumlah_anggota}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <div className="flex justify-start items-center gap-3">
                                <button
                                  onClick={() => handleDetail(index)}
                                  className="flex text-white bg-emerald-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-emerald-800 transition-all"
                                >
                                  <FiEye className="" />
                                  <span className="font-medium">Detail</span>
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/master/grup-auditor/edit/${item?.id}`,
                                    )
                                  }
                                  className="flex text-white bg-blue-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-blue-800 transition-all"
                                >
                                  <FiPenTool className="" />
                                  <span className="font-medium">Edit</span>
                                </button>
                                <button
                                  onClick={() => handleRemove(item?.id)}
                                  className="flex text-white bg-red-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-red-800 transition-all"
                                >
                                  <FiTrash className="" />
                                  <span className="font-medium">Hapus</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>

                {/* Meta Paginate */}
                <div className="m-2">
                  <nav className="flex justify-between items-center">
                    <ul className="flex flex-wrap items-center gap-3">
                      <li>
                        <button
                          disabled={grupList?.meta_paginate?.current_page == 1}
                          onClick={() =>
                            handlePaginate(
                              grupList?.meta_paginate?.current_page - 1,
                            )
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
                            grupList?.meta_paginate?.current_page ==
                            grupList?.meta_paginate?.last_page
                          }
                          onClick={() =>
                            handlePaginate(
                              grupList?.meta_paginate?.current_page + 1,
                            )
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
                          {grupList?.meta_paginate?.current_page}
                        </span>
                        <span className="mx-1">/</span>
                        <span className="">
                          {grupList?.meta_paginate?.last_page}
                        </span>
                      </div>
                      <span className="text-3xl font-regular">|</span>
                      <div className="mt-1">
                        Total {grupList?.total_grup} Grup
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </Transition>

          {/* Grup Auditor Detail */}
          <Transition
            show={!loading && !grupDetail.loading && grupDetail.detail != null}
            enter="transform transition duration-300 delay-[100ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={'mb-12'}
          >
            <div className="rounded-md shadow-default bg-white px-5 py-5">
              <div className="max-w-full">
                <h1 className="text-xl font-bold mb-3">
                  Detail Grup Auditor {grupDetail?.detail?.nama_grup}
                </h1>
                <div className="flex flex-col mb-6">
                  <div className="">
                    <div className="mb-3">
                      <div className="font-semibold mb-1">Ketua Auditor</div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Nama</div>
                        <div className="">
                          :{' '}
                          {
                            grupDetail?.detail?.auditor_list[0]?.user
                              ?.nama_lengkap
                          }
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Departemen</div>
                        <div className="">
                          :{' '}
                          {
                            grupDetail?.detail?.auditor_list[0]?.user
                              ?.departemen?.nama_departemen
                          }
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Unit</div>
                        <div className="">
                          :{' '}
                          {
                            grupDetail?.detail?.auditor_list[0]?.user
                              ?.departemen?.unit?.nama_unit
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="font-semibold mb-2">Anggota Auditor</div>
                    <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4">
                      {grupDetail?.detail?.auditor_list
                        ?.slice(1)
                        .map((item: any, index: number) => (
                          <div
                            key={index}
                            className="w-full border p-2 rounded-md border-slate-400 border-dashed"
                          >
                            <div className="flex justify-start items-center">
                              <div className="w-[150px]">Nama</div>
                              <div className="">
                                : {item?.user?.nama_lengkap}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              <div className="w-[150px]">Departemen</div>
                              <div className="">
                                : {item?.user?.departemen?.nama_departemen}
                              </div>
                            </div>
                            <div className="flex justify-start items-center">
                              <div className="w-[150px]">Unit</div>
                              <div className="">
                                : {item?.user?.departemen?.unit?.nama_unit}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </DefaultLayout>
    </>
  );
};

export default MasterGrupAuditor;
