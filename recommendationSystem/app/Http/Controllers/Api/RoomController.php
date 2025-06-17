<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class RoomController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin')->only(['store', 'update', 'destroy']);    
    }

    /**
     * Display a listing of the rooms.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $rooms = Room::with(['hotel', 'roomType', 'roomImages'])->get();
            Log::info('Rooms fetched from database:', ['rooms' => $rooms->toArray()]);
            return response()->json([
                'status' => 'success',
                'data' => $rooms
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching rooms: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve rooms: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created room in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'required|exists:hotels,id',
            'room_type_id' => 'required|exists:room_types,id',
            'name' => 'nullable|string|max:255',
            'single_price' => 'nullable|numeric|min:0',
            'double_price' => 'nullable|numeric|min:0',
            'deluxe_price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'is_available' => 'sometimes|boolean',
            'images.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
        ]);

        if ($validator->fails()) {
            Log::warning('Validation failed for room creation:', ['errors' => $validator->errors()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $roomData = [
                'hotel_id' => $request->hotel_id,
                'room_type_id' => $request->room_type_id,
                'name' => $request->name ?? null,
                'single_price' => $request->single_price ?? null,
                'double_price' => $request->double_price ?? null,
                'deluxe_price' => $request->deluxe_price ?? null,
                'description' => $request->description ?? null,
                'price' => $request->price,
                'quantity' => $request->quantity,
                'is_available' => $request->input('is_available', true), // Default to true
            ];

            Log::info('Attempting to create room with data:', $roomData);

            $room = Room::create($roomData);

            // Handle image uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('room_images', 'public');
                    RoomImage::create([
                        'room_id' => $room->id,
                        'image_url' => Storage::url($imagePath),
                    ]);
                }
            }

            Log::info('Room created successfully:', $room->toArray());

            $room->load(['hotel', 'roomType', 'roomImages']);

            return response()->json([
                'status' => 'success',
                'message' => 'Room created successfully',
                'data' => $room
            ], 201);
        } catch (QueryException $qe) {
            Log::error('Database error creating room: ' . $qe->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Database error occurred while creating room.',
                'details' => $qe->getMessage()
            ], 500);
        } catch (\Exception $e) {
            Log::error('Unexpected error creating room: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified room.
     *
     * @param Room $room
     * @return JsonResponse
     */
    public function show(Room $room): JsonResponse
    {
        try {
            $room->load(['hotel', 'roomType', 'roomImages']);
            Log::info('Room fetched:', ['room' => $room->toArray()]);
            return response()->json([
                'status' => 'success',
                'data' => $room
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching room: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve room: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update先生 the specified room in storage.
     *
     * @param Request $request
     * @param Room $room
     * @return JsonResponse
     */
    public function update(Request $request, Room $room): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'sometimes|exists:hotels,id',
            'room_type_id' => 'sometimes|exists:room_types,id',
            'name' => 'nullable|string|max:255',
            'single_price' => 'nullable|numeric|min:0',
            'double_price' => 'nullable|numeric|min:0',
            'deluxe_price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'quantity' => 'sometimes|integer|min:1',
            'is_available' => 'sometimes|boolean',
            'images.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            Log::warning('Validation failed for room update:', ['errors' => $validator->errors()]);
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $roomData = $request->only([
                'hotel_id',
                'room_type_id',
                'name',
                'single_price',
                'double_price',
                'deluxe_price',
                'description',
                'price',
                'quantity',
                'is_available'
            ]);
            $room->update(array_filter($roomData, fn($value) => !is_null($value)));

            // Handle image uploads
            if ($request->hasFile('images')) {
                foreach ($room->roomImages as $image) {
                    Storage::disk('public')->delete(str_replace(Storage::url(''), '', $image->image_url));
                    $image->delete();
                }
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('room_images', 'public');
                    RoomImage::create([
                        'room_id' => $room->id,
                        'image_url' => Storage::url($imagePath),
                    ]);
                }
            }

            Log::info('Room updated successfully:', $room->toArray());

            $room->load(['hotel', 'roomType', 'roomImages']);

            return response()->json([
                'status' => 'success',
                'message' => 'Room updated successfully',
                'data' => $room
            ], 200);
        } catch (QueryException $qe) {
            Log::error('Database error updating room: ' . $qe->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Database error occurred while updating room.',
                'details' => $qe->getMessage()
            ], 500);
        } catch (\Exception $e) {
            Log::error('Unexpected error updating room: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'An unexpected error occurred.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified room from storage.
     *
     * @param Room $room
     * @return JsonResponse
     */
    public function destroy(Room $room): JsonResponse
    {
        try {
            foreach ($room->roomImages as $image) {
                Storage::disk('public')->delete(str_replace(Storage::url(''), '', $image->image_url));
                $image->delete();
            }
            $room->delete();
            Log::info('Room deleted successfully:', ['room_id' => $room->id]);
            return response()->json([
                'status' => 'success',
                'message' => 'Room deleted successfully'
            ], 204);
        } catch (\Exception $e) {
            Log::error('Error deleting room: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete room: ' . $e->getMessage()
            ], 500);
        }
    }
}