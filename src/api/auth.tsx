import { apiBaseUrl, token } from '../utils/constant';
import axios from 'axios';
import toastFire from '../hooks/toastFire';

interface Credential {
  username: string;
  password: string;
  role: string;
  iso_id: string;
}

interface Transition {
  show: boolean;
  loading: boolean;
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
        message: `Login Sebagai ${response.data.meta.active_role.toUpperCase()}`,
      });
      await setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  } catch (error: any) {
    toastFire({
      message: error.response.data.message,
      status: false,
    });
  } finally {
    await setTransition((prev: Transition) => ({ ...prev, loading: false }));
  }
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
