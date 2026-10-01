<?php

namespace Tests\Feature\Admin;

use App\Models\Certification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\Concerns\PortfolioAdmin;
use Tests\TestCase;

class CertificationManagementTest extends TestCase
{
    use PortfolioAdmin;
    use RefreshDatabase;

    public function test_certification_can_be_created(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.certifications.store'), [
                'name' => 'Laravel Certified',
                'issuer' => 'Laravel',
                'issue_date' => '2025-01-15',
                'credential_url' => 'https://example.com/credential',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('certifications', ['name' => 'Laravel Certified']);
    }

    public function test_expiration_date_must_not_precede_issue_date(): void
    {
        $this->actingAs($this->createAdmin())
            ->post(route('admin.certifications.store'), [
                'name' => 'Expired',
                'issuer' => 'ACME',
                'issue_date' => '2025-06-01',
                'expiration_date' => '2025-01-01',
            ])
            ->assertSessionHasErrors('expiration_date');
    }

    public function test_deleting_a_certification_removes_its_badge_file(): void
    {
        Storage::fake('public');

        $certification = Certification::factory()->create([
            'badge_image_path' => UploadedFile::fake()->image('badge.png')->store('certifications', 'public'),
        ]);
        $path = $certification->badge_image_path;

        $this->actingAs($this->createAdmin())
            ->delete(route('admin.certifications.destroy', $certification))
            ->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('certifications', ['id' => $certification->id]);
        Storage::disk('public')->assertMissing($path);
    }
}
