<?php

namespace App\Http\Controllers;

use App\Models\Pizza;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PizzaController extends Controller
{

    public function index(){
        //$pizzas = Pizza::paginate(9)->onEachSide(2);
        $pizzas = Pizza::all();
        return Inertia::render('Home', compact('pizzas'));
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:20',
            'description' => 'required|string|max:100',
            'price' => 'required|decimal:2|numeric|between:5.00,20.00',
        ]);

        Pizza::create($request->only('name','description','price'));

        return to_route('dashboard')->with('success', 'Pizza created successfully.');
    }

    public function update(Request $request, $id){
        try{
            $request->validate([
                'name' => 'required|string|max:20',
                'description' => 'required|string|max:100',
                'price' => 'required|decimal:2|numeric|between:5.00,20.00',
            ]);
            $pizza = Pizza::findOrFail($id);
            $pizza->update($request->only('name','description','price'));
            return to_route('dashboard')->with('success', 'Pizza updated successfully.');
        }
        catch(ModelNotFoundException $e){
            abort(404, 'pizza not found');
        }
    }

    public function destroy($id){
        try{
            $pizza = Pizza::findOrFail($id);
            $pizza->delete();
            return to_route('dashboard')->with('success', 'Pizza id : '. $id .' name : ' . $pizza->name . ' deleted successfully.');
        }
        catch(ModelNotFoundException $e){
            abort(404, "pizza not found");
        }

    }
}
