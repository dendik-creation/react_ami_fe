import React, { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';

interface DeptHistoryI {
  historyModal: any;
  setHistoryModal: React.Dispatch<React.SetStateAction<any>>;
  historyAudit: [] | any;
}

const DeptHistory: React.FC<DeptHistoryI> = ({
  historyModal,
  setHistoryModal,
  historyAudit,
}) => {
  return (
    <>
      <Transition appear show={historyModal?.modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-9999"
          onClose={() => setHistoryModal({ ...historyModal, modal: false })}
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
                    className="text-2xl mb-5 font-bold text-gray-900"
                  >
                    Histori Audit Departemen{' '}
                    {historyAudit[0]?.departemen?.nama_departemen} |{' '}
                    {
                      historyAudit[0]?.auditee?.user?.departemen?.unit
                        ?.nama_unit
                    }
                  </Dialog.Title>

                  {/* Content */}
                  <div className="">
                    {historyAudit?.map((item: any, index: number) => (
                      <div className="space-y-2 my-3" key={index}>
                        <div
                          className="group flex flex-col gap-2 rounded-lg bg-slate-200/70 px-4 py-3"
                          tabIndex={index}
                        >
                          <div className="flex cursor-pointer items-center justify-between">
                            <span className="text-xl font-semibold text-slate-700">
                              {item?.no_plpp}
                            </span>
                            <FiChevronDown className="text-2xl transition-all duration-1000 group-focus:-rotate-180" />
                          </div>
                          <div className="invisible h-auto max-h-0  items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
                            {item?.detail_audit?.length > 0 ? (
                              <ul className="gap-2 flex mt-3 flex-col">
                                {item?.detail_audit?.map(
                                  (detail: any, detailIndex: number) => (
                                    <li
                                      className={`flex rounded-md px-2 py-2 flex-col gap-1 ${
                                        detail?.kategori == 'mayor'
                                          ? 'bg-red-200'
                                          : detail?.kategori == 'minor'
                                          ? 'bg-orange:200'
                                          : 'bg-green-200'
                                      }`}
                                      key={detailIndex}
                                    >
                                      <span className="capitalize">
                                        Kategori : {detail?.kategori}
                                      </span>
                                      <span className="capitalize">
                                        Jenis Temuan : {detail?.jenis_temuan}
                                      </span>
                                      <span className="capitalize">
                                        Temuan :{' '}
                                        {detail?.temuan ? detail?.temuan : '-'}
                                      </span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            ) : (
                              'NO PLPP Ini tidak menemukan temuan masalah apapun'
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default DeptHistory;
