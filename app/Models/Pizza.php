<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pizza extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price'];

    public function orders() : BelongsToMany
    {
        return $this->BelongsToMany(Order::class, 'order_pizza', 'pizza_id', 'order_id')->withPivot('qty');
    }

}
