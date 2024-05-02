import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import {
  api as apiMasterClausul,
  helper as helperMasterClausul,
} from '../../../api/master_clausul';
import { api as apiMasterIso } from '../../../api/master_iso';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Transition } from '@headlessui/react';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { FiMinusSquare, FiPlusSquare, FiSave } from 'react-icons/fi';
import {
  Clausul,
  JudulClausul,
  SubClausul,
} from '../../../types/AuditListInterface';
import ConfirmSubmit from '../../../components/Modal/ConfirmSubmit';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { credential } from '../../../utils/constant';

const MasterClausulCreate: React.FC = () => {
  const [judul_clausul, setClausul] = useState<JudulClausul | undefined>({
    kode: '',
    judul_clausul: '',
    iso_id: credential?.meta?.iso_id,
    clausul: [
      {
        kode_clausul: '',
        nama_clausul: '',
        sub_clausul: [
          {
            kode_sub_clausul: '',
            nama_sub_clausul: '',
          },
        ],
      },
    ],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }, []);

  const [showModal, setShowModal] = useState<{
    error_modal: boolean;
    confirm_modal: boolean;
  }>({
    error_modal: false,
    confirm_modal: false,
  });

  const handleUpdateKode = (new_kode_judul: string) => {
    return judul_clausul?.clausul.map((clausul: any, index: number) => {
      const newClausul = {
        ...clausul,
        kode_clausul: `${new_kode_judul}.${index + 1}`,
      };
      const newSubClausul = judul_clausul?.clausul[index].sub_clausul.map(
        (sub: any, subIndex: number) => ({
          ...sub,
          kode_sub_clausul: `${new_kode_judul}.${index + 1}.${subIndex + 1}`,
        }),
      );
      return { ...newClausul, sub_clausul: newSubClausul };
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    clausul_index: any | number | null = null,
    sub_clausul_index: any | number | null = null,
  ) => {
    if (e.target) {
      if (e.target.name == 'kode') {
        setClausul((prevState: any) => ({
          ...prevState,
          kode: e.target.value,
          clausul: handleUpdateKode(e.target.value),
        }));
      }
      const { name, value } = e.target;
      setClausul((prev: any) => {
        const newClausul = { ...prev };
        if (clausul_index != null) {
          if (sub_clausul_index != null) {
            newClausul.clausul[clausul_index].sub_clausul[sub_clausul_index][
              name
            ] = value;
          } else {
            newClausul.clausul[clausul_index][name] = value;
          }
        } else {
          newClausul[name] = value;
        }
        return newClausul;
      });
    }
  };

  const handleClausul = {
    async addClausul() {
      setClausul((prevState: any) => ({
        ...prevState,
        clausul: [
          ...prevState?.clausul,
          {
            judul_clausul_id: judul_clausul?.kode,
            kode_clausul: `${prevState?.kode}.${
              prevState?.clausul?.length + 1
            }`,
            nama_clausul: '',
            sub_clausul: [
              {
                judul_clausul_id: judul_clausul?.kode,
                nama_sub_clausul: '',
                status: 'new',
                show: true,
                kode_sub_clausul: `${prevState?.kode}.${
                  prevState?.clausul?.length + 1
                }.1`,
              },
            ],
          },
        ],
      }));
    },
    async removeClausul(clausul_index: any, status: string) {
      setClausul((prev: any) => {
        const newClausul = [...prev.clausul];
        newClausul.splice(clausul_index, 1);
        return { ...prev, clausul: newClausul };
      });
    },
  };

  const handleSubClausul = {
    async addSubClausul(
      parent_clausul_index: number,
      parent_clausul_id: number,
    ) {
      setClausul((prevState: any) => {
        const newSubClausul = {
          judul_clausul_id: judul_clausul?.kode,
          clausul_id: parent_clausul_id,
          kode_sub_clausul: `${judul_clausul?.kode}.${
            parent_clausul_index + 1
          }.${
            prevState?.clausul[parent_clausul_index]?.sub_clausul?.length + 1
          }`,
          nama_sub_clausul: '',
        };

        const newClausul = {
          ...prevState.clausul[parent_clausul_index],
          sub_clausul: [
            ...prevState.clausul[parent_clausul_index].sub_clausul,
            newSubClausul,
          ],
        };

        const newClausulArray = [...prevState.clausul];
        newClausulArray[parent_clausul_index] = newClausul;

        return { ...prevState, clausul: newClausulArray };
      });
    },
    async removeSubClausul(
      parent_clausul_index: number,
      sub_clausul_index: number,
      status: string,
    ) {
      setClausul((prevState: any) => {
        const clausulsArray = [...prevState.clausul];
        const selectedClausul = { ...clausulsArray[parent_clausul_index] };
        const subClausulArray = [...selectedClausul.sub_clausul];
        subClausulArray.splice(sub_clausul_index, 1);
        selectedClausul.sub_clausul = subClausulArray;
        clausulsArray[parent_clausul_index] = selectedClausul;
        return { ...prevState, clausul: clausulsArray };
      });
    },
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowModal({ confirm_modal: true, error_modal: false });
  };

  useEffect(() => {
    console.log(judul_clausul);
  }, [judul_clausul]);

  return (
    <DefaultLayout>
      <ConfirmSubmit
        id={id}
        data={judul_clausul}
        show={showModal.confirm_modal}
        setShowModal={setShowModal}
        target="CLAUSUL"
        method="post"
        message="Apakah anda yakin akan membuat standar clausul baru?"
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
          className="text-slate-700  font-bold flex items-center flex-col md:flex-row justify-between"
        >
          <Breadcrumb
            pageName={`Edit Data Clausul`}
            description={
              'Anda dapat menambah atau mengurangi dari clausul hingga sub didalamnya'
            }
          />
        </Transition>
        <form onSubmit={handleSubmit}>
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
            <div className="border-b flex justify-between border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Judul Clausul
              </h3>
              <span
                onClick={() => handleClausul.addClausul()}
                className="bg-blue-200 flex gap-2 items-center px-2 group py-1 hover:bg-blue-600 hover:text-white transition-all rounded-md p-1 cursor-pointer"
              >
                <FiPlusSquare className="text-2xl text-slate-800 group-hover:text-slate-200" />
                <span>Tambah Clausul</span>
              </span>{' '}
            </div>
            <div className="flex flex-col md:flex-row w-full px-6.5 py-4.5 gap-5">
              <div className="flex flex-col gap-2">
                <span className="">Kode</span>
                <input
                  type="text"
                  name="kode"
                  id="kode"
                  value={judul_clausul?.kode}
                  onChange={handleChange}
                  required
                  placeholder="Judul Kode"
                  className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex md:w-1/2 w-full flex-col gap-2">
                <span className="">Nama Judul Clausul</span>
                <input
                  type="text"
                  name="judul_clausul"
                  id="judul_clausul"
                  value={judul_clausul?.judul_clausul}
                  onChange={handleChange}
                  required
                  placeholder="Nama Judul Clausul"
                  className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </Transition>
          <Transition
            show={!loading && judul_clausul != null}
            enter="transform transition duration-300 delay-[100ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="transition-all"
          >
            <Splide
              options={{
                type: 'slide',
                pagination: true,
                rewind: true,
              }}
            >
              {judul_clausul?.clausul?.map(
                (item: Clausul | any, index: number) => (
                  <SplideSlide key={index}>
                    <Transition
                      show={!loading && judul_clausul?.clausul[index]?.show}
                      enter="transform transition duration-300 delay-[300ms]"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transform duration-300 transition ease-in-out"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      className="rounded-md mb-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                    >
                      <div className="border-b flex justify-between items-center border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Clausul {index + 1} / {judul_clausul?.clausul?.length}
                        </h3>
                        <span
                          onClick={() =>
                            handleClausul.removeClausul(index, item?.status)
                          }
                          className="bg-red-200 flex gap-2 items-center px-2 group py-1 hover:bg-red-600 hover:text-white transition-all rounded-md p-1 cursor-pointer"
                        >
                          <FiMinusSquare className="text-2xl text-slate-800 group-hover:text-slate-200" />
                          <span className="hidden md:block">Hapus Clausul</span>
                        </span>{' '}
                      </div>
                      <div className="flex flex-col px-6.5 py-4.5">
                        <div className="flex md:flex-row flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <span className="">Kode Clausul</span>
                            <input
                              type="text"
                              name="kode_clausul"
                              id="kode_clausul"
                              value={
                                judul_clausul?.clausul[index]?.kode_clausul
                              }
                              onChange={(e) => handleChange(e, index)}
                              required
                              placeholder="Kode Clausul"
                              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />{' '}
                          </div>
                          <div className="flex md:w-1/2 w-full flex-col gap-2">
                            <span className="">Nama Clausul</span>
                            <input
                              type="text"
                              name="nama_clausul"
                              id="nama_clausul"
                              value={
                                judul_clausul?.clausul[index]?.nama_clausul
                              }
                              onChange={(e) => handleChange(e, index)}
                              required
                              placeholder="Nama Clausul"
                              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />{' '}
                          </div>
                        </div>
                        <div className="rounded-md mb-4 border border-stroke mt-3">
                          <div className="border-b flex justify-between border-stroke py-2.5 px-2.5 dark:border-strokedark">
                            <h6 className="font-regular text-black dark:text-white">
                              Sub Clausul
                            </h6>
                            <span
                              onClick={() =>
                                handleSubClausul.addSubClausul(index, item?.id)
                              }
                              className="bg-blue-200 flex gap-2 items-center px-2 group py-1 hover:bg-blue-600 hover:text-white transition-all rounded-md p-1 cursor-pointer"
                            >
                              <FiPlusSquare className="text-lg text-slate-800 group-hover:text-slate-200" />
                              <span>Tambah Sub Clausul</span>
                            </span>{' '}
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-6.5 py-4.5">
                            {item?.sub_clausul?.map(
                              (subItem: SubClausul | any, subIndex: number) => (
                                <Transition
                                  show={
                                    !loading &&
                                    judul_clausul?.clausul[index]?.sub_clausul[
                                      subIndex
                                    ]?.show
                                  }
                                  enter="transform transition duration-300 delay-[100ms]"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transform duration-300 transition ease-in-out"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                  key={subIndex}
                                  className="border-2 text-sm relative border-slate-300 flex justify-start gap-2 xl:flex-row flex-col border-dashed rounded-md px-2 py-2"
                                >
                                  <span
                                    onClick={() =>
                                      handleSubClausul.removeSubClausul(
                                        index,
                                        subIndex,
                                        subItem?.status,
                                      )
                                    }
                                    className="bg-red-200 absolute -top-2 right-2 flex gap-2 items-center px-2 group py-1 hover:bg-red-600 hover:text-white transition-all rounded-md p-1 cursor-pointer"
                                  >
                                    <FiMinusSquare className="text-md text-slate-800 group-hover:text-slate-200" />
                                    <span className="hidden md:block">
                                      Hapus Sub Clausul
                                    </span>
                                  </span>{' '}
                                  <div className="flex justify-start flex-col gap-2 xl:w-1/2 w-full">
                                    <span className="">Kode Sub Clausul</span>
                                    <input
                                      type="text"
                                      name="kode_sub_clausul"
                                      id="kode_sub_clausul"
                                      value={
                                        judul_clausul?.clausul[index]
                                          ?.sub_clausul[subIndex]
                                          ?.kode_sub_clausul
                                      }
                                      onChange={(e) =>
                                        handleChange(e, index, subIndex)
                                      }
                                      required
                                      placeholder="Kode Sub Clausul"
                                      className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />{' '}
                                  </div>
                                  <div className="flex justify-start flex-col w-full gap-2">
                                    <span className="">Nama Sub Clausul</span>
                                    <input
                                      type="text"
                                      name="nama_sub_clausul"
                                      id="nama_sub_clausul"
                                      value={
                                        judul_clausul?.clausul[index]
                                          ?.sub_clausul[subIndex]
                                          ?.nama_sub_clausul
                                      }
                                      onChange={(e) =>
                                        handleChange(e, index, subIndex)
                                      }
                                      required
                                      placeholder="Nama Sub Clausul"
                                      className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />{' '}
                                  </div>
                                </Transition>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </SplideSlide>
                ),
              )}
            </Splide>
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
            className="inline-flex mb-8 mt-16 rounded-md w-full items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <FiSave className="text-3xl" />
            <span className="text-2xl">Simpan</span>
          </Transition>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default MasterClausulCreate;
