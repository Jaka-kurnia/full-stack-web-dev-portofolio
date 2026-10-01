<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PortfolioSeeder::class);

        if (!User::where('email', 'kurniajakaa@gmail.com')->exists()) {
            User::factory()->create([
                'name' => 'Jaka Kurnia',
                'email' => 'kurniajakaa@gmail.com',
                'password' => bcrypt('password'),
            ]);
        }
    }
}
