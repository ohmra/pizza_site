<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Pizza;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function root(Request $request){
        if(auth()->check() && auth()->user()->type == "user")
            return to_route('home');

        return to_route('dashboard');
    }
    public function index(Request $request){
        if($request->user()->type == "admin"){
            $pizzas = Pizza::all();
            $users = User::all();
            $orders = Order::with("pizzas")->get();
            return Inertia::render("AdminDashboard",compact("pizzas", "users", "orders"));
        }
        else if ($request->user()->type == "cook"){
            $orders = Order::with("pizzas")->where("status", "!=", "picked out")->OrderBy("created_at")->get();
            return Inertia::render("Order/Index", compact("orders"));
        }
        else {
            abort(403, "you are not admin");
        }
    }
}
