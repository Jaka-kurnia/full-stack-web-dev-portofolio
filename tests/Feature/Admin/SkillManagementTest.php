<?php

namespace Tests\Feature\Admin;

use App\Models\Skill;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\Concerns\PortfolioAdmin;
use Tests\TestCase;

class SkillManagementTest extends TestCase
{
    use PortfolioAdmin;
    use RefreshDatabase;

    public function test_admin_can_list_skills_with_available_categories(): void
    {
        Skill::factory()->count(2)->create();

        $this->actingAs($this->createAdmin())
            ->get(route('admin.skills.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Admin/Skill/Index')
                ->has('skills', 2)
                ->where('categories', config('portfolio.skill_categories')));
    }

    public function test_skill_can_be_created(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.skills.store'), [
                'name' => 'Vue.js',
                'category' => 'Frontend',
                'icon_identifier' => 'devicon-vuejs',
                'proficiency_level' => 75,
                'is_active' => '1',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('skills', [
            'name' => 'Vue.js',
            'category' => 'Frontend',
            'is_active' => 1,
        ]);
    }

    public function test_category_outside_the_configured_list_is_rejected(): void
    {
        // "Soft Skill" pernah ditawarkan oleh form namun tidak ada di enum
        // database sehingga menyebabkan error 500.
        $this->actingAs($this->createAdmin())
            ->from(route('admin.skills.index'))
            ->post(route('admin.skills.store'), [
                'name' => 'Communication',
                'category' => 'Soft Skill',
                'proficiency_level' => 50,
            ])
            ->assertSessionHasErrors('category');

        $this->assertDatabaseCount('skills', 0);
    }

    public function test_skill_can_be_created_without_an_icon_identifier(): void
    {
        // icon_identifier dulu NOT NULL padahal form mengizinkan gambar saja.
        $this->actingAs($this->createAdmin())
            ->post(route('admin.skills.store'), [
                'name' => 'Figma',
                'category' => 'Tools',
                'icon_identifier' => '',
                'proficiency_level' => 80,
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('skills', ['name' => 'Figma']);
    }

    public function test_updating_a_skill_replaces_the_image_and_deletes_the_old_file(): void
    {
        Storage::fake('public');

        $skill = Skill::factory()->create([
            'image_path' => UploadedFile::fake()->image('old.png')->store('skills', 'public'),
        ]);
        $oldPath = $skill->image_path;

        $this->actingAs($this->createAdmin())
            ->post(route('admin.skills.update', $skill), [
                '_method' => 'PUT',
                'name' => $skill->name,
                'category' => $skill->category,
                'icon_identifier' => $skill->icon_identifier,
                'proficiency_level' => 90,
                'image' => UploadedFile::fake()->image('new.png'),
            ])
            ->assertSessionHasNoErrors();

        $skill->refresh();

        $this->assertNotSame($oldPath, $skill->image_path);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($skill->image_path);
    }

    public function test_updating_without_a_new_file_keeps_the_existing_image(): void
    {
        Storage::fake('public');

        $skill = Skill::factory()->create([
            'image_path' => UploadedFile::fake()->image('keep.png')->store('skills', 'public'),
        ]);
        $currentPath = $skill->image_path;

        $this->actingAs($this->createAdmin())
            ->post(route('admin.skills.update', $skill), [
                '_method' => 'PUT',
                'name' => 'Renamed',
                'category' => $skill->category,
                'icon_identifier' => $skill->icon_identifier,
                'proficiency_level' => 42,
            ])
            ->assertSessionHasNoErrors();

        $this->assertSame($currentPath, $skill->refresh()->image_path);
        Storage::disk('public')->assertExists($currentPath);
    }

    public function test_deleting_a_skill_removes_its_image_file(): void
    {
        Storage::fake('public');

        $skill = Skill::factory()->create([
            'image_path' => UploadedFile::fake()->image('icon.png')->store('skills', 'public'),
        ]);
        $path = $skill->image_path;

        $this->actingAs($this->createAdmin())
            ->delete(route('admin.skills.destroy', $skill))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('skills', ['id' => $skill->id]);
        Storage::disk('public')->assertMissing($path);
    }
}
