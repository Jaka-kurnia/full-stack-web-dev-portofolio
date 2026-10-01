<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'greeting',
        'full_name',
        'short_bio',
        'about_text',
        'profile_image_path',
        'cv_file_path',
        'availability_status',
        'social_links',
        'cta_text',
        'cta_link',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];
}
