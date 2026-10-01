<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = \App\Models\Experience::orderBy('start_date', 'desc')->get();
        return inertia('Admin/Experience/Index', [
            'experiences' => $experiences
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'type' => 'required|in:Full-time,Freelance',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('experiences', 'public');
        }

        \App\Models\Experience::create($validated);

        return redirect()->back()->with('success', 'Experience added successfully.');
    }

    public function update(Request $request, \App\Models\Experience $experience)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'type' => 'required|in:Full-time,Freelance',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($experience->image_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($experience->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('experiences', 'public');
        }

        $experience->update($validated);

        return redirect()->back()->with('success', 'Experience updated successfully.');
    }

    public function destroy(\App\Models\Experience $experience)
    {
        $experience->delete();
        return redirect()->back()->with('success', 'Experience deleted successfully.');
    }
}
