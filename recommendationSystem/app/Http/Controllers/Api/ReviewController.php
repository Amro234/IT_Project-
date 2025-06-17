<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        if (auth()->user()->role === 'admin') {
            $reviews = Review::with('user', 'hotel')->get();
        } else {
            $reviews = Review::with('user', 'hotel')->where('user_id', auth()->id())->get();
        }
        return response()->json($reviews, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'rating' => 'required|numeric|between:1,5',
            'comment' => 'nullable|string',
        ]);

        $review = Review::create([
            'user_id' => auth()->id(),
            'hotel_id' => $request->hotel_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json(['message' => 'Review created successfully', 'data' => $review], 201);
    }

    public function show(Review $review)
    {
        if (auth()->user()->role !== 'admin' && $review->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $review->load('user', 'hotel');
        return response()->json($review, 200);
    }

    public function update(Request $request, Review $review)
    {
        if (auth()->user()->role !== 'admin' && $review->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'rating' => 'required|numeric|between:1,5',
            'comment' => 'nullable|string',
        ]);

        $review->update($request->only(['hotel_id', 'rating', 'comment']));
        return response()->json(['message' => 'Review updated successfully', 'data' => $review], 200);
    }

    public function destroy(Review $review)
    {
        if (auth()->user()->role !== 'admin' && $review->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $review->delete();
        return response()->json(['message' => 'Review deleted successfully'], 200);
    }
}