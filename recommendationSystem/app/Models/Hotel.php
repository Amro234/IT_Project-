<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'address', 'email', 'city_id', 'hotel_ranking', 'mobile_num','number_of_rooms', 'amenities', 'owner_id'];

    protected $casts = [
        'amenities' => 'array', // Automatically handle JSON encoding/decoding
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // public function hotelImages()
    // {
    //     return $this->hasMany(HotelImage::class,'HotelID');
    // }
   
    public function images()
    {
        return $this->hasMany(HotelImage::class);
    }
    public function hotelBookingRooms()
    {
        return $this->hasMany(HotelBookingRoom::class);
    }
}