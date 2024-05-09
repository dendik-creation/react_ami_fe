import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api as apiMasterUser } from '../../api/master_user';
import { api as apiMasterGrupAuditor } from '../../api/master_grup_auditor';
import { api as apiMasterClausul } from '../../api/master_clausul';
import { api as apiMasterDepartemen } from '../../api/master_departemen';
import { profileApi as apiMyProfile, profileApi } from '../../api/my_profile';
import 'ldrs/zoomies';
import { FiSave } from 'react-icons/fi';

interface ConfirmSubmitRespon {
  id?: number | undefined | any;
  data: any;
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  target: string;
  method: string;
  message: string;
}

const ConfirmSubmit: React.FC<ConfirmSubmitRespon> = ({
  id = null,
  data,
  show,
  setShowModal,
  target,
  method,
  message,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setSubmitting(true);
    switch (target) {
      case 'USER':
        if (method == 'put') {
          apiMasterUser.updateUser(
            id,
            data,
            setSubmitting,
            setShowModal,
            navigate,
          );
        } else if (method == 'post') {
          apiMasterUser.createUser(data, setSubmitting, setShowModal, navigate);
        }
        break;
      case 'GRUP-AUDITOR':
        if (method == 'put') {
          if (data?.updateOrNewAnggota?.auditor_user_id?.length > 0) {
            apiMasterGrupAuditor.updateOrNewAnggotaGrup(
              id,
              data?.updateOrNewAnggota,
            );
          }
          if (data?.removeAnggota?.auditor_user_id?.length > 0) {
            apiMasterGrupAuditor.removeAnggotaGrup(data?.removeAnggota);
          }
          apiMasterGrupAuditor.updateGrupForm(
            id,
            data?.updateGrup,
            setSubmitting,
            setShowModal,
            navigate,
          );
        } else if (method == 'post') {
          apiMasterGrupAuditor.createGrup(
            data,
            setSubmitting,
            setShowModal,
            navigate,
          );
        }
        break;
      case 'CLAUSUL':
        if (method == 'put') {
          if (data?.removed != null) {
            apiMasterClausul?.clausulRemovedSelected(data?.removed);
          }
          apiMasterClausul.clausulUpdate(
            id,
            data?.updatable,
            setSubmitting,
            setShowModal,
            navigate,
          );
        } else if (method == 'post') {
          apiMasterClausul.clausulCreate(
            data,
            setSubmitting,
            setShowModal,
            navigate,
          );
        }
        break;
      case 'DEPT':
        if (method == 'put') {
          if (data?.removedSubDept?.subs_id?.length > 0) {
            apiMasterDepartemen.removeSubDept(data?.removedSubDept);
          }
          apiMasterDepartemen.updateDept(
            id,
            data?.data,
            setSubmitting,
            setShowModal,
            navigate,
          );
        } else if (method == 'post') {
          apiMasterDepartemen.createDept(
            data,
            setSubmitting,
            setShowModal,
            navigate,
          );
        }
        break;
      case 'MY-PROFILE':
        if (method == 'put') {
          profileApi.updateProfile(data, setSubmitting, setShowModal, navigate);
        }
        break;
      case 'CHANGE-PASS':
        if (method == 'put') {
          profileApi.changePassword(data, setSubmitting, setShowModal);
        }
    }
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999"
        onClose={() =>
          setShowModal((prev: any) => ({ ...prev, confirm_modal: false }))
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
              <Dialog.Panel className="w-full flex md:flex-row flex-col max-w-4xl gap-8 items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <FiSave className="text-blue-400 text-6xl" />
                <div className="w-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Konfirmasi Submit
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>

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
                        <span>Ya, Saya Yakin</span>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={submitting}
                      className={`
                justify-center w-1/3 disabled:opacity-25 rounded-md border transition-all border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                      onClick={() =>
                        setShowModal((prev: any) => ({
                          ...prev,
                          confirm_modal: false,
                        }))
                      }
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

export default ConfirmSubmit;
