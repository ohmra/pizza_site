<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['is_admin', 'auth'])->group(function(){
    Route::get('users', [UserController::class, 'index'])->name('users');
    Route::get('user/create', [UserController::class, 'create'])->name('user.create');
    Route::post('user/create', [UserController::class, 'store']);
    Route::get('user/edit/{id}', [UserController::class, 'edit'])->name('user.edit');
    Route::put('user/edit/{id}', [UserController::class, 'update']);
    Route::delete('user/{id}', [UserController::class, 'destroy'])->name('user.delete');
});
