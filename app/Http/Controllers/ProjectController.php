<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\Skill;
use App\Services\MediaStorage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(private readonly MediaStorage $media) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Project/Index', [
            'projects' => Project::with('skills')->latest()->get(),
            'statuses' => config('portfolio.project_statuses'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Project/Form', [
            'project' => new Project,
            'allSkills' => $this->selectableSkills(),
            'statuses' => config('portfolio.project_statuses'),
        ]);
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        $payload = $this->payload($request);

        $project = Project::create($payload['attributes']);
        $project->skills()->sync($payload['skills']);
        $this->storeGalleries($project, $payload['galleries']);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        $project->load(['skills', 'galleries']);

        return Inertia::render('Admin/Project/Form', [
            'project' => $project,
            'allSkills' => $this->selectableSkills(),
            'statuses' => config('portfolio.project_statuses'),
        ]);
    }

    public function update(ProjectRequest $request, Project $project): RedirectResponse
    {
        $payload = $this->payload($request, $project);

        $project->update($payload['attributes']);
        $project->skills()->sync($payload['skills']);
        $this->storeGalleries($project, $payload['galleries']);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->media->delete($project->thumbnail_path);
        $this->media->deleteAll($project->galleries->pluck('image_path'));

        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
    }

    /**
     * Pisahkan atribut yang boleh di-mass-assign dari data relasi/file,
     * sekaligus tangani penggantian thumbnail.
     *
     * @return array{attributes: array<string, mixed>, skills: array<int, int>, galleries: array<int, UploadedFile>}
     */
    private function payload(ProjectRequest $request, ?Project $project = null): array
    {
        $data = $request->validated();
        $skills = $data['skills'];
        $galleries = $data['galleries'];
        unset($data['skills'], $data['galleries']);

        return [
            'attributes' => $this->media->withUpload(
                data: $data,
                field: 'thumbnail',
                pathField: 'thumbnail_path',
                directory: config('portfolio.directories.projects'),
                currentPath: $project?->thumbnail_path,
            ),
            'skills' => $skills,
            'galleries' => $galleries,
        ];
    }

    /**
     * @param  array<int, UploadedFile>  $files
     */
    private function storeGalleries(Project $project, array $files): void
    {
        // Baca order tertinggi sekali sebelum loop: nilai yang dihitung di
        // dalam loop akan basi karena baris sudah terlanjur ter-insert.
        $order = (int) $project->galleries->max('order') + 1;

        foreach ($this->media->storeMany($files, config('portfolio.directories.project_galleries')) as $path) {
            $project->galleries()->create([
                'image_path' => $path,
                'order' => $order++,
            ]);
        }
    }

    private function selectableSkills()
    {
        return Skill::query()->active()->get();
    }
}
