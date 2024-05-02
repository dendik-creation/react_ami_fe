import React from 'react';
import toastFire from '../hooks/toastFire';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';

export const api = {
  async auditsAll(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `monitoring/histori-audit?page=${page}`,
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

  async sendEmailAudit(
    auditee_id: number,
    setDisabled: React.Dispatch<React.SetStateAction<number>>,
  ) {
    const response = await axiosInstance
      .post('/reminder-auditee', {
        auditee_id: auditee_id,
      })
      .finally(() => setDisabled(0));
  },

  async auditClosedNotResponded(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get(
        `audit-list-close?page=${page}`,
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

  async broadcastEmailAuditee(
    setBroadcasting: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    const response = await axiosInstance
      .post('/broadcast-auditee')
      .finally(() => {
        setBroadcasting(false);
      });
  },

  async continueAudit(
    header_id: number,
    day_count: number,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.put(`/continue-audit/${header_id}`, {
        banyak_hari: day_count,
      });
      if (response.status == 200) {
        toastFire({
          message: response.data.message,
          status: true,
        });
      }
    } catch (error: any) {
      console.log(error);
      toastFire({
        message: error.response.data.message,
        status: true,
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
  },
};
