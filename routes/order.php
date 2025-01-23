<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function() {
    Route::post('/order', [OrderController::class, 'execute'])->name('order.execute');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{id}/show', [OrderController::class, 'show'])->name('order.show');
    Route::get('orders/pending', [OrderController::class, 'pending'])->name('orders.pending');
    Route::get('orders/{id}/detail', [OrderController::class, 'show_cook'])->name('order.show_cook');
    Route::put('orders/{id}/change_status', [OrderController::class, 'change_status'])->name('order.change_status');
    Route::put('orders/next_status', [OrderController::class, 'next_status'])->name('order.next_status');
    Route::get('orders/show/date', [OrderController::class, 'show_per_date'])->name('orders.per_date');
    Route::get('orders/admin/all', [OrderController::class, 'show_all'])->name('orders.show_all');
});
