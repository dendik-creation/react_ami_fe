import { SetStateAction } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { apiBaseUrl, token } from '../utils/constant';
import axios from 'axios';
import toastFire from '../hooks/toastFire';

export const api = {
  async isoGetAllForSelect(
    setLoading: React.Dispatch<SetStateAction<boolean>> | null = null,
  ) {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/master-data/data-iso/for-select`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      await setTimeout(() => {
        if (setLoading) {
          setLoading(false);
        }
      }, 250);
      return response.data;
    } catch (error) {
      await console.info(error);
    }
  },
  async isoAll(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-iso?page=${page}`,
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
  async isoCreate(data: any) {
    try {
      const response = await axiosInstance.post(`master-data/data-iso`, data, {
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
  async isoUpdate(id: number, data: any) {
    try {
      const response = await axiosInstance.put(
        `master-data/data-iso/${id}`,
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
  async deleteIso(
    id: number,
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.delete(
        `master-data/data-iso/${id}`,
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
