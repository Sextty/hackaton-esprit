<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    public const STATUS_PENDING = 'pending';

    public const STATUS_CONFIRMED = 'confirmed';

    public const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'reference_code',
        'office_id',
        'service_id',
        'appointment_date',
        'appointment_time',
        'status',
        'citizen_name',
    ];

    protected $casts = [
        'appointment_date' => 'date',
    ];

    public function office(): BelongsTo
    {
        return $this->belongsTo(CustomsOffice::class, 'office_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(CustomsService::class, 'service_id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', '!=', self::STATUS_CANCELLED);
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->active()
            ->whereDate('appointment_date', '>=', now()->toDateString())
            ->orderBy('appointment_date')
            ->orderBy('appointment_time');
    }
}
