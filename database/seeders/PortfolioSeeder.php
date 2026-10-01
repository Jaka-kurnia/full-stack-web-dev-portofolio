<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroSetting;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Certification;
use App\Models\Quote;
use Carbon\Carbon;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();

        // 1. Hero Setting
        HeroSetting::truncate();
        HeroSetting::create([
            'greeting' => 'Full-Stack Web Developer.',
            'full_name' => 'Jaka Kurnia',
            'short_bio' => 'Full-Stack Web Developer yang mengolaborasikan analisis sistem terstruktur dan prinsip Manajemen Informatika untuk menciptakan solusi web end-to-end. Berfokus pada pengembangan kode yang bersih (clean code), arsitektur basis data yang optimal, serta pengalaman pengguna (user experience) yang lancar dan terkendali.',
            'about_text' => 'Mahasiswa Aktif Program Studi Manajemen Informatika Politeknik LP3I Kampus Tasikmalaya yang berfokus pada pengembangan aplikasi berbasis web. Memiliki keahlian dalam bahasa pemrograman PHP dan JavaScript, pengelolaan basis data MySQL, serta pengalaman membangun sistem menggunakan Laravel dan React. Adaptif dan siap berkontribusi profesional dalam proyek pengembangan website maupun pengelolaan sistem informasi perusahaan.',
            'availability_status' => 'Available',
            'social_links' => [
                'linkedin' => 'http://www.linkedin.com/in/jaka-kurnia',
                'email' => 'kurniajakaa@gmail.com',
                'phone' => '081220398391',
                'address' => 'Kampung Cipanengah Girang, RT 001, RW 004 Kecamatan Sukaratu, Kabupaten Tasikmalaya'
            ],
            'cta_text' => 'Hubungi Saya',
            'cta_link' => 'mailto:kurniajakaa@gmail.com',
        ]);

        // 2. Experiences
        Experience::truncate();
        Experience::create([
            'company_name' => 'LP3I Computer Club (LCC)',
            'job_title' => 'Biro Kreatif',
            'type' => 'Freelance',
            'start_date' => Carbon::create(2025, 1, 1),
            'end_date' => Carbon::create(2026, 12, 31),
            'description' => "• Merancang dan mengelola strategi konten media sosial LCC untuk meningkatkan brand awareness serta keterlibatan (engagement) anggota dan mahasiswa kampus.\n• Memproduksi aset visual dan materi publikasi digital secara konsisten guna mengomunikasikan kegiatan harian, acara workshop, dan informasi seputar teknologi.",
            'is_active' => true,
        ]);

        Experience::create([
            'company_name' => 'LP3I Computer Club (LCC)',
            'job_title' => 'Pemateri Programming Class dan Office Class',
            'type' => 'Freelance',
            'start_date' => Carbon::create(2025, 1, 1),
            'end_date' => Carbon::create(2026, 12, 31),
            'description' => "• Menjadi pemateri/fasilitator dalam sesi pemantapan materi web development dasar, mengedukasi anggota mengenai HTML, CSS, dan PHP Native.\n• Memberikan pelatihan dan mendampingi mahasiswa dalam pengoptimalan pengolahan data serta pemformatan dokumen menggunakan Microsoft Word dan Microsoft Excel.",
            'is_active' => true,
        ]);

        Experience::create([
            'company_name' => 'Panitia PKKMB',
            'job_title' => 'Sie Dokumentasi',
            'type' => 'Freelance',
            'start_date' => Carbon::create(2025, 1, 1),
            'end_date' => Carbon::create(2026, 12, 31),
            'description' => "Bertanggung jawab penuh atas pengambilan dan pengabadian seluruh momen kunci selama rangkaian acara PKKMB, meliputi sesi materi, kegiatan outbound, hingga acara puncak.\nMengelola backup dan pengarsipan seluruh data visual secara berkala ke penyimpanan cloud/cloud drive untuk memastikan keamanan aset dokumentasi.",
            'is_active' => true,
        ]);

        // 3. Skills
        Skill::truncate();
        $skills = [
            ['name' => 'HTML', 'category' => 'Frontend', 'proficiency_level' => 85, 'icon_identifier' => 'html5'],
            ['name' => 'CSS', 'category' => 'Frontend', 'proficiency_level' => 80, 'icon_identifier' => 'css3'],
            ['name' => 'Tailwind', 'category' => 'Frontend', 'proficiency_level' => 80, 'icon_identifier' => 'tailwind'],
            ['name' => 'Bootstrap', 'category' => 'Frontend', 'proficiency_level' => 75, 'icon_identifier' => 'bootstrap'],
            ['name' => 'JavaScript', 'category' => 'Frontend', 'proficiency_level' => 75, 'icon_identifier' => 'javascript'],
            ['name' => 'React', 'category' => 'Frontend', 'proficiency_level' => 70, 'icon_identifier' => 'react'],
            ['name' => 'PHP', 'category' => 'Backend', 'proficiency_level' => 85, 'icon_identifier' => 'php'],
            ['name' => 'Laravel', 'category' => 'Backend', 'proficiency_level' => 80, 'icon_identifier' => 'laravel'],
            ['name' => 'MySQL', 'category' => 'Database', 'proficiency_level' => 80, 'icon_identifier' => 'mysql'],
            ['name' => 'Dart', 'category' => 'Frontend', 'proficiency_level' => 60, 'icon_identifier' => 'dart'],
            ['name' => 'Flutter', 'category' => 'Frontend', 'proficiency_level' => 60, 'icon_identifier' => 'flutter'],
            ['name' => 'VS Code', 'category' => 'Tools', 'proficiency_level' => 90, 'icon_identifier' => 'vscode'],
            ['name' => 'Figma', 'category' => 'Tools', 'proficiency_level' => 85, 'icon_identifier' => 'figma'],
            ['name' => 'MS Word', 'category' => 'Tools', 'proficiency_level' => 90, 'icon_identifier' => 'word'],
            ['name' => 'MS Excel', 'category' => 'Tools', 'proficiency_level' => 85, 'icon_identifier' => 'excel'],
        ];

        foreach ($skills as $skill) {
            Skill::create(array_merge($skill, ['is_active' => true]));
        }

        // 4. Certifications
        Certification::truncate();
        Certification::create([
            'name' => 'Operator Komputer Junior Aplikasi Perkantoran',
            'issuer' => 'Lembaga Sertifikasi',
            'issue_date' => Carbon::create(2024, 1, 1),
        ]);

        Certification::create([
            'name' => 'Teknisi Jaringan Komputer',
            'issuer' => 'Lembaga Sertifikasi',
            'issue_date' => Carbon::create(2024, 1, 1),
        ]);

        // 5. Quotes
        Quote::truncate();
        Quote::create([
            'content' => 'Setiap masa pasti ada orangnya, setiap orang punya masanya.',
            'is_active' => true,
        ]);

        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();
    }
}
