<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntertainmentPlacesTable extends Migration
{
    public function up()
    {
        Schema::create('entertainment_places', function (Blueprint $table) {
            $table->id()->renameColumn('Landmark_id');
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');
            $table->string('Landmark_name');
            $table->string('Land_photo_1')->nullable();
            $table->string('Land_photo_2')->nullable();
            $table->string('Land_photo_3')->nullable();
            $table->string('Land_photo_4')->nullable();
            $table->decimal('Rating', 3, 1)->nullable();
            $table->decimal('Ticket-price', 8, 2)->nullable();
            $table->string('Category');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('entertainment_places');
    }
}