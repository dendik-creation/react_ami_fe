import { NavigateFunction } from 'react-router-dom';
import toastFire from '../hooks/toastFire';
import { Clausul, JudulClausul, SubClausul } from '../types/AuditListInterface';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';

export const api = {
  async clausulAll(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-clausul?page=${page}`,
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
  async clausulDetail(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    id: number | string | undefined,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-clausul/${id}`,
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
  async clausulCreate(
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axiosInstance.post(
        `/master-data/data-clausul`,
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
        navigate('/master/clausul');
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
  async clausulUpdate(
    id: number,
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axiosInstance.put(
        `/master-data/data-clausul/${id}`,
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
          message: 'Data Standar Clausul Berhasil Diperbarui',
          status: true,
        });
        navigate('/master/clausul');
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
  async clausulRemovedSelected(data: any) {
    try {
      const response = await axiosInstance.post(
        `/master-data/data-clausul/destroy-custom`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
    } catch (error: any) {
      toastFire({
        message: error.response.message,
        status: false,
      });
    }
  },

  async removeJudulClausul(
    id: number,
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.delete(
        `master-data/data-clausul/${id}`,
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
  async setStatusClausulList(clausul: JudulClausul) {
    return {
      id: clausul.id,
      kode: clausul.kode,
      judul_clausul: clausul.judul_clausul,
      iso_id: {
        value: clausul?.iso?.id,
        label: clausul?.iso?.kode,
      },
      clausul: clausul.clausul?.map((item: Clausul) => {
        return {
          ...item,
          sub_clausul: item?.sub_clausul?.map((sub_item: SubClausul) => {
            return {
              ...sub_item,
              status: 'then',
              show: true,
            };
          }),
          status: 'then',
          show: true,
        };
      }),
    };
  },
};
