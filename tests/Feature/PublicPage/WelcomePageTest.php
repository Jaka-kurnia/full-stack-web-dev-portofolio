<?php

namespace Tests\Feature\PublicPage;

use App\Models\Certification;
use App\Models\Experience;
use App\Models\HeroSetting;
use App\Models\Project;
use App\Models\Quote;
use App\Models\Skill;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class WelcomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_landing_page_renders(): void
    {
        $this->get('/')->assertOk();
    }

    public function test_landing_page_only_exposes_published_projects(): void
    {
        Project::factory()->published()->create(['title' => 'Visible']);
        Project::factory()->create(['title' => 'Hidden']);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Welcome')
                ->has('projects', 1)
                ->where('projects.0.title', 'Visible')
                ->where('projects.0.status', 'Published'));
    }

    public function test_landing_page_exposes_active_skills_and_quotes_only(): void
    {
        Skill::factory()->create(['name' => 'Laravel', 'category' => 'Backend', 'is_active' => true]);
        Skill::factory()->inactive()->create(['name' => 'Ghost']);
        Quote::factory()->create(['content' => 'Aktif']);
        Quote::factory()->inactive()->create(['content' => 'Pasif']);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Welcome')
                ->has('skills', 1)
                ->where('skills.0.name', 'Laravel')
                ->has('quotes', 1)
                ->where('quotes.0.content', 'Aktif'));
    }

    public function test_landing_page_exposes_active_experiences_ordered_by_start_date(): void
    {
        Experience::factory()->create(['start_date' => '2020-01-01', 'company_name' => 'Oldest']);
        Experience::factory()->inactive()->create(['start_date' => '2030-01-01', 'company_name' => 'Inactive']);
        Experience::factory()->create(['start_date' => '2022-01-01', 'company_name' => 'Newest']);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Welcome')
                ->has('experiences', 2)
                ->where('experiences.0.company_name', 'Newest')
                ->where('experiences.1.company_name', 'Oldest'));
    }

    public function test_landing_page_shares_hero_certifications_and_can_login_flag(): void
    {
        HeroSetting::factory()->create(['full_name' => 'Jaka Kurnia']);
        Certification::factory()->create(['name' => 'Sang Cert']);

        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Welcome')
                ->where('canLogin', true)
                ->where('hero.full_name', 'Jaka Kurnia')
                ->has('certifications', 1)
                ->where('certifications.0.name', 'Sang Cert'));
    }
}
