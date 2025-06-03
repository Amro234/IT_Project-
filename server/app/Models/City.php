<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function hotels()
    {
        return $this->hasMany(Hotel::class);
    }

    public function transportation()
    {
        return $this->hasMany(Transportation::class);
    }

    public function restaurants()
    {
        return $this->hasMany(Restaurant::class);
    }

    public function entertainmentPlaces()
    {
        return $this->hasMany(EntertainmentPlace::class);
    }
}