<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Form mengizinkan skill dikirim tanpa icon_identifier (memakai gambar
     * unggahan sebagai gantinya), sehingga kolom ini tidak boleh NOT NULL.
     */
    public function up(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->string('icon_identifier')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->string('icon_identifier')->nullable(false)->change();
        });
    }
};
