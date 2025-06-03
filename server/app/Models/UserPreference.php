<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'budget_min', 'budget_max', 'preferred_cities', 'preferred_entertainment', 'preferred_transport'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}