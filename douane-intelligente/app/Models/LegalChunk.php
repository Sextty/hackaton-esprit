<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalChunk extends Model
{
    protected $fillable = [
        'title',
        'content',
        'reference',
    ];
}
