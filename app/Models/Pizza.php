<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pizza extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = ['name', 'description', 'price'];

    public function orders() : BelongsToMany
    {
        return $this->BelongsToMany(Order::class, 'order_pizza', 'pizza_id', 'order_id')->withPivot('qty');
    }

}
