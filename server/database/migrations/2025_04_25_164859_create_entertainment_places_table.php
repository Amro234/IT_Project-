<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntertainmentPlacesTable extends Migration
{
    public function up()
    {
        Schema::create('entertainment_places', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');
            $table->enum('type', ['mall', 'beach', 'other']);
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('address');
            $table->decimal('entry_fee', 8, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('entertainment_places');
    }
}