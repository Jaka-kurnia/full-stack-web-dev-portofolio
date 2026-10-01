<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Concerns\PortfolioAdmin;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    use PortfolioAdmin;
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login(): void
    {
        foreach ($this->adminUris() as $uri) {
            $this->get($uri)->assertRedirect(route('login'));
        }
    }

    public function test_non_admin_users_receive_forbidden(): void
    {
        $this->actingAs($this->createVisitor());

        foreach ($this->adminUris() as $uri) {
            $this->get($uri)->assertForbidden();
        }
    }

    public function test_admin_can_view_every_admin_page(): void
    {
        $this->actingAs($this->createAdmin());

        foreach ($this->adminUris() as $uri) {
            $this->get($uri)->assertOk();
        }
    }

    public function test_verification_middleware_is_inert_without_must_verify_email(): void
    {
        // `verified` hanya aktif jika User mengimplementasikan MustVerifyEmail.
        // Saat ini User tidak mengimplementasikannya (keputusan Breeze default),
        // sehingga verifikasi email tidak menghalangi admin masuk.
        $this->actingAs(User::factory()->admin()->unverified()->create());

        $this->get('/admin/skills')->assertOk();
    }

    public function test_regular_users_can_still_edit_their_own_profile(): void
    {
        $visitor = $this->createVisitor();
        $this->actingAs($visitor);

        $this->get(route('profile.edit'))->assertOk();
    }

    public function test_guests_cannot_reach_mutating_admin_endpoints(): void
    {
        $this->post(route('admin.skills.store'), [])->assertRedirect(route('login'));
        $this->delete(route('admin.quotes.destroy', 1))->assertRedirect(route('login'));
    }
}
