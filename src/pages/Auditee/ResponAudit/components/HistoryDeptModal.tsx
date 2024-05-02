import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog, Tab, Disclosure } from '@headlessui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
interface DeptHistoryI {
  historyModal: any;
  setShowHistory: React.Dispatch<React.SetStateAction<any>>;
  historyDept: any;
}

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

const HistoryDeptModal: React.FC<DeptHistoryI> = ({
  historyModal,
  setShowHistory,
  historyDept,
}) => {
  const [selectedTabs, setTabs] = useState<number | any>(1);

  return (
    <>
      <Transition appear show={historyModal?.modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-9999"
          onClose={() => setShowHistory({ ...historyModal, modal: false })}
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
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-xl mb-5 font-bold text-gray-900"
                  >
                    Histori Audit Departemen Auditee 1 Tahun Terakhir
                  </Dialog.Title>

                  {/* Content */}
                  <Tab.Group>
                    <Tab.List className="flex gap-6 transition-all rounded-xl bg-slate-500 p-2">
                      <Tab
                        onFocus={() => setTabs(0)}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-sm transition-all font-medium leading-5',
                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                              ? 'bg-white text-slate-700 shadow transition-all'
                              : 'text-blue-100 hover:bg-white/[0.12] transition-all hover:text-white',
                          )
                        }
                      >
                        Periode 1
                      </Tab>
                      <Tab
                        onFocus={() => setTabs(1)}
                        className={({ selected }) =>
                          classNames(
                            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all',
                            'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                            selected
                              ? 'bg-white text-slate-700 shadow transition-all'
                              : 'text-blue-100 hover:bg-white/[0.12] transition-all hover:text-white',
                          )
                        }
                      >
                        Periode 2
                      </Tab>
                    </Tab.List>

                    {/* Contents */}
                    <Tab.Panels className="mt-4">
                      {historyDept &&
                      selectedTabs != null &&
                      historyDept[selectedTabs].length > 0 ? (
                        historyDept[selectedTabs]?.map(
                          (item: any, index: number) => (
                            <Disclosure key={index}>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left font-medium text-purple-900 transition-all text-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                    <span>
                                      {item?.no_plpp} || Terdapat{' '}
                                      {item?.detail_audit?.length} Temuan
                                    </span>
                                    <FiChevronDown
                                      className={`transition-all ${
                                        open ? 'rotate-180  transform' : ''
                                      } h-7 w-7 text-purple-500`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel
                                    className={`px-4 pb-2 pt-4 text-gray-500 transition-all gap-4 grid grid-cols-1 md:grid-cols-2`}
                                  >
                                    {item?.detail_audit?.map(
                                      (detail_item: any, detail_index: any) => (
                                        <div
                                          key={detail_index}
                                          className="flex h-full justify-start border-2 rounded-md border-dashed border-slate-300 items-start gap-3"
                                        >
                                          <div
                                            className={`text-3xl font-semibold h-20 grid place-content-center w-20 text-center rounded-md ${
                                              detail_item?.kategori == 'mayor'
                                                ? 'bg-red-400 text-white'
                                                : detail_item?.kategori ==
                                                  'minor'
                                                ? 'bg-yellow-400 text-white'
                                                : detail_item?.kategori ==
                                                  'observasi'
                                                ? 'bg-blue-400 text-white'
                                                : ''
                                            }`}
                                          >
                                            <div className="h-full">
                                              {detail_index + 1}
                                            </div>
                                          </div>
                                          <ul className="flex p-3 items-start flex-col justify-start">
                                            <li className="flex justify-start">
                                              <span className="w-[150px]">
                                                Kategori
                                              </span>
                                              <span className="capitalize">
                                                : {detail_item?.kategori}
                                              </span>
                                            </li>
                                            <li className="flex justify-start">
                                              <span className="w-[150px]">
                                                Jenis Temuan
                                              </span>
                                              <span className="capitalize">
                                                : {detail_item?.jenis_temuan}
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                      ),
                                    )}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ),
                        )
                      ) : (
                        <div className="text-center w-full">
                          Departemen Belum Pernah Di Audit Pada Periode{' '}
                          {selectedTabs + 1}
                        </div>
                      )}
                    </Tab.Panels>
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

export default HistoryDeptModal;
