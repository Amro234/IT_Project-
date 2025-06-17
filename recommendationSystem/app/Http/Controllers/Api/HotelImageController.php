<?php

namespace App\Http\Controllers\Api;

use App\Models\HotelImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Support\Facades\Log;

class HotelImageController extends Controller
{
    /**
     * Display a listing of the hotel images.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $images = HotelImage::with('hotel')->get();
            return response()->json([
                'status' => 'success',
                'data' => $images
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve hotel images: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created hotel image in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'required|exists:hotels,id',
            'image_url' => 'required|url|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $image = HotelImage::create($request->only(['hotel_id', 'image_url']));
            return response()->json([
                'status' => 'success',
                'data' => $image,
                'message' => 'Hotel image created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create hotel image: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified hotel image.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $image = HotelImage::with('hotel')->findOrFail($id);
            return response()->json([
                'status' => 'success',
                'data' => $image
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Hotel image not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve hotel image: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified hotel image in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'sometimes|exists:hotels,id',
            'image_url' => 'sometimes|url|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $image = HotelImage::findOrFail($id);
            $image->update($request->only(['hotel_id', 'image_url']));
            return response()->json([
                'status' => 'success',
                'data' => $image,
                'message' => 'Hotel image updated successfully'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Hotel image not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update hotel image: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified hotel image from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $image = HotelImage::findOrFail($id);
            $image->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Hotel image deleted successfully'
            ], 204);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Hotel image not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete hotel image: ' . $e->getMessage()
            ], 500);
        }
    }
}