import { Dialog, Transition } from '@headlessui/react';
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from 'react';
import 'ldrs/zoomies';
import { FiSave } from 'react-icons/fi';
import { api } from '../../../../api/master_unit';

interface CreateModal {
  showModalCreate: boolean;
  setShowModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateModal: React.FC<CreateModal> = ({
  showModalCreate,
  setShowModalCreate,
  setSuccessCreate,
}) => {
  const [data, setData] = useState<any>({
    kode: '',
    nama_unit: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    api.unitCreate(data).then((res: any) => {
      setSubmitting(false);
      setShowModalCreate(false);
      setSuccessCreate(true);
      setData({ kode: '', nama_unit: '' });
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Transition appear show={showModalCreate} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999"
        onClose={() => setShowModalCreate(false)}
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
                <FiSave className="text-blue-400 text-6xl" />
                <div className="w-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Tambahkan Unit Baru
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-2">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      <div className="">
                        <p className="text-sm text-gray-500">Kode Unit</p>
                        <input
                          type="text"
                          name="kode"
                          id="kode"
                          required
                          value={data?.kode}
                          onChange={handleChange}
                          placeholder="Masukkan Kode Unit"
                          className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="">
                        <p className="text-sm text-gray-500">Nama Unit</p>
                        <input
                          type="text"
                          name="nama_unit"
                          id="nama_unit"
                          required
                          value={data?.nama_unit}
                          onChange={handleChange}
                          placeholder="Masukkan Nama Unit"
                          className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center items-center gap-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-lime-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2"
                      >
                        {submitting ? (
                          <l-zoomies size={200} speed={1} color={'#FFFDD0'} />
                        ) : (
                          <span>Tambah Unit</span>
                        )}
                      </button>
                      <button
                        type="button"
                        disabled={submitting}
                        className={`
                justify-center w-1/3 disabled:opacity-25 rounded-md border transition-all border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                        onClick={() => setShowModalCreate(false)}
                      >
                        Batalkan
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateModal;
