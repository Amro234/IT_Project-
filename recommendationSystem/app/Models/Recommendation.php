<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'hotel_id', 'transportation_id', 'restaurant_id', 'entertainment_place_id', 'score'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function transportation()
    {
        return $this->belongsTo(Transportation::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function entertainmentPlace()
    {
        return $this->belongsTo(EntertainmentPlace::class);
    }
}