import { GrupAuditor } from '../pages/Auditor/MonitoringDataGrupAuditor/GrupAuditorInterface';
import { DetailData } from '../pages/Auditor/NewAudit/NewAuditInterface';

export interface Iso {
  id: number;
  kode: string;
}

export interface User {
  id: number;
  nama_lengkap: string;
  username: string;
  email: string;
  ekstensi: string;
  role: string[];
  departemen_id: number;
  departemen?: Departemen;
}

export interface Auditee {
  id: number;
  user_id: number;
  user?: User;
  status: string;
}

export interface Departemen {
  id: number;
  kode: string;
  unit_id: number;
  unit?: Unit;
}

export interface Unit {
  id: number;
  kode: string;
  nama_unit: string;
}

export interface JudulClausul {
  id: number;
  kode: string;
  judul_clausul: string;
  iso_id: number;
}

export interface Clausul {
  id: number;
  kode: string;
  judul_clausul_id: number;
  nama_clausul: string;
}

export interface SubClausul {
  id: number;
  kode: string;
  judul_clausul_id: number;
  clausul_id: number;
  naam_sub_clausul: string;
}

export interface SubDepartemen {
  id: number;
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
