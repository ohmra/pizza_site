<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Pizza;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::factory()
            ->count(50)
            ->hasAttached(Pizza::findOrFail(rand(1,30)), ['qty' => 4])
            ->hasAttached(Pizza::findOrFail(rand(1,30)), ['qty' => 4])
            ->hasAttached(Pizza::findOrFail(rand(1,30)), ['qty' => 4])
            ->create();
    }
}
