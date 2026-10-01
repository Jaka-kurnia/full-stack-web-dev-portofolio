<?php

namespace Database\Factories;

use App\Models\Certification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Certification>
 */
class CertificationFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'issuer' => fake()->company(),
            'issue_date' => fake()->dateTimeBetween('-3 years', 'now')->format('Y-m-d'),
            'expiration_date' => null,
            'credential_url' => fake()->url(),
        ];
    }
}
