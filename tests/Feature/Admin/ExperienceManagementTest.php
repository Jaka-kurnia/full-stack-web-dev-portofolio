<?php

namespace Tests\Feature\Admin;

use App\Models\Experience;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\Concerns\PortfolioAdmin;
use Tests\TestCase;

class ExperienceManagementTest extends TestCase
{
    use PortfolioAdmin;
    use RefreshDatabase;

    public function test_experience_can_be_created(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.experiences.store'), [
                'company_name' => 'ACME',
                'job_title' => 'Backend Developer',
                'type' => 'Full-time',
                'start_date' => '2024-01-01',
                'end_date' => '2024-12-31',
                'description' => 'Membangun API.',
                'is_active' => '1',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('experiences', ['company_name' => 'ACME', 'type' => 'Full-time']);
    }

    public function test_end_date_must_not_precede_start_date(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.experiences.store'), [
                'company_name' => 'ACME',
                'job_title' => 'Backend Developer',
                'type' => 'Freelance',
                'start_date' => '2024-06-01',
                'end_date' => '2024-01-01',
            ])
            ->assertSessionHasErrors('end_date');
    }

    public function test_experience_type_must_be_one_of_the_configured_types(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.experiences.store'), [
                'company_name' => 'ACME',
                'job_title' => 'Intern',
                'type' => 'Contract',
                'start_date' => '2024-01-01',
            ])
            ->assertSessionHasErrors('type');
    }

    public function test_updating_an_experience_replaces_its_image(): void
    {
        Storage::fake('public');

        $experience = Experience::factory()->create([
            'image_path' => UploadedFile::fake()->image('old.png')->store('experiences', 'public'),
        ]);
        $oldPath = $experience->image_path;

        $this->actingAs($this->createAdmin())
            ->post(route('admin.experiences.update', $experience), [
                '_method' => 'PUT',
                'company_name' => $experience->company_name,
                'job_title' => $experience->job_title,
                'type' => $experience->type,
                'start_date' => $experience->start_date->format('Y-m-d'),
                'image' => UploadedFile::fake()->image('new.png'),
            ])
            ->assertSessionHasNoErrors();

        $experience->refresh();

        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($experience->image_path);
    }

    public function test_deleting_an_experience_removes_its_image_file(): void
    {
        Storage::fake('public');

        $experience = Experience::factory()->create([
            'image_path' => UploadedFile::fake()->image('logo.png')->store('experiences', 'public'),
        ]);
        $path = $experience->image_path;

        $this->actingAs($this->createAdmin())
            ->delete(route('admin.experiences.destroy', $experience))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('experiences', ['id' => $experience->id]);
        Storage::disk('public')->assertMissing($path);
    }
}
