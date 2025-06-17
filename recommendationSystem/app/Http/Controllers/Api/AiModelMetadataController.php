<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiModelMetadata;
use Illuminate\Http\Request;

class AiModelMetadataController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }

    public function index()
    {
        $metadata = AiModelMetadata::all();
        return response()->json($metadata, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'model_version' => 'required|string|max:50',
            'training_data' => 'nullable|string',
            'last_trained_at' => 'nullable|date',
            'performance_metrics' => 'nullable|string',
        ]);

        $metadata = AiModelMetadata::create($request->only([
            'model_version', 'training_data', 'last_trained_at', 'performance_metrics'
        ]));

        return response()->json(['message' => 'AI Model Metadata created successfully', 'data' => $metadata], 201);
    }

    public function show(AiModelMetadata $aiModelMetadata)
    {
        return response()->json($aiModelMetadata, 200);
    }

    public function update(Request $request, AiModelMetadata $aiModelMetadata)
    {
        $request->validate([
            'model_version' => 'required|string|max:50',
            'training_data' => 'nullable|string',
            'last_trained_at' => 'nullable|date',
            'performance_metrics' => 'nullable|string',
        ]);

        $aiModelMetadata->update($request->only([
            'model_version', 'training_data', 'last_trained_at', 'performance_metrics'
        ]));

        return response()->json(['message' => 'AI Model Metadata updated successfully', 'data' => $aiModelMetadata], 200);
    }

    public function destroy(AiModelMetadata $aiModelMetadata)
    {
        $aiModelMetadata->delete();
        return response()->json(['message' => 'AI Model Metadata deleted successfully'], 200);
    }
}