<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transportation;
use Illuminate\Http\Request;

class TransportationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }

    public function index()
    {
        $transportations = Transportation::with('city')->get();
        return response()->json($transportations, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
            'type' => 'required|in:internal,external',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $transportation = Transportation::create($request->only([
            'city_id', 'type', 'name', 'description', 'price'
        ]));

        return response()->json(['message' => 'Transportation created successfully', 'data' => $transportation], 201);
    }

    public function show(Transportation $transportation)
    {
        $transportation->load('city');
        return response()->json($transportation, 200);
    }

    public function update(Request $request, Transportation $transportation)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
            'type' => 'required|in:internal,external',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $transportation->update($request->only([
            'city_id', 'type', 'name', 'description', 'price'
        ]));

        return response()->json(['message' => 'Transportation updated successfully', 'data' => $transportation], 200);
    }

    public function destroy(Transportation $transportation)
    {
        $transportation->delete();
        return response()->json(['message' => 'Transportation deleted successfully'], 200);
    }
}