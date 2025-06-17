<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
        $this->middleware('admin')->only(['store', 'update', 'destroy']);    
    }

    public function index()
    {
        $restaurants = Restaurant::with('city')->get();
        return response()->json($restaurants, 200);
    }

    public function store(Request $request)
    {
        $requestData = $request->all();

        $validator = Validator::make($requestData, [
            '*.city_id' => 'required|exists:cities,id',
            '*.name' => 'required|string|max:255',
            '*.description' => 'nullable|string',
            '*.address' => 'required|string|max:255',
            '*.average_cost' => 'required|numeric|min:0',
            '*.rating' => 'nullable|numeric|min:0|max:5',
            '*.review_count' => 'nullable|integer|min:0',
            '*.small_meal' => 'nullable|numeric|min:0',
            '*.medium_meal' => 'nullable|numeric|min:0',
            '*.large_meal' => 'nullable|numeric|min:0',
            '*.logo' => 'nullable|string|max:255', // Validation for Rest_Logo
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $restaurants = [];
        foreach ($requestData as $data) {
            $average_cost = $data['average_cost'] ?: (
                ($data['small_meal'] + $data['medium_meal'] + $data['large_meal']) / 3
            );

            $restaurant = Restaurant::create(array_merge($data, [
                'average_cost' => $average_cost,
                'city_id' => 1, // Static city_id set to 1
                'address' => $data['address'] ?? 'Unknown' // Default address if not provided
            ]));

            $restaurants[] = $restaurant;
        }

        return response()->json([
            'message' => 'Restaurants created successfully',
            'data' => $restaurants
        ], 201);
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
            'rating' => 'nullable|numeric|min:0|max:5',
            'review_count' => 'nullable|integer|min:0',
            'small_meal' => 'nullable|numeric|min:0',
            'medium_meal' => 'nullable|numeric|min:0',
            'large_meal' => 'nullable|numeric|min:0',
            'logo' => 'nullable|string|max:255', // Validation for Rest_Logo
        ]);

        $average_cost = $request->average_cost ?: (
            ($request->small_meal + $request->medium_meal + $request->large_meal) / 3
        );

        $restaurant->update(array_merge($request->only([
            'city_id', 'name', 'description', 'address', 'rating', 'review_count',
            'small_meal', 'medium_meal', 'large_meal', 'logo'
        ]), ['average_cost' => $average_cost]));

        return response()->json(['message' => 'Restaurant updated successfully', 'data' => $restaurant], 200);
    }

    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();
        return response()->json(['message' => 'Restaurant deleted successfully'], 200);
    }
}