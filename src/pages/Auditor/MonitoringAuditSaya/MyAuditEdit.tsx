import React, { FormEvent, useEffect, useState } from 'react';
import 'ldrs/bouncy';
import { Transition } from '@headlessui/react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import HeaderAudit from '../NewAudit/components/HeaderAudit';
import PihakYangTerlibat from '../NewAudit/components/PihakYangTerlibat';
import DetailAudit from '../NewAudit/components/DetailAudit';
import { FiSave } from 'react-icons/fi';
import { api, headerAudit, parentNewAudit } from '../../../api/new_audit';
import { FaBan } from 'react-icons/fa';
import {
  DetailData,
  GetData,
  HeaderData,
  NewAuditType,
} from '../NewAudit/NewAuditInterface';
import ConfirmSubmit from '../NewAudit/components/ConfirmSubmit';
import { useNavigate, useParams } from 'react-router-dom';
import LoadFetch from '../../../common/Loader/LoadFetch';
import { credential } from '../../../utils/constant';

const MyAuditEdit: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<NewAuditType>({
    header_audit: {
      no_plpp: '',
      grup_auditor_id: null,
      auditee_id: null,
      iso_id: null,
      departemen_id: null,
      temuan_audit: '',
    },
    detail_audit: [],
  });
  const [subDepts, setSubDepts] = useState<[]>([]);
  const [getData, setGetData] = useState<GetData>({
    auditee: [],
    judul_clausul: [],
    clausul: [],
    sub_clausul: [],
  });

  const [pihakTerlibat, setPihakTerlibat] = useState<any>({
    grup_auditor: null,
    auditee: null,
  });

  const [header, setHeader] = useState<HeaderData>({
    no_plpp: '',
    grup_auditor_id: null,
    auditee_id: null,
    iso_id: null,
    departemen_id: null,
    temuan_audit: '',
  });

  const [detail, setDetail] = useState<DetailData[]>([
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
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (credential?.user?.periode_active_role == 'auditor') {
      api
        .newAuditData(setLoading)
        .then((res) => setGetData(res))
        .catch((err) => console.log(err));
      api
        .editAuditData(id)
        .then((res: any) => {
          setHeader(res?.header_audit);
          setDetail(res?.detail_audit);
        })
        .catch((err) => console.log(err));
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    console.log(header);
    console.log(detail);
    // console.log(data);
  }, [header, detail]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    isReady: boolean,
  ) => {
    if (e) {
      await e.preventDefault();
    }
    await setData({
      header_audit: parentNewAudit.collectDataReadySubmit(header, detail)
        .headerEdited,
      detail_audit: parentNewAudit.collectDataReadySubmit(header, detail)
        .detailEdited,
    });
    await setConfirmModal(true);
    if (isReady) {
      api.submitAuditForm(data, navigate);
    }
  };

  return (
    <DefaultLayout>
      {/* Handle Confirm Modal */}
      <ConfirmSubmit
        setConfirmModal={setConfirmModal}
        handleSubmit={handleSubmit}
        confirmModal={confirmModal}
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
      <div className="mb-6">
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[200ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="text-slate-700 mb-6 font-bold"
        >
          <Breadcrumb
            pageName="Input Audit Baru"
            description={
              'Audit baru dengan macam temuannya dibuat dihalaman ini'
            }
          />
        </Transition>
        <Transition
          show={!loading && credential?.user?.periode_active_role == 'auditor'}
          enter="transform transition duration-300 delay-[200ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <form onSubmit={(e) => handleSubmit(e, false)}>
            <HeaderAudit
              getData={getData}
              loading={loading}
              header={header}
              setSubDepts={setSubDepts}
              setHeader={setHeader}
              setPihakTerlibat={setPihakTerlibat}
            />
            {/* <PihakYangTerlibat loading={loading} pihakTerlibat={pihakTerlibat} /> */}

            {header?.temuan_audit == 'ada' ? (
              <DetailAudit
                loading={loading}
                getData={getData}
                header={header}
                detail={detail}
                subDepts={subDepts}
                setDetail={setDetail}
              />
            ) : (
              ''
            )}

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
              <span className="text-2xl">Submit</span>
            </Transition>
          </form>
        </Transition>

        <Transition
          show={!loading && credential?.user?.periode_active_role != 'auditor'}
          enter="transform transition duration-300 delay-[200ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={
            'w-full h-full flex justify-center items-center flex-col gap-5 mt-30'
          }
        >
          <FaBan className="text-[12em] text-red-400" />
          <div className="text-xl text-slate-600 max-w-2xl text-center font-medium">
            Akses auditor Anda diperiode sekarang tidak dapat membuat audit baru
          </div>
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default MyAuditEdit;
