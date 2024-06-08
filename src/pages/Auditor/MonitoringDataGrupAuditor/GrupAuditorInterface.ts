import { User } from '../../../types/AuditListInterface';

export interface GrupAuditor {
  id: number | null;
  nama_grup: string;
  jumlah_anggota?: number | null;
  auditor_list?:
    | {
        id: number;
        user_id: number;
        grup_auditor_id: number;
        keanggotaan: string;
        status: string;
        user?: User;
      }[]
    | null
    | any;
  auditor?: {
    id: number;
    user_id: number;
    grup_auditor_id: number;
    keanggotaan: string;
    status: string;
    user?: User;
  };
}

export interface GrupAuditorList {
  total_grup: number;
  data: GrupAuditor[];
  meta_paginate: {
    current_page: number | any | undefined;
    per_page: number | any | undefined;
    last_page: number | any | undefined;
    total: number | any | undefined;
  };
}
