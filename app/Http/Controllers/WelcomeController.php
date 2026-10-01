<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Experience;
use App\Models\HeroSetting;
use App\Models\Project;
use App\Models\Quote;
use App\Models\Skill;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Halaman publik (landing page) portofolio.
 *
 * Seluruh query yang tampil di halaman depan berkumpul di sini,
 * bukan di closure routes maupun tiap controller admin.
 */
class WelcomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'hero' => HeroSetting::first(),
            'skills' => Skill::query()->active()->ordered()->get(),
            'projects' => Project::query()->published()->with(['skills', 'galleries'])->latest('created_at')->get(),
            'experiences' => Experience::query()->active()->latest('start_date')->get(),
            'certifications' => Certification::query()->latest('issue_date')->get(),
            'quotes' => Quote::query()->active()->get(),
        ]);
    }
}
