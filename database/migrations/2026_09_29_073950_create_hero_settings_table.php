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
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            $table->string('greeting')->default('Hello, I am');
            $table->string('full_name');
            $table->text('short_bio');
            $table->string('profile_image_path')->nullable();
            $table->string('cv_file_path')->nullable();
            $table->enum('availability_status', ['Available', 'Busy', 'Not Looking'])->default('Available');
            $table->json('social_links')->nullable();
            $table->string('cta_text')->default('Contact Me');
            $table->string('cta_link')->default('#contact');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};
