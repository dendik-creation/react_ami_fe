import axios from 'axios';
import { apiBaseUrl, token } from '../utils/constant';
import { NavigateFunction } from 'react-router-dom';
import toastFire from '../hooks/toastFire';

export const profileApi = {
  async getProfile(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    try {
      const response = await axios.get(`${apiBaseUrl}/profile/my-profile`, {
        headers: {
          Authorization: token,
        },
      });
      await setTimeout(() => {
        setLoading(false);
      }, 250);
      return response.data;
    } catch (error) {
      await console.info(error);
    }
  },
  async updateProfile(
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axios.put(
        `${apiBaseUrl}/profile/update-profile`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status == 200) {
        const updateCred = JSON.parse(localStorage.getItem('credentials'));
        updateCred.user.username = response.data.data.username;
        updateCred.user.nama_lengkap = response.data.data.nama_lengkap;
        updateCred.user.email = response.data.data.email;
        localStorage.setItem('credentials', JSON.stringify(updateCred));
        setSubmitting(false);
        toastFire({
          message: response?.data?.message,
          status: true,
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }
    } catch (error: any) {
      setSubmitting(false);
      toastFire({
        message: error.response.message,
        status: false,
      });
    } finally {
      setShowModal((prev: any) => ({ ...prev, confirm_modal: false }));
    }
  },
};
