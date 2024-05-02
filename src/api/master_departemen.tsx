import { NavigateFunction } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';
import toastFire from '../hooks/toastFire';

export const api = {
  async departemenAll(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-departemen?page=${page}`,
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
  async departemenDetail(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    id: number | any,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-departemen/${id}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      await setTimeout(() => {
        setLoading(false);
      }, 250);
      return response.data;
    } catch (error) {
      await console.info(error);
    }
  },

  async createDept(
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axiosInstance.post(
        `/master-data/data-departemen`,
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
        navigate('/master/departemen');
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
  async updateDept(
    id: number,
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axiosInstance.put(
        `/master-data/data-departemen/${id}`,
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
          message: 'Data Departemen Berhasil Diperbarui',
          status: true,
        });
        navigate('/master/departemen');
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
  async removeSubDept(data: any) {
    try {
      const response = await axiosInstance.post(
        '/master-data/data-departemen/destroy-sub-dept',
        data,
        {
          headers: { Authorization: token },
        },
      );
    } catch (err) {
      console.log(err);
    }
  },
  async deleteDept(
    id: number,
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.delete(
        `master-data/data-departemen/${id}`,
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
};

export const helper = {
  async readyFormSendUpdate(departemen: any, removed: any) {
    return {
      data: {
        kode: departemen.kode,
        ekstensi: departemen.ekstensi,
        unit_id: departemen.unit_id,
        nama_departemen: departemen.nama_departemen,
        sub_departemen: departemen.sub_departemen,
      },
      removedSubDept: {
        subs_id: removed,
      },
    };
  },
};
