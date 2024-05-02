import React, { ChangeEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Transition } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { api } from '../../../api/respon_audit';
import {
  DetailData,
  HeaderData,
  NewAuditType,
} from '../../Auditor/NewAudit/NewAuditInterface';
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiSend,
} from 'react-icons/fi';
import { parseDateHaha } from '../../../api/date_parser';
import ErrorModal from '../../../components/Modal/ErrorModal';
import ConfirmSubmit from './components/ConfirmSubmit';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import HistoryDeptModal from './components/HistoryDeptModal';
import { BsFillBuildingFill } from 'react-icons/bs';
import toastFire from '../../../hooks/toastFire';

interface FormRespon {
  id: number;
  analisa: string;
  tindakan: string;
}

const ResponAuditDetail: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<NewAuditType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [historyDept, setHistoryDept] = useState<any>();
  const [formRespon, setFormRespon] = useState<FormRespon[]>([]);

  const [showModal, setShowModal] = useState<{
    error_modal: boolean;
    confirm_modal: boolean;
  }>({
    error_modal: false,
    confirm_modal: false,
  });

  const [historyModal, setShowHistory] = useState<{
    toaster: boolean;
    modal: boolean;
  }>({
    toaster: false,
    modal: false,
  });

  useEffect(() => {
    api
      .auditeeRespondDetail(id, setLoading)
      .then((res) => {
        setData(res);
        const getRespon = res?.detail_audit?.map((item: any) => ({
          id: item?.id,
          analisa: item?.analisa ?? '',
          tindakan: item?.tindakan ?? '',
        }));
        setFormRespon(getRespon);
        api
          .historyDeptByPeriode(res?.header_audit?.departemen_id)
          .then((his_res) => {
            setHistoryDept(his_res);
            setShowHistory({ ...historyModal, toaster: true });
          })
          .catch((his_err: any) => {
            setShowHistory({ ...historyModal, toaster: false });
            toastFire({
              message: 'Tidak ada histori departemen',
              status: false,
            });
          });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    detail_id: number | any,
    index: number,
  ) => {
    const updatedForm = [...formRespon];
    updatedForm[index] = {
      ...updatedForm[index],
      [e.target.name]: e.target.value,
      id: detail_id,
    };
    setFormRespon(updatedForm);
  };

  const isAllFilled = () => {
    const isAll = formRespon?.every(
      (item) => item?.analisa != '' && item?.tindakan != '',
    );
    return isAll;
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllFilled()) {
      setShowModal((prev: any) => ({ ...prev, confirm_modal: true }));
    } else {
      setShowModal((prev: any) => ({ ...prev, error_modal: true }));
    }
  };

  return (
    <DefaultLayout>
      <ErrorModal
        show={showModal.error_modal}
        setShowModal={setShowModal}
        message={`Anda belum melengkapi respon secara keseluruhan`}
      />

      <ConfirmSubmit
        id={id}
        data={formRespon}
        show={showModal.confirm_modal}
        setShowModal={setShowModal}
      />

      <HistoryDeptModal
        historyModal={historyModal}
        setShowHistory={setShowHistory}
        historyDept={historyDept}
      />

      {/* Toaster History */}
      <Transition
        show={historyModal.toaster}
        enter="transform transition duration-300 delay-[400ms]"
        enterFrom="opacity-0 translate-y-24"
        enterTo="opacity-100 translate-y-0"
        leave="transform duration-300 transition ease-in-out"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-24"
        className="fixed bottom-8 right-8 z-999"
      >
        <div className="bg-[#333] flex justify-start items-center gap-4 text-white px-4 py-3 text-lg rounded-md">
          <span>History Audit Di Temukan</span>
          <button
            onClick={() => setShowHistory({ ...historyModal, modal: true })}
            className="text-xl bg-[#2c2a2a] px-4 py-2 hover:bg-[#242323] text-white rounded-md"
          >
            <BsFillBuildingFill />
          </button>
        </div>
      </Transition>

      <Transition
        show={loading}
        enter="transform transition duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-300 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="w-full h-full flex justify-center items-center"
      >
        <LoadFetch />
      </Transition>
      <div className="mb-6">
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[100ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="text-slate-700 font-bold"
        >
          <Breadcrumb
            pageName={`Respon Audit ${data?.header_audit?.no_plpp}`}
            description={`Anda dapat merespon audit hingga batas tanggal realisasi atau tanggal target`}
          />
        </Transition>

        {/* Head */}
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[400ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="rounded-md mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-semibold text-lg text-black dark:text-white">
              Pihak Yang Terlibat {'(Header)'}
            </h3>
          </div>

          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="">
              <div className="font-semibold text-xl mb-3">
                Grup Auditor {data?.header_audit?.grup_auditor?.nama_grup}
              </div>
              <div className="flex flex-col">
                <div className="">
                  <div className="mb-3">
                    <div className="font-medium mb-1">Ketua Auditor</div>
                    <div className="flex justify-start items-center">
                      <div className="w-[120px]">Nama</div>
                      <div className="">
                        :{' '}
                        {
                          data?.header_audit?.grup_auditor?.auditor[0]?.user
                            ?.nama_lengkap
                        }
                      </div>
                    </div>
                    <div className="flex justify-start items-center">
                      <div className="w-[120px]">Departemen</div>
                      <div className="">
                        :{' '}
                        {
                          data?.header_audit?.grup_auditor?.auditor[0]?.user
                            ?.departemen?.nama_departemen
                        }
                      </div>
                    </div>
                    <div className="flex justify-start items-center">
                      <div className="w-[120px]">Unit</div>
                      <div className="">
                        :{' '}
                        {
                          data?.header_audit?.grup_auditor?.auditor[0]?.user
                            ?.departemen?.unit?.nama_unit
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="font-medium mb-2">Anggota Auditor</div>
                  <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4">
                    {data?.header_audit?.grup_auditor?.auditor
                      ?.slice(1)
                      .map((item: any, index: number) => (
                        <div
                          key={index}
                          className="w-full border p-2 rounded-md border-slate-400 border-dashed"
                        >
                          <div className="flex justify-start items-center">
                            <div className="w-[150px]">Nama</div>
                            <div className="">: {item?.user?.nama_lengkap}</div>
                          </div>
                          <div className="flex justify-start items-center">
                            <div className="w-[150px]">Departemen</div>
                            <div className="">
                              : {item?.user?.departemen?.nama_departemen}
                            </div>
                          </div>
                          <div className="flex justify-start items-center">
                            <div className="w-[150px]">Unit</div>
                            <div className="">
                              : {item?.user?.departemen?.unit?.nama_unit}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="font-semibold text-xl mb-3">Auditee</div>
              <div className="flex flex-col">
                <div className="">
                  <div className="mb-3">
                    <div className="font-medium mb-1">Identitas Auditee</div>
                    <div className="flex justify-start items-center">
                      <div className="w-[120px]">Nama</div>
                      <div className="">
                        : {data?.header_audit?.auditee?.user?.nama_lengkap}
                      </div>
                    </div>
                    <div className="flex justify-start items-center">
                      <div className="w-[120px]">Departemen</div>
                      <div className="">
                        :{' '}
                        {
                          data?.header_audit?.auditee?.user?.departemen
                            ?.nama_departemen
                        }
                      </div>
                    </div>
                    <div className="flex justify-start items-center">
                      <div className="w-[120px]">Unit</div>
                      <div className="">
                        :{' '}
                        {
                          data?.header_audit?.auditee?.user?.departemen?.unit
                            ?.nama_unit
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        {/* Detail */}
        <form onSubmit={handleSubmit}>
          <Splide
            options={{
              type: 'slide',
              pagination: true,
              rewind: true,
            }}
          >
            {data?.detail_audit?.map((item: DetailData, index: number) => (
              <SplideSlide key={index}>
                <Transition
                  show={!loading}
                  enter="transform transition duration-300 delay-[400ms]"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transform duration-300 transition ease-in-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="rounded-md mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-black dark:text-white">
                      Pedoman Clausul & Hasil Temuan - Detail{' '}
                      {`(${index + 1} / ${data?.detail_audit?.length})`}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="">
                        <div className="font-semibold text-xl mb-3">
                          Pedoman Clausul
                        </div>
                        <div className="flex flex-col">
                          <div className="">
                            <div className="mb-3">
                              <div className="flex justify-start items-center">
                                <div className="w-[120px]">Judul Clausul</div>
                                <div className="">
                                  :{' '}
                                  {
                                    data?.detail_audit[index]?.judul_clausul
                                      ?.kode
                                  }{' '}
                                  {' - '}
                                  {
                                    data?.detail_audit[index]?.judul_clausul
                                      ?.judul_clausul
                                  }
                                </div>
                              </div>
                              <div className="flex justify-start items-center">
                                <div className="w-[120px]">Clausul</div>
                                <div className="">
                                  : {data?.detail_audit[index]?.clausul?.kode}{' '}
                                  {' - '}
                                  {
                                    data?.detail_audit[index]?.clausul
                                      ?.nama_clausul
                                  }
                                </div>
                              </div>
                              <div className="flex justify-start items-center">
                                <div className="w-[120px]">Sub Clausul</div>
                                <div className="">
                                  :{' '}
                                  {data?.detail_audit[index]?.sub_clausul?.kode}{' '}
                                  {' - '}{' '}
                                  {
                                    data?.detail_audit[index]?.sub_clausul
                                      ?.nama_sub_clausul
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="font-semibold text-xl mb-3">
                          Waktu Audit
                        </div>
                        <div className="flex flex-col">
                          <div className="">
                            <div className="mb-3">
                              <div className="flex justify-start items-center">
                                <div className="w-[140px]">Tanggal Audit</div>
                                <div className="">
                                  :{' '}
                                  {data?.detail_audit[index]?.tanggal_audit
                                    ? parseDateHaha(
                                        data?.detail_audit[index]
                                          ?.tanggal_audit,
                                      )
                                    : ''}
                                </div>
                              </div>
                              <div className="flex justify-start items-center">
                                <div className="w-[140px]">Tanggal Target</div>
                                <div className="">
                                  :{' '}
                                  {data?.detail_audit[index]?.tanggal_target
                                    ? parseDateHaha(
                                        data?.detail_audit[index]
                                          ?.tanggal_target,
                                      )
                                    : ''}
                                </div>
                              </div>
                              <div className="flex justify-start items-center">
                                <div className="w-[140px]">
                                  Tanggal Realisasi
                                </div>
                                <div className="">
                                  :{' '}
                                  {data?.detail_audit[index]?.tanggal_realisasi
                                    ? parseDateHaha(
                                        data?.detail_audit[index]
                                          ?.tanggal_realisasi,
                                      )
                                    : '-'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="">
                        <div className="font-semibold text-xl mb-3">
                          Temuan Audit
                        </div>
                        <div className="flex flex-col">
                          <div className="">
                            <div className="mb-3">
                              <div className="flex justify-start items-center">
                                <div className="w-[140px]">Kategori</div>
                                <div className="capitalize">
                                  : {data?.detail_audit[index]?.kategori}
                                </div>
                              </div>
                              <div className="flex justify-start items-center">
                                <div className="w-[140px]">Jenis Temuan</div>
                                <div className="capitalize">
                                  : {data?.detail_audit[index]?.jenis_temuan}
                                </div>
                              </div>
                              <div className="flex justify-start items-center">
                                <div className="w-[140px]">Status</div>
                                <div className="capitalize">
                                  : {data?.detail_audit[index]?.status}
                                </div>
                              </div>
                              <div className="flex justify-start items-center">
                                <div className="w-[140px] max-w-full">
                                  Temuan
                                </div>
                                <div className="">
                                  : {data?.detail_audit[index]?.temuan}{' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="font-semibold text-xl mb-3">
                          Respon Auditee
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="">
                            <div className="mb-3">
                              <div className="flex justify-start flex-col items-start">
                                <div className="">Analisa</div>
                                <textarea
                                  rows={6}
                                  placeholder="Deskripsikan Analisa Anda Terkait Temuan"
                                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                  name="analisa"
                                  id="analisa"
                                  value={formRespon[index]?.analisa ?? ''}
                                  onChange={(e) =>
                                    handleChange(
                                      e,
                                      data?.detail_audit[index]?.id,
                                      index,
                                    )
                                  }
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <div className="mb-3">
                              <div className="flex justify-start flex-col items-start">
                                <div className="">Tindakan</div>
                                <textarea
                                  rows={6}
                                  placeholder="Tindakan Anda Untuk Menangani Temuan"
                                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                  name="tindakan"
                                  id="tindakan"
                                  value={formRespon[index]?.tindakan ?? ''}
                                  onChange={(e) =>
                                    handleChange(
                                      e,
                                      data?.detail_audit[index]?.id,
                                      index,
                                    )
                                  }
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </SplideSlide>
            ))}
          </Splide>

          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="button"
            className="inline-flex my-14 rounded-md w-full items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <FiSend className="text-3xl" />
            <span className="text-2xl">Kirim Respon</span>
          </Transition>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default ResponAuditDetail;
