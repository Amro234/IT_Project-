<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\Room;
use App\Models\RoomImage;
use App\Models\RoomType;
use App\Models\HotelImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class HotelController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin')->only(['store', 'update', 'destroy']);    }

    public function index()
    {
        try {
            $hotels = Hotel::with(['city', 'owner', 'images', 'rooms' => function ($query) {
                $query->with(['roomType', 'roomImages']);
            }])->get();

            Log::info('Hotel list retrieved successfully:', ['count' => $hotels->count()]);

            return response()->json([
                'status' => 'success',
                'message' => 'Hotels retrieved successfully',
                'data' => $hotels
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Error retrieving hotels: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred while retrieving hotels.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $hotel = Hotel::with(['city', 'owner', 'images', 'rooms' => function ($query) {
                $query->with(['roomType', 'roomImages']);
            }])->findOrFail($id);

            Log::info('Hotel retrieved successfully:', ['id' => $hotel->id]);

            return response()->json([
                'status' => 'success',
                'message' => 'Hotel retrieved successfully',
                'data' => $hotel
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::warning('Hotel not found: ' . $e->getMessage(), ['id' => $id]);
            return response()->json([
                'status' => 'error',
                'message' => 'Hotel not found.',
            ], 404);
        } catch (\Throwable $e) {
            Log::error('Error retrieving hotel: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred while retrieving the hotel.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'appearance' => 'nullable|string',
            'reviews' => 'nullable|array',
            'address' => 'sometimes|required|string',
            'email' => 'nullable|email|max:255|unique:hotels,email,' . $id,
            'mobile_num' => 'nullable|string|max:35|unique:hotels,mobile_num,' . $id,
            'city_id' => 'sometimes|required|exists:cities,id',
            'hotel_ranking' => 'sometimes|required|integer|between:2,7',
            'number_of_rooms' => 'sometimes|required|integer|min:1', // Added validation
            'amenities' => 'nullable|array',
            'images' => 'nullable|array',
            'images.*.image_url' => 'required|string|max:255',
            'images.*.is_primary' => 'nullable|boolean',
            'rooms' => 'nullable|array',
            'rooms.*.room_type_name' => 'required|string|max:255',
            'rooms.*.single_price' => 'nullable|numeric|min:0',
            'rooms.*.double_price' => 'nullable|numeric|min:0',
            'rooms.*.deluxe_price' => 'nullable|numeric|min:0',
            'rooms.*.price' => 'required|numeric|min:0',
            'rooms.*.quantity' => 'required|integer|min:1',
            'rooms.*.description' => 'nullable|string',
            'rooms.*.is_available' => 'nullable|boolean',
            'rooms.*.images' => 'nullable|array',
            'rooms.*.images.*.image_url' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            Log::warning('Validation failed for hotel update:', ['errors' => $validator->errors(), 'id' => $id]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $hotel = Hotel::findOrFail($id);

            $hotelData = [
                'name' => $request->input('name', $hotel->name),
                'description' => $request->input('description', $hotel->description),
                'appearance' => $request->input('appearance', $hotel->appearance),
                'reviews' => $request->input('reviews') ? json_encode($request->reviews) : $hotel->reviews,
                'address' => $request->input('address', $hotel->address),
                'email' => $request->input('email', $hotel->email),
                'mobile_num' => $request->input('mobile_num', $hotel->mobile_num),
                'city_id' => $request->input('city_id', $hotel->city_id),
                'hotel_ranking' => $request->input('hotel_ranking', $hotel->hotel_ranking),
                'number_of_rooms' => $request->input('number_of_rooms', $hotel->number_of_rooms), // Added field
                'amenities' => $request->input('amenities') ? json_encode($request->amenities) : $hotel->amenities,
            ];

            $hotel->update($hotelData);

            // Update or create hotel images
            if ($request->has('images')) {
                $hotel->images()->delete();
                foreach ($request->images as $imageData) {
                    $hotel->images()->create([
                        'image_url' => $imageData['image_url'],
                        'is_primary' => $imageData['is_primary'] ?? false,
                    ]);
                }
            }

            // Update or create rooms and their images
            if ($request->has('rooms')) {
                $hotel->rooms()->delete();
                foreach ($request->rooms as $roomData) {
                    $roomType = RoomType::firstOrCreate(
                        ['name' => $roomData['room_type_name']],
                        ['name' => $roomData['room_type_name']]
                    );

                    $room = $hotel->rooms()->create([
                        'room_type_id' => $roomType->id,
                        'name' => $roomData['room_type_name'],
                        'single_price' => $roomData['single_price'] ?? null,
                        'double_price' => $roomData['double_price'] ?? null,
                        'deluxe_price' => $roomData['deluxe_price'] ?? null,
                        'description' => $roomData['description'] ?? null,
                        'price' => $roomData['price'],
                        'quantity' => $roomData['quantity'],
                        'is_available' => $roomData['is_available'] ?? true,
                    ]);

                    if (isset($roomData['images'])) {
                        $room->roomImages()->delete();
                        foreach ($roomData['images'] as $imageData) {
                            $room->roomImages()->create([
                                'image_url' => $imageData['image_url'],
                            ]);
                        }
                    }
                }
            }

            $hotel->load(['city', 'owner', 'images', 'rooms' => function ($query) {
                $query->with(['roomType', 'roomImages']);
            }]);

            Log::info('Hotel updated successfully:', ['id' => $hotel->id]);

            return response()->json([
                'status' => 'success',
                'message' => 'Hotel updated successfully',
                'data' => $hotel
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::warning('Hotel not found for update: ' . $e->getMessage(), ['id' => $id]);
            return response()->json([
                'status' => 'error',
                'message' => 'Hotel not found.',
            ], 404);
        } catch (\Throwable $e) {
            Log::error('Error updating hotel: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred while updating the hotel.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $hotel = Hotel::findOrFail($id);

            $hotel->images()->delete();
            $hotel->rooms()->delete();
            $hotel->delete();

            Log::info('Hotel deleted successfully:', ['id' => $id]);

            return response()->json([
                'status' => 'success',
                'message' => 'Hotel deleted successfully',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::warning('Hotel not found for deletion: ' . $e->getMessage(), ['id' => $id]);
            return response()->json([
                'status' => 'error',
                'message' => 'Hotel not found.',
            ], 404);
        } catch (\Throwable $e) {
            Log::error('Error deleting hotel: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred while deleting the hotel.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
{
    Log::info('Raw request payload:', ['data' => $request->all()]);

    $requestData = $request->all();
    foreach ($requestData as &$hotelData) {
        if (isset($hotelData['rooms'])) {
            foreach ($hotelData['rooms'] as &$roomData) {
                $roomData['single_price'] = isset($roomData['single_price'])
                    ? floatval(preg_replace('/[^0-9.]/', '', $roomData['single_price']))
                    : null;
                $roomData['double_price'] = isset($roomData['double_price'])
                    ? floatval(preg_replace('/[^0-9.]/', '', $roomData['double_price']))
                    : null;
                $roomData['deluxe_price'] = isset($roomData['deluxe_price'])
                    ? floatval(preg_replace('/[^0-9.]/', '', $roomData['deluxe_price']))
                    : null;
                $roomData['price'] = floatval(preg_replace('/[^0-9.]/', '', $roomData['price']));
            }
        }
    }
    unset($hotelData, $roomData);

    $validator = Validator::make($requestData, [
        '*.name' => 'required|string|max:255',
        '*.description' => 'nullable|string',
        '*.appearance' => 'nullable|string',
        '*.reviews' => 'nullable|array',
        '*.address' => 'required|string',
        // '*.email' => 'nullable|email|max:255|unique:hotels,email',
        // '*.mobile_num' => 'nullable|string|max:35|unique:hotels,mobile_num',
        '*.city_id' => 'required|exists:cities,id',
        '*.hotel_ranking' => 'required|integer|between:1,8',
        '*.number_of_rooms' => 'required|integer|min:1',
        '*.amenities' => 'nullable|array',
        '*.images' => 'nullable|array',
        '*.images.*.image_url' => 'required|string|max:255',
        '*.images.*.is_primary' => 'nullable|boolean',
        '*.rooms' => 'nullable|array',
        '*.rooms.*.room_type_name' => 'required|string|max:255',
        '*.rooms.*.single_price' => 'nullable|numeric|min:0',
        '*.rooms.*.double_price' => 'nullable|numeric|min:0',
        '*.rooms.*.deluxe_price' => 'nullable|numeric|min:0',
        '*.rooms.*.price' => 'required|numeric|min:0',
        '*.rooms.*.quantity' => 'required|integer|min:1',
        '*.rooms.*.description' => 'nullable|string',
        '*.rooms.*.is_available' => 'nullable|boolean',
        '*.rooms.*.images' => 'nullable|array',
        '*.rooms.*.images.*.image_url' => 'required|string|max:255',
    ]);

    if ($validator->fails()) {
        Log::warning('Validation failed for hotel creation:', ['errors' => $validator->errors()]);
        return response()->json([
            'status' => 'error',
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 422);
    }

    if (!auth()->check()) {
        Log::warning('Authentication failed for store request');
        return response()->json(['message' => 'Authentication required. Please log in.'], 401);
    }

    try {
        $hotels = [];
        foreach ($requestData as $hotelData) {
            Log::info('Processing hotel data:', ['hotelData' => $hotelData]);

            // Validate city_id existence manually
            if (!\App\Models\City::find($hotelData['city_id'])) {
                throw new \Exception("City with ID {$hotelData['city_id']} does not exist.");
            }

            $hotel = Hotel::create([
                'name' => $hotelData['name'],
                'description' => $hotelData['description'] ?? null,
                'appearance' => $hotelData['appearance'] ?? null,
                'reviews' => isset($hotelData['reviews']) ? json_encode($hotelData['reviews']) : null,
                'address' => $hotelData['address'],
                'email' => $hotelData['email'] ?? null,
                'mobile_num' => $hotelData['mobile_num'] ?? null,
                'city_id' => $hotelData['city_id'],
                'hotel_ranking' => $hotelData['hotel_ranking'],
                'number_of_rooms' => $hotelData['number_of_rooms'],
                'amenities' => isset($hotelData['amenities']) ? json_encode($hotelData['amenities']) : null,
                'owner_id' => auth()->id(),
            ]);

            if (!$hotel) {
                throw new \Exception("Failed to create hotel.");
            }

            Log::info('Hotel created:', ['id' => $hotel->id]);

            if (isset($hotelData['images'])) {
                foreach ($hotelData['images'] as $imageData) {
                    $hotel->images()->create([
                        'image_url' => $imageData['image_url'],
                        'is_primary' => $imageData['is_primary'] ?? false,
                    ]);
                }
            }

            if (isset($hotelData['rooms'])) {
                foreach ($hotelData['rooms'] as $roomData) {
                    $roomType = RoomType::firstOrCreate(
                        ['name' => $roomData['room_type_name']],
                        ['name' => $roomData['room_type_name']]
                    );

                    $room = Room::create([
                        'hotel_id' => $hotel->id,
                        'room_type_id' => $roomType->id,
                        'name' => $roomData['room_type_name'],
                        'single_price' => $roomData['single_price'] ?? null,
                        'double_price' => $roomData['double_price'] ?? null,
                        'deluxe_price' => $roomData['deluxe_price'] ?? null,
                        'description' => $roomData['description'] ?? null,
                        'price' => $roomData['price'],
                        'quantity' => $roomData['quantity'],
                        'is_available' => $roomData['is_available'] ?? true,
                    ]);

                    if (isset($roomData['images'])) {
                        foreach ($roomData['images'] as $imageData) {
                            $room->roomImages()->create([
                                'image_url' => $imageData['image_url'],
                            ]);
                        }
                    }
                }
            }

            $hotel->load(['city', 'owner', 'images', 'rooms' => function ($query) {
                $query->with(['roomType', 'roomImages']);
            }]);
            $hotels[] = $hotel;
        }

        Log::info('Hotels created successfully:', ['count' => count($hotels)]);

        return response()->json([
            'status' => 'success',
            'message' => 'Hotels created successfully',
            'data' => $hotels
        ], 201);
    } catch (\Illuminate\Database\QueryException $qe) {
        Log::error('Database error creating hotel: ' . $qe->getMessage(), ['sql' => $qe->getSql(), 'bindings' => $qe->getBindings()]);
        return response()->json([
            'status' => 'error',
            'message' => 'Database error occurred while creating hotel.',
            'details' => $qe->getMessage()
        ], 500);
    } catch (\Throwable $e) {
        Log::error('Unexpected error creating hotel: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
        return response()->json([
            'status' => 'error',
            'message' => 'An unexpected error occurred.',
            'details' => $e->getMessage()
        ], 500);
    }
}
}