<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function() {
    Route::post('/order', [OrderController::class, 'execute'])->name('order.execute');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::put('orders/{id}/change_status', [OrderController::class, 'change_status'])->name('order.change_status');
    Route::put('orders/next_status', [OrderController::class, 'next_status'])->name('order.next_status');
});
