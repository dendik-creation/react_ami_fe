import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog, Tab, Disclosure } from '@headlessui/react';
import { BsFiletypePdf } from 'react-icons/bs';
interface DeptHistoryI {
  previewPdfModal: boolean;
  setPdfModal: React.Dispatch<React.SetStateAction<boolean>>;
  pdfFile: string;
}

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

const SelectedPdfModal: React.FC<DeptHistoryI> = ({
  previewPdfModal,
  setPdfModal,
  pdfFile,
}) => {
  return (
    <>
      <Transition appear show={previewPdfModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-9999"
          onClose={() => setPdfModal(false)}
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
                <Dialog.Panel className="w-full max-w-7xl max-h-203 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-xl mb-5 font-bold text-gray-900"
                  >
                    {pdfFile.split('/').pop()}
                  </Dialog.Title>

                  <div className="">
                    <iframe
                      className="rounded-lg min-h-150 w-full"
                      src={pdfFile}
                      loading="lazy"
                      frameBorder={0}
                    ></iframe>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SelectedPdfModal;
