import { Transition } from '@headlessui/react';
import React, { useEffect, ChangeEvent, useState } from 'react';
import ReactSelect from 'react-select';
import { api, headerAudit } from '../../../../api/new_audit';
import { HeaderOfAudit } from '../NewAuditInterface';
import 'ldrs/zoomies';
import toastFire from '../../../../hooks/toastFire';
import { FiExternalLink } from 'react-icons/fi';
import DeptHistory from './DeptHistory';
import { credential } from '../../../../utils/constant';

const HeaderAudit: React.FC<HeaderOfAudit> = ({
  getData,
  loading,
  header,
  setHeader,
  setSubDepts,
  setPihakTerlibat,
}) => {
  const [historyAudit, setHistoryAudit] = useState<[]>([]);
  const [historyModal, setHistoryModal] = useState<any>({
    toaster: false,
    modal: false,
  });

  useEffect(() => {
    setHeader({ ...header, iso_id: credential?.meta?.iso_id });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeader((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = async (e: any, type: string) => {
    setHeader({ ...header, [type]: e.value });
    if (type == 'auditee_id') {
      await setSubDepts([]);
      await api
        .subDeptsByDeptId(e.departemen_id)
        .then((res) => setSubDepts(res))
        .catch((err) => console.log(err));

      setHeader({
        ...header,
        departemen_id: e?.departemen_id,
        auditee_id: e?.value,
        no_plpp: 'Membuat PLPP',
      });

      await api
        .keterlibatanPihak(e?.value)
        .then((res) => {
          setPihakTerlibat({
            grup_auditor: res?.grup_auditor,
            auditee: res?.auditee,
          });
          setHeader({
            ...header,
            departemen_id: res?.auditee?.user?.departemen_id,
            auditee_id: e?.value,
            grup_auditor_id: res?.grup_auditor?.id,
            no_plpp: 'Membuat PLPP',
          });
        })
        .catch((err) => console.log(err));

      // History Audit & Generate PLPP
      await api
        .auditHistoryDept(e?.departemen_id)
        .then((res: any) => {
          setHeader((prev) => ({
            ...prev,
            historyCount: res?.length,
            no_plpp: headerAudit.generatePlpp(e, res?.length),
          }));
          setHistoryAudit(res);
          setHistoryModal({ ...historyModal, toaster: true });
        })
        .catch((err: any) => {
          setHeader((prev) => ({
            ...prev,
            historyCount: 0,
            no_plpp: headerAudit.generatePlpp(e, 0),
          }));
          setHistoryAudit([]);
          toastFire({
            message: 'Departemen Auditee Belum Pernah Di Audit',
            status: false,
          });
          setHistoryModal({ ...historyModal, toaster: false });
        });
    }
  };

  return (
    <>
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
              onClick={() => setHistoryModal({ ...historyModal, modal: true })}
              className="text-xl bg-[#2c2a2a] px-4 py-2 hover:bg-[#242323] text-white rounded-md"
            >
              <FiExternalLink />
            </button>
          </div>
        </Transition>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Entri Header PLPP Internal
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-black dark:text-white">
                Temuan Audit
              </label>
              <ReactSelect
                required
                options={[
                  {
                    label: 'Ada',
                    value: 'ada',
                  },
                  {
                    label: 'Tidak',
                    value: 'tidak',
                  },
                ]}
                name="temuan_audit"
                id="temuan_audit"
                // value={header?.temuan_audit}
                onChange={(e) => handleSelect(e, 'temuan_audit')}
                placeholder="Pilih Temuan"
                className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-black dark:text-white">
                Auditee
              </label>
              <ReactSelect
                required
                name="auditee_id"
                id="auditee_id"
                // value={header?.auditee_id}
                options={getData?.auditee}
                onChange={(e) => handleSelect(e, 'auditee_id')}
                noOptionsMessage={() => 'Auditee Tidak Ditemukan'}
                placeholder="Cari Auditee"
                className="w-full -mx-2.5 rounded-md border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="relative">
              <label className="mb-3 block text-black dark:text-white">
                No PLPP {'(Otomatis)'}
              </label>
              <input
                type="text"
                name="no_plpp"
                id="no_plpp"
                required
                disabled={header?.no_plpp == 'Membuat PLPP'}
                value={header?.no_plpp}
                onChange={handleChange}
                placeholder="Pilih Auditee Untuk PLPP Otomatis"
                className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:text-opacity-0 disabled:bg-slate-100 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {header?.no_plpp == 'Membuat PLPP' ? (
                <div className="absolute top-11 left-5">
                  <l-zoomies size={100} speed={1} color={'#1c1c1c'} />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Transition>

      {/* Dept Modal */}
      <DeptHistory
        historyModal={historyModal}
        setHistoryModal={setHistoryModal}
        historyAudit={historyAudit}
      />
    </>
  );
};

export default HeaderAudit;
