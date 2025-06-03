<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAiModelMetadataTable extends Migration
{
    public function up()
    {
        Schema::create('ai_model_metadata', function (Blueprint $table) {
            $table->id();
            $table->string('model_version', 50);
            $table->text('training_data')->nullable();
            $table->timestamp('last_trained_at')->nullable();
            $table->text('performance_metrics')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ai_model_metadata');
    }
}