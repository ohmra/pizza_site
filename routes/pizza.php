<?php
use App\Http\Controllers\PizzaController;
use Illuminate\Support\Facades\Route;

Route::get('pizzas', [PizzaController::class, 'index'])->name('pizzas')->middleware('auth');

Route::middleware('is_admin')->group(function(){
    Route::post('pizza/create', [PizzaController::class, 'store']);
    Route::delete('pizza/delete/{id}', [PizzaController::class, 'destroy'])->name('pizza.delete');
    Route::put('pizza/edit/{id}', [PizzaController::class, 'update']);
});

