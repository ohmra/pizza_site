<?php

namespace Database\Factories;
;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->boolean(50) ? 3 : 4,
            'status' => $this->faker->boolean(50) ? 'sent': 'picked out',
            'total' => $this->faker->randomFloat(2, 50, 250),
            'created_at' => $this->faker->boolean(50) ? now() : now()->addDays(1),
            'updated_at' => now(),
        ];
    }
}
