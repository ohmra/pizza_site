<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'status'];

    protected $attributes = ['status' => 'sent'];

    public function user() : BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function pizzas() : BelongsToMany
    {
        return $this->BelongsToMany(Pizza::class, 'order_pizza', 'order_id', 'pizza_id')->withPivot('qty');
    }
}
