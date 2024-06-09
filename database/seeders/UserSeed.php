<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => "adit",
            'nama_lengkap' => "Adit Sigma",
            'email' => "adit@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor', 'pdd', 'management']),
            'periode_active_role' => 'auditor',
            'departemen_id' => 1,
        ]);

        User::create([
            'username' => "agusdotkom",
            'nama_lengkap' => "Agus Kudus",
            'email' => "agus@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditor', 'auditee', 'pdd']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 1,
        ]);

        User::create([
            'username' => "dimas",
            'nama_lengkap' => "Dimas Wahab",
            'email' => "dimas@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditor', 'auditee']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 2,
        ]);

        User::create([
            'username' => "slamets",
            'nama_lengkap' => "Slamet Nur Ahmad",
            'email' => "slamet@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 4,
        ]);

        User::create([
            'username' => "abdul",
            'nama_lengkap' => "Abdul Permana",
            'email' => "abduls@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditor',
            'departemen_id' => 4,
        ]);

        User::create([
            'username' => "reza",
            'nama_lengkap' => "Reza Rahmad",
            'email' => "rahmadreza@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditor',
            'departemen_id' => 3,
        ]);
        User::create([
            'username' => "dendikcreation",
            'nama_lengkap' => "Dendik Creation",
            'email' => "creationdendik729@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 3,
        ]);
        User::create([
            'username' => "putri",
            'nama_lengkap' => "Putri Triyani",
            'email' => "putrinusa39@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 4,
        ]);
        User::create([
            'username' => "alex",
            'nama_lengkap' => "William Alex",
            'email' => "tuanalex@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 1,
        ]);
        User::create([
            'username' => "bagas",
            'nama_lengkap' => "Suyardi bagas",
            'email' => "bagas12@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 3,
        ]);
        User::create([
            'username' => "aji",
            'nama_lengkap' => "Aji",
            'email' => "aji1212@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 3,
        ]);
        User::create([
            'username' => "nusa",
            'nama_lengkap' => "Nusa Bangsa",
            'email' => "nusa@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 3,
        ]);
        User::create([
            'username' => "budiono",
            'nama_lengkap' => "Budiono Siregar",
            'email' => "budiono@gmail.com",
            'password' => Hash::make('12345'),
            'role' => json_encode(['auditee', 'auditor']),
            'periode_active_role' => 'auditee',
            'departemen_id' => 4,
        ]);
    }
}
