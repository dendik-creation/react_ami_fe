import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import {
  FiCode,
  FiKey,
  FiMail,
  FiNavigation,
  FiPhoneCall,
  FiSave,
  FiUser,
} from 'react-icons/fi';
import {
  BsBuilding,
  BsCheckCircleFill,
  BsExclamationCircleFill,
} from 'react-icons/bs';
import { User } from '../../types/AuditListInterface';
import SwitcherRole from '../PDD_Management/MasterUser/components/SwitcherRole';
import { profileApi } from '../../api/my_profile';
import { Transition, Tab } from '@headlessui/react';
import LoadFetch from '../../common/Loader/LoadFetch';
import ConfirmSubmit from '../../components/Modal/ConfirmSubmit';
import toastFire from '../../hooks/toastFire';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const MyProfile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [onChangeTab, setChangeTab] = useState<boolean>(false);
  const [activeTab, setTabs] = useState<number>(1);
  const [user, setUser] = useState<User>();
  const [checkedPass, setChecked] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [compareCheck, setCompare] = useState<any>({
    minimum_char: false,
    one_capital: false,
    one_number: false,
    one_symbol: false,
  });
  const [password, setPassword] = useState<{
    current_password: string;
    new_password: string;
    new_password_confirm: string;
    tryCount: number;
  }>({
    current_password: '',
    new_password: '',
    new_password_confirm: '',
    tryCount: 0,
  });
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

  const handleTabs = (tab: number) => {
    setChangeTab(true);
    setTimeout(() => {
      setTabs(tab);
      setChangeTab(false);
      setChecked(false);
      setPassword({
        current_password: '',
        new_password: '',
        new_password_confirm: '',
        tryCount: 0,
      });
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

  const checkIsReadyChange = () => {
    const hasMinimumLength = password.new_password.trim().length >= 8;
    const hasCapitalLetter = /[A-Z]/.test(password.new_password.trim());
    const hasNumber = /[0-9]/.test(password.new_password.trim());
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password.new_password.trim(),
    );
    setCompare({
      minimum_char: hasMinimumLength,
      one_capital: hasCapitalLetter,
      one_number: hasNumber,
      one_symbol: hasSymbol,
    });
  };

  useEffect(() => {
    checkIsReadyChange();
  }, [password.new_password, password.new_password_confirm]);

  const handleChangePassword = (
    e: ChangeEvent<HTMLFormElement | HTMLInputElement>,
  ) => {
    setPassword((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(password);
    if (password.tryCount >= 3) {
      toastFire({
        message: 'Hubungi Pdd untuk reset password',
        status: false,
      });
    }
  }, [password.tryCount]);

  const handleCheckPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChecking(true);
    profileApi
      .checkCurrentPass(password.current_password, setChecked, setChecking)
      .finally(() => {
        setTimeout(() => {
          setPassword((prev: any) => ({
            ...prev,
            tryCount: parseInt(prev?.tryCount) + 1,
          }));
        }, 500);
      });
  };

  const handleSubmitProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal({ confirm_modal: true, error_modal: false });
  };

  const handleSubmitPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.new_password === password.new_password_confirm) {
      setShowModal({ confirm_modal: true, error_modal: false });
    } else {
      toastFire({
        message: 'Password konfirmasi tidak sesuai',
        status: false,
      });
    }
  };
  return (
    <DefaultLayout>
      <ConfirmSubmit
        data={activeTab == 1 ? user : password}
        show={showModal.confirm_modal}
        setShowModal={setShowModal}
        target={`${activeTab == 1 ? 'MY-PROFILE' : 'CHANGE-PASS'}`}
        method="put"
        message={`${
          activeTab == 1
            ? 'Apakah Anda yakin untuk memperbarui data diri ?'
            : 'Mengubah password menyebabkan Anda logout dan harus login menggunakan password baru. Yakin ?'
        }`}
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
            <Tab.List className="flex rounded-xl bg-slate-600 p-2 gap-5">
              <Tab
                onFocus={() => handleTabs(1)}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-semibold leading-5',
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
                    'w-full rounded-lg py-2.5 text-sm font-semibold leading-5',
                    'focus:outline-none transiton-all',
                    selected
                      ? 'bg-white text-blue-700 shadow transition-all'
                      : 'text-blue-100 hover:bg-white/[0.12] transition-all hover:text-white',
                  )
                }
              >
                Ubah Password
              </Tab>
            </Tab.List>
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

                          <div className="mb-5.5 flex justify-start gap-30 items-center">
                            <div className="">
                              <h3 className="text-sm mb-3">
                                Role / Hak Akses {'(ReadOnly)'}
                              </h3>
                              <div className="flex justify-start items-start gap-6 flex-col md:flex-row md:items-center">
                                {roleList?.map(
                                  (item: string, index: number) => (
                                    <div className="" key={index}>
                                      <SwitcherRole
                                        role={item}
                                        user={user}
                                        setUser={setUser}
                                        isDisabled={true}
                                      />
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                            <div className="">
                              <h3 className="text-sm mb-3">
                                Role Aktif - Periode Sekarang (ReadOnly)
                              </h3>
                              <div className="">
                                <SwitcherRole
                                  role={user?.periode_active_role}
                                  user={user}
                                  setUser={setUser}
                                  isDisabled={true}
                                />
                              </div>
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
                {/* Change Pass */}
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
                  <Transition
                    show={!loading && !checkedPass}
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
                          Konfirmasi Password Lama Anda
                        </h3>
                      </div>
                      <div className="p-7">
                        <form onSubmit={handleCheckPassword}>
                          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="fullName"
                              >
                                Password Sekarang
                              </label>
                              <div className="relative">
                                <span className="absolute left-4.5 top-4">
                                  <FiKey className="text-lg text-slate-500" />
                                </span>
                                <input
                                  required
                                  autoComplete="off"
                                  className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="password"
                                  value={password?.current_password}
                                  onChange={handleChangePassword}
                                  name="current_password"
                                  id="current_password"
                                  placeholder="Password Sekarang"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex mt-10 justify-center items-center w-full">
                            <button
                              disabled={checking}
                              className="flex disabled:opacity-80 disabled:cursor-wait justify-center item-center gap-2 rounded bg-primary w-full py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                              type="submit"
                            >
                              {checking ? (
                                <div className="">
                                  <l-zoomies
                                    size={200}
                                    speed={1}
                                    color={'#FFFDD0'}
                                  />
                                </div>
                              ) : (
                                <div className="flex w-full justify-center gap-2">
                                  <FiNavigation className="text-2xl" />
                                  <span>Konfirmasi</span>
                                </div>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Transition>
                  <Transition
                    show={!loading && checkedPass}
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
                          Buat Password Baru Untuk Anda
                        </h3>
                      </div>
                      <div className="p-7">
                        <form onSubmit={handleSubmitPassword}>
                          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                            <div className="w-full">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="fullName"
                              >
                                Password Baru
                              </label>
                              <div className="relative">
                                <span className="absolute left-4.5 top-4">
                                  <FiKey className="text-lg text-slate-500" />
                                </span>
                                <input
                                  required
                                  autoComplete="off"
                                  className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="password"
                                  value={password?.new_password}
                                  onChange={handleChangePassword}
                                  name="new_password"
                                  id="new_password"
                                  placeholder="Password Baru"
                                />
                              </div>
                            </div>
                            <div className="w-full">
                              <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="fullName"
                              >
                                Konfirmasi Password Baru
                              </label>
                              <div className="relative">
                                <span className="absolute left-4.5 top-4">
                                  <FiKey className="text-lg text-slate-500" />
                                </span>
                                <input
                                  required
                                  autoComplete="off"
                                  className="w-full rounded border border-stroke  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                  type="password"
                                  value={password?.new_password_confirm}
                                  onChange={handleChangePassword}
                                  name="new_password_confirm"
                                  id="new_password_confirm"
                                  placeholder="Konfirmasi Password Baru"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-5.5 flex flex-col gap-3">
                            <ul className="grid grid-cols-1 md:grid-cols-2">
                              <li className="flex justify-start items-center gap-2 my-1">
                                {compareCheck.minimum_char ? (
                                  <BsCheckCircleFill className="text-lime-500 text-xl" />
                                ) : (
                                  <BsExclamationCircleFill className="text-red-500 text-xl" />
                                )}
                                <span
                                  className={`${
                                    compareCheck.minimum_char
                                      ? 'line-through'
                                      : ''
                                  }`}
                                >
                                  Minimum 8 Karakter
                                </span>
                              </li>
                              <li className="flex justify-start items-center gap-2 my-1">
                                {compareCheck.one_number ? (
                                  <BsCheckCircleFill className="text-lime-500 text-xl" />
                                ) : (
                                  <BsExclamationCircleFill className="text-red-500 text-xl" />
                                )}
                                <span
                                  className={`${
                                    compareCheck.one_number
                                      ? 'line-through'
                                      : ''
                                  }`}
                                >
                                  Terdapat 1 Angka
                                </span>
                              </li>
                              <li className="flex justify-start items-center gap-2 my-1">
                                {compareCheck.one_capital ? (
                                  <BsCheckCircleFill className="text-lime-500 text-xl" />
                                ) : (
                                  <BsExclamationCircleFill className="text-red-500 text-xl" />
                                )}
                                <span
                                  className={`${
                                    compareCheck.one_capital
                                      ? 'line-through'
                                      : ''
                                  }`}
                                >
                                  Terdapat 1 Huruf Kapital
                                </span>
                              </li>
                              <li className="flex justify-start items-center gap-2 my-1">
                                {compareCheck.one_symbol ? (
                                  <BsCheckCircleFill className="text-lime-500 text-xl" />
                                ) : (
                                  <BsExclamationCircleFill className="text-red-500 text-xl" />
                                )}
                                <span
                                  className={`${
                                    compareCheck.one_symbol
                                      ? 'line-through'
                                      : ''
                                  }`}
                                >
                                  Terdapat 1 Simbol
                                </span>
                              </li>
                            </ul>
                          </div>
                          <Transition
                            show={
                              compareCheck.minimum_char &&
                              compareCheck.one_capital &&
                              compareCheck.one_number &&
                              compareCheck.one_symbol
                            }
                            enter="transform transition duration-300 delay-[100ms]"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transform duration-300 transition ease-in-out"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            className="flex mt-10 justify-center items-center w-full"
                          >
                            <button
                              disabled={
                                !compareCheck.minimum_char ||
                                !compareCheck.one_capital ||
                                !compareCheck.one_number ||
                                !compareCheck.one_symbol
                              }
                              className="flex justify-center disabled:opacity-65 disabled:cursor-not-allowed item-center gap-2 rounded bg-red-500 w-full py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                              type="submit"
                            >
                              <FiSave className="text-2xl" />
                              <span>Perbarui Password</span>
                            </button>
                          </Transition>
                        </form>
                      </div>
                    </div>
                  </Transition>
                </Transition>{' '}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default MyProfile;
