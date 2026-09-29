<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('configurations', function (Blueprint $table) {
            $table->string(
                'handoff_token_hash',
                64,
            )
                ->nullable()
                ->unique()
                ->after('source');

            $table->timestamp('handoff_expires_at')
                ->nullable()
                ->after('handoff_token_hash');
        });
    }

    public function down(): void
    {
        Schema::table('configurations', function (Blueprint $table) {
            $table->dropUnique([
                'handoff_token_hash',
            ]);

            $table->dropColumn([
                'handoff_token_hash',
                'handoff_expires_at',
            ]);
        });
    }
};