<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = \App\Models\Project::with('skills')->orderBy('created_at', 'desc')->get();
        return inertia('Admin/Project/Index', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        return inertia('Admin/Project/Form', [
            'project' => new \App\Models\Project(),
            'allSkills' => \App\Models\Skill::where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'content' => 'nullable|string',
            'demo_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'is_featured' => 'boolean',
            'status' => 'required|in:Draft,Published',
            'thumbnail' => 'nullable|image|max:2048',
            'skills' => 'nullable|array',
            'galleries.*' => 'image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail_path'] = $request->file('thumbnail')->store('projects', 'public');
        }

        $project = \App\Models\Project::create($validated);

        if ($request->has('skills')) {
            $project->skills()->sync($request->skills);
        }

        if ($request->hasFile('galleries')) {
            foreach ($request->file('galleries') as $index => $image) {
                $path = $image->store('projects/galleries', 'public');
                $project->galleries()->create([
                    'image_path' => $path,
                    'order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(\App\Models\Project $project)
    {
        $project->load('skills', 'galleries');
        return inertia('Admin/Project/Form', [
            'project' => $project,
            'allSkills' => \App\Models\Skill::where('is_active', true)->get(),
        ]);
    }

    public function update(Request $request, \App\Models\Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $project->id,
            'content' => 'nullable|string',
            'demo_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'is_featured' => 'boolean',
            'status' => 'required|in:Draft,Published',
            'thumbnail' => 'nullable|image|max:2048',
            'skills' => 'nullable|array',
            'galleries.*' => 'image|max:2048',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($project->thumbnail_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($project->thumbnail_path);
            }
            $validated['thumbnail_path'] = $request->file('thumbnail')->store('projects', 'public');
        }

        $project->update($validated);

        if ($request->has('skills')) {
            $project->skills()->sync($request->skills);
        }

        if ($request->hasFile('galleries')) {
            foreach ($request->file('galleries') as $index => $image) {
                $path = $image->store('projects/galleries', 'public');
                $project->galleries()->create([
                    'image_path' => $path,
                    'order' => $project->galleries()->count() + $index,
                ]);
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(\App\Models\Project $project)
    {
        if ($project->thumbnail_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($project->thumbnail_path);
        }
        foreach ($project->galleries as $gallery) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($gallery->image_path);
        }
        $project->delete();
        return redirect()->back()->with('success', 'Project deleted successfully.');
    }
}
