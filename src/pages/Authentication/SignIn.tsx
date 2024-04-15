import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  FiUser,
  FiChevronDown,
  FiKey,
  FiTool,
  FiSettings,
} from 'react-icons/fi';

import 'ldrs/bouncy';
import { login } from '../../api/auth';
import { Transition } from '@headlessui/react';

const SignIn: React.FC = () => {
  interface Credential {
    username: string;
    password: string;
    role: string;
    iso_id: string;
  }

  interface Transition {
    show: boolean;
    loading: boolean;
  }

  const [transition, setTransition] = useState<Transition>({
    show: false,
    loading: false,
  });

  const [credential, setCredential] = useState<Credential>({
    username: '',
    password: '',
    role: '',
    iso_id: '',
  });

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
    setTimeout(() => {
      setTransition({ ...transition, show: true });
    }, 500);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setTransition((prev) => ({ ...prev, loading: true }));
    e.preventDefault();
    login(credential, setTransition);
  };
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden bg-blue-200 flex justify-center items-center">
      <Transition
        show={transition.show}
        enter="transform transition duration-300"
        enterFrom="opacity-0 translate-y-24"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-300 transition"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-24"
        className="flex flex-wrap items-center p-6 w-full mx-4 md:w-fit md:mx-0 bg-white rounded-lg shadow-default"
      >
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <p className="2xl:px-20 text-3xl font-bold text-slate-700">
              Sistem Audit Mutu Internal Pura
            </p>
            <center>
              <img src="/img/login-vector.png" alt="" className="" />
            </center>
          </div>
        </div>

        <div className="w-full xl:w-1/2 ">
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

                  <div className="relative z-20 bg-white dark:bg-form-input">
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
                      <option value="9001:2015">9001:2015</option>
                    </select>

                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <FiChevronDown className="text-xl text-slate-400" />
                    </span>
                  </div>
                </div>
                <div className="w-full">
                  <label className="mb-3 block text-black dark:text-white">
                    Akses Masuk
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                      <FiSettings className="text-xl text-slate-400" />
                    </span>

                    <select
                      value={credential.role}
                      required
                      onChange={handleChange}
                      name="role"
                      id="role"
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input 
                      }`}
                    >
                      <option value="">Pilih Akses</option>
                      <option value="management">Management</option>
                      <option value="pdd">PDD</option>
                      <option value="auditor">Auditor</option>
                      <option value="auditee">Auditee</option>
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
                    <l-bouncy size={25} speed={1.2} color={'white'} />
                  ) : (
                    <span>Log in</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default SignIn;
