<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiModelMetadata extends Model
{
    use HasFactory;

    protected $fillable = ['model_version', 'training_data', 'last_trained_at', 'performance_metrics'];
}