import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { FiShuffle, FiUserCheck } from 'react-icons/fi';
import { credential } from '../../utils/constant';
import { activeRoleSelected } from '../../api/auth';
import toast from 'react-hot-toast';

interface ConfirmSubmitRespon {
  show: boolean;
  setShowSwapRoleModal: React.Dispatch<React.SetStateAction<any>>;
}

const SwapRoleModal: React.FC<ConfirmSubmitRespon> = ({
  show,
  setShowSwapRoleModal,
}) => {
  const [availableRole, setAvailable] = useState<string[]>(['']);
  const [selectedRole, setSelectedRole] = useState<string>('');
  useEffect(() => {
    const available = credential?.user?.role?.filter((item: string) => {
      return item != credential?.meta?.active_role;
    });
    setAvailable(available);
  }, []);

  const handleSubmit = () => {
    setShowSwapRoleModal(false);
    activeRoleSelected(selectedRole);
    toast.loading('Memindahkan Akses..', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999"
        onClose={() => setShowSwapRoleModal(false)}
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
                <FiShuffle className="text-blue-400 text-6xl" />
                <div className="w-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Pindah Akses Tanpa Logout
                  </Dialog.Title>
                  {availableRole?.length > 0 ? (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Pilih akses yang tersedia untuk Anda
                      </p>
                    </div>
                  ) : (
                    ''
                  )}

                  {availableRole?.length > 0 ? (
                    <RadioGroup
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e)}
                      className={'mb-6 mt-6'}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableRole &&
                          availableRole.map((item: string, index: number) => (
                            <RadioGroup.Option
                              value={item}
                              key={index}
                              className={({ active, checked }) =>
                                `transition-all w-full  ${
                                  checked
                                    ? 'bg-slate-800/75 text-white'
                                    : 'border border-dashed border-slate-400'
                                }
                    relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none ${
                      availableRole?.length == 3 && index == 2
                        ? 'col-span-2'
                        : ''
                    }`
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
                                            checked
                                              ? 'text-white'
                                              : 'text-gray-900'
                                          }`}
                                        >
                                          {item}
                                        </RadioGroup.Label>
                                      </div>
                                    </div>
                                    {checked && (
                                      <div className="shrink-0 absolute right-0 text-white">
                                        <FiUserCheck className="h-5.5 w-5.5" />
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                      </div>
                    </RadioGroup>
                  ) : (
                    <span>
                      Anda hanya memiliki satu akses di sistem AMI yaitu{' '}
                      <span className="uppercase font-bold text-lg">
                        {credential?.user?.role[0]}
                      </span>
                    </span>
                  )}

                  {availableRole?.length > 0 ? (
                    <div className="mt-4 flex justify-center items-center gap-3">
                      <button
                        type="button"
                        disabled={selectedRole == ''}
                        className="w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed rounded-md border border-transparent bg-lime-500 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-lime-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2"
                        onClick={handleSubmit}
                      >
                        <span>Pindah Akses</span>
                      </button>
                      <button
                        type="button"
                        className={`
                justify-center w-1/3 disabled:opacity-25 rounded-md border transition-all border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                        onClick={() => setShowSwapRoleModal(false)}
                      >
                        Batalkan
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 flex justify-center items-center gap-3">
                      <button
                        type="button"
                        className={`
            justify-center w-full disabled:opacity-25 rounded-md border transition-all border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`}
                        onClick={() => setShowSwapRoleModal(false)}
                      >
                        Tutup
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SwapRoleModal;
