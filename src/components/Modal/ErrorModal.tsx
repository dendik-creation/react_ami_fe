import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { FiXOctagon } from 'react-icons/fi';

interface ErrorModals {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  message: string;
}

const ErrorModal: React.FC<ErrorModals> = ({ show, setShowModal, message }) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999"
        onClose={() =>
          setShowModal((prev: any) => ({
            ...prev,
            error_modal: false,
          }))
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex md:flex-row flex-col max-w-3xl gap-8 items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <FiXOctagon className="text-red-400 text-6xl" />
                <div className="w-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Aksi Ditolak
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-500">{message}</p>
                  </div>

                  <div className="mt-4 flex flex-col justify-center items-center gap-3">
                    <button
                      type="button"
                      className="w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setShowModal((prev: any) => ({
                          ...prev,
                          error_modal: false,
                        }));
                      }}
                    >
                      <span>Tutup</span>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ErrorModal;
