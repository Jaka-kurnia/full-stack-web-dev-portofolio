<?php

namespace Tests\Concerns;

use App\Models\User;

trait PortfolioAdmin
{
    protected function createAdmin(): User
    {
        return User::factory()->admin()->create();
    }

    protected function createVisitor(): User
    {
        return User::factory()->create();
    }

    /**
     * Daftar URI halaman admin yang dipakai beberapa test otorisasi.
     *
     * @return list<string>
     */
    protected function adminUris(): array
    {
        return [
            '/admin/hero',
            '/admin/skills',
            '/admin/projects',
            '/admin/projects/create',
            '/admin/experiences',
            '/admin/certifications',
            '/admin/quotes',
        ];
    }
}
