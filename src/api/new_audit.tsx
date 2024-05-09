import { NavigateFunction } from 'react-router-dom';
import {
  DetailData,
  GetData,
  HeaderData,
  NewAuditType,
} from '../pages/Auditor/NewAudit/NewAuditInterface';
import { axiosInstance } from '../utils/axiosInstance';
import { token } from '../utils/constant';
import toastFire from '../hooks/toastFire';

export const api = {
  async newAuditData(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    try {
      const response = await axiosInstance.get('/new-audit-data', {
        headers: {
          Authorization: token,
        },
      });
      await setTimeout(() => {
        setLoading(false);
      }, 250);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async subDeptsByDeptId(deptId: number) {
    const response = await axiosInstance.get(
      `/get-auditee-sub-dept/${deptId}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data;
  },

  async keterlibatanPihak(auditee_id: number) {
    const response = await axiosInstance.get(`/pihak-terlibat/${auditee_id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  },

  async auditHistoryDept(dept_id: number | string) {
    const response = await axiosInstance.get(`/history-dept-audit/${dept_id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  },

  async submitAuditForm(data: NewAuditType, navigate: NavigateFunction) {
    const response = await axiosInstance.post('/new-audit', data ?? null, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status == 200) {
      navigate('/');
      toastFire({
        message: response?.data?.message,
        status: true,
      });
    }
  },
};

export const parentNewAudit = {
  collectDataReadySubmit(header: HeaderData, detail: DetailData[] | any) {
    const headerEdited = {
      ...header,
      periode: detailAudit.whatPeriode(new Date().getMonth() + 1),
      is_responded: 0,
      end_at: detail[0]?.tanggal_target,
    };
    let detailEdited: any = [];
    if (detail?.length > 0 && detail[0]?.judul_clausul_id != null) {
      detailEdited = detail?.map((item: any) => {
        return {
          judul_clausul_id: item?.judul_clausul_id?.value,
          clausul_id: item?.clausul_id?.value,
          sub_clausul_id: item?.sub_clausul_id?.value,
          sub_departemen_id: item?.sub_departemen_id?.value ?? null,
          kategori: item?.kategori?.value,
          tanggal_audit: item?.tanggal_audit,
          tanggal_realisasi: item?.tanggal_realisasi,
          tanggal_target: item?.tanggal_target,
          status: item?.status,
          temuan: item?.temuan,
          jenis_temuan: item?.jenis_temuan?.value ?? null,
        };
      });
    } else {
      detailEdited = null;
    }
    return {
      headerEdited,
      detailEdited,
    };
  },
};

export const headerAudit = {
  tanggalForTarget() {
    const tanggalBaru = new Date();
    tanggalBaru.setMonth(tanggalBaru.getMonth() + 1);
    const tanggalFormatted = tanggalBaru.toLocaleDateString('en-CA');
    return tanggalFormatted;
  },

  pad(number: number) {
    return String(number).padStart(2, '0');
  },

  generatePlpp(auditee: any, historyCount: number) {
    let now: Date = new Date();
    let formattedDate = `${this.pad(now.getDate())}/${this.pad(
      now.getMonth() + 1,
    )}/${now.getFullYear()}`;
    let auditKe: number = historyCount + 1;
    let plpp: string = '';

    if (auditKe < 10) {
      plpp = `000${auditKe}/${auditee?.departemen_kode}-${auditee?.unit_kode}/${formattedDate}`;
    } else {
      plpp = `00${auditKe}/${auditee?.departemen_kode}-${auditee?.unit_kode}/${formattedDate}`;
    }

    return plpp;
  },
};

export const detailAudit = {
  async filterClausulEnv(
    type: string,
    getData: GetData,
    clausulFiltered: any,
    setClausul: React.Dispatch<React.SetStateAction<any>>,
    selectedId: any,
  ) {
    if (type == 'judul_clausul_id') {
      const filterClausul = getData?.clausul?.filter(
        (item) => item.judul_clausul_id == selectedId.value,
      );
      const filterSubClausul = getData?.sub_clausul?.filter(
        (item) => item.judul_clausul_id == selectedId.value,
      );
      setClausul({
        judul_clausul: getData?.judul_clausul,
        clausul: filterClausul,
        sub_clausul: filterSubClausul,
      });
    }
    if (type == 'clausul_id') {
      const filterSubClausul = getData?.sub_clausul?.filter(
        (item) =>
          item.judul_clausul_id == selectedId.judul_clausul_id &&
          item.clausul_id == selectedId.value,
      );
      setClausul({
        ...clausulFiltered,
        sub_clausul: filterSubClausul,
      });
    }
    if (type == 'sub_clausul_id') {
      //
    }
  },

  whatPeriode(month: number) {
    if (month <= 6) {
      return 1;
    } else {
      return 2;
    }
  },
};
