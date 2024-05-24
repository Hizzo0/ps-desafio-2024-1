<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'amount' => $this->faker->randomNumber(1, 50),
            'price' => $this->faker->randomFloat(2, 0, 1000),
            'image' => $this->faker->imageUrl(),
            'status' => 1,
            'category_id' => fn () => Category::factory()->create()->id,
        ];
    }
}
