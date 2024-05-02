import { GrupAuditor } from '../pages/Auditor/MonitoringDataGrupAuditor/GrupAuditorInterface';
import { DetailData } from '../pages/Auditor/NewAudit/NewAuditInterface';

export interface Iso {
  id: number;
  kode: string;
}

export interface User {
  id?: number;
  nama_lengkap: string;
  password?: string;
  username: string;
  email: string;
  role: string[];
  auditor?: {
    id?: number;
    grup_auditor_id: number;
    grup_auditor: {
      label: string;
      value: number;
      has_ketua: boolean;
    };
    keanggotaan: {
      label: string;
      value: number;
    };
  };
  grup_auditor?: GrupAuditor;
  departemen_id?: {
    label: string;
    value: number | null;
  };
  departemen?: Departemen;
}

export interface Auditee {
  id: number;
  user_id: number;
  user?: User;
  status: string;
}

export interface Departemen {
  nama_departemen?: string;
  sub_departemen_count?: number;
  id?: number;
  ekstensi: string;
  kode: string;
  unit_id: number | null;
  unit?: Unit;
  unit_select?: {
    label: string;
    value: number;
  } | null;
  sub_departemen?: SubDepartemen[] | any;
}

export interface Unit {
  id: number;
  kode: string;
  nama_unit: string;
  label?: string;
  value?: number;
}

export interface JudulClausul {
  id?: number;
  kode: string;
  judul_clausul: string;
  iso_id: number | null | Iso;
  clausul?: Clausul[];
  iso?: Iso;
}

export interface Clausul {
  id?: number;
  kode?: string;
  kode_clausul?: string;
  judul_clausul_id?: number;
  nama_clausul: string;
  sub_clausul?: SubClausul[];
  status?: string;
  show?: boolean;
}

export interface SubClausul {
  id?: number;
  kode?: string;
  kode_sub_clausul?: string;
  judul_clausul_id?: number;
  clausul_id?: number;
  nama_sub_clausul: string;
  status?: string;
  show?: boolean;
}

export interface SubDepartemen {
  id: number | string;
  departemen_id: number;
  nama_sub_departemen?: number;
  departemen?: Departemen;
}

// Detail
export interface MyDetailAudit {
  id: number;
  no_plpp: string;
  grup_auditor_id: number;
  auditee_id: number;
  iso_id: number;
  departemen_id: number;
  temuan_audit: string;
  iso?: Iso;
  departemen?: Departemen;
  auditee?: Auditee;
  grup_auditor?: GrupAuditor | undefined | null;
  detail_audit?: DetailData[];
}

export interface MetaPaginate {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}
