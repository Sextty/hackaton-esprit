<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Jeu de données de démonstration (bureaux, services, corpus RAG,
     * rendez-vous). Chaque seeder est idempotent : la commande
     * `php artisan db:seed` peut être relancée sans dupliquer de lignes.
     *
     * Données de démonstration — à remplacer par les textes officiels
     * avant toute mise en production.
     */
    public function run(): void
    {
        $this->call([
            CustomsOfficeSeeder::class,
            CustomsServiceSeeder::class,
            LegalChunkSeeder::class,
            DemoAppointmentSeeder::class,
        ]);
    }
}
