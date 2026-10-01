<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HeroSettingController extends Controller
{
    public function edit()
    {
        $heroSetting = \App\Models\HeroSetting::first() ?? new \App\Models\HeroSetting();
        return inertia('Admin/HeroSetting/Edit', [
            'heroSetting' => $heroSetting
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'greeting' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'short_bio' => 'required|string',
            'about_text' => 'nullable|string',
            'availability_status' => 'required|in:Available,Busy,Not Looking',
            'cta_text' => 'required|string|max:255',
            'cta_link' => 'required|string|max:255',
            'social_links' => 'nullable|array',
            'profile_image' => 'nullable|image|max:2048',
            'cv_file' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        $heroSetting = \App\Models\HeroSetting::first() ?? new \App\Models\HeroSetting();

        if ($request->hasFile('profile_image')) {
            if ($heroSetting->profile_image_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($heroSetting->profile_image_path);
            }
            $validated['profile_image_path'] = $request->file('profile_image')->store('hero', 'public');
        }

        if ($request->hasFile('cv_file')) {
            if ($heroSetting->cv_file_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($heroSetting->cv_file_path);
            }
            $validated['cv_file_path'] = $request->file('cv_file')->store('hero', 'public');
        }

        $heroSetting->fill($validated);
        $heroSetting->save();

        return redirect()->back()->with('success', 'Hero settings updated successfully.');
    }
}
