<?php

namespace Tests\Feature\Admin;

use App\Models\HeroSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\Concerns\PortfolioAdmin;
use Tests\TestCase;

class HeroSettingManagementTest extends TestCase
{
    use PortfolioAdmin;
    use RefreshDatabase;

    public function test_admin_can_open_the_hero_settings_page(): void
    {
        $this->actingAs($this->createAdmin())
            ->get(route('admin.hero.edit'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Admin/HeroSetting/Edit')
                ->where('availabilityStatuses', config('portfolio.availability_statuses')));
    }

    public function test_hero_settings_can_be_updated_without_touching_existing_files(): void
    {
        Storage::fake('public');

        $hero = HeroSetting::factory()->create([
            'profile_image_path' => UploadedFile::fake()->image('me.png')->store('hero', 'public'),
        ]);
        $currentImage = $hero->profile_image_path;

        $this->actingAs($this->createAdmin())
            ->post(route('admin.hero.update'), [
                '_method' => 'PUT',
                'greeting' => 'Halo, saya',
                'full_name' => 'Jaka Kurnia',
                'short_bio' => 'Bio singkat.',
                'about_text' => 'Tentang saya.',
                'availability_status' => 'Busy',
                'cta_text' => 'Hubungi Saya',
                'cta_link' => 'mailto:hi@example.com',
            ])
            ->assertSessionHasNoErrors();

        $hero->refresh();

        $this->assertSame('Busy', $hero->availability_status);
        $this->assertSame($currentImage, $hero->profile_image_path);
        Storage::disk('public')->assertExists($currentImage);
    }

    public function test_replacing_the_profile_image_removes_the_previous_file(): void
    {
        Storage::fake('public');

        $hero = HeroSetting::factory()->create([
            'profile_image_path' => UploadedFile::fake()->image('old.png')->store('hero', 'public'),
            'cv_file_path' => UploadedFile::fake()->create('cv.pdf', 10, 'application/pdf')->store('hero', 'public'),
        ]);
        $oldImage = $hero->profile_image_path;
        $oldCv = $hero->cv_file_path;

        $this->actingAs($this->createAdmin())
            ->post(route('admin.hero.update'), [
                '_method' => 'PUT',
                'greeting' => 'Halo, saya',
                'full_name' => 'Jaka Kurnia',
                'short_bio' => 'Bio singkat.',
                'availability_status' => 'Available',
                'cta_text' => 'Hubungi Saya',
                'cta_link' => '#contact',
                'profile_image' => UploadedFile::fake()->image('new.png'),
                'cv_file' => UploadedFile::fake()->create('new-cv.pdf', 10, 'application/pdf'),
            ])
            ->assertSessionHasNoErrors();

        $hero->refresh();

        Storage::disk('public')->assertMissing($oldImage);
        Storage::disk('public')->assertMissing($oldCv);
        Storage::disk('public')->assertExists($hero->profile_image_path);
        Storage::disk('public')->assertExists($hero->cv_file_path);
    }

    public function test_hero_settings_can_be_created_from_scratch(): void
    {
        $this->assertDatabaseCount('hero_settings', 0);

        $this->actingAs($this->createAdmin())
            ->post(route('admin.hero.update'), [
                '_method' => 'PUT',
                'greeting' => 'Halo, saya',
                'full_name' => 'Pemula',
                'short_bio' => 'Belajar Laravel.',
                'availability_status' => 'Available',
                'cta_text' => 'Kontak',
                'cta_link' => '#contact',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseCount('hero_settings', 1);
        $this->assertDatabaseHas('hero_settings', ['full_name' => 'Pemula']);
    }

    public function test_unknown_availability_status_is_rejected(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.hero.update'), [
                '_method' => 'PUT',
                'greeting' => 'Halo',
                'full_name' => 'X',
                'short_bio' => 'Y',
                'availability_status' => 'Sleeping',
                'cta_text' => 'Kontak',
                'cta_link' => '#contact',
            ])
            ->assertSessionHasErrors('availability_status');
    }
}
