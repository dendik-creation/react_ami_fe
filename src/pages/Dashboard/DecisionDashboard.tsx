import { credential } from '../../utils/constant';
import AuditorDashboard from './AuditorDashboard';

const DecisonDashboard = () => {
  switch (credential.meta?.active_role) {
    case 'auditor':
      return <AuditorDashboard />;
  }
};

export default DecisonDashboard;
