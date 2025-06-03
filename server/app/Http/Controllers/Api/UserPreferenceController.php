<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        if (auth()->user()->role === 'admin') {
            $preferences = UserPreference::with('user')->get();
        } else {
            $preferences = UserPreference::with('user')->where('user_id', auth()->id())->get();
        }
        return response()->json($preferences, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'budget_min' => 'nullable|numeric|min:0',
            'budget_max' => 'nullable|numeric|min:0|gte:budget_min',
            'preferred_cities' => 'nullable|string',
            'preferred_entertainment' => 'nullable|string',
            'preferred_transport' => 'required|in:internal,external,both',
        ]);

        $preference = UserPreference::create([
            'user_id' => auth()->id(),
            'budget_min' => $request->budget_min,
            'budget_max' => $request->budget_max,
            'preferred_cities' => $request->preferred_cities,
            'preferred_entertainment' => $request->preferred_entertainment,
            'preferred_transport' => $request->preferred_transport,
        ]);

        return response()->json(['message' => 'User Preference created successfully', 'data' => $preference], 201);
    }

    public function show(UserPreference $userPreference)
    {
        if (auth()->user()->role !== 'admin' && $userPreference->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $userPreference->load('user');
        return response()->json($userPreference, 200);
    }

    public function update(Request $request, UserPreference $userPreference)
    {
        if (auth()->user()->role !== 'admin' && $userPreference->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'budget_min' => 'nullable|numeric|min:0',
            'budget_max' => 'nullable|numeric|min:0|gte:budget_min',
            'preferred_cities' => 'nullable|string',
            'preferred_entertainment' => 'nullable|string',
            'preferred_transport' => 'required|in:internal,external,both',
        ]);

        $userPreference->update($request->only([
            'budget_min', 'budget_max', 'preferred_cities', 'preferred_entertainment', 'preferred_transport'
        ]));

        return response()->json(['message' => 'User Preference updated successfully', 'data' => $userPreference], 200);
    }

    public function destroy(UserPreference $userPreference)
    {
        if (auth()->user()->role !== 'admin' && $userPreference->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $userPreference->delete();
        return response()->json(['message' => 'User Preference deleted successfully'], 200);
    }
}