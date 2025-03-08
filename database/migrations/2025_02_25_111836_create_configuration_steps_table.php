<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('configuration_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_type_id')->constrained()->cascadeOnDelete();
            $table->string('name'); // Step name like "Material", "Color", etc.
            $table->integer('order')->default(1); // Step order in the flow
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configuration_steps');
    }
};
