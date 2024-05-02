import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition } from '@headlessui/react';
import { api } from '../../../api/my_audits';
import { useParams } from 'react-router-dom';
import { MyDetailAudit } from '../../../types/AuditListInterface';
import { parseDateHaha } from '../../../api/date_parser';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { DetailData } from '../NewAudit/NewAuditInterface';

const MyAuditDetail: React.FC = () => {
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
                  Grup Auditor {audits?.grup_auditor?.nama_grup}
                </div>
                <div className="flex flex-col">
                  <div className="">
                    <div className="mb-3">
                      <div className="font-medium mb-1">Ketua Auditor</div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Nama</div>
                        <div className="">
                          :{' '}
                          {audits?.grup_auditor?.auditor[0]?.user?.nama_lengkap}
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Departemen</div>
                        <div className="">
                          :{' '}
                          {
                            audits?.grup_auditor?.auditor[0]?.user?.departemen
                              ?.nama_departemen
                          }
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Unit</div>
                        <div className="">
                          :{' '}
                          {
                            audits?.grup_auditor?.auditor[0]?.user?.departemen
                              ?.unit?.nama_unit
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="font-medium mb-2">Anggota Auditor</div>
                    <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4">
                      {audits?.grup_auditor?.auditor
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
                          : {audits?.auditee?.user?.nama_lengkap}
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Departemen</div>
                        <div className="">
                          : {audits?.auditee?.user?.departemen?.nama_departemen}
                        </div>
                      </div>
                      <div className="flex justify-start items-center">
                        <div className="w-[120px]">Unit</div>
                        <div className="">
                          : {audits?.auditee?.user?.departemen?.unit?.nama_unit}
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
                  <SplideSlide
                    key={index}
                    className="rounded-md mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                  >
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
                                  <div className="w-[120px]">Judul Clausul</div>
                                  <div className="">
                                    : {item?.judul_clausul?.kode} {' - '}
                                    {item?.judul_clausul?.judul_clausul}
                                  </div>
                                </div>
                                <div className="flex justify-start items-center">
                                  <div className="w-[120px]">Clausul</div>
                                  <div className="">
                                    : {item?.clausul?.kode} {' - '}
                                    {item?.clausul?.nama_clausul}
                                  </div>
                                </div>
                                <div className="flex justify-start items-center">
                                  <div className="w-[120px]">Sub Clausul</div>
                                  <div className="">
                                    : {item?.sub_clausul?.kode} {' - '}{' '}
                                    {item?.sub_clausul?.nama_sub_clausul}
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
                                  <div className="w-[140px]">Kategori</div>
                                  <div className="capitalize">
                                    : {item?.kategori}
                                  </div>
                                </div>
                                <div className="flex justify-start items-center">
                                  <div className="w-[140px]">Jenis Temuan</div>
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
                            Respon Auditee
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

export default MyAuditDetail;
