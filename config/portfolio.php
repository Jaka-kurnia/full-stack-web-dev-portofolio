<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Media Storage
    |--------------------------------------------------------------------------
    |
    | Disk publik yang dipakai untuk seluruh unggahan portofolio beserta
    | sub-folder di dalamnya. Batas ukuran unggahan dinyatakan dalam kilobyte.
    |
    */

    'disk' => 'public',

    'directories' => [
        'hero' => 'hero',
        'skills' => 'skills',
        'experiences' => 'experiences',
        'certifications' => 'certifications',
        'projects' => 'projects',
        'project_galleries' => 'projects/galleries',
    ],

    'max_upload_kb' => [
        'image' => 2048,
        'cv' => 5120,
    ],

    /*
    |--------------------------------------------------------------------------
    | Nilai Enum
    |--------------------------------------------------------------------------
    |
    | Satu-satunya sumber kebenaran untuk opsi dropdown maupun validasi
    | backend, sehingga form dan database tidak pernah lagi tidak sinkron.
    |
    */

    'skill_categories' => ['Frontend', 'Backend', 'DevOps', 'Database', 'Tools'],

    'experience_types' => ['Full-time', 'Freelance'],

    'project_statuses' => ['Draft', 'Published'],

    'availability_statuses' => ['Available', 'Busy', 'Not Looking'],

];
