import { apiBaseUrl, token } from '../utils/constant';
import axios from 'axios';
import toastFire from '../hooks/toastFire';

interface Credential {
  username: string;
  password: string;
  iso_id: string;
}

interface Transition {
  show: boolean;
  loading: boolean;
  loadReadyDashboard: boolean;
  isSelectRole: boolean;
}

export const login = async (
  credential: Credential,
  setTransition: React.Dispatch<React.SetStateAction<Transition>>,
) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/auth/login`, credential);
    if (response.status == 200) {
      await localStorage.setItem('credentials', JSON.stringify(response.data));
      await toastFire({
        message: `Pilih Akses Masuk`,
      });
    }
    await setTransition((prev: Transition) => ({
      ...prev,
      show: false,
      isSelectRole: true,
    }));
    return response.data;
  } catch (error: any) {
    toastFire({
      message: error.response.data.message,
      status: false,
    });
  } finally {
    await setTransition((prev: Transition) => ({
      ...prev,
      loading: false,
    }));
  }
};

const setLevelRole = (role: string) => {
  switch (role) {
    case 'auditee':
      return 1;
      break;
    case 'auditor':
      return 2;
      break;
    case 'pdd':
      return 3;
      break;
    case 'management':
      return 4;
      break;
  }
};

export const activeRoleSelected = (selectedRole: string) => {
  const updateActiveRole = JSON.parse(localStorage.getItem('credentials'));
  updateActiveRole.meta.active_role = selectedRole;
  updateActiveRole.meta.level_role = setLevelRole(selectedRole);
  localStorage.setItem('credentials', JSON.stringify(updateActiveRole));
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
};

export const logout = async (
  setLoad: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/auth/logout`,
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
    if (response.status == 200) {
      await setShowModal(false);
      await toastFire({ message: response.data.message });
      await localStorage.removeItem('credentials');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
  } catch (error) {
    toastFire({
      message: 'Gagal Logout',
      status: false,
    });
  } finally {
    setLoad(false);
  }
};
