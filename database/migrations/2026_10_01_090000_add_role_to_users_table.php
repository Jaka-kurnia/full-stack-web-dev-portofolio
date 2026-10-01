<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('user')->after('password');
            $table->index('role');
        });

        // Backfill satu kali: seluruh akun yang sudah ada lahir sebelum RBAC
        // dan selama ini memang memiliki akses admin penuh, jadi tidak ada
        // yang kehilangan akses. Pendaftaran baru otomatis mendapat role 'user'.
        DB::table('users')->update(['role' => 'admin']);
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropColumn('role');
        });
    }
};
