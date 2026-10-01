<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'thumbnail_path',
        'content',
        'demo_url',
        'github_url',
        'is_featured',
        'status',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];

    public function galleries()
    {
        return $this->hasMany(ProjectGallery::class)->orderBy('order');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }
}
