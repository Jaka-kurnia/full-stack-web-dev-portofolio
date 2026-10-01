<?php

namespace Database\Factories;

use App\Models\HeroSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<HeroSetting>
 */
class HeroSettingFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'greeting' => 'Full-Stack Web Developer.',
            'full_name' => fake()->name(),
            'short_bio' => fake()->paragraph(),
            'about_text' => fake()->paragraph(),
            'availability_status' => 'Available',
            'cta_text' => 'Hubungi Saya',
            'cta_link' => '#contact',
            'social_links' => ['email' => fake()->safeEmail()],
        ];
    }
}
