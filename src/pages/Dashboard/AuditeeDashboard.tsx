import React, { useEffect, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { auditeeDashboard } from '../../api/dashboard';
import { Transition } from '@headlessui/react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CardDataStats from '../../components/CardDataStats';
import { FiBarChart2, FiClipboard, FiUser } from 'react-icons/fi';
import MostGrubAuditMe from '../../components/Tables/MostGrubAuditMe';
import LoadFetch from '../../common/Loader/LoadFetch';
import MessageModal from '../../components/Modal/MessageModal';

interface Data {
  auditor_count: number;
  audit_notyet_respon: {
    total_header_audit: number;
    total_detail_audit: number[];
  };
  my_audit_count: number;
  most_grup_auditor_audit_me: {
    total_audit: number;
    nama_grup: string;
    ketua_auditor?: {
      id: number;
      user_id: number;
      grup_auditor_id: number;
      keanggotaan: string;
      status: string;
    };
  }[];
}

const AuditeeDashboard: React.FC = () => {
  const [data, setData] = useState<Data>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      auditeeDashboard(setLoading).then((res) => setData(res));
    }, 250);
  }, []);

  useEffect(() => {
    if (data && data?.audit_notyet_respon?.total_header_audit > 0) {
      setTimeout(() => {
        setShowModal(true);
      }, 1200);
    }
  }, [data]);

  return (
    <DefaultLayout>
      <MessageModal
        show={showModal}
        setShowModal={setShowModal}
        targetUrl="/respon-audit"
        title="Ada Audit yang belum diselesaikan"
        message="Anda dapat menyelesaikan audit sekarang atau nanti"
        yesTextBtn="Selesaikan Sekarang"
        noTextBtn="Tidak, Nanti Saja"
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
          enter="transform transition duration-300 delay-[100ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="text-slate-700 font-bold"
        >
          <Breadcrumb
            pageName="Dashboard"
            description={'Tampilan data dan statistik singkat mengenai audit'}
          />
        </Transition>

        {/* Card List */}
        <div className="grid grid-cols-1 mb-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[300ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <CardDataStats total={data?.auditor_count} text="Total Auditor">
              <FiUser className="text-4xl" />
            </CardDataStats>
          </Transition>
          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {data?.audit_notyet_respon?.total_header_audit > 0 ? (
              <CardDataStats
                total={data?.audit_notyet_respon?.total_header_audit}
                text={`Audit dengan ${data?.audit_notyet_respon?.total_detail_audit.reduce(
                  (add, val) => add + val,
                  0,
                )} total temuan yang belum terselesaikan`}
              >
                <FiClipboard className="text-4xl" />
              </CardDataStats>
            ) : (
              <CardDataStats
                total={0}
                text={`Audit tersisa. Seluruh proses audit terselesaikan`}
              >
                <FiClipboard className="text-4xl" />
              </CardDataStats>
            )}
          </Transition>
          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[500ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <CardDataStats
              total={data?.my_audit_count}
              text="Jumlah Saya Diaudit"
            >
              <FiBarChart2 className="text-4xl" />
            </CardDataStats>
          </Transition>
        </div>

        {/* Departemen List */}
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[600ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <MostGrubAuditMe grupAuditorList={data?.most_grup_auditor_audit_me} />
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default AuditeeDashboard;
