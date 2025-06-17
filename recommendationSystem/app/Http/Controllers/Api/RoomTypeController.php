<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin')->only(['store', 'update', 'destroy']);    
    }

    public function index()
    {
        return response()->json(RoomType::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $roomType = RoomType::create($request->only('name'));
        return response()->json(['message' => 'Room Type created successfully', 'data' => $roomType], 201);
    }

    public function show(RoomType $roomType)
    {
        return response()->json($roomType, 200);
    }

    public function update(Request $request, RoomType $roomType)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $roomType->update($request->only('name'));
        return response()->json(['message' => 'Room Type updated successfully', 'data' => $roomType], 200);
    }

    public function destroy(RoomType $roomType)
    {
        $roomType->delete();
        return response()->json(['message' => 'Room Type deleted successfully'], 200);
    }
}