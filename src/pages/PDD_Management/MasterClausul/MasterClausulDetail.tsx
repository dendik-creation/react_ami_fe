import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { api } from '../../../api/master_clausul';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Transition } from '@headlessui/react';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { JudulClausul } from '../../../types/AuditListInterface';

const MasterClausulDetail: React.FC = () => {
  const [clausul, setClausul] = useState<JudulClausul>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  useEffect(() => {
    api
      .clausulDetail(setLoading, id)
      .then((res) => {
        setClausul(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
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
          className="text-slate-700 font-bold flex items-center flex-col md:flex-row justify-between"
        >
          <Breadcrumb
            pageName={`Detail Data Clausul`}
            description={
              'Data Clausul mulai dari judul dan sub didalamnya akan ditampilkan disini'
            }
          />
        </Transition>
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[100ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="rounded-md mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Judul Clausul
            </h3>
          </div>
          <div className="flex flex-col px-6.5 py-4.5">
            <div className="flex justify-start items-center gap-2">
              <span className="w-[120px]">Kode</span>
              <span>: {clausul?.kode}</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="w-[120px]">Judul Clausul</span>
              <span>: {clausul?.judul_clausul}</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="w-[120px]">Standar Iso</span>
              <span>: {clausul?.iso?.kode}</span>
            </div>
          </div>
        </Transition>
        <Transition
          show={!loading && clausul != null}
          enter="transform transition duration-300 delay-[100ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className=""
        >
          {clausul?.clausul?.map((item: any, index: number) => (
            <div
              key={index}
              className="rounded-md mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            >
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Clausul {index + 1}
                </h3>
              </div>
              <div className="flex flex-col px-6.5 py-4.5">
                <div className="flex justify-start items-center gap-2">
                  <span className="w-[120px]">Kode</span>
                  <span>: {item?.kode_clausul}</span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="w-[120px]">Nama Clausul</span>
                  <span>: {item?.nama_clausul}</span>
                </div>
                <div className="rounded-md mb-4 border border-stroke mt-3">
                  <div className="border-b border-stroke py-1.5 px-2.5 dark:border-strokedark">
                    <h6 className="font-regular text-black dark:text-white">
                      Sub Clausul
                    </h6>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-6.5 py-4.5">
                    {item?.sub_clausul?.map(
                      (subItem: any, subIndex: number) => (
                        <div
                          key={subIndex}
                          className="border border-slate-300 border-dashed border-b-2 border-t-0 border-l-0 border-r-0 rounded-md px-2 py-1"
                        >
                          <div className="flex justify-start items-center gap-2">
                            <span className="w-[120px]">Kode</span>
                            <span>: {subItem?.kode_sub_clausul}</span>
                          </div>
                          <div className="flex justify-start items-center gap-2">
                            <span className="w-[120px]">Nama Clausul</span>
                            <span>: {subItem?.nama_sub_clausul}</span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default MasterClausulDetail;
