import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog, Tab, Disclosure } from '@headlessui/react';
import { FiFileText } from 'react-icons/fi';
import { BsFiletypePdf } from 'react-icons/bs';
import { FaBan } from 'react-icons/fa';
interface DeptHistoryI {
  previewPdfModal: any;
  setPdfModal: React.Dispatch<React.SetStateAction<any>>;
  pdfFiles: any;
}

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

const PdfPreviewModal: React.FC<DeptHistoryI> = ({
  previewPdfModal,
  setPdfModal,
  pdfFiles,
}) => {
  const [selectedPdf, setSelectedPdf] = useState<string>('');
  const [tabNumber, setTab] = useState<number>(0);

  const handleChangePreview = (file: any) => {
    setSelectedPdf('');
    setTimeout(() => {
      setSelectedPdf(file);
    }, 250);
  };

  const onChangeTab = (files: any, tabindex: any) => {
    setSelectedPdf(files[0] ? files[0].file : '');
    setTab(tabindex);
  };
  return (
    <>
      <Transition appear show={previewPdfModal?.modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-9999"
          onClose={() => {
            setPdfModal({ ...previewPdfModal, modal: false });
            setSelectedPdf('');
          }}
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
                    Preview PDF File yang akan Anda kirim
                  </Dialog.Title>

                  {/* Content */}
                  <Tab.Group>
                    <Tab.List className="flex gap-6 cursor-default transition-all rounded-xl bg-slate-400 p-2">
                      {pdfFiles?.map((item: any, index: number) => (
                        <Tab
                          key={index}
                          onFocus={() => onChangeTab(item, index + 1)}
                          className={({ selected }) =>
                            classNames(
                              'w-full rounded-lg py-2.5 cursor-auto text-sm font-semibold leading-5 transition-all',
                              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                              selected
                                ? 'bg-white text-slate-700 shadow transition-all'
                                : 'text-blue-100 hover:bg-white/[0.12] transition-all hover:text-white',
                            )
                          }
                        >
                          Temuan {index + 1}
                        </Tab>
                      ))}
                    </Tab.List>

                    <Tab.Panels className="mt-4 flex flex-col gap-3 relative">
                      {pdfFiles?.map((item: any, index: number) => (
                        <Tab.Panel key={index}>
                          <div className="flex justify-start items-center gap-3">
                            <div
                              className={`grid gap-3 absolute left-0 top-0 ${
                                item?.length > 6
                                  ? 'grid-cols-2 w-26'
                                  : 'grid-cols-1 w-12'
                              } mb-5`}
                            >
                              {item?.map((thefile: any, index2: number) => (
                                <div
                                  key={index2}
                                  className="group relative transition-all inline-block"
                                >
                                  <button
                                    onClick={() =>
                                      handleChangePreview(thefile?.file)
                                    }
                                    className={`flex cursor-pointer whitespace-nowrap border border-dashed w-full px-2.5 py-1.5 rounded-md justify-start items-center gap-2 transition-all ${
                                      item?.length - 1 == index &&
                                      item?.length % 2 == 1
                                        ? 'col-span-2'
                                        : 'col-span-1'
                                    } ${
                                      selectedPdf == thefile?.file
                                        ? 'bg-slate-800 text-white border-white'
                                        : 'text-slate-700 bg-transparent border-slate-700'
                                    }`}
                                  >
                                    <BsFiletypePdf className="text-2xl" />
                                  </button>
                                  <div className="absolute transition-all left-0 top-full z-20 mt-2 w-[250px] rounded bg-black border-white px-4.5 py-1.5 text-sm font-medium text-white scale-0 group-hover:scale-100">
                                    <span className="absolute top-[-2px] left-2 z-10 h-2 w-2 rotate-45 rounded-sm bg-black"></span>
                                    {thefile.filename}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Transition
                              show={selectedPdf != ''}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200 delay-[1000ms]"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                              className={`w-full ${
                                item?.length > 6 ? 'ms-30' : 'ms-18'
                              }`}
                            >
                              <iframe
                                src={selectedPdf}
                                className="w-full min-h-[35rem] rounded-md"
                                frameBorder={0}
                              ></iframe>
                            </Transition>
                            <Transition
                              show={selectedPdf == ''}
                              enter="ease-out duration-300 delay-[1000ms]"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                              className={`w-full`}
                            >
                              <div className="w-full min-h-[35rem] relative bg-blue-100 rounded-md flex justify-center items-center flex-col gap-4">
                                <BsFiletypePdf className="text-8xl text-red-500" />
                                <h3 className="text-2xl text-slate-600">
                                  Temuan {tabNumber} tidak menyertakan file PDF
                                </h3>
                              </div>
                            </Transition>
                          </div>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                    {/* Contents */}
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PdfPreviewModal;
