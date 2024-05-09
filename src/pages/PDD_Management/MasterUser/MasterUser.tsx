import React, { ChangeEvent, useEffect, useState, Fragment } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition, Menu } from '@headlessui/react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { api } from '../../../api/master_user';
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiKey,
  FiPenTool,
  FiSearch,
  FiTrash,
  FiUserPlus,
} from 'react-icons/fi';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../../components/Modal/ConfirmDelete';
import LoadFetch from '../../../common/Loader/LoadFetch';
import ResetPasswordModal from './components/ResetPasswordModal';
import TableFilteringReal from '../../../common/Loader/TableFilteringReal';

const MasterUser: React.FC = () => {
  const [users, SetUsers] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaginating, setPaginating] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number | null>();
  const [idResetPass, setIdPass] = useState<number>(0);
  const [successDelete, setSuccessDel] = useState<boolean>(false);
  const [modalConfirmDelete, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      if (search.length > 3) {
        setPaginating(true);
        api
          .getUserAll(setLoading, 1, setPaginating, search)
          .then((res) => SetUsers(res));
      } else if (search.length == 0) {
        setPaginating(true);
        api
          .getUserAll(setLoading, 1, setPaginating, search)
          .then((res) => SetUsers(res));
      }
    }, 400);
  }, [search]);

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
              id="search"
              required
              autoComplete="off"
              value={search}
              onChange={handleSearch}
              placeholder="Cari Berdasarkan Nama Lengkap atau Email"
              className="w-full font-semibold text-slate-600 rounded-sm border-b-2 ps-9 bg-transparent px-3 py-2 outline-none focus:border-blue-500 border-slate-500"
            />
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
                      : users?.data?.data?.map((item: any, index: number) => (
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
                              <Menu
                                as="div"
                                className="relative inline-block text-left"
                              >
                                <div>
                                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-primary/70 px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                    Action
                                    <FiChevronDown
                                      className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-0 z-99 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="px-2 py-2 bg-white">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            onClick={() => handleEdit(item?.id)}
                                            className={`${
                                              active
                                                ? 'bg-violet-500 text-white'
                                                : 'text-slate-600'
                                            } group flex w-full items-center transition-all rounded-md px-2 py-2 gap-3`}
                                          >
                                            <FiPenTool className="text-lg" />
                                            <span>Edit</span>
                                          </button>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            onClick={() =>
                                              handleResetPass(item?.id)
                                            }
                                            className={`${
                                              active
                                                ? 'bg-lime-500 text-white'
                                                : 'text-slate-600'
                                            } group flex w-full items-center transition-all rounded-md px-2 py-2 gap-3`}
                                          >
                                            <FiKey className="text-lg" />
                                            <span>Reset Password</span>
                                          </button>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            onClick={() =>
                                              handleRemove(item?.id)
                                            }
                                            className={`${
                                              active
                                                ? 'bg-red-500 text-white'
                                                : 'text-slate-600'
                                            } group flex w-full items-center transition-all rounded-md px-2 py-2 gap-3`}
                                          >
                                            <FiTrash className="text-lg" />
                                            <span>Hapus</span>
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
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
