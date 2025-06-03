<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }

    public function index()
    {
        return response()->json(City::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $city = City::create($request->only('name'));
        return response()->json(['message' => 'City created successfully', 'data' => $city], 201);
    }

    public function show(City $city)
    {
        return response()->json($city, 200);
    }

    public function update(Request $request, City $city)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $city->update($request->only('name'));
        return response()->json(['message' => 'City updated successfully', 'data' => $city], 200);
    }

    public function destroy(City $city)
    {
        $city->delete();
        return response()->json(['message' => 'City deleted successfully'], 200);
    }
}