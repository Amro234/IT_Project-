<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recommendation;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        if (auth()->user()->role === 'admin') {
            $recommendations = Recommendation::with('user', 'hotel', 'transportation', 'restaurant', 'entertainmentPlace')->get();
        } else {
            $recommendations = Recommendation::with('user', 'hotel', 'transportation', 'restaurant', 'entertainmentPlace')
                ->where('user_id', auth()->id())->get();
        }
        return response()->json($recommendations, 200);
    }

    public function store(Request $request)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'hotel_id' => 'nullable|exists:hotels,id',
            'transportation_id' => 'nullable|exists:transportation,id',
            'restaurant_id' => 'nullable|exists:restaurants,id',
            'entertainment_place_id' => 'nullable|exists:entertainment_places,id',
            'score' => 'required|numeric|between:0,100',
        ]);

        $recommendation = Recommendation::create($request->only([
            'user_id', 'hotel_id', 'transportation_id', 'restaurant_id', 'entertainment_place_id', 'score'
        ]));

        return response()->json(['message' => 'Recommendation created successfully', 'data' => $recommendation], 201);
    }

    public function show(Recommendation $recommendation)
    {
        if (auth()->user()->role !== 'admin' && $recommendation->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $recommendation->load('user', 'hotel', 'transportation', 'restaurant', 'entertainmentPlace');
        return response()->json($recommendation, 200);
    }

    public function update(Request $request, Recommendation $recommendation)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'hotel_id' => 'nullable|exists:hotels,id',
            'transportation_id' => 'nullable|exists:transportation,id',
            'restaurant_id' => 'nullable|exists:restaurants,id',
            'entertainment_place_id' => 'nullable|exists:entertainment_places,id',
            'score' => 'required|numeric|between:0,100',
        ]);

        $recommendation->update($request->only([
            'user_id', 'hotel_id', 'transportation_id', 'restaurant_id', 'entertainment_place_id', 'score'
        ]));

        return response()->json(['message' => 'Recommendation updated successfully', 'data' => $recommendation], 200);
    }

    public function destroy(Recommendation $recommendation)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $recommendation->delete();
        return response()->json(['message' => 'Recommendation deleted successfully'], 200);
    }
}