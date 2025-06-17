<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntertainmentPlace extends Model
{
    use HasFactory;

    protected $table = 'entertainment_places';
    protected $primaryKey = 'Landmark_id';

    protected $fillable = [
        'city_id', 'Landmark_name', 'Land_photo_1', 'Land_photo_2',
        'Land_photo_3', 'Land_photo_4', 'Rating', 'Ticket-price', 'Category'
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