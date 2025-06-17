<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HotelBookingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index($hotelId)
    {
        Log::info("Received request for hotel_id: {$hotelId}");
        $hotel = Hotel::find($hotelId);
        if (!$hotel) {
            Log::warning("Hotel not found for hotel_id: {$hotelId}");
            return response()->json(['error' => 'Hotel not found'], 404);
        }
    
        $user = auth()->user();
        Log::info("User role: {$user->role}, User ID: {$user->id}, Hotel user_id: {$hotel->user_id}");
        if ($user->role !== 'admin' && $hotel->user_id !== $user->id) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }
    
        try {
            $bookings = Booking::with('user', 'room', 'room.hotel')
                ->where('hotel_id', $hotelId)
                ->get();
            Log::info("Fetched " . count($bookings) . " bookings for hotel_id: {$hotelId}");
            return response()->json($bookings, 200);
        } catch (\Exception $e) {
            Log::error("Failed to fetch bookings for hotel_id={$hotelId}: " . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch bookings: ' . $e->getMessage()], 500);
        }
    }
}