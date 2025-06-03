<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'date_of_birth',
        'password',
        'email',
        'age',
        'sex',
        'mobile_num',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function userPreference()
    {
        return $this->hasOne(UserPreference::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function hotels()
    {
        return $this->hasMany(Hotel::class, 'owner_id');
    }
}