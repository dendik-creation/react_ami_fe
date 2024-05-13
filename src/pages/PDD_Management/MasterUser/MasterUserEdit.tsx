import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition } from '@headlessui/react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { User } from '../../../types/AuditListInterface';
import { api } from '../../../api/master_user';
import { useParams } from 'react-router-dom';
import SwitcherRole from './components/SwitcherRole';
import ReactSelect, { SingleValue } from 'react-select';
import { FiSave } from 'react-icons/fi';
import ConfirmSubmit from '../../../components/Modal/ConfirmSubmit';
import LoadFetch from '../../../common/Loader/LoadFetch';
import toastFire from '../../../hooks/toastFire';

interface ListSelect {
  label: string;
  value: number;
}

const MasterUserEdit: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [sendForm, setSend] = useState<any>(null);
  const roleList: string[] = ['Auditee', 'Auditor', 'Pdd', 'Management'];
  const [deptList, setDeptList] = useState<ListSelect[] | undefined | null>();

  const [showModal, setShowModal] = useState<{
    error_modal: boolean;
    confirm_modal: boolean;
  }>({
    error_modal: false,
    confirm_modal: false,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  useEffect(() => {
    api
      .getUserDetail(setLoading, id)
      .then((res) => {
        const finalres = {
          ...res,
          role: res?.role?.map(
            (item: any) => item.charAt(0).toUpperCase() + item.slice(1),
          ),
          periode_active_role:
            res?.periode_active_role.charAt(0).toUpperCase() +
            res?.periode_active_role.slice(1),
        };
        setUser(finalres);
      })
      .catch((err) => console.log(err));
    api
      .getDeptList(setLoading)
      .then((res) => setDeptList(res))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLFormElement | HTMLInputElement | HTMLSelectElement>,
  ) => {
    setUser((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e: any, type: string) => {
    setUser((prev: any) => ({
      ...prev,
      [type]: e,
    }));
  };

  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(() => {
    console.log(sendForm);
  }, [sendForm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSend({
      username: user?.username,
      nama_lengkap: user?.nama_lengkap,
      email: user?.email,
      departemen_id: user?.departemen_id?.value,
      role: user?.role?.map((item) => item.toLowerCase()),
      periode_active_role: user?.periode_active_role?.toLowerCase(),
    });
    // if (user?.role?.includes('auditor')) {
    //   setSend((prev: any) => ({
    //     ...prev,
    //     auditor: {
    //       keanggotaan: user?.auditor?.keanggotaan?.value,
    //       grup_auditor_id: user?.auditor?.grup_auditor?.value,
    //     },
    //   }));
    // }
    setShowModal({ confirm_modal: true, error_modal: false });
  };

  return (
    <DefaultLayout>
      <ConfirmSubmit
        id={id}
        data={sendForm}
        show={showModal.confirm_modal}
        setShowModal={setShowModal}
        target="USER"
        method="put"
        message="Apakah anda yakin akan memperbarui data user?"
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
          className="text-slate-700 font-bold"
        >
          <Breadcrumb
            pageName="Edit Data User"
            description={
              'Anda dapat mengkonfigurasi data user berserta role (hak akses nya)'
            }
          />
        </Transition>

        {/* Card */}
        <form onSubmit={handleSubmit}>
          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="rounded-md mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Informasi User
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    value={user?.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user?.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama_lengkap"
                    id="nama_lengkap"
                    value={user?.nama_lengkap}
                    onChange={handleChange}
                    required
                    placeholder="Nama Lengkap"
                    className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-5 flex justify-start items-start md:items-center gap-10 md:gap-20 md:flex-row flex-col">
                <div className="">
                  <h3 className="font-medium mb-3">Role {'(Hak Akses)'}</h3>
                  <div className="flex justify-start items-start gap-6 flex-col md:flex-row md:items-center">
                    {roleList?.map((item: string, index: number) => (
                      <div className="" key={index}>
                        <SwitcherRole
                          role={item}
                          user={user}
                          setUser={setUser}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/2 w-full">
                  <h3 className="font-medium mb-3">Role Periode Sekarang</h3>
                  <div className="flex justify-start items-start gap-6 flex-col md:flex-row md:items-center">
                    <select
                      value={user?.periode_active_role}
                      required
                      onChange={handleChange}
                      name="periode_active_role"
                      id="periode_active_role"
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-2 py-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input 
                      }`}
                    >
                      <option value="">Role Periode Sekarang</option>
                      {user?.role?.map((item: any, index: number) => (
                        <option key={index} value={item} className="capitalize">
                          {item}
                        </option>
                      ))}
                    </select>{' '}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Departemen
                  </label>
                  <ReactSelect
                    required
                    name="departemen_id"
                    id="departemen_id"
                    value={user?.departemen_id}
                    options={deptList ?? undefined}
                    onChange={(e) => handleSelect(e, 'departemen_id')}
                    noOptionsMessage={() => 'Departemen Tidak Ditemukan'}
                    placeholder="Cari Departemen"
                    className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* <Transition
                show={user?.role?.includes('auditor')}
                enter="transform transition duration-300 delay-[400ms]"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transform duration-300 transition ease-in-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="grid grid-cols-1 md:grid-cols-2"
              >
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Grup Auditor
                  </label>
                  <ReactSelect
                    required
                    name="grup_auditor_id"
                    id="grup_auditor_id"
                    value={user?.auditor?.grup_auditor}
                    options={grupList ?? undefined}
                    onChange={(e) => handleSelect(e, 'grup_auditor')}
                    noOptionsMessage={() => 'Grup Auditor Tidak Ditemukan'}
                    placeholder="Cari Grup Auditor"
                    className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Keanggotaan Auditor
                  </label>
                  <ReactSelect
                    required
                    name="keanggotaan"
                    id="keanggotaan"
                    value={user?.auditor?.keanggotaan}
                    options={[
                      {
                        label: 'Ketua',
                        value: 'ketua',
                      },
                      {
                        label: 'Anggota',
                        value: 'anggota',
                      },
                    ]}
                    isDisabled={user?.auditor?.grup_auditor?.has_ketua ?? false}
                    onChange={(e) => handleSelect(e, 'keanggotaan')}
                    placeholder="Cari Keanggotaan"
                    className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </Transition> */}
            </div>
          </Transition>

          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="button"
            className="inline-flex mb-8 mt-2 rounded-md w-full items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <FiSave className="text-3xl" />
            <span className="text-2xl">Simpan</span>
          </Transition>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default MasterUserEdit;
