<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'hero' => \App\Models\HeroSetting::first(),
        'skills' => \App\Models\Skill::where('is_active', true)->orderBy('category')->orderBy('proficiency_level', 'desc')->get(),
        'projects' => \App\Models\Project::with(['skills', 'galleries'])->where('status', 'Published')->orderBy('created_at', 'desc')->get(),
        'experiences' => \App\Models\Experience::where('is_active', true)->orderBy('start_date', 'desc')->get(),
        'certifications' => \App\Models\Certification::orderBy('issue_date', 'desc')->get(),
        'quotes' => \App\Models\Quote::where('is_active', true)->get(),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Hero Settings
    Route::get('/admin/hero', [\App\Http\Controllers\HeroSettingController::class, 'edit'])->name('admin.hero.edit');
    Route::post('/admin/hero', [\App\Http\Controllers\HeroSettingController::class, 'update'])->name('admin.hero.update');

    // Skills
    Route::get('/admin/skills', [\App\Http\Controllers\SkillController::class, 'index'])->name('admin.skills.index');
    Route::post('/admin/skills', [\App\Http\Controllers\SkillController::class, 'store'])->name('admin.skills.store');
    Route::put('/admin/skills/{skill}', [\App\Http\Controllers\SkillController::class, 'update'])->name('admin.skills.update');
    Route::delete('/admin/skills/{skill}', [\App\Http\Controllers\SkillController::class, 'destroy'])->name('admin.skills.destroy');

    // Experiences
    Route::get('/admin/experiences', [\App\Http\Controllers\ExperienceController::class, 'index'])->name('admin.experiences.index');
    Route::post('/admin/experiences', [\App\Http\Controllers\ExperienceController::class, 'store'])->name('admin.experiences.store');
    Route::put('/admin/experiences/{experience}', [\App\Http\Controllers\ExperienceController::class, 'update'])->name('admin.experiences.update');
    Route::delete('/admin/experiences/{experience}', [\App\Http\Controllers\ExperienceController::class, 'destroy'])->name('admin.experiences.destroy');

    // Certifications
    Route::get('/admin/certifications', [\App\Http\Controllers\CertificationController::class, 'index'])->name('admin.certifications.index');
    Route::post('/admin/certifications', [\App\Http\Controllers\CertificationController::class, 'store'])->name('admin.certifications.store');
    Route::put('/admin/certifications/{certification}', [\App\Http\Controllers\CertificationController::class, 'update'])->name('admin.certifications.update');
    Route::delete('/admin/certifications/{certification}', [\App\Http\Controllers\CertificationController::class, 'destroy'])->name('admin.certifications.destroy');

    // Quotes
    Route::get('/admin/quotes', [\App\Http\Controllers\QuoteController::class, 'index'])->name('admin.quotes.index');
    Route::post('/admin/quotes', [\App\Http\Controllers\QuoteController::class, 'store'])->name('admin.quotes.store');
    Route::put('/admin/quotes/{quote}', [\App\Http\Controllers\QuoteController::class, 'update'])->name('admin.quotes.update');
    Route::delete('/admin/quotes/{quote}', [\App\Http\Controllers\QuoteController::class, 'destroy'])->name('admin.quotes.destroy');

    // Projects
    Route::get('/admin/projects', [\App\Http\Controllers\ProjectController::class, 'index'])->name('admin.projects.index');
    Route::get('/admin/projects/create', [\App\Http\Controllers\ProjectController::class, 'create'])->name('admin.projects.create');
    Route::post('/admin/projects', [\App\Http\Controllers\ProjectController::class, 'store'])->name('admin.projects.store');
    Route::get('/admin/projects/{project}/edit', [\App\Http\Controllers\ProjectController::class, 'edit'])->name('admin.projects.edit');
    Route::post('/admin/projects/{project}', [\App\Http\Controllers\ProjectController::class, 'update'])->name('admin.projects.update'); // Using POST for file uploads with spoofed PUT method, actually inertia useForm PUT handles spoofing but standard file upload might need POST.
    Route::put('/admin/projects/{project}', [\App\Http\Controllers\ProjectController::class, 'update'])->name('admin.projects.update.put');
    Route::delete('/admin/projects/{project}', [\App\Http\Controllers\ProjectController::class, 'destroy'])->name('admin.projects.destroy');
});

require __DIR__.'/auth.php';
