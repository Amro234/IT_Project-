<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transportation extends Model
{
    use HasFactory;

    protected $fillable = ['city_id', 'type', 'name', 'description', 'price'];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }
}