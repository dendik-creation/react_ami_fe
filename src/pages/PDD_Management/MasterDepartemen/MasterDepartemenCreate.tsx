import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition } from '@headlessui/react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { api as apiDept, helper } from '../../../api/master_departemen';
import { api as apiUnit } from '../../../api/master_unit';
import { useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import { FiPlusCircle, FiSave, FiTrash } from 'react-icons/fi';
import ConfirmSubmit from '../../../components/Modal/ConfirmSubmit';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { Departemen, Unit } from '../../../types/AuditListInterface';

interface ListSelect {
  label: string;
  value: number;
  departemen?: string;
  unit?: string;
  status: string;
}

export interface GrupAuditorForm {
  nama_grup: string;
  ketua: ListSelect;
  auditor_list: ListSelect[] | any;
}

const MasterDepartemenCreate: React.FC = () => {
  const [departemen, setDepartemen] = useState<Departemen>({
    kode: '',
    unit_id: null,
    ekstensi: '',
    unit_select: null,
    nama_departemen: '',
    sub_departemen: [],
  });
  const [unitList, setUnitList] = useState<Unit[] | any>([]);

  const [showModal, setShowModal] = useState<{
    error_modal: boolean;
    confirm_modal: boolean;
  }>({
    error_modal: false,
    confirm_modal: false,
  });

  const [sendForm, setSend] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    apiUnit
      .unitAllSelect(setLoading)
      .then((res) => setUnitList(res))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLFormElement | HTMLInputElement>) => {
    setDepartemen((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(departemen);
  }, [departemen]);

  const handleSubDept = (
    e: ChangeEvent<HTMLFormElement | HTMLInputElement>,
    index: number,
  ) => {
    const subDepts = [...departemen?.sub_departemen];
    subDepts[index][e.target.name] = e.target.value;
    setDepartemen((prev: any) => ({
      ...prev,
      sub_departemen: subDepts,
    }));
  };

  const handleSelect = (e: any, type: string) => {
    if (type == 'unit_select') {
      setDepartemen((prev: any) => ({
        ...prev,
        unit_id: e.value,
        [type]: e,
      }));
    }
  };

  const handleAddSubDept = () => {
    const subDepts = [...departemen?.sub_departemen];
    subDepts.push({
      nama_sub_departemen: '',
    });
    setDepartemen((prev: any) => ({
      ...prev,
      sub_departemen: subDepts,
    }));
  };

  const handleRemoveSubDept = (index: number) => {
    const subDepts = [...departemen?.sub_departemen];
    subDepts.splice(index, 1);
    setDepartemen((prev: any) => ({
      ...prev,
      sub_departemen: subDepts,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal({ confirm_modal: true, error_modal: false });
  };

  return (
    <DefaultLayout>
      <ConfirmSubmit
        data={departemen}
        show={showModal.confirm_modal}
        setShowModal={setShowModal}
        target="DEPT"
        method="post"
        message="Apakah anda yakin untuk membuat departemen baru ?"
      />

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
            pageName="Departemen Baru"
            description={
              'Departemen dapat memiliki sub didalamnya secara opsional'
            }
          />
        </Transition>

        {/* Card */}
        <form onSubmit={handleSubmit}>
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
                Data Departemen
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Kode Departemen
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="kode"
                    id="kode"
                    required
                    value={departemen?.kode}
                    onChange={handleChange}
                    placeholder="Kode"
                    className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Ekstensi Departemen
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="ekstensi"
                    id="ekstensi"
                    required
                    value={departemen?.ekstensi}
                    onChange={handleChange}
                    placeholder="Ekstensi"
                    className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Nama Departemen
                  </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="nama_departemen"
                    id="nama_departemen"
                    required
                    value={departemen?.nama_departemen}
                    onChange={handleChange}
                    placeholder="Nama Departemen"
                    className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </Transition>
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
                Unit Penampung & Sub Departemen
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Unit
                  </label>
                  <ReactSelect
                    required
                    value={departemen?.unit_select ?? null}
                    options={unitList ?? []}
                    onChange={(e) => handleSelect(e, 'unit_select')}
                    placeholder="Pilih Unit"
                    noOptionsMessage={() => 'Unit Tidak Ada'}
                    className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="">
                <div>
                  <div className="flex justify-start gap-3 mb-4 items-center">
                    <label className="font-medium mb-1 block text-black dark:text-white">
                      Sub Departemen
                    </label>
                    <button
                      type="button"
                      onClick={handleAddSubDept}
                      className="flex text-white bg-blue-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-blue-800 transition-all"
                    >
                      <FiPlusCircle className="text-lg" />
                      <span className="text-sm">Tambah Sub Dept</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {departemen?.sub_departemen?.length > 0 ? (
                      departemen?.sub_departemen?.map(
                        (item: any, index: number) => (
                          <div className="flex gap-2" key={index}>
                            <input
                              autoComplete="off"
                              type="text"
                              name="nama_sub_departemen"
                              id="nama_sub_departemen"
                              required
                              value={
                                departemen?.sub_departemen[index]
                                  ?.nama_sub_departemen
                              }
                              onChange={(e) => handleSubDept(e, index)}
                              placeholder="Nama Sub Departemen"
                              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveSubDept(index)}
                              className="flex text-white bg-red-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-red-800 transition-all"
                            >
                              <FiTrash className="text-xl" />
                            </button>
                          </div>
                        ),
                      )
                    ) : (
                      <span>Tidak Memiliki Sub Departremen</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as="button"
            className="inline-flex mb-8 mt-2 rounded-md w-full items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <FiSave className="text-3xl" />
            <span className="text-2xl">Simpan</span>
          </Transition>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default MasterDepartemenCreate;
