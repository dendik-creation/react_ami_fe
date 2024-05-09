import React from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { apiBaseUrl, token } from '../utils/constant';
import { NavigateFunction } from 'react-router-dom';
import toastFire from '../hooks/toastFire';
import axios from 'axios';

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
    id: any,
  ) {
    try {
      const response = await axiosInstance.put(
        `/respon-audit/${id}`,
        {
          data: data,
        },
        {
          headers: {
            Authorization: token,
          },
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
        message: error.response.data.message,
        status: false,
      });
    } finally {
      setShowModal((prev: any) => ({ ...prev, confirm_modal: false }));
    }
  },
  async auditeePutDocs(data: any) {
    if (data) {
      const response = await axiosInstance.post(
        `/respon-audit/docs`,
        {
          data,
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
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

  async downloadFile(
    pathfile: string,
    setDownloading: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    const fileName = pathfile.substring(pathfile.lastIndexOf('/') + 1);
    const res = await axiosInstance
      .post(
        `download/attachment`,
        { pathfile: pathfile },
        {
          responseType: 'blob',
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        setTimeout(() => {
          setDownloading(false);
          link.click();
        }, 1000);
      });
  },

  async getFile(pathfile: string) {
    try {
      const res = await axiosInstance.get(
        `get/attachment?pathfile=${pathfile}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
};
