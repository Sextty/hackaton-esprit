<?php

namespace Database\Seeders;

use App\Models\CustomsOffice;
use Illuminate\Database\Seeder;

class CustomsOfficeSeeder extends Seeder
{
    /**
     * Bureaux de douane tunisiens présentés pendant la démonstration.
     *
     * @var list<array{name: string, city: string}>
     */
    public const OFFICES = [
        ['name' => 'Bureau de douane de La Goulette', 'city' => 'Tunis'],
        ['name' => 'Bureau de douane de Radès', 'city' => 'Tunis'],
        ['name' => 'Bureau de douane de Sfax', 'city' => 'Sfax'],
        ['name' => 'Bureau de douane de Sousse', 'city' => 'Sousse'],
        ['name' => 'Bureau de douane de Bizerte', 'city' => 'Bizerte'],
    ];

    /**
     * Anciens bureaux de démonstration (hors Tunisie), remplacés par la liste ci-dessus.
     *
     * @var list<string>
     */
    protected const LEGACY_NAMES = [
        'Bureau de Douane de Casablanca-Port',
        'Bureau de Douane de Tanger Med',
    ];

    public function run(): void
    {
        foreach (self::OFFICES as $office) {
            CustomsOffice::updateOrCreate(['name' => $office['name']], $office);
        }

        CustomsOffice::whereIn('name', self::LEGACY_NAMES)
            ->whereDoesntHave('appointments')
            ->delete();
    }
}
