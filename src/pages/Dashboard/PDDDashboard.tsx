import React, { useEffect, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { auditorDashboard } from '../../api/dashboard';
import 'ldrs/bouncy';
import { Transition } from '@headlessui/react';
import AllAudit from '../../components/Charts/AllAudit';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CardDataStats from '../../components/CardDataStats';
import { FiUser } from 'react-icons/fi';
import DepartemenList from '../../components/Tables/DepartemenList';
import MostGrupAuditorAuditChart from '../../components/Charts/MostGrupAuditorAuditChart';
import LoadFetch from '../../common/Loader/LoadFetch';
import { HeaderData } from '../Auditor/NewAudit/NewAuditInterface';
import DeptAuditCount from '../../components/Tables/DeptAuditCount';

interface Audit {
  mayor: number;
  minor: number;
  observasi: number;
  total: number;
}

interface UsersData {
  management: number;
  pdd: number;
  auditor: number;
  auditee: number;
}

interface MostGrupAuditorAuditForChart {
  total_audit: number;
  nama_grup: string;
  ketua_auditor: {
    id: number;
    user_id: number;
    grup_auditor_id: number;
    keanggotaan: string;
    status: string;
  };
}

interface Data {
  all_audits: Audit;
  all_users: UsersData;
  most_grup_auditor_audit: MostGrupAuditorAuditForChart[];
  dept_audited_not_responded: HeaderData[];
  dept_sortby_not_audited: {
    departemen: string;
    unit: string;
    audit_count: number;
  }[];
}

const PDDDashboard: React.FC = () => {
  const [data, setData] = useState<Data>();
  const [filterDept, setFilterDept] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [onFiltering, setFiltering] = useState<boolean>(true);

  const getFilterDeptNow = () => {
    setFilterDept({
      tahun: new Date().getFullYear(),
      periode: new Date().getMonth() + 1 > 6 ? 2 : 1,
    });
  };

  useEffect(() => {
    getFilterDeptNow();
  }, []);

  const requestApiPddDashboard = () => {
    setData((prev: any) => ({
      ...prev,
      dept_sortby_not_audited: [],
    }));
    auditorDashboard(setLoading, filterDept).then((res) => {
      setData(res);
      setFiltering(false);
    });
  };

  useEffect(() => {
    if (filterDept) {
      setFiltering(true);
      requestApiPddDashboard();
    }
  }, [filterDept]);
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
            <AllAudit dataset={data?.all_audits} />
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
            <MostGrupAuditorAuditChart
              dataset={data?.most_grup_auditor_audit}
            />
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
            <CardDataStats
              total={data?.all_users?.auditor}
              text="Total Auditor"
            >
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
              total={data?.all_users?.auditee}
              text="Jumlah Auditee"
            >
              <FiUser className="text-4xl" />
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
            <CardDataStats total={data?.all_users?.pdd} text="Jumlah PDD">
              <FiUser className="text-4xl" />
            </CardDataStats>
          </Transition>
        </div>

        {/* Audit Live */}
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[600ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={'mb-6'}
        >
          <DepartemenList
            deptAuditedNotResponded={data?.dept_audited_not_responded}
          />
        </Transition>

        {/* Departemen List */}
        <Transition
          show={!loading}
          enter="transform transition duration-300 delay-[600ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className={'mb-6'}
        >
          <DeptAuditCount
            dept_sortby_not_audited={data?.dept_sortby_not_audited}
            filterDept={filterDept}
            setFilterDept={setFilterDept}
            onFiltering={onFiltering}
          />
        </Transition>
      </div>
    </DefaultLayout>
  );
};

export default PDDDashboard;
