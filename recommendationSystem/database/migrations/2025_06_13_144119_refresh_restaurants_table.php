<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RefreshRestaurantsTable extends Migration
{
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('restaurants');
        Schema::enableForeignKeyConstraints();

        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('address');
            $table->decimal('average_cost', 8, 2);
            $table->decimal('rating', 3, 1)->nullable();
            $table->integer('review_count')->nullable();
            $table->decimal('small_meal', 8, 2)->nullable();
            $table->decimal('medium_meal', 8, 2)->nullable();
            $table->decimal('large_meal', 8, 2)->nullable();
            $table->string('logo')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('restaurants');
    }
}