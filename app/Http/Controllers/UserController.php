<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => $request->type,
        ]);

        event(new Registered($user));

        return to_route('dashboard')->with('success', 'User created.');
    }


    public function update(Request $request, $userId){
        try{
            $user = User::findOrFail($userId);

            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
                'type' => 'required|string|in:admin,user,cook',
                'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            ]);

            $user->update($request->only(['name', 'email', 'type']));

            if(!empty($request->input('password'))){
                $user->update(['password' => Hash::make($request->password)]);
            }
            return to_route('dashboard')->with('success', 'User updated.');
        }catch(ModelNotFoundException $e){
            abort(404, 'User not found.');
        }
    }

    public function destroy($id){
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return to_route('dashboard')->with('success', 'User id:' . $user->id . ' email:' . $user->email . ' deleted');
        }catch(ModelNotFoundException $e){
            abort(404, 'User not found.');
        }
    }

}
