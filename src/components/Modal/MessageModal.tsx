import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface ConfirmSubmitRespon {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  targetUrl: string;
  title: string;
  message: string;
  yesTextBtn: string;
  noTextBtn: string;
}

const MessageModal: React.FC<ConfirmSubmitRespon> = ({
  show,
  setShowModal,
  targetUrl,
  title,
  message,
  yesTextBtn,
  noTextBtn,
}) => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999"
        onClose={() => setShowModal(false)}
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
                <FiBell className="text-slate-400 text-6xl" />
                <div className="w-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(targetUrl)}
                      className="w-full justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-lime-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2"
                    >
                      <span>{yesTextBtn}</span>
                    </button>
                    <button
                      type="button"
                      className={`
                justify-center w-1/3 disabled:opacity-25 rounded-md border transition-all border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      onClick={() => setShowModal(false)}
                    >
                      {noTextBtn}
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

export default MessageModal;
