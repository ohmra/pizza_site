<?php

namespace App\Policies;
use App\Models\User;

class OrderPolicy
{
    /**
     * Create a new policy instance.
     */

    public function view(User $user): bool{
        return $user->type == "user";
    }

    public function make(User $user): bool{
        return $user->type == "user";
    }

    public function update(User $user): bool{
        return $user->type == "cook";
    }
}
