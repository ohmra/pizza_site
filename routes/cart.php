<?php

use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function(){
    Route::post('cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::post('cart/clear', [CartController::class, 'clear'])->name('cart.clear');
    Route::post('cart/remove', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('cart/removeAll', [CartController::class, 'removeAll'])->name('cart.removeAll');
    Route::get('cart', [CartController::class, 'show'])->name('cart.show');
});
