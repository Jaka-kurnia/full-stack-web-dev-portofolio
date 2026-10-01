<?php

namespace App\Http\Controllers;

use App\Http\Requests\HeroSettingRequest;
use App\Models\HeroSetting;
use App\Services\MediaStorage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class HeroSettingController extends Controller
{
    public function __construct(private readonly MediaStorage $media) {}

    public function edit(): Response
    {
        return Inertia::render('Admin/HeroSetting/Edit', [
            'heroSetting' => HeroSetting::first() ?? new HeroSetting,
            'availabilityStatuses' => config('portfolio.availability_statuses'),
        ]);
    }

    public function update(HeroSettingRequest $request): RedirectResponse
    {
        $heroSetting = HeroSetting::first() ?? new HeroSetting;
        $directory = config('portfolio.directories.hero');

        $data = $this->media->withUpload(
            data: $request->validated(),
            field: 'profile_image',
            pathField: 'profile_image_path',
            directory: $directory,
            currentPath: $heroSetting->profile_image_path,
        );

        $data = $this->media->withUpload(
            data: $data,
            field: 'cv_file',
            pathField: 'cv_file_path',
            directory: $directory,
            currentPath: $heroSetting->cv_file_path,
        );

        $heroSetting->fill($data)->save();

        return back()->with('success', 'Hero settings updated successfully.');
    }
}
