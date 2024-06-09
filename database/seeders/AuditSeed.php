<?php

namespace Database\Seeders;

use App\Http\Resources\GrupAuditorList;
use App\Models\Auditee;
use App\Models\Clausul;
use App\Models\Departemen;
use App\Models\DetailAudit;
use App\Models\GrupAuditor;
use App\Models\Iso;
use App\Models\JudulClausul;
use App\Models\SubClausul;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuditSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // SKT RT 1 -  2023 Period 1
        $header_skt_rt1_2023_1 = \App\Models\HeaderAudit::create([
            'no_plpp' => '0001/SKT-RT1/06/03/2023',
            'is_responded' => 1,
            'auditee_id' => 7,
            'iso_id' => 1,
            'temuan_audit' => 'ada',
            'grup_auditor_id' => 2,
            'departemen_id' => 3,
            'periode' => '1',
            'tahun' => '2023',
            'end_at' => '2023-04-06',
            'static_data' => json_encode([
                'grup_auditor' => new GrupAuditorList(GrupAuditor::with('auditor')->findOrFail(2)),
                'auditee' => Auditee::with('user.departemen.unit')->findOrFail(7),
                'iso' => Iso::findOrFail(1),
                'departemen' => Departemen::with('unit')->findOrFail(3),
            ]),
        ]);

        DetailAudit::create([
            'header_audit_id' => $header_skt_rt1_2023_1['id'],
            'judul_clausul_id' => 1,
            'clausul_id' => null,
            'sub_clausul_id' => null,
            'sub_departemen_id' => null,
            'tanggal_audit' => '2023-03-06',
            'tanggal_realisasi' => null,
            'tanggal_target' => '2023-04-06',
            'kategori' => 'observasi',
            'jenis_temuan' => 'new',
            'status' => 'close',
            'temuan' => 'Contoh Temuan Audit 1',
            'analisa' => 'Contoh Analisa Temuan 1',
            'tindakan' => 'Contoh Tindakan Temuan 1',
            'attachment' => json_encode(['/respon_audit/auditee-id-7/temuan-id-1/EXAMPLE DOCS ATTACH TEMUAN AUDIT.docx', '/respon_audit/auditee-id-7/temuan-id-1/EXAMPLE DOCS ATTACH TEMUAN AUDIT.pdf']),
            'static_data' => json_encode([
                'judul_clausul' => JudulClausul::findOrFail(1),
            ]),
        ]);

        DetailAudit::create([
            'header_audit_id' => $header_skt_rt1_2023_1['id'],
            'judul_clausul_id' => 10,
            'clausul_id' => 26,
            'sub_clausul_id' => null,
            'sub_departemen_id' => null,
            'tanggal_audit' => '2023-03-06',
            'tanggal_realisasi' => null,
            'tanggal_target' => '2023-04-06',
            'kategori' => 'minor',
            'jenis_temuan' => 'new',
            'status' => 'close',
            'temuan' => 'Menemukan apa yang ditemukan',
            'analisa' => 'Hasil analisa saya adalah',
            'tindakan' => 'Tindakan yang dimungkinkan adalah mengambil langkah pasti',
            'attachment' => json_encode(['/respon_audit/auditee-id-7/temuan-id-2/example_img_attach_1.png', '/respon_audit/auditee-id-7/temuan-id-2/example_img_attach_3.png']),
            'static_data' => json_encode([
                'judul_clausul' => JudulClausul::findOrFail(10),
                'clausul' => Clausul::findOrFail(26),
            ]),
        ]);

        // IT RT 3 - 2023 Period 2
        $header_it_rt3_2023_1 = \App\Models\HeaderAudit::create([
            'no_plpp' => '0001/IT-RT3/06/08/2023',
            'is_responded' => 1,
            'auditee_id' => 4,
            'iso_id' => 1,
            'temuan_audit' => 'ada',
            'grup_auditor_id' => 2,
            'departemen_id' => 4,
            'periode' => '2',
            'tahun' => '2023',
            'end_at' => '2023-09-06',
            'static_data' => json_encode([
                'grup_auditor' => new GrupAuditorList(GrupAuditor::with('auditor')->findOrFail(2)),
                'auditee' => Auditee::with('user.departemen.unit')->findOrFail(4),
                'iso' => Iso::findOrFail(1),
                'departemen' => Departemen::with('unit')->findOrFail(4),
            ]),
        ]);

        DetailAudit::create([
            'header_audit_id' => $header_it_rt3_2023_1['id'],
            'judul_clausul_id' => 2,
            'clausul_id' => null,
            'sub_clausul_id' => null,
            'sub_departemen_id' => null,
            'tanggal_audit' => '2023-08-06',
            'tanggal_realisasi' => null,
            'tanggal_target' => '2023-09-06',
            'kategori' => 'mayor',
            'jenis_temuan' => 'new',
            'status' => 'close',
            'temuan' => 'Menemukan apa yang ditemukan',
            'analisa' => 'Hasil analisa saya adalah',
            'tindakan' => 'Tindakan yang dimungkinkan adalah mengambil langkah pasti',
            'attachment' => json_encode(['/respon_audit/auditee-id-4/temuan-id-3/example_img_attach_1.png', '/respon_audit/auditee-id-4/temuan-id-3/example_img_attach_2.png', '/respon_audit/auditee-id-4/temuan-id-3/example_img_attach_3.png']),
            'static_data' => json_encode([
                'judul_clausul' => JudulClausul::findOrFail(2),
            ]),
        ]);

        // SKT RT 1 - 2024 Period 1
        $header_skt_rt1_2024_1 = \App\Models\HeaderAudit::create([
            'no_plpp' => '0002/SKT-RT1/03/03/2024',
            'is_responded' => 0,
            'auditee_id' => 7,
            'iso_id' => 1,
            'temuan_audit' => 'ada',
            'grup_auditor_id' => 1,
            'departemen_id' => 3,
            'periode' => '1',
            'tahun' => '2024',
            'end_at' => '2024-04-03',
            'static_data' => json_encode([
                'grup_auditor' => new GrupAuditorList(GrupAuditor::with('auditor')->findOrFail(1)),
                'auditee' => Auditee::with('user.departemen.unit')->findOrFail(7),
                'iso' => Iso::findOrFail(1),
                'departemen' => Departemen::with('unit')->findOrFail(3),
            ]),
        ]);

        DetailAudit::create([
            'header_audit_id' => $header_skt_rt1_2024_1['id'],
            'judul_clausul_id' => 7,
            'clausul_id' => 11,
            'sub_clausul_id' => 11,
            'sub_departemen_id' => null,
            'tanggal_audit' => '2024-03-03',
            'tanggal_realisasi' => null,
            'tanggal_target' => '2024-04-03',
            'kategori' => 'mayor',
            'jenis_temuan' => 'new',
            'status' => 'open',
            'temuan' => "Ini Temuannya",
            'analisa' => null,
            'attachment' => null,
            'tindakan' => null,
            'static_data' => json_encode([
                'judul_clausul' => JudulClausul::findOrFail(1),
                'clausul' => Clausul::findOrFail(11),
                'sub_clausul' => SubClausul::findOrFail(11),
            ]),
        ]);

        DetailAudit::create([
            'header_audit_id' => $header_skt_rt1_2024_1['id'],
            'judul_clausul_id' => 7,
            'clausul_id' => 11,
            'sub_clausul_id' => 12,
            'sub_departemen_id' => null,
            'tanggal_audit' => '2024-03-03',
            'tanggal_realisasi' => null,
            'tanggal_target' => '2024-04-03',
            'kategori' => 'minor',
            'jenis_temuan' => 'new',
            'status' => 'open',
            'temuan' => "Ini Temuannya",
            'analisa' => null,
            'attachment' => null,
            'tindakan' => null,

            'static_data' => json_encode([
                'judul_clausul' => JudulClausul::findOrFail(1),
                'clausul' => Clausul::findOrFail(11),
                'sub_clausul' => SubClausul::findOrFail(12),
            ]),
        ]);

        // DetailAudit::create([
        //     'header_audit_id' => $header_skt_rt1_2024_1['id'],
        //     'judul_clausul_id' => 7,
        //     'clausul_id' => 11,
        //     'sub_clausul_id' => 13,
        //     'sub_departemen_id' => null,
        //     'tanggal_audit' => '2024-03-03',
        //     'tanggal_realisasi' => null,
        //     'tanggal_target' => '2024-04-03',
        //     'kategori' => 'observasi',
        //     'jenis_temuan' => 'new',
        //     'status' => 'open',
        //     'temuan' => "Ini Temuannya",
        //     'analisa' => null,
        //     'attachment' => null,
        //     'tindakan' => null,

        //     'static_data' => json_encode([
        //         'judul_clausul' => JudulClausul::findOrFail(1),
        //         'clausul' => Clausul::findOrFail(11),
        //         'sub_clausul' => SubClausul::findOrFail(13),
        //     ]),
        // ]);

        // DetailAudit::create([
        //     'header_audit_id' => $header_skt_rt1_2024_1['id'],
        //     'judul_clausul_id' => 7,
        //     'clausul_id' => 11,
        //     'sub_clausul_id' => 13,
        //     'sub_departemen_id' => null,
        //     'tanggal_audit' => '2024-03-03',
        //     'tanggal_realisasi' => null,
        //     'tanggal_target' => '2024-04-03',
        //     'kategori' => 'mayor',
        //     'jenis_temuan' => 'new',
        //     'status' => 'open',
        //     'temuan' => "Ini Temuannya",
        //     'analisa' => null,
        //     'attachment' => null,
        //     'tindakan' => null,

        //     'static_data' => json_encode([
        //         'judul_clausul' => JudulClausul::findOrFail(1),
        //         'clausul' => Clausul::findOrFail(11),
        //         'sub_clausul' => SubClausul::findOrFail(13),
        //     ]),
        // ]);
    }
}
