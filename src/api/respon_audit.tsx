import React from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';
import { NavigateFunction } from 'react-router-dom';
import toastFire from '../hooks/toastFire';

export const api = {
  async auditeeRespondList(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get('/respon-audit', {
        headers: {
          Authorization: token,
        },
      });
      if (response.status == 200) {
        setTimeout(() => {
          setLoading(false);
        }, 250);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async auditeeRespondDetail(
    id: number | undefined | any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(`/respon-audit/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status == 200) {
        setTimeout(() => {
          setLoading(false);
        }, 250);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async auditeeRespondPut(
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
    id: number,
  ) {
    try {
      const response = await axiosInstance.put(
        `/respon-audit/${id}`,
        {
          data: data,
        },
        {
          headers: { Authorization: token },
        },
      );
      if (response.status == 200) {
        setSubmitting(false);
        toastFire({
          message: 'Respon audit berhasil diselesaikan',
          status: true,
        });
        navigate('/respon-audit');
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
  async historyDeptByPeriode(dept_id: number | undefined) {
    try {
      const response = await axiosInstance.get(
        `/monitoring/histori-audit/histori-dept/${dept_id}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
