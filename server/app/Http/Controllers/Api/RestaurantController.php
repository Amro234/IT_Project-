<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }

    public function index()
    {
        $restaurants = Restaurant::with('city')->get();
        return response()->json($restaurants, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255',
            'average_cost' => 'required|numeric|min:0',
        ]);

        $restaurant = Restaurant::create($request->only([
            'city_id', 'name', 'description', 'address', 'average_cost'
        ]));

        return response()->json(['message' => 'Restaurant created successfully', 'data' => $restaurant], 201);
    }

    public function show(Restaurant $restaurant)
    {
        $restaurant->load('city');
        return response()->json($restaurant, 200);
    }

    public function update(Request $request, Restaurant $restaurant)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255',
            'average_cost' => 'required|numeric|min:0',
        ]);

        $restaurant->update($request->only([
            'city_id', 'name', 'description', 'address', 'average_cost'
        ]));

        return response()->json(['message' => 'Restaurant updated successfully', 'data' => $restaurant], 200);
    }

    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();
        return response()->json(['message' => 'Restaurant deleted successfully'], 200);
    }
}