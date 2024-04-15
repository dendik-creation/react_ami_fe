import { Transition } from '@headlessui/react';
import React from 'react';

interface Pihak {
  loading: boolean;
  pihakTerlibat?: any;
}

const PihakYangTerlibat: React.FC<Pihak> = ({ loading, pihakTerlibat }) => {
  return (
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
        <h3 className="font-medium text-black dark:text-white">
          Pihak yang terlibat proses audit
        </h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        <div>
          {/* Aduitr */}
          <label className="mb-4 font-bold text-lg  block text-black dark:text-white">
            Grup Auditor {pihakTerlibat?.grup_auditor?.nama_grup}
          </label>
          <div className="flex flex-col mb-6">
            <div className="">
              <div className="mb-3">
                <div className="font-medium mb-1">Ketua Auditor</div>
                <div className="flex justify-start items-center">
                  <div className="w-[120px]">Nama</div>
                  <div className="">
                    :{' '}
                    {
                      pihakTerlibat?.grup_auditor?.auditor_list[0]?.user
                        ?.nama_lengkap
                    }
                  </div>
                </div>
                <div className="flex justify-start items-center">
                  <div className="w-[120px]">Departemen</div>
                  <div className="">
                    :{' '}
                    {
                      pihakTerlibat?.grup_auditor?.auditor_list[0]?.user
                        ?.departemen?.nama_departemen
                    }
                  </div>
                </div>
                <div className="flex justify-start items-center">
                  <div className="w-[120px]">Unit</div>
                  <div className="">
                    :{' '}
                    {
                      pihakTerlibat?.grup_auditor?.auditor_list[0]?.user
                        ?.departemen?.unit?.nama_unit
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="font-medium mb-1">Anggota Auditor</div>
              <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4">
                {pihakTerlibat?.grup_auditor?.auditor_list
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

          {/* Adutie */}
          <div>
            <label className="mb-3 text-lg font-bold block text-black dark:text-white">
              Auditee
            </label>
            <div className="mb-3">
              <div className="flex justify-start items-center">
                <div className="w-[120px]">Nama</div>
                <div className="">
                  : {pihakTerlibat?.auditee?.user?.nama_lengkap}
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div className="w-[120px]">Departemen</div>
                <div className="">
                  : {pihakTerlibat?.auditee?.user?.departemen?.nama_departemen}
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div className="w-[120px]">Unit</div>
                <div className="">
                  : {pihakTerlibat?.auditee?.user?.departemen?.unit?.nama_unit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default PihakYangTerlibat;
