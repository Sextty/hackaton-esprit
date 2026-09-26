<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomsOffice extends Model
{
    protected $fillable = [
        'name',
        'city',
    ];

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'office_id');
    }
}
