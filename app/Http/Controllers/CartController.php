<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function show(){
        return Inertia::render('Order/Cart');
    }
    public function add(Request $request){
        $cart = session()->get('cart', []);
        $pizza = $request->input('pizza');
        if(isset($cart[$pizza['id']])){
            $cart[$pizza['id']]['quantity'] += 1;
        }
        else{
            $cart[$pizza['id']] = [
                "id" => $pizza['id'],
                "name" => $pizza['name'],
                "price" => $pizza['price'],
                "quantity" => 1,
            ];
        }

        session()->put('cart', $cart);
        session()->put('total_cost', $this->getTotalCost());

        return back()->with('success', 'Pizza added to cart successfully!');
    }

    public function clear(Request $request){
        $request->session()->forget('cart');
        $request->session()->forget('total_cost');
        return back()->with('success', 'Cart cleared');
    }

    public function remove(Request $request){
        $cart = session()->get('cart', []);
        $pizzaId = $request->input('id');
        if(array_key_exists($pizzaId, $cart)){
            if($cart[$pizzaId]['quantity'] > 1)
                $cart[$pizzaId]['quantity']--;
            else
                unset($cart[$pizzaId]);

        }
        session()->put('cart', $cart);
        session()->put('total_cost', $this->getTotalCost());

        if(empty($cart)){
            session()->forget('cart');
            session()->forget('total_cost');
        }

        return back();
    }

    public function removeAll(Request $request){
        $cart = session()->get('cart', []);
        $pizzaId = $request->input('id');
        if(array_key_exists($pizzaId, $cart))
            unset($cart[$pizzaId]);

        session()->put('cart', $cart);
        session()->put('total_cost', $this->getTotalCost());

        if(empty($cart)){
            session()->forget('cart');
            session()->forget('total_cost');
        }

        return back()->with('success', 'Pizza removed from cart successfully!');
    }

    public function getTotalCost(){
        $cart = session()->get('cart', []);
        $total_cost = 0;
        foreach($cart as $pizza){
            $total_cost += $pizza['price'] * $pizza['quantity'];
        }
        return $total_cost;
    }

}
