import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition } from '@headlessui/react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { api } from '../../../api/master_user';
import {
  FiChevronLeft,
  FiChevronRight,
  FiKey,
  FiPenTool,
  FiTrash,
  FiUserPlus,
} from 'react-icons/fi';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../../components/Modal/ConfirmDelete';
import LoadFetch from '../../../common/Loader/LoadFetch';
import ResetPasswordModal from './components/ResetPasswordModal';

const MasterUser: React.FC = () => {
  const [users, SetUsers] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaginating, setPaginating] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number | null>();
  const [idResetPass, setIdPass] = useState<number>(0);
  const [successDelete, setSuccessDel] = useState<boolean>(false);
  const [modalConfirmDelete, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    api
      .getUserAll(setLoading, 1, setPaginating)
      .then((res) => SetUsers(res))
      .then((err) => console.log(err));
  }, []);

  const handlePaginate = (target_page: number) => {
    setPaginating(true);
    api
      .getUserAll(setLoading, target_page, setPaginating)
      .then((res) => SetUsers(res));
  };

  const navigate: NavigateFunction = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/master/user/edit/${id}`);
  };

  const handleRemove = (id: number) => {
    setIdDel(id);
    setShowModal(true);
  };

  const [resetModal, setResetModal] = useState<boolean>(false);

  const handleResetPass = (id: number) => {
    setIdPass(id);
    setResetModal(true);
  };

  useEffect(() => {
    if (successDelete == true) {
      setLoading(true);
      api
        .getUserAll(setLoading, 1, setPaginating)
        .then((res) => {
          SetUsers(res);
          setSuccessDel(false);
        })
        .then((err) => console.log(err));
    }
  }, [successDelete]);
  return (
    <>
      <DefaultLayout>
        <ResetPasswordModal
          id={idResetPass}
          show={resetModal}
          setShowModal={setResetModal}
        />
        <ConfirmDelete
          id={idDel}
          modalConfirmDelete={modalConfirmDelete}
          setShowModal={setShowModal}
          target="DEL-USER"
          message="Menghapus user dapat menghilangkan histori keterkaitan dalam proses audit"
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
              pageName="Master Data User"
              description={
                'Anda dapat mengkonfigurasi data user berserta role (hak akses nya)'
              }
            />
            <button
              onClick={() => navigate('/master/user/create')}
              className="flex text-white bg-yellow-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-yellow-700 transition-all"
            >
              <FiUserPlus className="text-2xl" />
              <span className="font-medium">User Baru</span>
            </button>
          </Transition>

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
                        Username
                      </th>
                      <th className="min-w-[120px] p-3 font-medium text-white">
                        Nama Lengkap
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Email
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Role {'(Hak Akses)'}
                      </th>
                      <th className="min-w-[150px] p-3 font-medium text-white">
                        Departemen Unit
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
                      users?.data?.data?.map((item: any, index: number) => (
                        <tr key={index}>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {index + 1}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.username}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.nama_lengkap}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.email}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              <ul className="flex justify-start items-center gap-2">
                                {item?.role?.map(
                                  (roleItem: string, roleIndex: number) => (
                                    <li
                                      className={`capitalize text-sm rounded-md px-2 py-1 ${
                                        roleItem == 'auditee'
                                          ? 'bg-slate-100'
                                          : roleItem == 'auditor'
                                          ? 'bg-lime-100'
                                          : roleItem == 'pdd'
                                          ? 'bg-orange-100'
                                          : 'bg-cyan-100'
                                      }`}
                                      key={roleIndex}
                                    >
                                      {roleItem}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <h5 className="font-medium text-black dark:text-white">
                              {item?.departemen?.nama_departemen} -{' '}
                              {item?.departemen?.unit?.nama_unit}
                            </h5>
                          </td>
                          <td className="border-b border-[#eee] dark:border-strokedark p-3">
                            <div className="flex justify-start items-center gap-3">
                              <button
                                onClick={() => handleEdit(item?.id)}
                                className="flex text-white bg-blue-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-blue-700 transition-all"
                              >
                                <FiPenTool className="" />
                                <span className="font-medium">Edit</span>
                              </button>
                              <button
                                onClick={() => handleResetPass(item?.id)}
                                className="flex text-white  w-34 bg-lime-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-lime-700 transition-all"
                              >
                                <FiKey className="" />
                                <span className="font-medium">Reset Pass</span>
                              </button>
                              <button
                                onClick={() => handleRemove(item?.id)}
                                className="flex text-white bg-red-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-red-700 transition-all"
                              >
                                <FiTrash className="" />
                                <span className="font-medium">Hapus</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Meta Paginate */}
                <div className="m-2 sticky left-0">
                  <nav className="flex justify-between items-center">
                    <ul className="flex flex-wrap items-center gap-3">
                      <li>
                        <button
                          disabled={users?.meta?.current_page == 1}
                          onClick={() =>
                            handlePaginate(users?.meta?.current_page - 1)
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
                            users?.meta?.current_page == users?.meta?.last_page
                          }
                          onClick={() =>
                            handlePaginate(users?.meta?.current_page + 1)
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
                          {users?.meta?.current_page}
                        </span>
                        <span className="mx-1">/</span>
                        <span className="">{users?.meta?.last_page}</span>
                      </div>
                      <span className="text-3xl font-regular">|</span>
                      <div className="mt-1">Total {users?.total_user} User</div>
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

export default MasterUser;
