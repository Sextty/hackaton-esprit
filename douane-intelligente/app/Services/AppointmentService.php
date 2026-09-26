<?php

namespace App\Services;

use App\Models\Appointment;
use Illuminate\Contracts\Validation\Validator as ValidatorInstance;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AppointmentService
{
    public const OPEN_TIME = '08:00';

    public const CLOSE_TIME = '15:30';

    public const SLOT_MINUTES = 30;

    public const RULES = [
        'office_id' => ['required', 'integer', 'exists:customs_offices,id'],
        'service_id' => ['required', 'integer', 'exists:customs_services,id'],
        'appointment_date' => ['required', 'date', 'after_or_equal:today', 'before_or_equal:+30 days'],
        'appointment_time' => ['required', 'string', 'date_format:H:i'],
        'citizen_name' => ['nullable', 'string', 'max:255'],
    ];

    /**
     * Crée un rendez-vous (validation + créneau + conflit + enregistrement).
     *
     * @throws ValidationException
     */
    public function book(array $data): array
    {
        $data = $this->normalize($data);

        $validator = Validator::make($data, self::RULES, [
            'office_id.exists' => 'Le bureau de douane demandé n\'existe pas.',
            'service_id.exists' => 'Le service demandé n\'existe pas.',
            'appointment_date.date' => 'La date du rendez-vous est invalide.',
            'appointment_date.after_or_equal' => 'La date du rendez-vous ne peut pas être dans le passé.',
            'appointment_date.before_or_equal' => 'Les rendez-vous ne peuvent être pris que pour les 30 prochains jours.',
            'appointment_time.date_format' => "L'heure doit être au format HH:MM (exemple : 09:30).",
        ]);

        $validator->after(function (ValidatorInstance $validator) use ($data) {
            $this->checkSlot($validator, (string) ($data['appointment_time'] ?? ''));
            $this->checkSunday($validator, $data);
        });

        $validator->validate();

        $this->checkConflict($data);

        $appointment = Appointment::create([
            'reference_code' => $this->uniqueReferenceCode(),
            'office_id' => (int) $data['office_id'],
            'service_id' => (int) $data['service_id'],
            'appointment_date' => $data['appointment_date'],
            'appointment_time' => $data['appointment_time'],
            'citizen_name' => trim((string) ($data['citizen_name'] ?? '')) ?: 'Citoyen',
            'status' => Appointment::STATUS_CONFIRMED,
        ]);

        $appointment->load(['office', 'service']);

        return [
            'reference_code' => $appointment->reference_code,
            'appointment' => $appointment,
        ];
    }

    /** @return list<string> */
    public static function slots(): array
    {
        $slots = [];
        $slot = Carbon::parse(self::OPEN_TIME);
        $last = Carbon::parse(self::CLOSE_TIME);

        while ($slot->lte($last)) {
            $slots[] = $slot->format('H:i');
            $slot->addMinutes(self::SLOT_MINUTES);
        }

        return $slots;
    }

    protected function normalize(array $data): array
    {
        $data['appointment_date'] = $data['appointment_date'] ?? ($data['date'] ?? null);
        $time = $data['appointment_time'] ?? ($data['time'] ?? null);

        if (is_string($time) && preg_match('/^(\d{1,2}):(\d{2})(?::\d{2})?$/', trim($time), $matches)) {
            $time = str_pad($matches[1], 2, '0', STR_PAD_LEFT).':'.$matches[2];
        }

        $data['appointment_time'] = $time;

        return $data;
    }

    protected function checkSlot(ValidatorInstance $validator, string $time): void
    {
        if ($time === '' || $validator->errors()->has('appointment_time')) {
            return;
        }

        if (! in_array($time, self::slots(), true)) {
            $validator->errors()->add(
                'appointment_time',
                'Créneau invalide : choisissez une heure de '.self::OPEN_TIME.' à '.self::CLOSE_TIME.' par pas de 30 minutes.'
            );
        }
    }

    protected function checkSunday(ValidatorInstance $validator, array $data): void
    {
        $date = $data['appointment_date'] ?? null;

        if (! is_string($date) || $date === '' || $validator->errors()->has('appointment_date')) {
            return;
        }

        try {
            $isSunday = Carbon::parse($date)->isSunday();
        } catch (\Throwable) {
            return;
        }

        if ($isSunday) {
            $validator->errors()->add('appointment_date', 'Les bureaux de douane sont fermés le dimanche.');
        }
    }

    /**
     * @throws ValidationException
     */
    protected function checkConflict(array $data): void
    {
        $time = (string) $data['appointment_time'];

        $conflict = Appointment::query()
            ->where('office_id', (int) $data['office_id'])
            ->whereDate('appointment_date', (string) $data['appointment_date'])
            ->where('status', '!=', Appointment::STATUS_CANCELLED)
            ->where(function ($query) use ($time) {
                $query->where('appointment_time', $time)
                    ->orWhere('appointment_time', $time.':00');
            })
            ->exists();

        if ($conflict) {
            throw ValidationException::withMessages([
                'appointment_time' => sprintf(
                    'Ce créneau est déjà réservé pour ce bureau le %s à %s.',
                    Carbon::parse($data['appointment_date'])->format('d/m/Y'),
                    $time
                ),
            ]);
        }
    }

    protected function uniqueReferenceCode(): string
    {
        do {
            $referenceCode = 'RDV-'.strtoupper(Str::random(6));
        } while (Appointment::where('reference_code', $referenceCode)->exists());

        return $referenceCode;
    }
}
