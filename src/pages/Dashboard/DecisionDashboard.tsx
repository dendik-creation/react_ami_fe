import { credential } from '../../utils/constant';
import AuditeeDashboard from './AuditeeDashboard';
import AuditorDashboard from './AuditorDashboard';
import PDDDashboard from './PDDDashboard';

const DecisonDashboard = () => {
  switch (credential.meta?.active_role) {
    case 'auditor':
      return <AuditorDashboard />;
      break;
    case 'auditee':
      return <AuditeeDashboard />;
      break;
    case 'pdd':
      return <PDDDashboard />;
      break;
    case 'management':
      return <PDDDashboard />;
      break;
  }
};

export default DecisonDashboard;
