<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomsService extends Model
{
    protected $fillable = [
        'code',
        'title',
        'required_documents',
    ];

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'service_id');
    }
}
