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
            if (!Schema::hasColumn('configurations', 'config_options')) {
                $table->json('config_options')->nullable();
            }

            if (!Schema::hasColumn('configurations', 'total_price')) {
                $table->decimal('total_price', 10, 2)->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('configurations', function (Blueprint $table) {
            if (Schema::hasColumn('configurations', 'config_options')) {
                $table->dropColumn('config_options');
            }

            if (Schema::hasColumn('configurations', 'installation_type')) {
                $table->dropColumn('installation_type');
            }
            
            if (Schema::hasColumn('configurations', 'material')) {
                $table->dropColumn('material');
            }
            
            if (Schema::hasColumn('configurations', 'color')) {
                $table->dropColumn('color');
            }
        });
    }
};
