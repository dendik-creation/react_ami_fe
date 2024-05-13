import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import React, {
  ChangeEvent,
  Fragment,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from 'react';
import { FiClock, FiUnlock } from 'react-icons/fi';
import { api } from '../../api/histori_audit';
import { parseDateHaha } from '../../api/date_parser';
import { BsHourglass, BsHourglassSplit } from 'react-icons/bs';
import toastFire from '../../hooks/toastFire';

interface ConfirmSubmitRespon {
  header_id: number | undefined | any;
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const PerpanjangModal: React.FC<ConfirmSubmitRespon> = ({
  header_id,
  show,
  setShowModal,
  setSuccess,
}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<any>(0);
  const [estimatedDay, setEstimatedDay] = useState<any>({
    days3: '',
    days7: '',
    days14: '',
    days30: '',
    custom: '',
  });

  useEffect(() => {
    handleEstimatedDay();
  }, []);

  useEffect(() => {
    if (!show) {
      setSelectedDay(0);
    }
  }, [show]);

  const handleEstimatedDay = () => {
    const for3days = new Date().setDate(new Date().getDate() + 3);
    const for7days = new Date().setDate(new Date().getDate() + 7);
    const for14days = new Date().setDate(new Date().getDate() + 14);
    const for30days = new Date().setMonth(new Date().getMonth() + 1);

    setEstimatedDay({
      days3: parseDateHaha(new Date(for3days).toLocaleDateString('en-CA')),
      days7: parseDateHaha(new Date(for7days).toLocaleDateString('en-CA')),
      days14: parseDateHaha(new Date(for14days).toLocaleDateString('en-CA')),
      days30: parseDateHaha(new Date(for30days).toLocaleDateString('en-CA')),
    });
  };

  const handleChange = (e: any, from: string) => {
    if (from == 'input') {
      if (
        e.target.value != '' &&
        e.target.value >= 0 &&
        e.target.value <= 365
      ) {
        setSelectedDay(parseInt(e.target.value) ?? 0);
        const customDays = new Date().setDate(
          new Date().getDate() + parseInt(e.target.value) ?? 0,
        );
        setEstimatedDay({
          ...estimatedDay,
          custom: parseDateHaha(
            new Date(customDays).toLocaleDateString('en-CA'),
          ),
        });
      } else {
        toastFire({
          message: 'Min 1 Hari, Max 365 Hari',
          status: false,
        });
      }
    } else if (from == 'radio') {
      const customDays = new Date().setDate(
        new Date().getDate() + parseInt(e) ?? 0,
      );
      setEstimatedDay({
        ...estimatedDay,
        custom: parseDateHaha(new Date(customDays).toLocaleDateString('en-CA')),
      });
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    api
      .continueAudit(header_id, selectedDay, setShowModal, setSubmitting)
      .then(() => {
        setTimeout(() => {
          setSuccess(true);
        }, 300);
      })
      .finally(() => {
        setTimeout(() => {
          setSuccess(true);
        }, 300);
      });
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
                    onChange={(e) => {
                      setSelectedDay(e);
                      handleChange(e, 'radio');
                    }}
                    className={'mb-6 mt-6'}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <RadioGroup.Option
                        value={'3'}
                        className={({ active, checked }) =>
                          `transition-all w-full  ${
                            checked || selectedDay == 3
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
                                    className={`font-medium  ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    <span className="">3 Hari Kedepan </span>
                                    {/* <span>({estimatedDay?.days3})</span> */}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 absolute right-0 text-white">
                                  <FiClock className="h-5.5 w-5.5" />
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
                            checked || selectedDay == 7
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
                                    className={`font-medium  ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    <span className="">7 Hari Kedepan </span>
                                    {/* <span>({estimatedDay?.days7})</span> */}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 absolute right-0 text-white">
                                  <FiClock className="h-5.5 w-5.5" />
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
                            checked || selectedDay == 14
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
                                    className={`font-medium  ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    <span className="">14 Hari Kedepan </span>
                                    {/* <span>({estimatedDay?.days14})</span> */}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 absolute right-0 text-white">
                                  <FiClock className="h-5.5 w-5.5" />
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
                            checked || selectedDay == 30
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
                                    className={`font-medium   ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    <span className="">1 Bulan Kedepan </span>
                                    {/* <span>({estimatedDay?.days30})</span> */}
                                  </RadioGroup.Label>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 absolute right-0 text-white">
                                  <FiClock className="h-5.5 w-5.5" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    </div>
                  </RadioGroup>

                  <div className="relative">
                    <input
                      required
                      autoComplete="off"
                      className="w-full rounded border border-stroke  py-3 px-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      value={selectedDay == 0 ? '' : selectedDay}
                      onChange={(e) => {
                        handleChange(e, 'input');
                      }}
                      name="selectedday"
                      id="selectedday"
                      max={365}
                      min={0}
                      placeholder="Atau tetapkan jumlah hari manual"
                    />
                    {selectedDay != 0 ? (
                      <div className="absolute top-1/4 left-12 text-slate-600">
                        <span className="text-sm"> Hari Kedepan</span>{' '}
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="absolute top-1/3 right-0 md:right-16 text-slate-600">
                      {estimatedDay?.custom != '' &&
                      selectedDay != 0 &&
                      selectedDay != null ? (
                        <div className="group relative transition-all inline-block">
                          <div className="flex cursor-pointer items-center gap-2 justify-start h-full">
                            <BsHourglassSplit className="animate-spin-3 text-md" />
                            <span className="text-sm">
                              {estimatedDay?.custom}
                            </span>
                          </div>{' '}
                          <div className="absolute right-full top-1/2 z-20 mr-3 transition-all -translate-y-1/2 w-[200px] rounded bg-black px-4.5 py-1.5 text-sm font-medium text-white opacity-0 group-hover:opacity-100">
                            <span className="absolute right-[-3px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-black"></span>
                            Estimasi Tanggal Target Audit
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-3">
                    <button
                      type="button"
                      disabled={
                        submitting || selectedDay == 0 || selectedDay == null
                      }
                      className="w-full justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-70 border border-transparent bg-lime-500 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-lime-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2"
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
