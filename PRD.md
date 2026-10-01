PRD] Dynamic Portfolio CMS for Full Stack Developer
1. Overview & Objectives
Product Vision: Membangun Content Management System (CMS) headless atau terintegrasi yang sangat dinamis, ringan, dan mudah dikustomisasi khusus untuk portofolio pribadi seorang Full Stack Web Developer. Sistem ini memungkinkan pembaruan konten secara real-time tanpa perlu menyentuh kode.
Target Audience:
Admin: Pemilik portofolio (Developer) untuk manajemen konten.
Visitors: Perekrut (Recruiters), Klien potensial, dan sesama Developer (Peers) yang melihat hasil akhir (Public Landing Page).
Key Success Metrics:
Kecepatan Update: Waktu untuk memperbarui proyek atau artikel baru < 2 menit via dashboard.
Performa: Skor Lighthouse (Performance, Accessibility, Best Practices, SEO) > 90 untuk halaman publik.
Keamanan: Autentikasi yang aman untuk dashboard, mencegah injeksi SQL/XSS, dan perlindungan brute-force.
2. Core Technical Architecture & Non-Functional Requirements
Security:
Auth Mechanism: Menggunakan session bawaan dari Laravel Breeze + React/Inertia untuk dashboard.
Role-Based Access Control (RBAC): Minimal 1 role admin.
API Rate Limiting: Implementasi Throttle Requests bawaan Laravel (misal: 5 request/menit untuk form kontak).
Performance & Media Storage:
Format Media: Otomatis mengonversi gambar unggahan ke WebP/AVIF untuk efisiensi bandwidth (menggunakan Intervention Image/GD).
Cloud Storage Integration: Abstraksi file system Laravel menggunakan local driver (storage/app/public) untuk tahap awal.
Caching Strategy: Menggunakan Redis/File Cache untuk query data publik yang jarang berubah.
SEO & Meta Management:
OG Tags & Twitter Cards: Otomatis di-generate berdasarkan konten.
Sitemap XML: Generator otomatis rute publik.
Dynamic Meta: Meta title/description yang dapat disunting untuk artikel blog dan proyek.
3. Sprint Planning & Task Status
Pendekatan development dibagi menjadi beberapa sprint (tahapan) agar fokus dan terstruktur.

 🟢 Sprint 1: Foundation & Core Identity (Selesai)
Fokus membangun arsitektur dasar, dashboard awal, dan pengaturan profil utama.

 Setup Project & Auth (Breeze/Inertia React) - Sudah ada di codebase saat ini
 Module 1: Hero Section (Bio, Status, CV) - Selesai
 Module 2: Tech Stack & Skills Management - Selesai
 🟢 Sprint 2: Portfolio & Experience (Selesai)
Fokus pada memamerkan karya, karir, dan sertifikasi.

 Module 3: Project Management - Selesai
 Module 4: Experience / Work History - Selesai
 Module 6: Certifications & Achievements - Selesai
🟡 Sprint 3: Content & Interaction (Belum Dikerjakan)
Fokus pada layanan, artikel teknis, dan interaksi dengan pengunjung.

 Module 5: Services / Offertory
 Module 7: Blog / Tech Articles
 Module 8: Testimonials / Recommendations
 Module 9: Messages / Contact Inquiries
🟡 Sprint 4: Public UI & Finalization (Belum Dikerjakan)
Fokus pada desain halaman publik, SEO, dan optimasi.

 Desain dan Implementasi Landing Page Publik
 Integrasi seluruh data dari backend ke halaman publik
 Optimasi SEO & Image caching
4. Detailed Functional Requirements
Module 1: Hero Section
Description: Mengelola konten utama yang pertama kali dilihat pengunjung.
User Stories:
Admin: Saya dapat mengubah teks sapaan, deskripsi singkat, foto profil, link CV (PDF), dan status availability (misal: "Open to Work").
Visitor: Saya dapat melihat informasi profil terbaru dan mendownload CV.
Data Model (hero_settings table):
id (PK), greeting (String), full_name (String), short_bio (Text), profile_image_path (String, Nullable), cv_file_path (String, Nullable), availability_status (Enum: 'Available', 'Busy', 'Not Looking'), social_links (JSON), cta_text (String), cta_link (String).
Admin UI/UX: Form single-page di dashboard. Upload file untuk gambar dan PDF.
Public Endpoint: Data di-pass ke komponen Inertia publik.
Module 2: Tech Stack & Skills Management
Description: Mengelola daftar keahlian teknis.
User Stories:
Admin: Saya dapat menambah skill, memilih ikon, mengelompokkan ke kategori, dan mengatur level.
Data Model (skills table):
id (PK), name (String), category (Enum: 'Frontend', 'Backend', 'DevOps', 'Database', 'Tools'), icon_identifier (String), proficiency_level (Integer, 1-100), is_active (Boolean).
Admin UI/UX: Table list dengan kategori filter. Modal form untuk Create/Edit.
Module 3: Project Management
Description: Mengelola showcase proyek.
User Stories:
Admin: Saya dapat membuat proyek, deskripsi markdown, multi-gambar (galeri), menyematkan skill, dan fitur "Featured".
Data Model:
projects: id (PK), title (String), slug (String, Unique), thumbnail_path (String), content (LongText, Markdown), demo_url (String, Nullable), github_url (String, Nullable), is_featured (Boolean), status (Enum: 'Draft', 'Published').
project_galleries: id, project_id (FK), image_path (String), order (Integer).
project_skill (Pivot): project_id, skill_id.
Admin UI/UX: CRUD, Markdown editor, drag-and-drop file uploader, multiselect untuk tag Skill.
Module 4: Experience / Work History
Description: Timeline riwayat pekerjaan.
Data Model (experiences table):
id (PK), company_name (String), job_title (String), type (Enum: 'Full-time', 'Freelance'), start_date (Date), end_date (Date, Nullable), description (Text), is_active (Boolean).
Admin UI/UX: Form dengan date picker, checkbox "I currently work here".
Module 5: Services / Offertory
Description: Layanan yang ditawarkan dan harga.
Data Model (services table):
id (PK), title (String), description (Text), icon (String), pricing_model (String), starting_price (Decimal, Nullable), deliverables (JSON).
Admin UI/UX: CRUD tabel sederhana. Dynamic input fields untuk deliverables.
Module 6: Certifications & Achievements
Description: Kredensial teknis yang valid.
Data Model (certifications table):
id (PK), name (String), issuer (String), issue_date (Date), expiration_date (Date, Nullable), credential_url (String, Nullable), badge_image_path (String, Nullable).
Admin UI/UX: Form input dengan upload gambar badge.
Module 7: Blog / Tech Articles
Description: Publikasi tulisan teknis.
Data Model (articles table):
id (PK), title (String), slug (String, Unique), cover_image (String, Nullable), excerpt (Text), content (LongText, Markdown), meta_title (String), meta_description (String), status (Enum: 'Draft', 'Published'), published_at (Timestamp).
Admin UI/UX: Markdown Editor dengan preview. Tab pengaturan SEO.
Module 8: Testimonials / Recommendations
Description: Ulasan dari rekan kerja/klien.
Data Model (testimonials table):
id (PK), name (String), position (String), company (String), avatar_path (String, Nullable), quote (Text), is_visible (Boolean).
Admin UI/UX: CRUD sederhana dengan upload avatar.
Module 9: Messages / Contact Inquiries
Description: Mengelola pesan masuk dari form kontak.
Data Model (inquiries table):
id (PK), sender_name (String), sender_email (String), subject (String, Nullable), message (Text), is_read (Boolean, Default: false), created_at (Timestamp).
Admin UI/UX: List view inbox (Bold untuk unread), Detail view.
5. UI/UX & Workflow Architecture
Admin Panel Workflow:
Login melalui /login (Breeze).
Navigasi dashboard (Inertia React) yang tersentralisasi.
Form interaksi yang dikelola dengan komponen React (penggunaan useForm Inertia) dengan feedback state (loading, error, success).
Public Architecture:
Dikelola oleh Laravel Controller yang merender komponen Inertia React untuk halaman depan.
6. Future Enhancements / Roadmap
Analytics Dashboard (Google Analytics).
Multi-language (i18n).
Dark Mode Toggle.
