<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Pizza;
use DateTime;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request) : Response {
        $user = $request->user();
        $orders = $user->orders()->with('pizzas')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Order/Index', compact('orders'));
    }

    public function execute(Request $request){
        $cart = $request->session()->get('cart');
        if(!empty($cart)){
            $user = $request->user();
            $order = new Order();
            $order->user()->associate($user);
            $order->total = $request->session()->get('total_cost');
            $order->save();

            try{
                foreach($cart as $orderedPizza){
                    $pizza = Pizza::findOrFail($orderedPizza['id']);
                    $order->pizzas()->attach($pizza, ['qty' => $orderedPizza['quantity']]);
                }
                $user->orders()->save($order);
                $request->session()->forget('cart');
                $request->session()->forget('total_cost');
                //return Inertia::render('Order/Success');
                return to_route('home')->with('success', 'Your order has been placed');
            }catch(ModelNotFoundException $e){
                abort(404);
            }
        }
        abort(404);
    }

    public function change_status(Request $request, $id) {
        try{
            $all_status = ['sent', 'preparing', 'ready', 'picked out'];
            if(in_array($request->input('status'), $all_status)){
                $order = Order::findOrFail($id);
                $order->status = $request->input('status');
                $order->save();
            }
            return to_route('dashboard')->with('success', 'Order status has been changed');
        }catch(ModelNotFoundException $e){
            abort(404);
        }
    }

    public function next_status(Request $request) {
        try{
            $order = Order::findOrFail($request->id);
            switch($order->status){
                case 'sent':
                    $order->status = 'preparing';
                    break;
                case 'preparing':
                    $order->status = 'ready';
                    break;
                case 'ready':
                    $order->status = 'picked out';
                    break;
                default:
                    return to_route('dashboard')->with('error', 'no corresponding status');
            }
            $order->save();
            return to_route('dashboard')->with('success', 'The order has been updated');
        }catch(ModelNotFoundException $e){
            abort(404);
        }
    }
}
