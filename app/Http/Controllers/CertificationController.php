<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CertificationController extends Controller
{
    public function index()
    {
        $certifications = \App\Models\Certification::orderBy('issue_date', 'desc')->get();
        return inertia('Admin/Certification/Index', [
            'certifications' => $certifications
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'required|date',
            'expiration_date' => 'nullable|date|after_or_equal:issue_date',
            'credential_url' => 'nullable|url|max:255',
            'badge_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('badge_image')) {
            $validated['badge_image_path'] = $request->file('badge_image')->store('certifications', 'public');
        }

        \App\Models\Certification::create($validated);

        return redirect()->back()->with('success', 'Certification added successfully.');
    }

    public function update(Request $request, \App\Models\Certification $certification)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'issue_date' => 'required|date',
            'expiration_date' => 'nullable|date|after_or_equal:issue_date',
            'credential_url' => 'nullable|url|max:255',
            'badge_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('badge_image')) {
            if ($certification->badge_image_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($certification->badge_image_path);
            }
            $validated['badge_image_path'] = $request->file('badge_image')->store('certifications', 'public');
        }

        $certification->update($validated);

        return redirect()->back()->with('success', 'Certification updated successfully.');
    }

    public function destroy(\App\Models\Certification $certification)
    {
        if ($certification->badge_image_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($certification->badge_image_path);
        }
        $certification->delete();
        return redirect()->back()->with('success', 'Certification deleted successfully.');
    }
}
