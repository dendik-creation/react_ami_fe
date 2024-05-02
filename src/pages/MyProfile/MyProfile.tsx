import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FiCode, FiMail, FiPhoneCall, FiSave, FiUser } from 'react-icons/fi';
import { BsBuilding } from 'react-icons/bs';
import { User } from '../../types/AuditListInterface';
import SwitcherRole from '../PDD_Management/MasterUser/components/SwitcherRole';
import { profileApi } from '../../api/my_profile';
import { Transition, Tab } from '@headlessui/react';
import LoadFetch from '../../common/Loader/LoadFetch';
import ConfirmSubmit from '../../components/Modal/ConfirmSubmit';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const MyProfile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [onChangeTab, setChangeTab] = useState<boolean>(false);
  const [activeTab, setTabs] = useState<number>(1);
  const [user, setUser] = useState<User>();
  const roleList: string[] = ['auditee', 'auditor', 'pdd', 'management'];

  const [showModal, setShowModal] = useState<{
    error_modal: boolean;
    confirm_modal: boolean;
  }>({
    error_modal: false,
    confirm_modal: false,
  });

  useEffect(() => {
    profileApi
      .getProfile(setLoading)
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  const handleTabs = (tab: number) => {
    setChangeTab(true);
    setTimeout(() => {
      setTabs(tab);
      setChangeTab(false);
    }, 300);
  };

  const handleChangeProfile = (
    e: ChangeEvent<HTMLFormElement | HTMLInputElement>,
  ) => {
    setUser((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal({ confirm_modal: true, error_modal: false });
  };
  return (
    <DefaultLayout>
      <ConfirmSubmit
        data={user}
        show={showModal.confirm_modal}
        setShowModal={setShowModal}
        target="MY-PROFILE"
        method="put"
        message="Apakah Anda yakin untuk memperbarui data diri ?"
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
      <div className="mx-auto">
        <Transition
          show={!loading}
          enter="transform transition duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className=""
        >
          <Breadcrumb
            pageName="Profil Saya"
            description={'Anda dapat mengubah informasi tentang data diri'}
          />
        </Transition>

        {/* Tabs & Content */}
        <Transition
          show={!loading}
          enter="transform transition duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Tab.Group>
            {/* <Tab.List className="flex rounded-xl bg-slate-800 p-2 gap-5">
              <Tab
                onFocus={() => handleTabs(1)}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'focus:outline-none transiton-all',
                    selected
                      ? 'bg-white text-blue-700 shadow transition-all'
                      : 'text-blue-100 hover:bg-white/[0.12] transition-all hover:text-white',
                  )
                }
              >
                Profil Saya
              </Tab>
              <Tab
                onFocus={() => handleTabs(2)}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'focus:outline-none transiton-all',
                    selected
                      ? 'bg-white text-blue-700 shadow transition-all'
                      : 'text-blue-100 hover:bg-white/[0.12] transition-all hover:text-white',
                  )
                }
              >
                Ubah Password
              </Tab>
            </Tab.List> */}
            <Tab.Panels className="mt-5">
              <Tab.Panel>
                {/* Profile */}
                <Transition
                  show={!loading && activeTab == 1 && !onChangeTab}
                  enter="transform transition duration-300"
                  enterFrom="opacity-0 translate-y-12"
                  enterTo="opacity-100 translate-y-0"
                  leave="transform duration-300 transition ease-in-out"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-12"
                  className="mb-6"
                >
                  <Transition
                    show={!loading}
                    enter="transform transition duration-300 delay-[200ms]"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transform duration-300 transition ease-in-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="mb-4"
                  >
                    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Data Diri
                        </h3>
                      </div>
                      <div className="p-7">
                        <form onSubmit={handleSubmitProfile}>
                          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full sm:w-1/2">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="fullName"
                              >
                                Username
                              </label>
                              <div className="relative">
                                <span className="absolute left-4.5 top-4">
                                  <FiUser className="text-lg text-slate-500" />
                                </span>
                                <input
                                  disabled
                                  autoComplete="off"
                                  className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="text"
                                  value={user?.username}
                                  onChange={handleChangeProfile}
                                  name="username"
                                  id="username"
                                  placeholder="Username"
                                />
                              </div>
                            </div>

                            <div className="w-full sm:w-1/2">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="fullName"
                              >
                                Nama Lengkap
                              </label>
                              <div className="relative">
                                <span className="absolute left-4.5 top-4">
                                  <FiUser className="text-lg text-slate-500" />
                                </span>
                                <input
                                  required
                                  autoComplete="off"
                                  className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="text"
                                  value={user?.nama_lengkap}
                                  onChange={handleChangeProfile}
                                  name="nama_lengkap"
                                  id="nama_lengkap"
                                  placeholder="Nama Lengkap"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mb-5.5">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="emailAddress"
                            >
                              Email
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <FiMail className="text-lg text-slate-500" />
                              </span>
                              <input
                                required
                                autoComplete="off"
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="email"
                                name="email"
                                id="email"
                                value={user?.email}
                                onChange={handleChangeProfile}
                                placeholder="example@email.com"
                              />
                            </div>
                          </div>

                          <div className="mb-5.5">
                            <h3 className="text-sm mb-3">
                              Role / Hak Akses {'(ReadOnly)'}
                            </h3>
                            <div className="flex justify-start items-start gap-6 flex-col md:flex-row md:items-center">
                              {roleList?.map((item: string, index: number) => (
                                <div className="" key={index}>
                                  <SwitcherRole
                                    role={item}
                                    user={user}
                                    setUser={setUser}
                                    isDisabled={true}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex mt-10 justify-center items-center w-full">
                            <button
                              className="flex justify-center item-center gap-2 rounded bg-primary w-full py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                              type="submit"
                            >
                              <FiSave className="text-2xl" />
                              <span>Simpan</span>
                            </button>
                          </div>
                        </form>
                      </div>
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
                    className="mb-4"
                  >
                    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Departemen & Unit Terkait
                        </h3>
                      </div>
                      <div className="p-7">
                        <div className="mb-5.5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                          <div className="w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Kode Departemen
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <FiCode className="text-lg text-slate-500" />
                              </span>
                              <input
                                disabled
                                value={user?.departemen?.kode}
                                autoComplete="off"
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Nama Departemen
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <BsBuilding className="text-lg text-slate-500" />
                              </span>
                              <input
                                disabled
                                value={user?.departemen?.nama_departemen}
                                autoComplete="off"
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Ekstensi
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <FiPhoneCall className="text-lg text-slate-500" />
                              </span>
                              <input
                                disabled
                                value={user?.departemen?.ekstensi}
                                autoComplete="off"
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Kode Unit
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <FiCode className="text-lg text-slate-500" />
                              </span>
                              <input
                                disabled
                                autoComplete="off"
                                value={user?.departemen?.unit?.kode}
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Nama Unit
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <BsBuilding className="text-lg text-slate-500" />
                              </span>
                              <input
                                disabled
                                autoComplete="off"
                                value={user?.departemen?.unit?.nama_unit}
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                  <Transition
                    show={
                      !loading && user != null && user?.grup_auditor != null
                    }
                    enter="transform transition duration-300 delay-[600ms]"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transform duration-300 transition ease-in-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="mb-4"
                  >
                    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Grup Auditor
                        </h3>
                      </div>
                      <div className="p-7">
                        <div className="mb-5.5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                          <div className="w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Nama Grup
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <FiCode className="text-lg text-slate-500" />
                              </span>
                              <input
                                disabled
                                value={user?.grup_auditor?.nama_grup}
                                autoComplete="off"
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Ketua Grup
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <FiUser className="text-lg text-slate-500" />
                              </span>
                              <input
                                disabled
                                value={
                                  user?.grup_auditor?.auditor_list[0]?.user
                                    ?.nama_lengkap
                                }
                                autoComplete="off"
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Dept Ketua
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <BsBuilding className="text-lg text-slate-500" />
                              </span>
                              <input
                                disabled
                                value={
                                  user?.grup_auditor?.auditor_list[0]?.user
                                    ?.departemen?.nama_departemen
                                }
                                autoComplete="off"
                                className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <div className="text-md mb-2 font-semibold">
                            Anggota Auditor
                          </div>
                          {user &&
                            user?.grup_auditor?.auditor_list
                              ?.slice(1)
                              .map((item: any, index: number) => (
                                <div
                                  key={index}
                                  className="mb-5.5 grid grid-cols-1 gap-4 md:grid-cols-2"
                                >
                                  <div className="w-full">
                                    <label
                                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                                      htmlFor="fullName"
                                    >
                                      Nama Anggota {index + 1}
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-4.5 top-4">
                                        <FiCode className="text-lg text-slate-500" />
                                      </span>
                                      <input
                                        disabled
                                        value={item?.user?.nama_lengkap}
                                        autoComplete="off"
                                        className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="w-full">
                                    <label
                                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                                      htmlFor="fullName"
                                    >
                                      Dept Anggota {index + 1}
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-4.5 top-4">
                                        <BsBuilding className="text-lg text-slate-500" />
                                      </span>
                                      <input
                                        disabled
                                        autoComplete="off"
                                        value={
                                          item?.user?.departemen
                                            ?.nama_departemen
                                        }
                                        className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  </Transition>
                </Transition>
              </Tab.Panel>
              <Tab.Panel>
                {/* Password */}
                <Transition
                  show={!loading && activeTab == 2 && !onChangeTab}
                  enter="transform transition duration-300"
                  enterFrom="opacity-0 translate-y-12"
                  enterTo="opacity-100 translate-y-0"
                  leave="transform duration-300 transition ease-in-out"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-12"
                  className="mb-6"
                >
                  OK
                </Transition>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default MyProfile;
