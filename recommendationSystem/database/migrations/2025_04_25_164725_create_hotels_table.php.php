<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelsTable extends Migration
{
    public function up()
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('address');
            $table->string('email')->nullable();
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');
            $table->enum('hotel_ranking', ['1','2', '3', '4', '5', '6', '7','8']);
            $table->string('mobile_num', 35)->nullable();//->unique()
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->json('amenities')->nullable();
            $table->unsignedInteger('number_of_rooms'); // Added number of rooms
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hotels');
    }
}