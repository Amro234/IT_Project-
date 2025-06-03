<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EntertainmentPlace;
use Illuminate\Http\Request;

class EntertainmentPlaceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }

    public function index()
    {
        $entertainmentPlaces = EntertainmentPlace::with('city')->get();
        return response()->json($entertainmentPlaces, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
            'type' => 'required|in:mall,beach,other',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255',
            'entry_fee' => 'nullable|numeric|min:0',
        ]);

        $entertainmentPlace = EntertainmentPlace::create($request->only([
            'city_id', 'type', 'name', 'description', 'address', 'entry_fee'
        ]));

        return response()->json(['message' => 'Entertainment Place created successfully', 'data' => $entertainmentPlace], 201);
    }

    public function show(EntertainmentPlace $entertainmentPlace)
    {
        $entertainmentPlace->load('city');
        return response()->json($entertainmentPlace, 200);
    }

    public function update(Request $request, EntertainmentPlace $entertainmentPlace)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
            'type' => 'required|in:mall,beach,other',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255',
            'entry_fee' => 'nullable|numeric|min:0',
        ]);

        $entertainmentPlace->update($request->only([
            'city_id', 'type', 'name', 'description', 'address', 'entry_fee'
        ]));

        return response()->json(['message' => 'Entertainment Place updated successfully', 'data' => $entertainmentPlace], 200);
    }

    public function destroy(EntertainmentPlace $entertainmentPlace)
    {
        $entertainmentPlace->delete();
        return response()->json(['message' => 'Entertainment Place deleted successfully'], 200);
    }
}