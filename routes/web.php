<?php

use App\Http\Controllers\CertificationController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\HeroSettingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class);

Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin Panel
|--------------------------------------------------------------------------
|
| Seluruh rute konten hanya dapat diakses oleh akun terautentikasi,
| terverifikasi, dan ber-role admin (lihat EnsureUserIsAdmin).
|
| Catatan: `Route::resource('admin/skills', ...)` menghasilkan URI `admin/skills`
| tetapi nama rute hanya `skills.*`, sehingga prefiks `admin.` ditetapkan
| secara eksplisit lewat `->names()` agar konsisten dengan `admin.hero.*`.
|
*/
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin/hero', [HeroSettingController::class, 'edit'])->name('admin.hero.edit');
    Route::put('/admin/hero', [HeroSettingController::class, 'update'])->name('admin.hero.update');

    Route::resource('admin/skills', SkillController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('admin.skills');

    Route::resource('admin/experiences', ExperienceController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('admin.experiences');

    Route::resource('admin/certifications', CertificationController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('admin.certifications');

    Route::resource('admin/quotes', QuoteController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('admin.quotes');

    Route::resource('admin/projects', ProjectController::class)
        ->except(['show'])
        ->names('admin.projects');
});

require __DIR__.'/auth.php';
