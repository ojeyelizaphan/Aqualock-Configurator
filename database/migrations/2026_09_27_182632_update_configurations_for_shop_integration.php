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
        Schema::table('configurations', function (Blueprint $table) {
            $table->json('pricing_breakdown')
                    ->nullable()
                    ->after('total_price');

            $table->string('source', 30)
                ->default('configurator')
                ->after('pricing_breakdown');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('configurations', function (Blueprint $table) {
            $table->dropColumn([
                'pricing_breakdown',
                'source',
            ]);
        });
    }
};
