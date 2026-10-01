<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('category')->orderBy('proficiency_level', 'desc')->get();
        return Inertia::render('Admin/Skill/Index', [
            'skills' => $skills
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'icon_identifier' => 'nullable|string|max:255',
            'proficiency_level' => 'required|integer|min:0|max:100',
            'image' => 'nullable|image|max:2048',
        ]);

        $validated['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : true;

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('skills', 'public');
        }

        Skill::create($validated);
        return redirect()->back()->with('success', 'Skill added successfully.');
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'icon_identifier' => 'nullable|string|max:255',
            'proficiency_level' => 'required|integer|min:0|max:100',
            'image' => 'nullable|image|max:2048',
        ]);

        $validated['is_active'] = $request->has('is_active') ? $request->boolean('is_active') : true;

        if ($request->hasFile('image')) {
            if ($skill->image_path) {
                Storage::disk('public')->delete($skill->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('skills', 'public');
        }

        $skill->update($validated);
        return redirect()->back()->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        if ($skill->image_path) {
            Storage::disk('public')->delete($skill->image_path);
        }
        $skill->delete();
        return redirect()->back()->with('success', 'Skill deleted successfully.');
    }
}
