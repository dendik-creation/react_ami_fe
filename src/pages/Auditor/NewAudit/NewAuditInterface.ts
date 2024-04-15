import {
  Clausul,
  JudulClausul,
  SubClausul,
  SubDepartemen,
} from '../../../types/AuditListInterface';

export interface NewAuditType {
  header_audit: HeaderData;
  detail_audit: DetailData[];
}

export interface HeaderData {
  no_plpp: string;
  grup_auditor_id: number | null;
  auditee_id: number | null;
  iso_id: number | null;
  departemen_id: number | null;
  temuan_audit: string;
}

export interface HeaderOfAudit {
  getData: any;
  loading: boolean;
  header: HeaderData;
  detail: DetailData[];
  setHeader: React.Dispatch<React.SetStateAction<HeaderData>>;
  setDetail: React.Dispatch<React.SetStateAction<DetailData[]>>;
  setSubDepts: React.Dispatch<React.SetStateAction<[]>>;
  setPihakTerlibat: React.Dispatch<React.SetStateAction<any>>;
}

export interface DetailData {
  judul_clausul_id: number | null;
  clausul_id: number | null;
  sub_clausul_id: number | null;
  sub_departemen_id?: number | null;
  tanggal_audit: string | number | any;
  tanggal_target: string | number | any;
  tanggal_realisasi?: string | number | any;
  kategori: string;
  jenis_temuan: string;
  status: string;
  temuan: string;
  periode: number;
  analisa?: string;
  tindakan?: string;

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
  getData: GetData;
  subDepts: [] | any;
  setDetail: React.Dispatch<React.SetStateAction<DetailData[]>>;
  loading: boolean;
}
