import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Transition } from '@headlessui/react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { api, helper } from '../../../api/master_grup_auditor';
import { useLocation, useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import { FiSave, FiTrash, FiUserPlus } from 'react-icons/fi';
import ConfirmSubmit from '../../../components/Modal/ConfirmSubmit';
import LoadFetch from '../../../common/Loader/LoadFetch';

interface ListSelect {
  label: string;
  value: number;
  departemen?: string;
  unit?: string;
  status?: string;
}

export interface GrupAuditorFormCreate {
  nama_grup: string;
  ketua: ListSelect;
  auditor_list: ListSelect[] | any;
}

const MasterGrupAuditorCreate: React.FC = () => {
  const [grupAuditor, setGrupAuditor] = useState<GrupAuditorFormCreate | any>({
    nama_grup: '',
    ketua: null,
    auditor_list: [],
  });
  const [auditorListSelect, setAuditorSelect] = useState<
    ListSelect[] | undefined
  >();

  const [showModal, setShowModal] = useState<{
    error_modal: boolean;
    confirm_modal: boolean;
  }>({
    error_modal: false,
    confirm_modal: false,
  });

  const [sendForm, setSend] = useState<any>();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const incParams = params.get('inc');
    setGrupAuditor({
      ...grupAuditor,
      nama_grup: helper.grupNameBuilder(incParams),
    });
  }, [location.search]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    api
      .getAuditorListSelect()
      .then((res) => {
        setAuditorSelect(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLFormElement | HTMLInputElement>) => {
    setGrupAuditor((prev: any) => ({
      ...prev,
      [e.target.name]:
        e.target.name == 'nama_grup'
          ? e.target.value.toUpperCase()
          : e.target.value,
    }));
  };

  const handleSelect = (e: any, type: string, index: number | null = null) => {
    if (type != 'anggota') {
      setGrupAuditor((prev: any) => ({
        ...prev,
        [type]: e,
      }));
      helper.ketuaCheck(e, grupAuditor, setGrupAuditor);
    } else {
      helper.anggotaListCheck(e, grupAuditor, setGrupAuditor, index);
    }
  };

  useEffect(() => {
    console.log(sendForm);
    // console.log(grupAuditor);
  }, [sendForm]);

  const handleAddAnggota = () => {
    const auditor_listed = [...grupAuditor?.auditor_list];
    auditor_listed.push({
      label: '',
      value: '',
      departemen: '',
      unit: '',
    });
    setGrupAuditor((prev: any) => ({
      ...prev,
      auditor_list: auditor_listed,
    }));
  };

  const handleRemoveAnggota = (index: number) => {
    const auditor_listed = [...grupAuditor?.auditor_list];
    auditor_listed.splice(index, 1);
    setGrupAuditor((prev: any) => ({
      ...prev,
      auditor_list: auditor_listed,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    helper
      .readyFormSendCreate(grupAuditor)
      .then((res) => setSend(res))
      .catch((err) => console.log(err));
    setShowModal({ confirm_modal: true, error_modal: false });
  };

  return (
    <DefaultLayout>
      <ConfirmSubmit
        data={sendForm}
        show={showModal.confirm_modal}
        setShowModal={setShowModal}
        target="GRUP-AUDITOR"
        method="post"
        message="Apakah anda yakin untuk membuat grup auditor baru?"
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
            pageName="Grup Auditor Baru"
            description={
              'Anda dapat menambah auditor yang belum memiliki grup auditor'
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
                Informasi Grup Auditor
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Nama Grup
                  </label>
                  <input
                    type="text"
                    name="nama_grup"
                    id="nama_grup"
                    required
                    autoComplete="off"
                    value={grupAuditor?.nama_grup}
                    onChange={handleChange}
                    placeholder="Nama Grup"
                    className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 block text-black dark:text-white">
                    Ketua Grup
                  </label>
                  <ReactSelect
                    required
                    value={grupAuditor?.ketua}
                    options={auditorListSelect}
                    onChange={(e) => handleSelect(e, 'ketua')}
                    placeholder="Pilih Ketua Auditor"
                    noOptionsMessage={() => 'Ketua Auditor Tidak Ada'}
                    className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div>
                  <div className="flex justify-start gap-3 items-center">
                    <label className="font-medium mb-1 block text-black dark:text-white">
                      Anggota Grup
                    </label>
                    <button
                      type="button"
                      onClick={handleAddAnggota}
                      className="flex text-white bg-blue-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-blue-800 transition-all"
                    >
                      <FiUserPlus className="text-xl" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {grupAuditor?.auditor_list?.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-start items-center gap-2"
                        >
                          <ReactSelect
                            required
                            value={item?.value ? item : null}
                            options={auditorListSelect}
                            onChange={(e) => handleSelect(e, 'anggota', index)}
                            placeholder="Pilih Anggota Auditor"
                            noOptionsMessage={() =>
                              'Tidak Ada Auditor Yang Tersisa'
                            }
                            className="md:w-3/4 w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveAnggota(index)}
                            className="flex text-white bg-red-500 px-2.5 py-1.5 rounded-md justify-start items-center gap-3 hover:bg-red-800 transition-all"
                          >
                            <FiTrash className="text-xl" />
                          </button>
                        </div>
                      ),
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

export default MasterGrupAuditorCreate;
