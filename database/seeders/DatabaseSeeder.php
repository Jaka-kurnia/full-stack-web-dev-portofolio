<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PortfolioSeeder::class);

        User::query()->firstOrCreate(
            ['email' => 'kurniajakaa@gmail.com'],
            [
                'name' => 'Jaka Kurnia',
                'password' => bcrypt('password'),
                'role' => User::ROLE_ADMIN,
                'email_verified_at' => now(),
            ],
        );

        User::query()
            ->where('email', 'kurniajakaa@gmail.com')
            ->update(['role' => User::ROLE_ADMIN]);

        User::query()->firstOrCreate(
            ['email' => 'superadminjaka@gmail.com'],
            [
                'name' => 'Superadmin Jaka',
                'password' => bcrypt('T4sik4sik'),
                'role' => User::ROLE_ADMIN,
                'email_verified_at' => now(),
            ],
        );

        User::query()
            ->where('email', 'superadminjaka@gmail.com')
            ->update(['role' => User::ROLE_ADMIN]);
    }
}
