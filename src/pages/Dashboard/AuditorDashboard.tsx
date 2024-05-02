import React, { useEffect, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { auditorDashboard } from '../../api/dashboard';
import 'ldrs/bouncy';
import { Transition } from '@headlessui/react';
import MyAudit from '../../components/Charts/MyAudit';
import AllAudit from '../../components/Charts/AllAudit';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CardDataStats from '../../components/CardDataStats';
import { FiBarChart2, FiUser } from 'react-icons/fi';
import DepartemenList from '../../components/Tables/DepartemenList';
import LoadFetch from '../../common/Loader/LoadFetch';

interface Audit {
  mayor: number;
  minor: number;
  observasi: number;
  total: number;
}

interface Departemen {
  departemen: string;
  unit: string;
  audit_count: number;
}

interface Data {
  all_audit: Audit | any;
  my_audit: Audit | any;
  total_auditor: number;
  departemen_list: Departemen[];
}

const AuditorDashboard: React.FC = () => {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      auditorDashboard(setLoading).then((res) => setData(res));
    }, 250);
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

        {/* Chart List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[100ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MyAudit dataset={data?.my_audit} />
          </Transition>
          <Transition
            show={!loading}
            enter="transform transition duration-300 delay-[200ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-300 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <AllAudit dataset={data?.all_audit} />
          </Transition>
        </div>

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
            <CardDataStats total={data?.total_auditor} text="Total Auditor">
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
            <CardDataStats
              total={data?.my_audit?.total}
              text="Jumlah Temuan Saya Dalam Audit"
            >
              <FiBarChart2 className="text-4xl" />
            </CardDataStats>
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
              total={data?.all_audit?.total}
              text="Akumulasi Keseluruhan Temuan Dalam Audit"
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
          <DepartemenList deptAuditedNotResponded={data?.departemen_list} />
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default AuditorDashboard;
