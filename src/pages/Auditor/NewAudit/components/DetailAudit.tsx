import { Transition } from '@headlessui/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  FiMinusCircle,
  FiPlusCircle,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import ReactSelect from 'react-select';
import { DetailOfAudit } from '../NewAuditInterface';
import { headerAudit, detailAudit } from '../../../../api/new_audit';

const DetailAudit: React.FC<DetailOfAudit> = ({
  loading,
  getData,
  setDetail,
  detail,
  subDepts,
}) => {
  const [activeState, setActive] = useState<number>(0);
  const [changeState, setChangeState] = useState<boolean>(false);
  const [clausulFiltered, setClausul] = useState<any>({
    clausul: [],
    sub_clausul: [],
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const newDetail = [...detail];
    newDetail[activeState] = {
      ...newDetail[activeState],
      [name]: value,
    };

    setDetail(newDetail);
  };

  const handleSelect = (e: any, type: string) => {
    const newDetail = [...detail];
    newDetail[activeState] = {
      ...newDetail[activeState],
      [type]: e,
    };
    setDetail(newDetail);
    if (type == 'judul_clausul_id') {
      newDetail[activeState] = {
        ...newDetail[activeState],
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
      newDetail[activeState] = {
        ...newDetail[activeState],
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
    setChangeState(true);
    setTimeout(() => {
      setActive(activeState + 1);
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
          jenis_temuan: '',
          status: 'open',
          temuan: '',
          periode: 0,
        },
      ]);
      setChangeState(false);
    }, 250);
  };

  const handleRemoveDetail = () => {
    const values = [...detail];
    setChangeState(true);
    values.splice(activeState, 1);
    setTimeout(() => {
      setActive(activeState - 1);
      setChangeState(false);
      setDetail(values);
    }, 250);
  };

  const handleChangeState = (action: string) => {
    setChangeState(true);
    setTimeout(() => {
      if (action == 'prev') {
        setActive(activeState - 1);
      } else {
        setActive(activeState + 1);
      }
      setChangeState(false);
    }, 250);
  };
  return (
    <Transition
      show={!loading && !changeState}
      enter="transform transition duration-300 delay-[400ms]"
      enterFrom={'opacity-0'}
      enterTo={'opacity-100'}
      leave="transform duration-300 transition ease-in-out"
      leaveFrom={'opacity-100'}
      leaveTo={'opacity-0'}
      className="rounded-md relative mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      {/* Prev Btn */}
      <div className="absolute top-1/2 -left-6">
        <button
          type="button"
          onClick={() => handleChangeState('prev')}
          disabled={activeState == 0}
          className="px-2 py-6 rounded-md bg-teal-300 disabled:cursor-not-allowed disabled:opacity-40 text-slate-700"
        >
          <FiChevronLeft className="text-4xl " />
        </button>
      </div>
      <div className="absolute top-1/2 -right-6">
        <button
          type="button"
          onClick={() => handleChangeState('next')}
          disabled={activeState + 1 == detail.length}
          className="px-2 py-6 rounded-md bg-teal-300 disabled:cursor-not-allowed disabled:opacity-40 text-slate-700"
        >
          <FiChevronRight className="text-4xl " />
        </button>
      </div>
      <div className="mx-8">
        <div className="border-b flex justify-between items-center border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium flex justify-start gap-3 items-center text-black dark:text-white">
            <span> Entri Detail PLPP Internal</span>
            <span className="rounded-full bg-blue-200 font-bold text-slate-800 px-2.5 py-0.5">
              {activeState + 1} / {detail.length}
            </span>
          </h3>
          <div className="flex justify-start items-center gap-3">
            {activeState !== 0 ? (
              <span
                onClick={handleRemoveDetail}
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
                value={detail[activeState]?.judul_clausul_id}
                onChange={(e) => handleSelect(e, 'judul_clausul_id')}
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
                onChange={(e) => handleSelect(e, 'clausul_id')}
                value={detail[activeState]?.clausul_id}
                placeholder="Pilih Clausul"
                noOptionsMessage={() => 'Judul Clausul Tidak Memiliki Clausul'}
                className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-black dark:text-white">
                Sub Clausul
              </label>
              <ReactSelect
                required
                onChange={(e) => handleSelect(e, 'sub_clausul_id')}
                options={clausulFiltered?.sub_clausul}
                value={detail[activeState]?.sub_clausul_id}
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
                onChange={(e) => handleSelect(e, 'sub_departemen_id')}
                value={detail[activeState]?.sub_departemen_id}
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
                value={detail[activeState]?.temuan}
                onChange={handleChange}
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
                    value={detail[activeState]?.tanggal_audit}
                    onChange={handleChange}
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
                  onChange={(e) => handleSelect(e, 'jenis_temuan')}
                  value={detail[activeState]?.jenis_temuan}
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
                    value={detail[activeState]?.tanggal_realisasi}
                    onChange={handleChange}
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
                  onChange={(e) => handleSelect(e, 'kategori')}
                  value={detail[activeState]?.kategori}
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
                    value={detail[activeState]?.tanggal_target}
                    onChange={handleChange}
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
  );
};

export default DetailAudit;
