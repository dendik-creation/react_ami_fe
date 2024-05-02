import React from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';
import toastFire from '../hooks/toastFire';

export const api = {
  async unitAllSelect(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-unit/for-select`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setTimeout(() => {
        setLoading(false);
      }, 250);

      return response.data;
    } catch (error) {
      await console.info(error);
    }
  },
  async unitAll(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-unit?page=${page}`,
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
  async unitCreate(data: any) {
    try {
      const response = await axiosInstance.post(`master-data/data-unit`, data, {
        headers: {
          Authorization: token,
        },
      });
      toastFire({
        message: response.data.message,
      });
      return response.data;
    } catch (error) {
      await console.log(error);
    }
  },
  async unitUpdate(id: number, data: any) {
    try {
      const response = await axiosInstance.put(
        `master-data/data-unit/${id}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      toastFire({
        message: response.data.message,
      });
      return response.data;
    } catch (error) {
      await console.log(error);
    }
  },
  async unitDelete(
    id: number,
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.delete(
        `master-data/data-unit/${id}`,
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
