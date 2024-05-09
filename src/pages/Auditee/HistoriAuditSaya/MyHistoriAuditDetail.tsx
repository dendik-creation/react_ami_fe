import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition } from '@headlessui/react';
import { api } from '../../../api/my_audits';
import { api as apiResponAudit } from '../../../api/respon_audit';
import { useParams } from 'react-router-dom';
import { MyDetailAudit } from '../../../types/AuditListInterface';
import { parseDateHaha } from '../../../api/date_parser';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { DetailData } from '../../Auditor/NewAudit/NewAuditInterface';
import { apiBeBaseUrl } from '../../../utils/constant';
import { FiDownloadCloud, FiFileText } from 'react-icons/fi';
import 'ldrs/ring';

const MyHistoriAuditDetail: React.FC = () => {
  const [audits, setAudits] = useState<MyDetailAudit | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [breadcumbDesc, setDesc] = useState<string>('');
  const { id } = useParams();
  useEffect(() => {
    api
      .myAuditDetailAsAuditor(id, setLoading)
      .then((res) => {
        setAudits(res);
        if (res?.detail_audit?.length > 0) {
          setDesc(
            `NO PLPP Diatas memiliki temuan audit berjumlah ${res?.detail_audit?.length}`,
          );
        } else {
          setDesc(`NO PLPP Diatas tidak memiliki temuan audit`);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const [downloading, setDownloading] = useState<boolean>(false);

  const handleDownloadAttachment = async (url: string) => {
    setDownloading(true);
    apiResponAudit.downloadFile(url, setDownloading);
  };
  return (
    <>
      <DefaultLayout>
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
        <div className="mb-12">
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
              pageName={audits?.no_plpp}
              description={breadcumbDesc ?? '-'}
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
                  Grup Auditor {audits?.static_data?.grup_auditor?.nama_grup}
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
                            audits?.static_data?.grup_auditor?.auditor_list[0]
                              ?.user?.nama_lengkap
                          }
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Departemen</div>
                        <div className="">
                          :{' '}
                          {
                            audits?.static_data?.grup_auditor?.auditor_list[0]
                              ?.user?.departemen?.nama_departemen
                          }
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Unit</div>
                        <div className="">
                          :{' '}
                          {
                            audits?.static_data?.grup_auditor?.auditor_list[0]
                              ?.user?.departemen?.unit?.nama_unit
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="font-medium mb-2">Anggota Auditor</div>
                    <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4">
                      {audits?.static_data?.grup_auditor?.auditor_list
                        ?.slice(1)
                        .map((item: any, index: number) => (
                          <div
                            key={index}
                            className="w-full border p-2 rounded-md border-slate-400 border-dashed"
                          >
                            <div className="flex justify-start items-center">
                              <div className="w-[150px]">Nama</div>
                              <div className="">
                                : {item?.user?.nama_lengkap}
                              </div>
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
                          : {audits?.static_data?.auditee?.user?.nama_lengkap}
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Departemen</div>
                        <div className="">
                          :{' '}
                          {
                            audits?.static_data?.auditee?.user?.departemen
                              ?.nama_departemen
                          }
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Unit</div>
                        <div className="">
                          :{' '}
                          {
                            audits?.static_data?.auditee?.user?.departemen?.unit
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

          <Transition
            show={!loading && audits?.detail_audit?.length > 0}
            enter="transform transition duration-300 delay-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Splide
              options={{
                type: 'slide',
                pagination: true,
                rewind: true,
              }}
            >
              {audits?.detail_audit?.map(
                (item: DetailData | any, index: number) => (
                  <SplideSlide key={index}>
                    <div className="rounded-md mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-black dark:text-white">
                          Pedoman Clausul & Hasil Temuan - Detail{' '}
                          {`(${index + 1} / ${audits?.detail_audit?.length})`}
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
                                    <div className="w-[120px]">
                                      Judul Clausul
                                    </div>
                                    <div className="">
                                      : {item?.static_data?.judul_clausul?.kode}{' '}
                                      {' - '}
                                      {
                                        item?.static_data?.judul_clausul
                                          ?.judul_clausul
                                      }
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[120px]">Clausul</div>
                                    <div className="">
                                      : {item?.static_data?.clausul?.kode}{' '}
                                      {' - '}
                                      {item?.static_data?.clausul?.nama_clausul}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[120px]">Sub Clausul</div>
                                    <div className="">
                                      : {item?.static_data?.sub_clausul?.kode}{' '}
                                      {' - '}{' '}
                                      {
                                        item?.static_data?.sub_clausul
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
                                    <div className="w-[140px]">
                                      Tanggal Audit
                                    </div>
                                    <div className="">
                                      :{' '}
                                      {item?.tanggal_audit
                                        ? parseDateHaha(item?.tanggal_audit)
                                        : '-'}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[140px]">
                                      Tanggal Target
                                    </div>
                                    <div className="">
                                      :{' '}
                                      {item?.tanggal_target
                                        ? parseDateHaha(item?.tanggal_target)
                                        : '-'}{' '}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[140px]">
                                      Tanggal Realisasi
                                    </div>
                                    <div className="">
                                      :{' '}
                                      {item?.tanggal_realisasi
                                        ? parseDateHaha(item?.tanggal_realisasi)
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
                                    <div className="w-[140px]">Sub Dept</div>
                                    <div className="capitalize">
                                      :{' '}
                                      {item?.static_data?.sub_departemen
                                        ?.nama_sub_departemen ?? '-'}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[140px]">Kategori</div>
                                    <div className="capitalize">
                                      : {item?.kategori}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[140px]">
                                      Jenis Temuan
                                    </div>
                                    <div className="capitalize">
                                      : {item?.jenis_temuan}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[140px]">Status</div>
                                    <div className="capitalize">
                                      : {item?.status}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[140px] max-w-full">
                                      Temuan
                                    </div>
                                    <div className="">: {item?.temuan} </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <div className="font-semibold text-xl mb-3">
                              Respon Anda
                            </div>
                            <div className="flex flex-col">
                              <div className="">
                                <div className="mb-3">
                                  <div className="flex justify-start items-center">
                                    <div className="w-[140px]">Analisa</div>
                                    <div className="capitalize">
                                      : {item?.analisa ?? '-'}
                                    </div>
                                  </div>
                                  <div className="flex justify-start items-center">
                                    <div className="w-[140px]">Tindakan</div>
                                    <div className="capitalize">
                                      : {item?.tindakan ?? '-'}
                                    </div>
                                  </div>
                                  <div className="flex mt-4 flex-col justify-start items-start">
                                    <div className="">
                                      Attachment (Data Pendukung) :
                                    </div>
                                    <div className="grid lg:grid-cols-4 w-full md:grid-cols-3 grid-cols-1 gap-3 mt-4">
                                      {item?.attachment?.map(
                                        (item: any, index: number) => (
                                          <button
                                            key={index}
                                            disabled={downloading}
                                            onClick={() =>
                                              handleDownloadAttachment(item)
                                            }
                                            className="overflow-hidden disabled:cursor-wait relative md:h-44 h-40 w-full border-2 border-slate-400 border-dashed cursor-pointer group rounded-md"
                                          >
                                            {item.split('.')[1] == 'jpg' ||
                                            item.split('.')[1] == 'png' ||
                                            item.split('.')[1] == 'jpeg' ? (
                                              <div className="w-full h-full relative object-cover">
                                                <div className="absolute opacity-0 group-hover:opacity-100 z-20 transition-all bg-black/60 top-0 left-0 flex justify-center items-center flex-col w-full h-full gap-2">
                                                  {downloading ? (
                                                    <div className="flex flex-col gap-2 justify-center items-center">
                                                      <l-ring
                                                        size={60}
                                                        stroke={20}
                                                        speed={2}
                                                        color={'#fff'}
                                                      />
                                                    </div>
                                                  ) : (
                                                    <div className="flex flex-col gap-2 justify-center items-center">
                                                      <FiDownloadCloud className="text-5xl text-white" />
                                                      <span className="font-bold text-white">
                                                        Download
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                <img
                                                  loading="lazy"
                                                  className="w-full h-full object-cover group-hover:scale-125 z-0 transition-all"
                                                  src={`${apiBeBaseUrl}/storage/${item}`}
                                                  alt={'UnLoad'}
                                                />
                                                <div className="absolute left-0 bg-slate-800/70  bottom-0 py-1 w-full items-center justify-center text-white">
                                                  <span className="text-[13.5px]">
                                                    {item.split('/').pop()}
                                                  </span>
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="w-full h-full object-cover">
                                                <div className="absolute opacity-0 group-hover:opacity-100 transition-all z-20 bg-black/80 top-0 left-0 flex justify-center items-center flex-col w-full h-full gap-2">
                                                  {downloading ? (
                                                    <div className="flex flex-col gap-2 justify-center items-center">
                                                      <l-ring
                                                        size={60}
                                                        stroke={20}
                                                        speed={2}
                                                        color={'#fff'}
                                                      />
                                                    </div>
                                                  ) : (
                                                    <div className="flex flex-col gap-2 justify-center items-center">
                                                      <FiDownloadCloud className="text-5xl text-white" />
                                                      <span className="font-bold text-white">
                                                        Download
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                                <div className="w-full h-full flex-col gap-2 transition-all z-0 object-cover flex justify-center items-center">
                                                  <FiFileText className="text-6xl transition-all text-slate-500" />
                                                  <span className="text-slate-500 text-4x font-bold uppercase">
                                                    {item.split('.')[1]}
                                                  </span>
                                                  <span className="text-sm absolute  bg-slate-800/70 bottom-0 py-1 left-0 w-full justify-center font-semibold text-white">
                                                    {item.split('/').pop()}
                                                  </span>
                                                </div>
                                              </div>
                                            )}
                                          </button>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SplideSlide>
                ),
              )}
            </Splide>
          </Transition>
        </div>
      </DefaultLayout>
    </>
  );
};

export default MyHistoriAuditDetail;
