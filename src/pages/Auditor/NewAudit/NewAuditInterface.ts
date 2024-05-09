import {
  Auditee,
  Clausul,
  Departemen,
  Iso,
  JudulClausul,
  SubClausul,
  SubDepartemen,
} from '../../../types/AuditListInterface';
import { GrupAuditor } from '../MonitoringDataGrupAuditor/GrupAuditorInterface';

export interface NewAuditType {
  header_audit: HeaderData;
  detail_audit: DetailData[];
}

export interface HeaderData {
  id?: any;
  no_plpp: string;
  is_responded?: number | boolean;
  grup_auditor_id: number | null;
  auditee_id: number | null;
  iso_id: number | null;
  departemen_id: number | null;
  temuan_audit: string;
  departemen?: Departemen;
  iso?: Iso;
  auditee?: Auditee;
  historyCount?: number | null;
  grup_auditor?: GrupAuditor;
  periode?: number;
  static_data?: {
    iso: Iso;
    grup_auditor: GrupAuditor;
    departemen: Departemen;
    auditee: Auditee;
  };
  end_at?: any;
  detail_audit?: DetailData[];
}

export interface HeaderOfAudit {
  getData: any;
  loading: boolean;
  header: HeaderData;
  setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
  setSubDepts: React.Dispatch<React.SetStateAction<[]>>;
  setPihakTerlibat: React.Dispatch<React.SetStateAction<any>>;
}

export interface DetailData {
  id?: number;
  judul_clausul_id: number | null;
  clausul_id: number | null;
  sub_clausul_id: number | null;
  sub_departemen_id?: number | null;
  tanggal_audit: string | number | any;
  tanggal_target: string | number | any;
  tanggal_realisasi?: string | number | any;
  attachment?: string[];
  attachment_upload?: any;
  kategori: string;
  jenis_temuan?: {
    value: string;
    label: string;
  } | null;
  status: string;
  temuan: string;
  analisa?: string;
  tindakan?: string;
  static_data?: {
    judul_clausul: JudulClausul;
    clausul: Clausul;
    sub_clausul: SubClausul;
    sub_departemen?: SubDepartemen;
  };

  judul_clausul?: JudulClausul;
  clausul?: Clausul;
  sub_clausul?: SubClausul;
  sub_departemen?: SubDepartemen;
}

interface AuditeeGetData {
  label?: string;
  value?: number;
  departemen_id?: string | number;
}

export interface EnvClausul {
  label: string | null;
  value: number | null;
  judul_clausul_id?: number | null;
  clausul_id?: number | null;
}

export interface GetData {
  auditee: AuditeeGetData[];
  judul_clausul: EnvClausul[] | any;
  clausul: EnvClausul[];
  sub_clausul: EnvClausul[];
}

export interface DetailOfAudit {
  detail: DetailData[];
  header: HeaderData;
  getData: GetData;
  subDepts: [] | any;
  setDetail: React.Dispatch<React.SetStateAction<DetailData[]>>;
  loading: boolean;
}
