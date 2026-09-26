<?php

namespace Database\Seeders;

use App\Models\CustomsService;
use Illuminate\Database\Seeder;

class CustomsServiceSeeder extends Seeder
{
    /**
     * Services proposés au guichet — les documents sont listés,
     * séparés par des points-virgules (format attendu par les vues).
     *
     * @var list<array{code: string, title: string, required_documents: string}>
     */
    public const SERVICES = [
        [
            'code' => 'FCR',
            'title' => 'Dossier FCR pour véhicule résident',
            'required_documents' => 'Passeport tunisien en cours de validité; '
                .'Justificatif de résidence à l\'étranger sur au moins 2 ans; '
                .'Certificat d\'immatriculation du véhicule (carte grise); Fiche technique du véhicule; '
                .'Facture d\'achat ou preuve de propriété du véhicule; '
                .'Procuration légalisée si le véhicule n\'est pas au nom du demandeur; '
                .'Attestation d\'assurance du véhicule',
        ],
        [
            'code' => 'DEVISES',
            'title' => 'Déclaration de devises et d\'espèces',
            'required_documents' => 'Passeport ou carte d\'identité nationale; '
                .'Formulaire de déclaration des moyens de paiement fourni au guichet; '
                .'Justificatif de l\'origine des fonds si l\'agent douanier le demande; '
                .'Titre de voyage ou billet aller-retour',
        ],
        [
            'code' => 'BAGAGES',
            'title' => 'Franchise des bagages du voyageur',
            'required_documents' => 'Passeport ou carte d\'identité nationale; '
                .'Titre de voyage (billet) ; Déclaration verbale des biens soumis à formalité; '
                .'Facture des articles achetés à l\'étranger si disponible; '
                .'Liste du contenu des bagages sur demande',
        ],
        [
            'code' => 'COLIS',
            'title' => 'Retrait d\'un colis postal (achat en ligne)',
            'required_documents' => 'Avis d\'arrivée du colis; Passeport ou carte d\'identité nationale; '
                .'Numéro de suivi du colis; Facture ou preuve d\'achat (date, articles, montant); '
                .'Justificatif de domicile; Autorisation écrite et copie de la pièce d\'identité du tiers autorisé',
        ],
        [
            'code' => 'VEHICULE',
            'title' => 'Régularisation d\'un véhicule immatriculé temporairement',
            'required_documents' => 'Passeport ou carte d\'identité nationale; '
                .'Certificat d\'immatriculation temporaire délivré à l\'entrée; Fiche technique du véhicule; '
                .'Facture d\'achat ou preuve de propriété; Attestation d\'assurance valable en Tunisie; '
                .'Déclaration d\'entrée du véhicule et preuve de domiciliation le cas échéant',
        ],
    ];

    /**
     * Anciens services de démonstration remplacés par la liste ci-dessus.
     *
     * @var list<string>
     */
    protected const LEGACY_CODES = ['IMPORT', 'TRANSIT'];

    public function run(): void
    {
        foreach (self::SERVICES as $service) {
            CustomsService::updateOrCreate(['code' => $service['code']], $service);
        }

        CustomsService::whereIn('code', self::LEGACY_CODES)
            ->whereDoesntHave('appointments')
            ->delete();
    }
}
