<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_name' => fake()->company(),
            'job_title' => fake()->jobTitle(),
            'type' => fake()->randomElement(config('portfolio.experience_types')),
            'start_date' => fake()->dateTimeBetween('-5 years', '-1 year')->format('Y-m-d'),
            'end_date' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'description' => fake()->sentence(),
            'is_active' => true,
        ];
    }

    public function ongoing(): static
    {
        return $this->state(fn () => ['end_date' => null]);
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['is_active' => false]);
    }
}
