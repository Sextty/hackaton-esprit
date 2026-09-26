<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\CustomsOffice;
use App\Models\CustomsService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class DemoAppointmentSeeder extends Seeder
{
    /**
     * Rendez-vous de démonstration, tous confirmés, placés dans les cinq
     * prochains jours ouvrés (les bureaux sont fermés le dimanche).
     *
     * Les codes de référence suivent le format RDV-XXXXXX.
     *
     * @var list<array{reference_code: string, office: string, service: string, time: string, citizen_name: string, day_offset: int}>
     */
    public const APPOINTMENTS = [
        [
            'reference_code' => 'RDV-DEMO01',
            'office' => 'Bureau de douane de La Goulette',
            'service' => 'FCR',
            'time' => '09:00',
            'citizen_name' => 'Amel Ben Salah',
            'day_offset' => 1,
        ],
        [
            'reference_code' => 'RDV-DEMO02',
            'office' => 'Bureau de douane de Sfax',
            'service' => 'COLIS',
            'time' => '10:30',
            'citizen_name' => 'Mohamed Trabelsi',
            'day_offset' => 2,
        ],
    ];

    public function run(): void
    {
        $dates = $this->nextOpeningDays(count(self::APPOINTMENTS));

        foreach (self::APPOINTMENTS as $index => $row) {
            $office = CustomsOffice::where('name', $row['office'])->first()
                ?? CustomsOffice::orderBy('id')->first();
            $service = CustomsService::where('code', $row['service'])->first()
                ?? CustomsService::orderBy('id')->first();

            if ($office === null || $service === null) {
                $this->command?->warn("Seeder : aucun bureau/service disponible pour {$row['reference_code']}.");

                continue;
            }

            Appointment::updateOrCreate(
                ['reference_code' => $row['reference_code']],
                [
                    'office_id' => $office->id,
                    'service_id' => $service->id,
                    'appointment_date' => $dates[$index]->toDateString(),
                    'appointment_time' => $row['time'],
                    'status' => Appointment::STATUS_CONFIRMED,
                    'citizen_name' => $row['citizen_name'],
                ]
            );
        }
    }

    /**
     * Renvoie $count jours d'ouverture situés entre demain et cinq jours plus tard.
     *
     * @return Collection<int, Carbon>
     */
    protected function nextOpeningDays(int $count): Collection
    {
        $days = collect(range(1, 5))
            ->map(fn (int $offset): Carbon => now()->addDays($offset))
            ->reject(fn (Carbon $date): bool => $date->isSunday())
            ->values();

        while ($days->count() < $count) {
            $days->push(now()->addDays($days->count() + 1));
        }

        return $days->take($count)->values();
    }
}
