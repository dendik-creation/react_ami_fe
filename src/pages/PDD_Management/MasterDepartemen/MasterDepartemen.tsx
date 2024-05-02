import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition } from '@headlessui/react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { api } from '../../../api/master_departemen';
import {
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiPenTool,
  FiPlusSquare,
  FiTrash,
} from 'react-icons/fi';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../../components/Modal/ConfirmDelete';
import { Departemen, MetaPaginate } from '../../../types/AuditListInterface';

interface MaserDeptInterface {
  total_dept: number;
  data: {
    data: Departemen[];
  };
  meta_paginate: MetaPaginate | undefined;
}
const MasterDepartemen: React.FC = () => {
  const [deptList, setDeptList] = useState<MaserDeptInterface>();

  const [idDel, setIdDel] = useState<number | null>();
  const [successDelete, setSuccessDel] = useState<boolean>(false);
  const [modalConfirmDelete, setShowModal] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [isPaginating, setPaginating] = useState<boolean>(false);

  useEffect(() => {
    api
      .departemenAll(setLoading, 1, setPaginating)
      .then((res) => setDeptList(res));
  }, []);
  const handlePaginate = (target_page: number) => {
    setPaginating(true);
    api
      .departemenAll(setLoading, target_page, setPaginating)
      .then((res) => setDeptList(res));
  };

  const navigate: NavigateFunction = useNavigate();

  const handleRemove = (id: number) => {
    setIdDel(id);
    setShowModal(true);
  };

  useEffect(() => {
    if (successDelete == true) {
      setLoading(true);
      api
        .departemenAll(setLoading, 1, setPaginating)
        .then((res) => {
          setDeptList(res);
          setShowModal(false);
        })
        .catch((err) => console.log(err));
    }
  }, [successDelete]);

  return (
    <>
      <DefaultLayout>
        <ConfirmDelete
          id={idDel}
          modalConfirmDelete={modalConfirmDelete}
          setShowModal={setShowModal}
          target="DEL-DEPT"
          message="Menghapus departemen dapat menghapus sub departemennya"
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
              pageName="Data Departemen"
              description={
                'Anda dapat mengkonfigurasi untuk menambah atau mengurangi sub departemen secara opsional'
              }
            />
            <button
              onClick={() => navigate('/master/departemen/create')}
              className="flex text-white bg-yellow-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-yellow-700 transition-all"
            >
              <FiPlusSquare className="text-2xl" />
              <span className="font-medium">Departemen Baru</span>
            </button>
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
                        Kode
                      </th>
                      <th className="min-w-[120px] p-3 font-medium text-white">
                        Nama Departemen
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Ekstensi
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Jumlah Sub Dept
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Unit
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
                      deptList?.data?.data?.map(
                        (item: Departemen, index: number) => (
                          <tr key={index}>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {index + 1}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.kode}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.nama_departemen}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.ekstensi}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.sub_departemen_count}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <h5 className="font-medium text-black dark:text-white">
                                {item?.unit?.nama_unit}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] dark:border-strokedark p-3">
                              <div className="flex justify-start items-center gap-3">
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/master/departemen/edit/${item?.id}`,
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
                        ),
                      )
                    )}
                  </tbody>
                </table>

                {/* Meta Paginate */}
                <div className="m-2 sticky left-0">
                  <nav className="flex justify-between items-center">
                    <ul className="flex flex-wrap items-center gap-3">
                      <li>
                        <button
                          disabled={deptList?.meta_paginate?.current_page == 1}
                          onClick={() =>
                            handlePaginate(
                              deptList?.meta_paginate?.current_page - 1,
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
                            deptList?.meta_paginate?.current_page ==
                            deptList?.meta_paginate?.last_page
                          }
                          onClick={() =>
                            handlePaginate(
                              deptList?.meta_paginate?.current_page + 1,
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
                          {deptList?.meta_paginate?.current_page}
                        </span>
                        <span className="mx-1">/</span>
                        <span className="">
                          {deptList?.meta_paginate?.last_page}
                        </span>
                      </div>
                      <span className="text-3xl font-regular">|</span>
                      <div className="mt-1">
                        Total {deptList?.total_grup} Grup
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </DefaultLayout>
    </>
  );
};

export default MasterDepartemen;
