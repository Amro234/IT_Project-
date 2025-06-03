<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomImage;
use Illuminate\Http\Request;

class RoomImageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }

    public function index()
    {
        $roomImages = RoomImage::with('room')->get();
        return response()->json($roomImages, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'image_url' => 'required|string|max:255',
        ]);

        $roomImage = RoomImage::create($request->only(['room_id', 'image_url']));
        return response()->json(['message' => 'Room Image created successfully', 'data' => $roomImage], 201);
    }

    public function show(RoomImage $roomImage)
    {
        $roomImage->load('room');
        return response()->json($roomImage, 200);
    }

    public function update(Request $request, RoomImage $roomImage)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'image_url' => 'required|string|max:255',
        ]);

        $roomImage->update($request->only(['room_id', 'image_url']));
        return response()->json(['message' => 'Room Image updated successfully', 'data' => $roomImage], 200);
    }

    public function destroy(RoomImage $roomImage)
    {
        $roomImage->delete();
        return response()->json(['message' => 'Room Image deleted successfully'], 200);
    }
}