<?php

namespace App\Http\Controllers;

use App\Http\Requests\SkillRequest;
use App\Models\Skill;
use App\Services\MediaStorage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function __construct(private readonly MediaStorage $media) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Skill/Index', [
            'skills' => Skill::query()->ordered()->get(),
            'categories' => config('portfolio.skill_categories'),
        ]);
    }

    public function store(SkillRequest $request): RedirectResponse
    {
        Skill::create($this->media->withUpload(
            data: $request->validated(),
            field: 'image',
            pathField: 'image_path',
            directory: config('portfolio.directories.skills'),
        ));

        return back()->with('success', 'Skill added successfully.');
    }

    public function update(SkillRequest $request, Skill $skill): RedirectResponse
    {
        $skill->update($this->media->withUpload(
            data: $request->validated(),
            field: 'image',
            pathField: 'image_path',
            directory: config('portfolio.directories.skills'),
            currentPath: $skill->image_path,
        ));

        return back()->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $this->media->delete($skill->image_path);
        $skill->delete();

        return back()->with('success', 'Skill deleted successfully.');
    }
}
