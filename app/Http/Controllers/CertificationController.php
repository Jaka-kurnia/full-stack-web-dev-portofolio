<?php

namespace App\Http\Controllers;

use App\Http\Requests\CertificationRequest;
use App\Models\Certification;
use App\Services\MediaStorage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    public function __construct(private readonly MediaStorage $media) {}

    public function index(): Response
    {
        return Inertia::render('Admin/Certification/Index', [
            'certifications' => Certification::query()->latest('issue_date')->get(),
        ]);
    }

    public function store(CertificationRequest $request): RedirectResponse
    {
        Certification::create($this->media->withUpload(
            data: $request->validated(),
            field: 'badge_image',
            pathField: 'badge_image_path',
            directory: config('portfolio.directories.certifications'),
        ));

        return back()->with('success', 'Certification added successfully.');
    }

    public function update(CertificationRequest $request, Certification $certification): RedirectResponse
    {
        $certification->update($this->media->withUpload(
            data: $request->validated(),
            field: 'badge_image',
            pathField: 'badge_image_path',
            directory: config('portfolio.directories.certifications'),
            currentPath: $certification->badge_image_path,
        ));

        return back()->with('success', 'Certification updated successfully.');
    }

    public function destroy(Certification $certification): RedirectResponse
    {
        $this->media->delete($certification->badge_image_path);
        $certification->delete();

        return back()->with('success', 'Certification deleted successfully.');
    }
}
