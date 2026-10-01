<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Menghapus tabel sisa scaffolding yang tidak pernah dipakai:
     * tanpa kolom, tanpa model berisi, tanpa satu pun rute.
     */
    public function up(): void
    {
        Schema::dropIfExists('bk_categories');
    }

    public function down(): void
    {
        Schema::create('bk_categories', function ($table) {
            $table->id();
            $table->timestamps();
        });
    }
};
