import { NavigateFunction } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';
import toastFire from '../hooks/toastFire';

export const api = {
  async getUserAll(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-user?page=${page}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      await setTimeout(() => {
        setLoading(false);
        setPaginating(false);
      }, 250);
      return response.data;
    } catch (error) {
      await console.info(error);
    }
  },
  async getUserDetail(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    id: number | any,
  ) {
    try {
      const response = await axiosInstance.get(`master-data/data-user/${id}`, {
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
  async getDeptList(setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    try {
      const response = await axiosInstance.get(`/dept-list-select`, {
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
  async getGrupAuditorList() {
    try {
      const response = await axiosInstance.get(`/grup-auditor-list-select`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      await console.info(error);
    }
  },
  async createUser(
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axiosInstance.post(
        `/master-data/data-user`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status == 200) {
        setSubmitting(false);
        toastFire({
          message: response?.data?.message,
          status: true,
        });
        navigate('/master/user');
      }
    } catch (error: any) {
      setSubmitting(false);
      if (error?.response?.data?.errors?.username) {
        toastFire({
          message: error?.response?.data?.errors?.username[0],
          status: false,
        });
      }
      setTimeout(() => {
        if (error?.response?.data?.errors?.email) {
          toastFire({
            message: error?.response?.data?.errors?.email[0],
            status: false,
          });
        }
      }, 300);
    } finally {
      setShowModal((prev: any) => ({ ...prev, confirm_modal: false }));
    }
  },
  async updateUser(
    id: number,
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axiosInstance.put(
        `/master-data/data-user/${id}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status == 200) {
        setSubmitting(false);
        toastFire({
          message: 'Data User Berhasil Diperbarui',
          status: true,
        });
        navigate('/master/user');
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
  async deleteUser(
    id: number,
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.delete(
        `master-data/data-user/${id}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status == 200) {
        setDeleting(false);
        toastFire({
          message: response.data.message,
        });
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async resetPassword(
    id: number,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.post(
        `master-data/data-user/reset-pass/${id}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status == 200) {
        toastFire({
          message: response.data.message,
        });
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
