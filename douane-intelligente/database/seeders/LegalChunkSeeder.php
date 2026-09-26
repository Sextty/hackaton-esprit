<?php

namespace Database\Seeders;

use App\Models\LegalChunk;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Schema;

class LegalChunkSeeder extends Seeder
{
    /**
     * Corpus RAG — fragments de contenu en français simple.
     *
     * Les "reference" citent, lorsque la source a été vérifiée, l'article
     * exact du Code des douanes tunisien (Loi n° 2008-34 du 2 juin 2008),
     * ou le formulaire officiel de la Direction Générale des Douanes
     * (code BTE/DV + page du document PDF) ; à défaut, une catégorie
     * générique de réglementation est conservée.
     *
     * La clé d'identité est le "title" : elle est stable, alors que la
     * "reference" peut être affinée quand une source plus précise est trouvée.
     *
     * "category" est conservée dans les données (general | fcr | devises |
     * bagages | vehicules | colis) et n'est persistée que si la colonne
     * existe dans la table legal_chunks — le schéma n'exige que title,
     * content et reference.
     *
     * @var list<array{title: string, content: string, reference: string, category: string}>
     */
    public const CHUNKS = [
        [
            'title' => 'Conditions générales du FCR pour un véhicule résident',
            'reference' => 'Réglementation douanière tunisienne — régime FCR',
            'category' => 'fcr',
            'content' => "Le FCR permet à un Tunisien résidant à l'étranger d'importer un véhicule à l'occasion de son retour définitif en Tunisie, avec un allègement des droits et des taxes. Le bénéficiaire doit être de nationalité tunisienne, avoir au moins 18 ans à la date de sa dernière entrée en Tunisie, justifier d'une résidence continue à l'étranger d'au moins deux ans avant cette entrée, et ne pas avoir séjourné plus de 183 jours en Tunisie par période de 365 jours. Le véhicule doit être la propriété personnelle du bénéficiaire, avoir moins de cinq ans à la date d'entrée, peser au plus 3,5 tonnes, et être importé ou acquis localement dans les deux ans suivant la dernière entrée. La demande se dépose au bureau de douane compétent, en général celui du lieu de résidence, et elle doit être tenue à jour lorsque la situation du véhicule ou du titulaire change.",
        ],
        [
            'title' => 'Documents à présenter pour le FCR',
            'reference' => 'Réglementation douanière tunisienne — régime FCR (documents)',
            'category' => 'fcr',
            'content' => "Pour un dossier FCR, préparez : le passeport tunisien en cours de validité, la preuve de résidence à l'étranger sur au moins deux ans (attestation de résidence, justificatif d'emploi ou de fiscalité), le certificat d'immatriculation du véhicule (carte grise), la facture d'achat du véhicule, une preuve de propriété ou une procuration légalisée, ainsi que la déclaration des effets personnels accompagnés. Si le véhicule est acheté auprès d'un concessionnaire, le paiement doit pouvoir être prouvé. Les documents doivent être originaux ou accompagnés de copies conformes ; tout document manquant retarde l'instruction du dossier.",
        ],
        [
            'title' => "Déclaration des devises à l'entrée et à la sortie du territoire",
            'reference' => 'Réglementation douanière tunisienne — déclaration de devises',
            'category' => 'devises',
            'content' => "Toute personne qui entre en Tunisie ou qui en sort transportant des espèces, en dinars tunisiens ou en devises étrangères, doit les déclarer aux agents de douane dès que le montant atteint ou dépasse l'équivalent de 20 000 dinars tunisiens. Il n'existe aucun montant interdit : le voyageur peut importer la somme de son choix, à condition de respecter cette obligation de déclaration. La déclaration s'effectue au guichet, à l'aide du formulaire remis par l'administration, ou en ligne sur le portail de la douane avant le voyage ; elle est valable pour un seul trajet. Le dinar tunisien n'est pas librement convertible hors de Tunisie : son import et son export sont encadrés par la réglementation des changes.",
        ],
        [
            'title' => 'Plafond de devises à déclarer à la frontière',
            'reference' => 'Réglementation douanière tunisienne — plafond de devises',
            'category' => 'devises',
            'content' => "Le seuil de déclaration des moyens de paiement est fixé à l'équivalent de 20 000 dinars tunisiens : toute somme égale ou supérieure à ce montant doit être déclarée à l'entrée comme à la sortie du territoire, qu'elle soit portée sur la personne, placée dans les bagages ou transportée dans un véhicule. En dessous du seuil, aucune formalité n'est exigée, mais il est recommandé de déclarer les fonds quelle que soit leur valeur afin d'éviter tout litige. Les sommes qui ne sont pas déclarées peuvent être saisies et donner lieu à un procès-verbal et à des sanctions financières. Une déclaration n'est valable que pour un voyage : elle doit être renouvelée à chaque nouvelle entrée.",
        ],
        [
            'title' => 'Franchise des bagages personnels du voyageur',
            'reference' => 'Réglementation douanière tunisienne — franchise bagages',
            'category' => 'bagages',
            'content' => "Le voyageur bénéficie d'une franchise en droits et taxes pour ses bagages personnels : vêtements, effets personnels et objets à usage domestique, dans la limite d'un montant global fixé par la réglementation en vigueur. Certains produits comme les alcools, le tabac, les parfums et les carburants sont admis en quantités limitées, indépendamment de ce montant. Au-delà de la franchise, les articles sont taxés sur leur valeur, et les biens neufs ou en quantité commerciale sont traités comme une importation.",
        ],
        [
            'title' => 'Documents et déclaration pour les bagages',
            'reference' => 'Art. 56, Code des Douanes, Loi n° 2008-34 du 2 juin 2008 — voir aussi formulaire BTE-009.0-FR-0819',
            'category' => 'bagages',
            'content' => "Pour faire passer vos bagages au poste de douane, présentez votre passeport ou votre carte d'identité, votre titre de voyage et, s'il y a lieu, la facture des biens achetés à l'étranger. Pour les effets personnels importés, un formulaire officiel intitulé « Liste des effets importés » (code BTE-009.0-FR-0819) peut être exigé : on y note le nom, le numéro de passeport, le moyen de transport et l'adresse en Tunisie, puis la liste des articles sur 30 lignes au plus, en précisant pour chaque article le nombre d'unités et leur état (neufs ou usagés), ainsi que le nombre total d'articles écrit en toutes lettres. Le formulaire est établi en deux exemplaires, signé par le voyageur. Pour rechercher les infractions, les agents de douane peuvent visiter les marchandises, les moyens de transport et les personnes : la visite des personnes a lieu dans des locaux réservés à cet effet, avec un examen à corps seulement en cas de doutes sérieux. Si des indices sérieux laissent penser qu'une personne qui traverse la frontière transporte des produits prohibés dissimulés dans son organisme, un examen médical de dépistage ne peut être pratiqué qu'après recueil de son consentement exprès ; en cas de refus, c'est le procureur de la République qui doit autoriser l'examen, et le déroulement est consigné dans un procès-verbal transmis au procureur.",
        ],
        [
            'title' => 'Taxation des colis achetés en ligne',
            'reference' => 'Réglementation douanière tunisienne — colis postaux et achats en ligne',
            'category' => 'colis',
            'content' => "Les envois postaux reçus des particuliers et sans caractère commercial sont dispensés des formalités de commerce extérieur et de change, mais restent soumis aux droits et taxes. Pour un envoi sans valeur commerciale, le calcul repose sur une taxation forfaitaire : la valeur estimée des articles est divisée par 10, dans la limite de 2 000 dinars tunisiens. Lorsque la valeur est jugée importante, l'administration retient la facture ou la déclaration CN23 jointe au colis, ou la valeur constatée après visite de l'envoi. Certains articles sont exonérés en raison de leur nature (médicaments, livres) ou de leur valeur dérisoire. Un envoi de caractère commercial reste soumis au régime de droit commun : il exige une déclaration en douane et le paiement des droits et taxes dus. Le colis n'est remis qu'après paiement des sommes dues et présentation des justificatifs demandés.",
        ],
        [
            'title' => 'Documents pour le retrait d\'un colis postal',
            'reference' => 'Art. 131, Code des Douanes, Loi n° 2008-34 du 2 juin 2008',
            'category' => 'colis',
            'content' => "Pour retirer un colis, munissez-vous de l'avis d'arrivée envoyé par le bureau de poste, de votre pièce d'identité, du numéro de suivi et d'une facture ou preuve d'achat datée indiquant les articles et leur montant. Si le retrait est fait par un tiers, une autorisation écrite du destinataire ainsi qu'une copie de sa pièce d'identité sont exigées. Le Code des douanes fixe les conditions générales de tout enlèvement : aucune marchandise ne peut quitter les bureaux de la douane ou les lieux désignés si les droits et taxes n'ont pas été préalablement payés, consignés ou garantis, et le retrait est subordonné à l'autorisation du service des douanes. Une fois cette autorisation délivrée, les marchandises doivent être enlevées. Le paiement des droits et taxes s'effectue donc au guichet avant la remise du colis.",
        ],
        [
            'title' => 'Régularisation d\'un véhicule immatriculé temporairement',
            'reference' => 'Formulaire officiel BTE-007-FR-0920 — Demande de réexportation de véhicule — Direction Générale des Douanes (p. 1)',
            'category' => 'vehicules',
            'content' => "Un véhicule immatriculé temporairement, comme une voiture de passage ou un véhicule introduit pour une durée limitée, doit être réexporté ou régularisé avant la fin du délai accordé à l'entrée. La régularisation consiste à acquitter les droits et taxes dus puis à obtenir une immatriculation définitive. La réexportation, elle, fait l'objet d'une demande officielle au moyen du formulaire BTE-007-FR-0920, signée par son titulaire et déposée au bureau régional des douanes territorialement compétent ; ce formulaire précise que le véhicule reste soumis au régime de la franchise totale durant la première année de bénéfice, avec préservation du droit à la FCR. Passé le délai, le véhicule est réputé importé de manière irrégulière : il peut être bloqué ou saisi, et son conducteur s'expose à des poursuites.",
        ],
        [
            'title' => 'Documents pour régulariser un véhicule immatriculé temporairement',
            'reference' => 'Réglementation douanière tunisienne — véhicule temporaire (documents)',
            'category' => 'vehicules',
            'content' => "Le dossier de régularisation comprend le passeport ou la pièce d'identité du propriétaire, le certificat d'immatriculation temporaire délivré à l'entrée, la fiche technique du véhicule, la facture d'achat ou une autre preuve de propriété, l'attestation d'assurance valable en Tunisie et la déclaration d'entrée du véhicule. Une preuve de domiciliation peut être demandée selon la situation du dossier. Le dossier se dépose au bureau de douane où le véhicule a été présenté à l'entrée.",
        ],
        [
            'title' => 'Fixation de la date du retour définitif',
            'reference' => 'Formulaire officiel BTE-005-FR-0920 — Demande de fixation de la date du retour définitif — Direction Générale des Douanes (p. 1-2)',
            'category' => 'fcr',
            'content' => "Un Tunisien résidant à l'étranger peut demander qu'une date soit officiellement fixée comme date de son retour définitif en Tunisie : il s'agit de la date de sa dernière entrée en Tunisie. La demande se fait au moyen du formulaire BTE-005-FR-0920, où cette date est indiquée. Pièces à joindre : la photocopie de la carte d'identité nationale, la photocopie des pages du passeport portant l'identité et le cachet de la dernière entrée en Tunisie et, si l'entrée s'est faite par un bureau frontalier terrestre, la photocopie de la page du passeport portant le cachet de sortie apposé par la police des frontières du pays voisin. Le demandeur se présente en personne, muni de son passeport, à la direction régionale des douanes du ressort où se trouve le domicile indiqué sur sa carte d'identité nationale. Il peut demander à retirer la décision sur place dans une direction régionale de son choix, ou à la recevoir par courrier.",
        ],
        [
            'title' => 'Autorisation de conduire un véhicule sous le régime suspensif (RS)',
            'reference' => 'Formulaire officiel BTE-003-FR-0920 — Demande d\'autorisation de conduire un véhicule sous le régime suspensif — Direction Générale des Douanes (p. 1-2)',
            'category' => 'vehicules',
            'content' => "Le propriétaire d'un véhicule admis sous le régime suspensif (RS) peut demander l'autorisation de le faire conduire par un proche : mari, épouse, père, mère, fils, fille, frère ou sœur. L'autorisation est délivrée pour une durée de un an, deux ans ou trois ans au choix, et elle court à compter de la date de délivrance ; tout renouvellement exige de représenter le même dossier. Pièces à joindre : la photocopie de la carte d'identité nationale du propriétaire (bénéficiaire du privilège), la photocopie de la carte grise, la photocopie de la carte d'identité nationale du conducteur autorisé, la photocopie de son permis de conduire, l'extrait de naissance du propriétaire et l'extrait de naissance du conducteur, chacun datant de moins de 3 mois. La demande doit être signée et légalisée par le propriétaire (légalisation auprès des services municipaux en Tunisie ou des services consulaires à l'étranger) et déposée au bureau régional des douanes ou au bureau du guichet unique des douanes, territorialement compétent.",
        ],
        [
            'title' => 'Prorogation du permis de circulation du véhicule',
            'reference' => 'Formulaire officiel BTE-006-FR-0920 — Demande de prorogation du permis de circulation — Direction Générale des Douanes (p. 1-2)',
            'category' => 'vehicules',
            'content' => "Le permis de circulation d'un véhicule importé (l'autorisation rouge) peut être prorogé. La demande utilise le formulaire BTE-006-FR-0920 et précise la marque, le numéro d'immatriculation, la date d'importation du véhicule et le bureau d'entrée, la période de prorogation demandée ainsi que son ou ses motifs. Pièces à joindre : la photocopie de la carte d'identité nationale, la photocopie du passeport, la photocopie de la carte grise, le récépissé de paiement de la vignette et la photocopie de l'ancienne autorisation de circulation du véhicule (diptyque). Dépôt : pendant la première année, au bureau de rattachement mentionné sur le permis de circulation ; à partir de l'expiration de la validité de l'autorisation rouge, à la direction régionale des douanes compétente territorialement.",
        ],
        [
            'title' => 'Demande de renseignement sur la valeur en douane',
            'reference' => 'Formulaire officiel DV-002.0-FR-0109 — Demande de renseignements sur la valeur en douane — Direction Générale des Douanes (p. 1)',
            'category' => 'general',
            'content' => "Toute personne, particulier ou société, peut demander officiellement des renseignements sur la valeur en douane au moyen du formulaire DV-002.0-FR-0109. La demande précise le thème recherché : soit une question législative ou réglementaire, soit un dossier en cours d'étude. Elle peut viser une déclaration en douane existante, en indiquant son numéro, sa date et le code du bureau des douanes concerné. Le formulaire demande les coordonnées du demandeur (nom ou raison sociale, adresse, téléphone, fax, e-mail) et, pour une société, le code en douane ainsi que le nom et la qualité du signataire, accompagnés du cachet.",
        ],
        [
            'title' => 'Documents pour demander la réexportation d\'un véhicule',
            'reference' => 'Formulaire officiel BTE-007-FR-0920 — Demande de réexportation de véhicule, pièces à joindre — Direction Générale des Douanes (p. 2)',
            'category' => 'vehicules',
            'content' => "La demande de réexportation d'un véhicule se fait sur le formulaire officiel BTE-007-FR-0920, signé par le demandeur. Trois pièces doivent être jointes : la photocopie de la carte d'identité nationale, la photocopie du passeport (32 pages) et la photocopie de la carte grise du véhicule. La demande doit être déposée par le demandeur lui-même au bureau régional des douanes territorialement compétent. Elle permet de réexporter le véhicule avant la fin du délai accordé à l'entrée, au lieu de le régulariser.",
        ],
        [
            'title' => 'Procédure simplifiée DAE : enlèvement et embarquement de la marchandise',
            'reference' => "Formulaire « Demande d'autorisation d'enlèvement et d'embarquement (DAE) » — Direction Générale des Douanes (p. 1)",
            'category' => 'general',
            'content' => "Une entreprise importatrice ou exportatrice peut demander à bénéficier de la procédure simplifiée d'enlèvement et d'embarquement (DAE) pour enlever ou embarquer la marchandise qui lui est destinée. Dans sa demande, l'entreprise représentée par son responsable légal (avec son code en douane) s'engage à deux obligations : présenter la marchandise à l'agent des douanes chargé du contrôle dès son arrivée dans les locaux de l'entreprise et avant qu'elle n'en sorte, puis déposer une déclaration douanière exigible dans un délai de 08 jours afin de régulariser la situation de la marchandise. La demande est datée, signée et cachetée par l'entreprise, puis elle fait l'objet d'une décision du chef du bureau de rattachement.",
        ],

        /* --- Enrichissement à partir du Code des douanes (Loi n° 2008-34) --- */

        [
            'title' => 'Remboursement des droits et taxes payés à tort',
            'reference' => 'Art. 15 à 17, Code des Douanes, Loi n° 2008-34 du 2 juin 2008',
            'category' => 'general',
            'content' => "La douane peut rembourser (restituer) des droits et taxes perçus à l'importation lorsque cinq situations sont établies : le montant a été perçu indûment ou au-dessus du taux légalement dû ; les marchandises sont défectueuses ou non conformes au contrat au moment de l'importation ; elles ont été déclarées pour mise à la consommation par erreur, au lieu d'un autre régime douanier ; elles n'ont finalement pas été livrées alors que les droits avaient été payés ; elles se trouvent dans une situation particulière qui n'est pas imputable à l'importateur. Pour des marchandises défectueuses, le remboursement est conditionné soit à leur réexportation hors du territoire douanier (ou pour le compte du fournisseur étranger), soit à leur destruction sous contrôle de la douane, avec paiement des droits dus sur les résidus et les déchets. La demande doit être écrite et motivée, et être déposée contre récépissé auprès du chef du bureau de douane dont dépend la recette où les droits ont été perçus. Ce dernier doit répondre dans un délai maximum d'un mois à compter du dépôt ; à défaut de réponse dans ce délai, le silence vaut refus implicite, et tout refus total ou partiel doit être motivé. Aucun remboursement n'est accordé s'il est prouvé que les droits ont été répercutés sur l'acheteur. Le versement est effectué directement par le receveur des douanes, après visa de la décision par le directeur régional des douanes compétent.",
        ],
        [
            'title' => 'Renseignement contraignant sur le classement tarifaire et l\'origine',
            'reference' => 'Art. 13 bis à 13 quinquies, Code des Douanes, Loi n° 2008-34 du 2 juin 2008',
            'category' => 'general',
            'content' => "Toute personne peut demander par écrit à l'administration des douanes un renseignement contraignant sur le classement tarifaire d'un produit (sa position dans le tarif des droits de douane) ou sur son origine. La douane peut refuser la demande si elle ne se rapporte pas à une opération réelle d'importation ou d'exportation. La réponse est délivrée dans un délai n'excédant pas six mois à compter de la réception de la demande ; ce délai est interrompu lorsque l'administration réclame des documents, des données ou des éclaircissements complémentaires. Le renseignement est fourni gratuitement, sauf si des frais particuliers sont engagés, qui sont alors mis à la charge du demandeur. Il n'engage la douane que pour les marchandises dont les formalités sont accomplies après la date de délivrance. Validité : trois ans en matière de classement tarifaire et deux ans en matière d'origine ; si de nouveaux règlements rendent la réponse non conforme, la douane notifie la révocation, qui prend effet à partir de l'adoption de ces règlements. Le renseignement est nul s'il a été délivré sur la base d'éléments inexacts ou incomplets que le demandeur connaissait ou devait raisonnablement connaître : l'annulation est notifiée et prend effet à compter de la date de délivrance. Les conditions et modalités d'application de ces dispositions sont fixées par décret.",
        ],
        [
            'title' => 'Marchandises prohibées : ce que la loi entend par interdit',
            'reference' => 'Art. 39, Code des Douanes, Loi n° 2008-34 du 2 juin 2008',
            'category' => 'general',
            'content' => "Sont considérées comme prohibées toutes les marchandises dont l'importation ou l'exportation est interdite, à quelque titre que ce soit, ainsi que les marchandises soumises à des restrictions, à des règles de qualité ou de conditionnement, ou à des formalités particulières. Est prohibée toute marchandise que l'on ne peut pas faire entrer ou faire sortir librement, y compris lorsqu'il manque simplement une autorisation, un certificat ou un contrôle prévu par la réglementation. En effet, quand une opération est soumise à la présentation d'une autorisation ou d'un certificat, les marchandises sont réputées prohibées si elles ne sont pas accompagnées du titre régulier correspondant, ou si ces marchandises sont présentées sous le couvert d'un titre qui ne leur est pas applicable — par exemple une autorisation délivrée pour un autre produit. Les titres d'autorisation d'importation ou d'exportation sont nominatifs : ils ne peuvent en aucun cas être prêtés, cédés ou faire l'objet d'une transaction par leur titulaire. Les contrefaçons sont de façon spécifique prohibées à l'entrée et exclues des régimes de stockage, d'entrepôt, de transit et de circulation : ces marchandises ne peuvent pas y être admises. En pratique, des marchandises prohibées ne peuvent pas être mises à la consommation : selon le cas, elles doivent être réexportées, détruites ou saisies, et leur introduction expose à des sanctions douanières. Si l'interdiction résulte seulement d'une formalité manquante, il faut régulariser le titre avant de demander l'enlèvement des marchandises.",
        ],
        [
            'title' => 'La déclaration en détail est obligatoire pour toute marchandise',
            'reference' => 'Art. 99 à 101, Code des Douanes, Loi n° 2008-34 du 2 juin 2008',
            'category' => 'general',
            'content' => "Toutes les marchandises importées ou exportées doivent faire l'objet d'une déclaration en détail qui leur assigne un régime douanier. Le fait d'être exonéré de droits et taxes, à l'entrée comme à la sortie, ne dispense pas de cette obligation : même un envoi en franchise doit être déclaré. La déclaration se dépose dans un bureau de douane ouvert pour l'opération envisagée, lors ou après l'arrivée des marchandises. À titre exceptionnel, le directeur général des douanes peut autoriser un dépôt avant l'arrivée, notamment pour les produits inflammables, périssables, dangereux, pondéreux ou encombrants ; une telle déclaration devient nulle de plein droit si les taux de droits changent, ou si le cours de change de la devise de facturation fluctue de plus de 1 % entre l'enregistrement et l'arrivée de la marchandise. Le dépôt doit intervenir dans le délai fixé par arrêté du ministre des finances, à compter de l'arrivée, et pendant les horaires prévus. La déclaration est présentée par le propriétaire des marchandises ou par une personne habilitée : un commissionnaire en douane agréé, ou un titulaire d'autorisation de dédouaner.",
        ],
        [
            'title' => 'Corriger ou annuler une erreur de déclaration en douane',
            'reference' => 'Art. 117, Code des Douanes, Loi n° 2008-34 du 2 juin 2008',
            'category' => 'general',
            'content' => "Après leur enregistrement, les déclarations ne peuvent plus être modifiées librement. Le déclarant peut toutefois être autorisé à rectifier ses énonciations, sans pénalité, à deux conditions : la demande intervient avant la mainlevée des marchandises, et la douane n'a ni relevé l'inexactitude ni fait part de son intention d'examiner les marchandises. La rectification ne peut pas faire porter la déclaration sur des marchandises d'une autre espèce que celles initialement déclarées. Une déclaration enregistrée ne peut pas être annulée non plus, sauf autorisation des services douaniers, qui peuvent l'accorder à la demande du déclarant dans plusieurs cas : marchandises présentées à l'exportation mais non effectivement exportées ; marchandises importées non conformes à la réglementation technique, sanitaire, vétérinaire, phytosanitaire ou à la protection du consommateur ; marchandises importées par la poste et renvoyées à l'expéditeur par les services postaux ; erreur de régime douanier alors que la marchandise n'a pas encore été remise ; marchandises endommagées ou non conformes au contrat ; marchandises déclarées mais jamais arrivées ; situation particulière non imputable au déclarant. L'annulation cesse ses effets à l'égard du déclarant, sans préjudice des suites contentieuses possibles.",
        ],
        [
            'title' => 'Régimes suspensifs : circuler des marchandises sans payer les droits tout de suite',
            'reference' => 'Art. 137 à 139, Code des Douanes, Loi n° 2008-34 du 2 juin 2008',
            'category' => 'vehicules',
            'content' => "Les régimes suspensifs et les régimes douaniers économiques comprennent le transit, l'entrepôt douanier, la transformation sous douane, le perfectionnement actif, l'admission temporaire, le perfectionnement passif et l'exportation temporaire. Leur principe : le stockage, la transformation, l'utilisation ou la circulation des marchandises se fait en suspension des droits de douane et des taxes intérieures exigibles, ainsi que de tout autre droit ou taxe dont ces marchandises sont passibles. Ils peuvent aussi suspendre l'application des prohibitions, des formalités du commerce extérieur et des autres mesures économiques à l'importation ou à l'exportation, sauf dispositions contraires et exclusions prévues par arrêté du ministre des finances. L'admission temporaire est le régime classique d'un véhicule ou d'un bien introduit pour une durée limitée, sans paiement immédiat des droits. Le bénéfice d'un régime suspensif est toujours subordonné à l'autorisation des services des douanes, qui l'accordent s'ils sont en mesure d'identifier les marchandises au moment de leur réimportation, leur réexportation, leur mise à la consommation ou leur passage sous un autre régime — en l'état ou sous forme de produits compensateurs, c'est-à-dire fabriqués à partir de ces marchandises.",
        ],
    ];

    /**
     * Anciens fragments dont la "reference" reprenait un numéro d'article inventé.
     *
     * @var list<string>
     */
    protected const LEGACY_REFERENCES = ['CD-ART-202', 'CD-ART-145'];

    public function run(): void
    {
        $hasCategory = Schema::hasColumn('legal_chunks', 'category')
            && in_array('category', (new LegalChunk())->getFillable(), true);

        foreach (self::CHUNKS as $chunk) {
            $attributes = $hasCategory ? $chunk : Arr::except($chunk, ['category']);

            LegalChunk::updateOrCreate(['title' => $chunk['title']], $attributes);
        }

        LegalChunk::whereIn('reference', self::LEGACY_REFERENCES)->delete();
    }
}
