import { NavigateFunction } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';
import toastFire from '../hooks/toastFire';
import { GrupAuditorForm } from '../pages/PDD_Management/MasterGrupAuditor/MasterGrupAuditorEdit';

export const api = {
  async getGrupAuditorAll(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    page: number = 1,
    setPaginating: React.Dispatch<React.SetStateAction<boolean>>,
    search?: string,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-grup-auditor?page=${page}&search=${search ?? ''}`,
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
  async getGrupAuditorDetail(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    id: number | any,
  ) {
    try {
      const response = await axiosInstance.get(
        `master-data/data-grup-auditor/${id}`,
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

  async getAuditorListSelect(grup_auditor_id?: string | undefined) {
    try {
      const response = await axiosInstance.get(
        `/auditor-list-select?grup_auditor_id=${grup_auditor_id ?? ''}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response.data;
    } catch (error) {
      await console.info(error);
    }
  },

  async createGrup(
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axiosInstance.post(
        `/master-data/data-grup-auditor`,
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
        navigate('/master/grup-auditor');
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
  async updateGrupForm(
    id: number,
    data: any,
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) {
    try {
      const response = await axiosInstance.put(
        `/master-data/data-grup-auditor/${id}`,
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
          message: 'Data Grup Auditor Berhasil Diperbarui',
          status: true,
        });
        navigate('/master/grup-auditor');
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
  async updateOrNewAnggotaGrup(id: number, data: any) {
    try {
      const response = await axiosInstance.post(
        `/master-data/data-grup-auditor/update-create/${id}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  },
  async removeAnggotaGrup(data: any) {
    try {
      const response = await axiosInstance.post(
        '/master-data/data-grup-auditor/destroy-member',
        data,
        {
          headers: { Authorization: token },
        },
      );
    } catch (err) {
      console.log(err);
    }
  },
  async deleteGrup(
    id: number,
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.delete(
        `master-data/data-grup-auditor/${id}`,
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
  async responseConvertState(response: any) {
    return {
      nama_grup: response?.nama_grup,
      user_id_ketua_then: response?.auditor_list[0]?.user_id,
      ketua: {
        label:
          response?.auditor_list[0]?.user?.nama_lengkap +
          ' - ' +
          response?.auditor_list[0]?.user?.departemen?.nama_departemen +
          ' - ' +
          response?.auditor_list[0]?.user?.departemen?.unit?.nama_unit,
        value: response?.auditor_list[0]?.user_id,
        departemen:
          response?.auditor_list[0]?.user?.departemen?.nama_departemen,
        unit: response?.auditor_list[0]?.user?.departemen?.unit?.nama_unit,
      },
      auditor_list: response?.auditor_list
        ?.slice(1)
        ?.map((item: any, index: number) => {
          return {
            label:
              item?.user?.nama_lengkap +
              ' - ' +
              item?.user?.departemen?.nama_departemen +
              ' - ' +
              item?.user?.departemen?.unit?.nama_unit,
            value: item?.id,
            departemen: item?.user?.departemen?.nama_departemen,
            unit: item?.user?.departemen?.unit?.nama_unit,
            status: 'then',
            user_id: item?.user?.id,
          };
        }),
    };
  },
  async anggotaListCheck(
    data: any,
    grupAuditor: GrupAuditorForm | undefined,
    setGrupAuditor: React.Dispatch<
      React.SetStateAction<GrupAuditorForm | undefined>
    >,
    index: null | number | any,
  ) {
    if (data?.value != grupAuditor?.ketua?.value) {
      if (
        grupAuditor?.auditor_list?.every(
          (item: any) => item?.value != data?.value,
        )
      ) {
        const auditor_listed = [...grupAuditor?.auditor_list];
        auditor_listed[index] = data;
        setGrupAuditor((prev: any) => ({
          ...prev,
          auditor_list: auditor_listed,
        }));
      } else {
        toastFire({
          message: 'Auditor tersebut telah masuk list anggota',
          status: false,
        });
      }
    } else {
      toastFire({
        message: 'Auditor tersebut telah menjadi ketua',
        status: false,
      });
    }
  },

  async ketuaCheck(
    data: any,
    grupAuditor: GrupAuditorForm | undefined,
    setGrupAuditor: React.Dispatch<
      React.SetStateAction<GrupAuditorForm | undefined>
    >,
  ) {
    if (grupAuditor?.auditor_list?.length > 0) {
      const index = grupAuditor?.auditor_list?.findIndex(
        (item: any) => item?.value == data?.value,
      );
      if (index != undefined) {
        const auditor_listed = [...grupAuditor?.auditor_list];
        auditor_listed[index] = null;
        setGrupAuditor((prev: any) => ({
          ...prev,
          auditor_list: auditor_listed,
        }));
        // toastFire({
        //   message: 'Posisi anggota dinaikkan ke ketua',
        //   status: true,
        // });
      }
    }
  },

  grupNameBuilder(increment: string | any) {
    const year = new Date().getFullYear();
    const periode = new Date().getMonth() + 1 > 6 ? 2 : 1;

    return `${year}${periode}A${increment}`;
  },

  async readyFormSendCreate(data: any) {
    return {
      nama_grup: data?.nama_grup,
      ketua: {
        user_id: data?.ketua?.value,
      },
      auditors_id: data?.auditor_list?.map((item: any) => item?.value),
    };
  },

  async readyFormSendUpdate(data: any, removedList: any) {
    const returned = {
      updateGrup: {
        nama_grup: data?.nama_grup,
        ketua_auditor: {
          user_id_then: data?.user_id_ketua_then,
          user_id_new: data?.ketua?.value,
        },
      },
      updateOrNewAnggota: {
        auditor_user_id: data?.auditor_list?.map((item: any) => item?.value),
      },
      removeAnggota: {
        auditor_user_id: removedList?.map((item: any) => item?.user_id),
      },
    };
    return returned;
  },
};
