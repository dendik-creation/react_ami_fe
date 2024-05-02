import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { api as apiAudit } from '../../api/my_audits';
import { api as apiUser } from '../../api/master_user';
import { api as apiGrupAuditor } from '../../api/master_grup_auditor';
import { api as apiClausul } from '../../api/master_clausul';
import { api as apiIso } from '../../api/master_iso';
import { api as apiDepartemen } from '../../api/master_departemen';
import { api as apiUnit } from '../../api/master_unit';
import 'ldrs/zoomies';
import { FiTrash } from 'react-icons/fi';

interface ConfrimDeleteModals {
  id: number | undefined | any;
  modalConfirmDelete: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  target: string;
  message: string;
  setSuccessDel: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmDelete: React.FC<ConfrimDeleteModals> = ({
  id,
  modalConfirmDelete,
  setShowModal,
  target,
  message,
  setSuccessDel,
}) => {
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    if (target == 'DEL-AUDIT') {
      await apiAudit.removeAudit(id, setDeleting, setShowModal).then(() => {
        setSuccessDel(true);
      });
    } else if (target == 'DEL-USER') {
      await apiUser.deleteUser(id, setDeleting, setShowModal).then(() => {
        setSuccessDel(true);
      });
    } else if (target == 'DEL-GRUP-AUDITOR') {
      await apiGrupAuditor
        .deleteGrup(id, setDeleting, setShowModal)
        .then(() => {
          setSuccessDel(true);
        });
    } else if (target == 'DEL-CLAUSUL') {
      await apiClausul
        .removeJudulClausul(id, setDeleting, setShowModal)
        .then(() => setSuccessDel(true));
    } else if (target == 'DEL-ISO') {
      await apiIso
        .deleteIso(id, setDeleting, setShowModal)
        .then(() => setSuccessDel(true));
    } else if (target == 'DEL-DEPT') {
      apiDepartemen
        .deleteDept(id, setDeleting, setShowModal)
        .then(() => setSuccessDel(true));
    } else if (target == 'DEL-UNIT') {
      apiUnit
        .unitDelete(id, setDeleting, setShowModal)
        .then(() => setSuccessDel(true));
    }
  };

  return (
    <Transition appear show={modalConfirmDelete} as={Fragment}>
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
              <Dialog.Panel className="w-full flex max-w-4xl md:flex-row flex-col gap-8 items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <FiTrash className="text-red-400 text-6xl" />
                <div className="w-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Hapus Sebuah Data
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-3">
                    <button
                      type="button"
                      disabled={deleting}
                      className="w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleDelete();
                        setDeleting(true);
                      }}
                    >
                      {deleting ? (
                        <l-zoomies size={200} speed={1} color={'#FFFDD0'} />
                      ) : (
                        <span>Ya, Hapus</span>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={deleting}
                      className={`
                justify-center w-1/3 disabled:opacity-25 rounded-md border transition-all border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      onClick={() => setShowModal(false)}
                    >
                      Tidak, Batalkan Saja
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

export default ConfirmDelete;
