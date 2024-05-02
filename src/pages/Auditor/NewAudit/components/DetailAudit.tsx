import { Transition } from '@headlessui/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  FiMinusCircle,
  FiPlusCircle,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import ReactSelect from 'react-select';
import { DetailData, DetailOfAudit } from '../NewAuditInterface';
import { headerAudit, detailAudit } from '../../../../api/new_audit';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const DetailAudit: React.FC<DetailOfAudit> = ({
  loading,
  getData,
  setDetail,
  header,
  detail,
  subDepts,
}) => {
  const [clausulFiltered, setClausul] = useState<any>({
    clausul: [],
    sub_clausul: [],
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const newDetail = [...detail];
    newDetail[index] = {
      ...newDetail[index],
      [name]: value,
    };

    setDetail(newDetail);
  };

  const handleSelect = (e: any, type: string, index: number) => {
    const newDetail = [...detail];
    newDetail[index] = {
      ...newDetail[index],
      [type]: e,
    };
    setDetail(newDetail);
    if (type == 'judul_clausul_id') {
      newDetail[index] = {
        ...newDetail[index],
        [type]: e,
        clausul_id: null,
        sub_clausul_id: null,
      };
      detailAudit.filterClausulEnv(
        'judul_clausul_id',
        getData,
        clausulFiltered,
        setClausul,
        e,
      );
    }
    if (type == 'clausul_id') {
      newDetail[index] = {
        ...newDetail[index],
        [type]: e,
        sub_clausul_id: null,
      };
      detailAudit.filterClausulEnv(
        'clausul_id',
        getData,
        clausulFiltered,
        setClausul,
        e,
      );
    }
  };

  const handleAddDetail = () => {
    setTimeout(() => {
      setDetail([
        ...detail,
        {
          judul_clausul_id: null,
          clausul_id: null,
          sub_clausul_id: null,
          sub_departemen_id: null,
          tanggal_audit: new Date().toLocaleDateString('en-CA'),
          tanggal_realisasi: '',
          tanggal_target: headerAudit.tanggalForTarget(),
          kategori: '',
          jenis_temuan: {
            value: header?.historyCount > 0 ? 'repeat' : 'new',
            label: header?.historyCount > 0 ? 'Repeat' : 'New',
          },
          status: 'open',
          temuan: '',
        },
      ]);
    }, 250);
  };

  const handleRemoveDetail = (index: number) => {
    const values = [...detail];
    values.splice(index, 1);
    setTimeout(() => {
      setDetail(values);
    }, 250);
  };

  return (
    <Splide>
      {detail &&
        detail?.map((item: DetailData, index: number) => (
          <SplideSlide key={index}>
            <Transition
              show={!loading}
              enter="transform transition duration-300 delay-[400ms]"
              enterFrom={'opacity-0'}
              enterTo={'opacity-100'}
              leave="transform duration-300 transition ease-in-out"
              leaveFrom={'opacity-100'}
              leaveTo={'opacity-0'}
              className="rounded-md relative mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            >
              <div className="mx-8">
                <div className="border-b flex justify-between items-center border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium flex justify-start gap-3 items-center text-black dark:text-white">
                    <span> Entri Detail PLPP Internal</span>
                    <span className="rounded-full bg-blue-200 font-bold text-slate-800 px-2.5 py-0.5">
                      {index + 1} / {detail.length}
                    </span>
                  </h3>
                  <div className="flex justify-start items-center gap-3">
                    {index !== 0 ? (
                      <span
                        onClick={() => handleRemoveDetail(index)}
                        className="bg-red-300 hover:bg-red-600 hover:text-white transition-all rounded-full p-1 cursor-pointer"
                      >
                        <FiMinusCircle className="text-2xl" />
                      </span>
                    ) : (
                      ''
                    )}
                    <span
                      onClick={handleAddDetail}
                      className="bg-blue-300 hover:bg-blue-600 hover:text-white transition-all rounded-full p-1 cursor-pointer"
                    >
                      <FiPlusCircle className="text-2xl" />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-dashed border-slate-400">
                    <div>
                      <label className="mb-1 block text-black dark:text-white">
                        Judul Clausul
                      </label>
                      <ReactSelect
                        required
                        options={getData?.judul_clausul}
                        value={detail[index]?.judul_clausul_id}
                        onChange={(e) =>
                          handleSelect(e, 'judul_clausul_id', index)
                        }
                        placeholder="Pilih Judul Clausul"
                        noOptionsMessage={() => 'Judul Clausul Tidak Ada'}
                        className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-black dark:text-white">
                        Clausul
                      </label>
                      <ReactSelect
                        required
                        options={clausulFiltered?.clausul}
                        onChange={(e) => handleSelect(e, 'clausul_id', index)}
                        value={detail[index]?.clausul_id}
                        placeholder="Pilih Clausul"
                        noOptionsMessage={() =>
                          'Judul Clausul Tidak Memiliki Clausul'
                        }
                        className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-black dark:text-white">
                        Sub Clausul
                      </label>
                      <ReactSelect
                        required
                        onChange={(e) =>
                          handleSelect(e, 'sub_clausul_id', index)
                        }
                        options={clausulFiltered?.sub_clausul}
                        value={detail[index]?.sub_clausul_id}
                        placeholder="Pilih Sub Clausul"
                        noOptionsMessage={() => 'Clausul Tidak Memiliki Sub'}
                        className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-black dark:text-white">
                        Sub Departemen {'(Opsional)'}
                      </label>
                      <ReactSelect
                        options={subDepts ? subDepts : null}
                        onChange={(e) =>
                          handleSelect(e, 'sub_departemen_id', index)
                        }
                        value={detail[index]?.sub_departemen_id}
                        placeholder="Pilih Sub Departemen"
                        noOptionsMessage={() => 'Sub Departemen Tidak Ada'}
                        className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col justify-start items-start gap-5">
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Temuan
                      </label>
                      <textarea
                        rows={9}
                        name="temuan"
                        id="temuan"
                        required
                        cols={100}
                        value={detail[index]?.temuan}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Masukan Temuan"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      ></textarea>
                    </div>
                    <div className="grid w-full grid-cols-1 xl:grid-cols-2 gap-4">
                      <div className="w-full">
                        <label className="mb-3 block text-black dark:text-white">
                          Tanggal Audit
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="tanggal_audit"
                            id="tanggal_audit"
                            value={detail[index]?.tanggal_audit}
                            onChange={(e) => handleChange(e, index)}
                            required
                            className=" w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="Masukkan Tanggal"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="mb-1 block text-black dark:text-white">
                          Jenis Temuan
                        </label>
                        <ReactSelect
                          onChange={(e) =>
                            handleSelect(e, 'jenis_temuan', index)
                          }
                          value={detail[index]?.jenis_temuan}
                          required
                          options={[
                            {
                              label: 'New',
                              value: 'new',
                            },
                            {
                              label: 'Repeat',
                              value: 'repeat',
                            },
                          ]}
                          placeholder="Pilih Jenis Temuan"
                          className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full">
                        <label className="mb-3 block text-black dark:text-white">
                          Tanggal Realisasi {'(Opsional)'}
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="tanggal_realisasi"
                            id="tanggal_realisasi"
                            value={detail[index]?.tanggal_realisasi}
                            onChange={(e) => handleChange(e, index)}
                            className=" w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="Masukkan Tanggal"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="mb-1 block text-black dark:text-white">
                          Kategori
                        </label>
                        <ReactSelect
                          required
                          name="kategori"
                          id="kategori"
                          onChange={(e) => handleSelect(e, 'kategori', index)}
                          value={detail[index]?.kategori}
                          options={[
                            {
                              label: 'Mayor',
                              value: 'mayor',
                            },
                            {
                              label: 'Minor',
                              value: 'minor',
                            },
                            {
                              label: 'Observasi',
                              value: 'observasi',
                            },
                          ]}
                          placeholder="Pilih Temuan"
                          className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full">
                        <label className="mb-3 block text-black dark:text-white">
                          Tanggal Target (Otomatis)
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            name="tanggal_target"
                            id="tanggal_target"
                            value={detail[index]?.tanggal_target}
                            onChange={(e) => handleChange(e, index)}
                            className=" w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="Masukkan Tanggal"
                          />
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
  );
};

export default DetailAudit;
