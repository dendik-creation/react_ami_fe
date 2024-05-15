import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  FiUser,
  FiChevronDown,
  FiKey,
  FiTool,
  FiUserCheck,
} from 'react-icons/fi';

import 'ldrs/zoomies';
import { activeRoleSelected, login } from '../../api/auth';
import { RadioGroup, Transition } from '@headlessui/react';
import { api as apiIso } from '../../api/master_iso';
import { credential as hasCredential } from '../../utils/constant';

const SignIn: React.FC = () => {
  interface Credential {
    username: string;
    password: string;
    iso_id: string;
  }

  interface Transition {
    show: boolean;
    loading: boolean;
    loadReadyDashboard: boolean;
    isSelectRole: boolean;
  }

  const [transition, setTransition] = useState<Transition>({
    show: false,
    loadReadyDashboard: false,
    loading: false,
    isSelectRole: false,
  });

  const [isoList, setIsoList] = useState<any[]>([]);
  const [availableRole, setAvailable] = useState<string[]>(['']);
  const [greetingName, setGreeting] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const [credential, setCredential] = useState<Credential>({
    username: '',
    password: '',
    iso_id: '',
  });

  useEffect(() => {
    if (hasCredential != null) {
      if (hasCredential?.meta?.active_role == null) {
        setTransition((prev: Transition) => ({
          ...prev,
          isSelectRole: true,
        }));
      }
    }
  }, [transition.isSelectRole]);

  useEffect(() => {
    apiIso
      .isoGetAllForSelect()
      .then((res) => setIsoList(res))
      .catch((err) => console.log(err));
  }, []);

  // Check IF Has Credential But Expired Token
  useEffect(() => {
    if (hasCredential) {
      if (new Date() < new Date(hasCredential?.token.expired_at)) {
        setAvailable(hasCredential?.user?.role);
      } else {
        setTransition((prev: Transition) => ({
          ...prev,
          isSelectRole: false,
        }));
      }
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCredential((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isoList.length > 0) {
      setTimeout(() => {
        setTransition({ ...transition, show: true });
      }, 500);
    }
  }, [isoList]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setTransition((prev) => ({ ...prev, loading: true }));
    e.preventDefault();
    login(credential, setTransition).then((res) => {
      setGreeting(res?.user?.nama_lengkap);
      setAvailable(res?.user?.role);
      setTimeout(() => {
        setTransition((prev: Transition) => ({
          ...prev,
          show: true,
        }));
      }, 250);
    });
  };
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden bg-white flex justify-center items-center">
      <Transition
        show={transition.show}
        enter="transform transition duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transform duration-300 transition"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className={`flex flex-wrap md:bg-opacity-25 md:backdrop-filter md:backdrop-blur-lg items-center overflow-hidden md:px-18 px-6 py-6 md:py-0 w-full mx-4 md:w-3/4 md:mx-0 bg-gradient-to-l from-blue-200 to-blue-200/0 rounded-lg shadow-default`}
      >
        <div className="hidden w-full xl:block xl:w-1/2 -z-10">
          <div className="py-17.5 px-26 text-center">
            {/* <p className="2xl:px-20 text-3xl font-bold text-slate-700">
              Sistem Audit Mutu Internal Pura
            </p> */}
            <center className="">
              <img
                src="/img/log-in.svg"
                alt=""
                className="w-full h-full bg-gradient-to-r from-blue-200 to-blue-200/0 -translate-x-8 scale-[2.5]"
              />
            </center>
          </div>
        </div>

        {/* Login Form */}
        <Transition
          show={transition.show && !transition.isSelectRole}
          enter="transform transition duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transform duration-300 transition"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="w-full xl:w-1/2 z-99"
        >
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Login Untuk Akses AMI
            </h2>

            <form onSubmit={(e) => handleSubmit(e)} method="POST">
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={credential.username}
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    name="username"
                    id="username"
                    placeholder="Masukkan Username"
                    className="w-full rounded-lg border bg-white border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-5 top-5">
                    <FiUser className="text-2xl text-slate-400" />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={credential.password}
                    required
                    onChange={handleChange}
                    name="password"
                    id="password"
                    placeholder="Masukkan Password"
                    className="w-full rounded-lg border bg-white border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-5 top-5">
                    <FiKey className="text-2xl text-slate-400" />
                  </span>
                </div>
              </div>

              <div className="flex w-full mb-6 justify-between items-center gap-3 flex-col md:flex-row">
                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    ISO
                  </label>

                  <div className="relative z-20 rounded-md bg-white dark:bg-form-input">
                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                      <FiTool className="text-xl text-slate-400" />
                    </span>

                    <select
                      value={credential.iso_id}
                      required
                      onChange={handleChange}
                      name="iso_id"
                      id="iso_id"
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input 
                      }`}
                    >
                      <option value="">Pilih ISO</option>
                      {isoList?.map((item: any, index: number) => (
                        <option key={index} value={item?.value}>
                          {item?.label}
                        </option>
                      ))}
                    </select>

                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <FiChevronDown className="text-xl text-slate-400" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  disabled={transition.loading}
                  className="w-full cursor-pointer disabled:cursor-wait rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                  {transition.loading ? (
                    <l-zoomies size={200} speed={1} color={'#FFFDD0'} />
                  ) : (
                    <span>Log in</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Transition>

        {/* Available Role */}
        <Transition
          show={transition.show && transition.isSelectRole}
          enter="transform transition delay-[200ms] duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transform duration-300 transition"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="w-full xl:w-1/2 "
        >
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <div className="mb-9">
              <h2 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Halo,{' '}
                {greetingName
                  ? greetingName
                  : hasCredential?.user?.nama_lengkap}
              </h2>
              <h6 className="text-md font-medium text-black dark:text-white">
                Plih akses yang tersedia untuk Anda
              </h6>
            </div>
            <RadioGroup
              value={selectedRole}
              onChange={(e) => setSelectedRole(e)}
              className={'mb-6'}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRole?.map((item: any, index: number) => (
                  <RadioGroup.Option
                    key={index}
                    value={item}
                    className={({ active, checked }) =>
                      `transition-all w-full  ${
                        checked
                          ? 'bg-slate-800/75 text-white'
                          : 'md:bg-white md:border-0 border border-dashed border-slate-400'
                      }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex relative w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium uppercase  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {item}
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 absolute right-0 text-white">
                              <FiUserCheck className="h-5.5 w-5.5" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <div className="mb-5">
              <button
                onClick={() => {
                  setTransition((prev: any) => ({
                    ...prev,
                    loadReadyDashboard: true,
                  }));
                  activeRoleSelected(selectedRole);
                }}
                type="button"
                disabled={selectedRole == '' || transition.loadReadyDashboard}
                className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                <span>
                  {transition.loadReadyDashboard ? (
                    <l-zoomies size={200} speed={1} color={'#FFFDD0'} />
                  ) : (
                    <span>Pilih Akses</span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </Transition>
      </Transition>
    </div>
  );
};

export default SignIn;
