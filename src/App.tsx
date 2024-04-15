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
                  <PageTitle title="Auditor Dashboard | Pura AMI" />
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
              path="/monitoring/my-audit/detail/:id"
              element={
                <>
                  <PageTitle title="Audit Saya | Pura AMI" />
                  <MyAuditDetail />
                </>
              }
            />
            <Route
              path="/monitoring/my-audit/edit/:id"
              element={
                <>
                  <PageTitle title="Audit Saya | Pura AMI" />
                  <MyAuditEdit />
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar | Pura AMI" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | Pura AMI" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | Pura AMI" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | Pura AMI" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Tables | Pura AMI" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings | Pura AMI" />
                  <Settings />
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                  <PageTitle title="Basic Chart | Pura AMI" />
                  <Chart />
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts | Pura AMI" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons | Pura AMI" />
                  <Buttons />
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup | Pura AMI" />
                  <SignUp />
                </>
              }
            />
          </Route>
        </Routes>
      </Transition>
    </>
  );
}

export default App;
