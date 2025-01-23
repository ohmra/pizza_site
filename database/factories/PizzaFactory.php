<?php

namespace Database\Factories;

use App\Models\Pizza;
use Illuminate\Database\Eloquent\Factories\Factory;

class PizzaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Pizza::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nom' => $this->faker->unique()->word(),
            'description' => $this->faker->text(100),
            'prix' => $this->faker->randomFloat(2, 2, 5),
            'created_at' => $this->faker->dateTime(),
            'updated_at' => now(),
            'deleted_at' => null,
        ];
    }
}
