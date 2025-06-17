<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'city_id', 'name', 'description', 'address', 'average_cost',
        'rating', 'review_count', 'small_meal', 'medium_meal', 'large_meal', 'logo'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }
}