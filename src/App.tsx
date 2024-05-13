import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import { Toaster } from 'react-hot-toast';
import { AuthRoutes, GuestRoutes } from './middleware/middleware';
import DecisonDashboard from './pages/Dashboard/DecisionDashboard';
import NewAudit from './pages/Auditor/NewAudit/NewAudit';
import NotFound from './pages/NotFound';
import { Transition } from '@headlessui/react';
import DataGrupAuditor from './pages/Auditor/MonitoringDataGrupAuditor/DataGrupAuditor';
import MyAuditList from './pages/Auditor/MonitoringAuditSaya/MyAuditList';
import MyAuditDetail from './pages/Auditor/MonitoringAuditSaya/MyAuditDetail';
import MyAuditEdit from './pages/Auditor/MonitoringAuditSaya/MyAuditEdit';
import ResponAudit from './pages/Auditee/ResponAudit/ResponAudit';
import ResponAuditDetail from './pages/Auditee/ResponAudit/ResponAuditDetail';
import MyHistoriAudit from './pages/Auditee/HistoriAuditSaya/MyHistoriAudit';
import MyHistoriAuditDetail from './pages/Auditee/HistoriAuditSaya/MyHistoriAuditDetail';
import MasterUser from './pages/PDD_Management/MasterUser/MasterUser';
import MasterUserEdit from './pages/PDD_Management/MasterUser/MasterUserEdit';
import MasterUserCreate from './pages/PDD_Management/MasterUser/MasterUserCreate';
import MasterGrupAuditor from './pages/PDD_Management/MasterGrupAuditor/MasterGrupAuditor';
import MasterGrupAuditorEdit from './pages/PDD_Management/MasterGrupAuditor/MasterGrupAuditorEdit';
import MasterGrupAuditorCreate from './pages/PDD_Management/MasterGrupAuditor/MasterGrupAuditorCreate';
import MasterClausul from './pages/PDD_Management/MasterClausul/MasterClausul';
import MasterClausulDetail from './pages/PDD_Management/MasterClausul/MasterClausulDetail';
import MasterClausulEdit from './pages/PDD_Management/MasterClausul/MasterClausulEdit';
import MasterClausulCreate from './pages/PDD_Management/MasterClausul/MasterClausulCreate';
import HistoriAllAudit from './pages/PDD_Management/HistoriSeluruhAudit/HistoriAllAudit';
import PerpanjangAudit from './pages/PDD_Management/PerpanjangAudit/PerpanjangAudit';
import MasterIso from './pages/PDD_Management/MasterIso/MasterIso';
import MasterDepartemen from './pages/PDD_Management/MasterDepartemen/MasterDepartemen';
import MasterDepartemenEdit from './pages/PDD_Management/MasterDepartemen/MasterDepartemenEdit';
import MasterDepartemenCreate from './pages/PDD_Management/MasterDepartemen/MasterDepartemenCreate';
import MasterUnit from './pages/PDD_Management/MasterUnit/MasterUnit';
import MyProfile from './pages/MyProfile/MyProfile';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  return (
    <>
      <Transition
        show={loading}
        enter="transform transition duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-300 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Loader />
      </Transition>
      <Transition
        show={!loading}
        enter="transform transition duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-300 transition ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Toaster position="bottom-right" />
        <Routes location={location} key={pathname}>
          <Route element={<GuestRoutes />}>
            <Route
              path="/login"
              element={
                <>
                  <PageTitle title="Login | Pura AMI" />
                  <SignIn />
                </>
              }
            />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

          <Route element={<AuthRoutes />}>
            <Route
              index
              path="/"
              element={
                <>
                  <PageTitle title="Dashboard | Pura AMI" />
                  <DecisonDashboard />
                </>
              }
            />
            <Route
              path="/new-audit"
              element={
                <>
                  <PageTitle title="Input Audit Baru | Pura AMI" />
                  <NewAudit />
                </>
              }
            />

            <Route
              path="/monitoring/grup-auditor"
              element={
                <>
                  <PageTitle title="Data Grup Auditor | Pura AMI" />
                  <DataGrupAuditor />
                </>
              }
            />

            <Route
              path="/monitoring/my-audits"
              element={
                <>
                  <PageTitle title="Audit Saya | Pura AMI" />
                  <MyAuditList />
                </>
              }
            />
            <Route
              path="/monitoring/audit/detail/:id"
              element={
                <>
                  <PageTitle title="Audit Saya | Pura AMI" />
                  <MyAuditDetail />
                </>
              }
            />
            <Route
              path="/audit/edit/:id"
              element={
                <>
                  <PageTitle title="Audit Saya | Pura AMI" />
                  <MyAuditEdit />
                </>
              }
            />
            <Route
              path="/respon-audit"
              element={
                <>
                  <PageTitle title="Respon Audit | Pura AMI" />
                  <ResponAudit />
                </>
              }
            />
            <Route
              path="/respon-audit/respon/:id"
              element={
                <>
                  <PageTitle title="Respon Audit | Pura AMI" />
                  <ResponAuditDetail />
                </>
              }
            />

            <Route
              path="/monitoring/my-history-audits"
              element={
                <>
                  <PageTitle title="Histori Audit | Pura AMI" />
                  <MyHistoriAudit />
                </>
              }
            />

            <Route
              path="/monitoring/my-history-audits/detail/:id"
              element={
                <>
                  <PageTitle title="Histori Audit | Pura AMI" />
                  <MyHistoriAuditDetail />
                </>
              }
            />

            <Route
              path="/master/user"
              element={
                <>
                  <PageTitle title="Master User | Pura AMI" />
                  <MasterUser />
                </>
              }
            />
            <Route
              path="/master/user/create"
              element={
                <>
                  <PageTitle title="Tambah User | Pura AMI" />
                  <MasterUserCreate />
                </>
              }
            />
            <Route
              path="/master/user/edit/:id"
              element={
                <>
                  <PageTitle title="Edit User | Pura AMI" />
                  <MasterUserEdit />
                </>
              }
            />
            <Route
              path="/master/grup-auditor"
              element={
                <>
                  <PageTitle title="Master Grup Auditor | Pura AMI" />
                  <MasterGrupAuditor />
                </>
              }
            />
            <Route
              path="/master/grup-auditor/create"
              element={
                <>
                  <PageTitle title="Tambah Grup Auditor | Pura AMI" />
                  <MasterGrupAuditorCreate />
                </>
              }
            />
            <Route
              path="/master/grup-auditor/edit/:id"
              element={
                <>
                  <PageTitle title="Edit Grup Auditor | Pura AMI" />
                  <MasterGrupAuditorEdit />
                </>
              }
            />
            <Route
              path="/master/clausul"
              element={
                <>
                  <PageTitle title="Master Data Clausul | Pura AMI" />
                  <MasterClausul />
                </>
              }
            />
            <Route
              path="/master/clausul/create"
              element={
                <>
                  <PageTitle title="Buat Clausul Baru | Pura AMI" />
                  <MasterClausulCreate />
                </>
              }
            />
            <Route
              path="/master/clausul/detail/:id"
              element={
                <>
                  <PageTitle title="Detail Data Clausul | Pura AMI" />
                  <MasterClausulDetail />
                </>
              }
            />
            <Route
              path="/master/clausul/edit/:id"
              element={
                <>
                  <PageTitle title="Edit Data Clausul | Pura AMI" />
                  <MasterClausulEdit />
                </>
              }
            />
            <Route
              path="/master/iso"
              element={
                <>
                  <PageTitle title="Data Iso | Pura AMI" />
                  <MasterIso />
                </>
              }
            />
            <Route
              path="/master/departemen"
              element={
                <>
                  <PageTitle title="Data Departemen | Pura AMI" />
                  <MasterDepartemen />
                </>
              }
            />
            <Route
              path="/master/departemen/create"
              element={
                <>
                  <PageTitle title="Departemen Baru | Pura AMI" />
                  <MasterDepartemenCreate />
                </>
              }
            />
            <Route
              path="/master/departemen/edit/:id"
              element={
                <>
                  <PageTitle title="Edit Data Departemen | Pura AMI" />
                  <MasterDepartemenEdit />
                </>
              }
            />
            <Route
              path="/master/unit"
              element={
                <>
                  <PageTitle title="Data Unit | Pura AMI" />
                  <MasterUnit />
                </>
              }
            />

            <Route
              path="/perpanjang-audit"
              element={
                <>
                  <PageTitle title="Perpanjang Audit | Pura AMI" />
                  <PerpanjangAudit />
                </>
              }
            />
            <Route
              path="/history-all-audit"
              element={
                <>
                  <PageTitle title="Seluruh Histori Audit | Pura AMI" />
                  <HistoriAllAudit />
                </>
              }
            />

            <Route
              path="/my-profile"
              element={
                <>
                  <PageTitle title="Profil Saya | Pura AMI" />
                  <MyProfile />
                </>
              }
            />

            {/* ^ Kanggo */}
          </Route>
        </Routes>
      </Transition>
    </>
  );
}

export default App;
