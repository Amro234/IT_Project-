<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelBookingRoom extends Model
{
    use HasFactory;
    protected $fillable = ['hotel_id', 'booking_id', 'room_id'];
}
