<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'name',
        'issuer',
        'issue_date',
        'expiration_date',
        'credential_url',
        'badge_image_path',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'expiration_date' => 'date',
    ];
}
