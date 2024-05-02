import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { FiCalendar, FiUnlock } from 'react-icons/fi';
import { api } from '../../api/histori_audit';

interface ConfirmSubmitRespon {
  header_id: number | undefined | any;
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
}

const PerpanjangModal: React.FC<ConfirmSubmitRespon> = ({
  header_id,
  show,
  setShowModal,
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const handleSubmit = () => {
    setSubmitting(true);
    api.continueAudit(header_id, selectedDay, setShowModal, setSubmitting);
  };

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
              <Dialog.Panel className="w-full flex md:flex-row flex-col max-w-6xl gap-8 items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <FiUnlock className="text-blue-400 text-6xl" />
                <div className="w-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Konfirmasi Perpanjang Audit
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Pilih durasi perpanjangan proses audit
                    </p>
                  </div>

                  <RadioGroup
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e)}
                    className={'mb-6 mt-6'}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <RadioGroup.Option
                        value={'3'}
                        className={({ active, checked }) =>
                          `transition-all w-full  ${
                            checked
                              ? 'bg-slate-800/75 text-white'
                              : 'border border-dashed border-slate-400'
                          }
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none`
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
                                    3 Hari
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 absolute right-0 text-white">
                                  <FiCalendar className="h-5.5 w-5.5" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option
                        value={'7'}
                        className={({ active, checked }) =>
                          `transition-all w-full  ${
                            checked
                              ? 'bg-slate-800/75 text-white'
                              : 'border border-dashed border-slate-400'
                          }
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none`
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
                                    7 Hari
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 absolute right-0 text-white">
                                  <FiCalendar className="h-5.5 w-5.5" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option
                        value={'14'}
                        className={({ active, checked }) =>
                          `transition-all w-full  ${
                            checked
                              ? 'bg-slate-800/75 text-white'
                              : 'border border-dashed border-slate-400'
                          }
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none`
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
                                    14 Hari
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 absolute right-0 text-white">
                                  <FiCalendar className="h-5.5 w-5.5" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option
                        value={'30'}
                        className={({ active, checked }) =>
                          `transition-all w-full  ${
                            checked
                              ? 'bg-slate-800/75 text-white'
                              : 'border border-dashed border-slate-400'
                          }
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none`
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
                                    30 Hari
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 absolute right-0 text-white">
                                  <FiCalendar className="h-5.5 w-5.5" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 flex justify-center items-center gap-3">
                    <button
                      type="button"
                      disabled={submitting}
                      className="w-full justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-lime-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      {submitting ? (
                        <l-zoomies size={200} speed={1} color={'#FFFDD0'} />
                      ) : (
                        <span>Perpanjang Waktu Audit</span>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      className={`
                justify-center w-1/3 disabled:opacity-25 rounded-md border transition-all border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      onClick={() => setShowModal(false)}
                    >
                      Batalkan
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

export default PerpanjangModal;
