import React from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';

export const api = {
  async grupAuditorList(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `/monitoring/data-auditor?page=${page}`,
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
      console.log(error);
    }
  },
};
