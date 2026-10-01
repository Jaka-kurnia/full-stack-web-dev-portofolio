<?php

namespace Tests\Feature\Admin;

use App\Models\Project;
use App\Models\Skill;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\Concerns\PortfolioAdmin;
use Tests\TestCase;

class ProjectManagementTest extends TestCase
{
    use PortfolioAdmin;
    use RefreshDatabase;

    public function test_project_can_be_created_with_skills(): void
    {
        $skill = Skill::factory()->create();

        $this->actingAs($this->createAdmin())
            ->post(route('admin.projects.store'), [
                'title' => 'Portfolio CMS',
                'slug' => 'portfolio-cms',
                'content' => 'Sebuah CMS.',
                'status' => 'Published',
                'skills' => [$skill->id],
            ])
            ->assertRedirect(route('admin.projects.index'))
            ->assertSessionHasNoErrors();

        $project = Project::firstOrFail();
        $this->assertTrue($project->status === 'Published');
        $this->assertTrue($project->skills->contains($skill));
    }

    public function test_slug_must_be_unique(): void
    {
        Project::factory()->create(['slug' => 'taken-slug']);

        $this->actingAs($this->createAdmin())
            ->from(route('admin.projects.create'))
            ->post(route('admin.projects.store'), [
                'title' => 'Another',
                'slug' => 'taken-slug',
                'status' => 'Draft',
            ])
            ->assertSessionHasErrors('slug');
    }

    public function test_slug_may_keep_its_own_value_when_updating(): void
    {
        $project = Project::factory()->create(['slug' => 'my-project']);

        $this->actingAs($this->createAdmin())
            ->post(route('admin.projects.update', $project), [
                '_method' => 'PUT',
                'title' => 'My Project',
                'slug' => 'my-project',
                'status' => 'Draft',
            ])
            ->assertSessionHasNoErrors();

        $this->assertSame('my-project', $project->refresh()->slug);
    }

    public function test_update_uses_method_spoofing_through_a_single_put_route(): void
    {
        // Rute POST duplikat untuk update sudah dihapus; form mengirim
        // POST + _method=PUT sehingga wajib tetap diterima.
        $project = Project::factory()->create(['title' => 'Before']);

        $this->actingAs($this->createAdmin())
            ->post(route('admin.projects.update', $project), [
                '_method' => 'PUT',
                'title' => 'After',
                'slug' => $project->slug,
                'status' => 'Published',
            ])
            ->assertSessionHasNoErrors();

        $this->assertSame('After', $project->refresh()->title);
    }

    public function test_updating_without_a_skills_payload_detaches_every_skill(): void
    {
        $project = Project::factory()->create();
        $project->skills()->attach(Skill::factory()->create());
        $this->assertCount(1, $project->skills);

        $this->actingAs($this->createAdmin())
            ->post(route('admin.projects.update', $project), [
                '_method' => 'PUT',
                'title' => $project->title,
                'slug' => $project->slug,
                'status' => $project->status,
            ])
            ->assertSessionHasNoErrors();

        $this->assertCount(0, $project->refresh()->skills);
    }

    public function test_gallery_order_is_sequential_across_uploads(): void
    {
        Storage::fake('public');

        $project = Project::factory()->create();

        $this->actingAs($this->createAdmin())
            ->post(route('admin.projects.update', $project), [
                '_method' => 'PUT',
                'title' => $project->title,
                'slug' => $project->slug,
                'status' => $project->status,
                'galleries' => [
                    UploadedFile::fake()->image('one.png'),
                    UploadedFile::fake()->image('two.png'),
                ],
            ])
            ->assertSessionHasNoErrors();

        $this->actingAs($this->createAdmin())
            ->post(route('admin.projects.update', $project), [
                '_method' => 'PUT',
                'title' => $project->title,
                'slug' => $project->slug,
                'status' => $project->status,
                'galleries' => [UploadedFile::fake()->image('three.png')],
            ])
            ->assertSessionHasNoErrors();

        $this->assertSame([1, 2, 3], $project->galleries()->pluck('order')->sort()->values()->all());
    }

    public function test_deleting_a_project_removes_thumbnail_and_gallery_files(): void
    {
        Storage::fake('public');

        $project = Project::factory()->create([
            'thumbnail_path' => UploadedFile::fake()->image('thumb.png')->store('projects', 'public'),
        ]);
        $project->galleries()->create([
            'image_path' => UploadedFile::fake()->image('g.png')->store('projects/galleries', 'public'),
            'order' => 1,
        ]);

        $thumbnail = $project->thumbnail_path;
        $gallery = $project->galleries()->first()->image_path;

        $this->actingAs($this->createAdmin())
            ->delete(route('admin.projects.destroy', $project))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        Storage::disk('public')->assertMissing($thumbnail);
        Storage::disk('public')->assertMissing($gallery);
    }

    public function test_invalid_project_status_is_rejected(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.projects.store'), [
                'title' => 'X',
                'slug' => 'x-'.uniqid(),
                'status' => 'Archived',
            ])
            ->assertSessionHasErrors('status');
    }
}
