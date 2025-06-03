<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use App\Models\HotelBookingRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        if (auth()->user()->role === 'admin') {
            $bookings = Booking::with('user', 'room', 'room.hotel')->get();
        } else {
            $bookings = Booking::with('user', 'room', 'room.hotel')
                ->where('user_id', auth()->id())
                ->get();
        }
        return response()->json($bookings, 200);
    }

    public function store(Request $request)
    {
        // Validate request without total_price
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'hotel_id' => 'required|exists:hotels,id',
            'check_in' => 'required|date|after:today',
            'check_out' => 'required|date|after:check_in',
            'guests' => 'required|integer|min:1',
        ]);

        // Verify that the room belongs to the specified hotel
        $room = Room::findOrFail($request->room_id);
        if ($room->hotel_id != $request->hotel_id) {
            return response()->json(['error' => 'Room does not belong to the specified hotel'], 422);
        }

        // Determine room type and guest capacity
        $basePrice = $room->price; // Default base price
        $guestCapacity = 1; // Default for generic room
        $roomType = 'generic';
        $numberOfRooms = 1;

        if (!is_null($room->single_price)) {
            if ($request->guests < 1) {
                return response()->json(['error' => 'Single Room requires at least 1 guest'], 422);
            }
            $basePrice = $room->single_price;
            $guestCapacity = 1;
            $roomType = 'single';
            $numberOfRooms = ceil($request->guests / $guestCapacity);
        } elseif (!is_null($room->double_price)) {
            if ($request->guests < 1) {
                return response()->json(['error' => 'Double Room requires at least 1 guest'], 422);
            }
            $basePrice = $room->double_price;
            $guestCapacity = 2;
            $roomType = 'double';
            $numberOfRooms = ceil($request->guests / $guestCapacity);
        } elseif (!is_null($room->deluxe_price)) {
            if ($request->guests < 1) {
                return response()->json(['error' => 'Deluxe Room (Honeymoon) requires at least 1 guest'], 422);
            }
            $basePrice = $room->deluxe_price;
            $guestCapacity = 2;
            $roomType = 'deluxe';
            $numberOfRooms = ceil($request->guests / $guestCapacity);
        }

        // Log the calculated number of rooms
        Log::info("Booking attempt: room_id={$room->id}, guests={$request->guests}, number_of_rooms={$numberOfRooms}, current_quantity={$room->quantity}");

        // Check room availability for the required number of rooms
        $existingBookings = Booking::where('room_id', $request->room_id)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($request) {
                $query->whereBetween('check_in', [$request->check_in, $request->check_out])
                    ->orWhereBetween('check_out', [$request->check_in, $request->check_out])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('check_in', '<=', $request->check_in)
                          ->where('check_out', '>=', $request->check_out);
                    });
            })
            ->sum('number_of_rooms');

        if ($existingBookings + $numberOfRooms > $room->quantity) {
            Log::warning("Booking failed: Not enough rooms. existingBookings={$existingBookings}, numberOfRooms={$numberOfRooms}, room_quantity={$room->quantity}");
            return response()->json(['error' => 'Not enough rooms available for the selected dates'], 422);
        }

        // Check if enough room quantity is available
        if ($room->quantity < $numberOfRooms) {
            Log::warning("Booking failed: Insufficient quantity. room_quantity={$room->quantity}, numberOfRooms={$numberOfRooms}");
            return response()->json(['error' => 'Not enough rooms available'], 422);
        }

        // Calculate total price
        $nights = (new \DateTime($request->check_out))->diff(new \DateTime($request->check_in))->days;
        $totalPrice = $basePrice * $nights * $numberOfRooms;

        // Use a transaction to ensure data consistency
        try {
            $booking = DB::transaction(function () use ($request, $room, $totalPrice, $numberOfRooms) {
                // Decrease room quantity
                $room->decrement('quantity', $numberOfRooms);
                Log::info("Room quantity decremented: room_id={$room->id}, decremented_by={$numberOfRooms}, new_quantity={$room->fresh()->quantity}");

                // Create booking
                $booking = Booking::create([
                    'user_id' => auth()->id(),
                    'room_id' => $request->room_id,
                    'hotel_id' => $request->hotel_id,
                    'check_in' => $request->check_in,
                    'check_out' => $request->check_out,
                    'guests' => $request->guests,
                    'total_price' => $totalPrice,
                    'status' => 'pending',
                    'number_of_rooms' => $numberOfRooms,
                ]);

                // Create entry in hotel_booking_rooms
                HotelBookingRoom::create([
                    'hotel_id' => $request->hotel_id,
                    'booking_id' => $booking->id,
                    'room_id' => $request->room_id,
                ]);

                return $booking;
            });

            return response()->json([
                'message' => 'Booking created successfully',
                'data' => $booking,
                'room_type' => $roomType,
                'number_of_rooms' => $numberOfRooms
            ], 201);
        } catch (\Exception $e) {
            // Restore room quantity on failure
            $room->increment('quantity', $numberOfRooms);
            Log::error("Booking creation failed: room_id={$room->id}, error={$e->getMessage()}");
            return response()->json([
                'data' => [
                    'error' => 'Failed to create booking: ' . $e->getMessage()
                ]
            ], 500);
        }
    }

    public function show(Booking $booking)
    {
        if (auth()->user()->role !== 'admin' && $booking->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $booking->load('user', 'room', 'room.hotel');
        return response()->json($booking, 200);
    }

    public function update(Request $request, Booking $booking)
    {
        if (auth()->user()->role !== 'admin' && $booking->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $allowedFields = auth()->user()->role === 'admin'
            ? ['room_id', 'hotel_id', 'check_in', 'check_out', 'guests', 'total_price', 'status', 'number_of_rooms']
            : ['check_in', 'check_out', 'guests'];

        $request->validate([
            'room_id' => 'sometimes|required|exists:rooms,id',
            'hotel_id' => 'sometimes|required|exists:hotels,id',
            'check_in' => 'sometimes|required|date|after:today',
            'check_out' => 'sometimes|required|date|after:check_in',
            'guests' => 'sometimes|required|integer|min:1',
            'total_price' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|in:pending,confirmed,cancelled',
        ]);

        // Verify room and hotel compatibility
        if ($request->has('room_id') && $request->has('hotel_id')) {
            $room = Room::findOrFail($request->room_id);
            if ($room->hotel_id != $request->hotel_id) {
                return response()->json(['error' => 'Room does not belong to the specified hotel'], 422);
            }
        }

        // If updating room_id or guests, adjust quantity
        if ($request->hasAny(['room_id', 'guests'])) {
            $room = $request->has('room_id') ? Room::findOrFail($request->room_id) : $booking->room;
            $guests = $request->has('guests') ? $request->guests : $booking->guests;

            // Determine number of rooms needed
            $guestCapacity = 1;
            if (!is_null($room->single_price)) {
                $guestCapacity = 1;
            } elseif (!is_null($room->double_price) || !is_null($room->deluxe_price)) {
                $guestCapacity = 2;
            }
            $newNumberOfRooms = ceil($guests / $guestCapacity);

            // Check availability for new room if room_id changed
            if ($request->has('room_id') && $request->room_id != $booking->room_id) {
                $existingBookings = Booking::where('room_id', $request->room_id)
                    ->where('status', '!=', 'cancelled')
                    ->where('id', '!=', $booking->id)
                    ->where(function ($query) use ($request) {
                        $query->whereBetween('check_in', [$request->check_in, $request->check_out])
                            ->orWhereBetween('check_out', [$request->check_in, $request->check_out])
                            ->orWhere(function ($q) use ($request) {
                                $q->where('check_in', '<=', $request->check_in)
                                  ->where('check_out', '>=', $request->check_out);
                            });
                    })
                    ->sum('number_of_rooms');

                if ($existingBookings + $newNumberOfRooms > $room->quantity) {
                    return response()->json(['error' => 'Not enough rooms available for the selected dates'], 422);
                }

                if ($room->quantity < $newNumberOfRooms) {
                    return response()->json(['error' => 'Not enough rooms available'], 422);
                }

                // Restore quantity of old room
                $oldRoom = Room::find($booking->room_id);
                if ($oldRoom && $booking->number_of_rooms) {
                    $oldRoom->increment('quantity', $booking->number_of_rooms);
                    Log::info("Restored old room quantity: room_id={$oldRoom->id}, restored_by={$booking->number_of_rooms}");
                }
                // Decrease quantity of new room
                $room->decrement('quantity', $newNumberOfRooms);
                Log::info("Decremented new room quantity: room_id={$room->id}, decremented_by={$newNumberOfRooms}");

                // Update hotel_booking_rooms
                HotelBookingRoom::where('booking_id', $booking->id)->update([
                    'hotel_id' => $request->has('hotel_id') ? $request->hotel_id : $booking->hotel_id,
                    'room_id' => $request->room_id,
                ]);
            } elseif ($request->has('guests')) {
                // Adjust quantity for same room
                $existingBookings = Booking::where('room_id', $booking->room_id)
                    ->where('status', '!=', 'cancelled')
                    ->where('id', '!=', $booking->id)
                    ->where(function ($query) use ($request, $booking) {
                        $checkIn = $request->has('check_in') ? $request->check_in : $booking->check_in;
                        $checkOut = $request->has('check_out') ? $request->check_out : $booking->check_out;
                        $query->whereBetween('check_in', [$checkIn, $checkOut])
                            ->orWhereBetween('check_out', [$checkIn, $checkOut])
                            ->orWhere(function ($q) use ($checkIn, $checkOut) {
                                $q->where('check_in', '<=', $checkIn)
                                  ->where('check_out', '>=', $checkOut);
                            });
                    })
                    ->sum('number_of_rooms');

                if ($existingBookings + $newNumberOfRooms > $room->quantity) {
                    return response()->json(['error' => 'Not enough rooms available for the selected dates'], 422);
                }

                if ($room->quantity < $newNumberOfRooms) {
                    return response()->json(['error' => 'Not enough rooms available'], 422);
                }

                // Adjust quantity
                if ($booking->number_of_rooms) {
                    $room->increment('quantity', $booking->number_of_rooms);
                    Log::info("Restored room quantity: room_id={$room->id}, restored_by={$booking->number_of_rooms}");
                }
                $room->decrement('quantity', $newNumberOfRooms);
                Log::info("Decremented room quantity: room_id={$room->id}, decremented_by={$newNumberOfRooms}");
            }

            // Validate price
            if ($request->hasAny(['guests', 'check_in', 'check_out', 'total_price', 'room_id'])) {
                $checkIn = $request->has('check_in') ? $request->check_in : $booking->check_in;
                $checkOut = $request->has('check_out') ? $request->check_out : $booking->check_out;
                $nights = (new \DateTime($checkOut))->diff(new \DateTime($checkIn))->days;
                $basePrice = $room->price;

                if (!is_null($room->single_price)) {
                    $basePrice = $room->single_price;
                } elseif (!is_null($room->double_price)) {
                    $basePrice = $room->double_price;
                } elseif (!is_null($room->deluxe_price)) {
                    $basePrice = $room->deluxe_price;
                }

                $expectedPrice = $basePrice * $nights * $newNumberOfRooms;

                if ($request->has('total_price') && abs($request->total_price - $expectedPrice) > 0.01) {
                    // Restore quantity on price validation failure
                    if ($request->has('room_id') && $request->room_id != $booking->room_id) {
                        $room->increment('quantity', $newNumberOfRooms);
                        if ($oldRoom && $booking->number_of_rooms) {
                            $oldRoom->decrement('quantity', $booking->number_of_rooms);
                        }
                    } elseif ($request->has('guests')) {
                        $room->increment('quantity', $newNumberOfRooms);
                        if ($booking->number_of_rooms) {
                            $room->decrement('quantity', $booking->number_of_rooms);
                        }
                    }
                    return response()->json(['error' => 'Invalid total price'], 422);
                }
            }

            // Update number_of_rooms
            if ($request->has('guests')) {
                $request->merge(['number_of_rooms' => $newNumberOfRooms]);
            }

            // If only hotel_id changes, update hotel_booking_rooms
            if ($request->has('hotel_id') && !$request->has('room_id')) {
                HotelBookingRoom::where('booking_id', $booking->id)->update([
                    'hotel_id' => $request->hotel_id,
                ]);
            }
        }

        $booking->update($request->only($allowedFields));
        return response()->json(['message' => 'Booking updated successfully', 'data' => $booking], 200);
    }

    public function destroy(Booking $booking)
    {
        if (auth()->user()->role !== 'admin' && $booking->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        try {
            DB::transaction(function () use ($booking) {
                // Restore room quantity
                $room = Room::find($booking->room_id);
                $roomsToRestore = $booking->number_of_rooms ?? 1;
                if ($room) {
                    $room->increment('quantity', $roomsToRestore);
                    Log::info("Room quantity restored: room_id={$booking->room_id}, restored_by={$roomsToRestore}, new_quantity={$room->fresh()->quantity}");
                }

                // Delete related hotel_booking_rooms entry (handled by cascade onDelete)

                $booking->delete();
            });

            return response()->json(['message' => 'Booking deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error("Booking deletion failed: booking_id={$booking->id}, error={$e->getMessage()}");
            return response()->json(['error' => 'Failed to delete booking: ' . $e->getMessage()], 500);
        }
    }
}