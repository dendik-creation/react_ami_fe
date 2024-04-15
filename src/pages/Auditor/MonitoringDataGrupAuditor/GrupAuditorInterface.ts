export interface GrupAuditor {
  id: number | null;
  nama_grup: string;
  jumlah_anggota?: number | null;
  auditor_list: [] | null;
  auditor?: [] | null | undefined;
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
