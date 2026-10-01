<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExperienceRequest;
use App\Models\Experience;
use App\Services\MediaStorage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function __construct(private readonly MediaStorage $media) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Experience/Index', [
            'experiences' => Experience::query()->latest('start_date')->get(),
            'types' => config('portfolio.experience_types'),
        ]);
    }

    public function store(ExperienceRequest $request): RedirectResponse
    {
        Experience::create($this->media->withUpload(
            data: $request->validated(),
            field: 'image',
            pathField: 'image_path',
            directory: config('portfolio.directories.experiences'),
        ));

        return back()->with('success', 'Experience added successfully.');
    }

    public function update(ExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $experience->update($this->media->withUpload(
            data: $request->validated(),
            field: 'image',
            pathField: 'image_path',
            directory: config('portfolio.directories.experiences'),
            currentPath: $experience->image_path,
        ));

        return back()->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $this->media->delete($experience->image_path);
        $experience->delete();

        return back()->with('success', 'Experience deleted successfully.');
    }
}
