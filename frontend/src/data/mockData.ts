import { NavItem, FeatureService, StatItem, NewsArticle, VideoItem, EServiceItem } from '../types';

export const navigationItems: NavItem[] = [
  {
    id: 'accueil',
    label: { fr: 'Accueil', ar: 'الرئيسية' },
  },
  {
    id: 'particuliers',
    label: { fr: 'Particuliers', ar: 'الأفراد' },
    hasDropdown: true,
    sections: [
      {
        category: { fr: 'Voyageurs', ar: 'المسافرون' },
        items: [
          { title: { fr: 'Avez-vous quelque chose à déclarer ?', ar: 'هل لديك ما تصرح به ؟' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Véhicule & Tourisme', ar: 'العربات والسيارات' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Faune et flore', ar: 'الحياة البرية والنباتات' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Tabac et boissons alcoolisées', ar: 'التبغ والمشروبات الكحولية' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Animaux de compagnie', ar: 'الحيوانات الأليفة' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Médicaments', ar: 'الأدوية والمستلزمات الطبية' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Biens culturels & Antiquités', ar: 'الممتلكات الثقافية' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Armes & Munitions', ar: 'الأسلحة والذخائر' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Remboursement TVA (Détaxe)', ar: 'استرداد الأداء على القيمة المضافة' }, page: 'particuliers', subpage: 'voyageurs' },
          { title: { fr: 'Navigation de plaisance', ar: 'مراكب النزهة والسياحة' }, page: 'particuliers', subpage: 'voyageurs' },
        ],
      },
      {
        category: { fr: 'Tunisiens à l’étranger', ar: 'التونسيون بالخارج' },
        items: [
          { title: { fr: 'Admission temporaire (Diptyque)', ar: 'القبول المؤقت للسيارات' }, page: 'particuliers', subpage: 'fcr', action: 'dac' },
          { title: { fr: 'Retour provisoire', ar: 'العودة المؤقتة' }, page: 'particuliers', subpage: 'fcr' },
          { title: { fr: 'Retour définitif (FCR 2026)', ar: 'العودة النهائية (نظام FCR)' }, page: 'particuliers', subpage: 'fcr', action: 'taxation' },
          { title: { fr: 'Réalisation de Projets', ar: 'إنجاز المشاريع الاستثمارية' }, page: 'particuliers', subpage: 'fcr' },
          { title: { fr: 'Recommandations importantes', ar: 'توصيات هامة للمسافرين' }, page: 'particuliers', subpage: 'fcr' },
        ],
      },
      {
        category: { fr: 'Autres Régimes Particuliers', ar: 'إجراءات أخرى' },
        items: [
          { title: { fr: 'Statuts particuliers (personnes physiques)', ar: 'الأنظمة الخصوصية للأشخاص الطبيعيين' }, page: 'particuliers', subpage: 'statuts' },
          { title: { fr: 'Devises et Change', ar: 'العملة والصرف' }, page: 'particuliers', subpage: 'devises', action: 'devise' },
          { title: { fr: 'Colis postaux & Fret', ar: 'الطرود البريدية' }, page: 'particuliers', subpage: 'colis' },
          { title: { fr: 'Prohibitions et restrictions', ar: 'المحظورات والمقيدات' }, page: 'particuliers', subpage: 'prohibitions' },
          { title: { fr: 'Formulaires (Particuliers)', ar: 'استمارات الأفراد' }, page: 'particuliers', subpage: 'formulaires' },
        ],
      },
    ],
  },
  {
    id: 'professionnels',
    label: { fr: 'Professionnels', ar: 'المهنيون' },
    hasDropdown: true,
    sections: [
      {
        category: { fr: 'Intermédiaires & Logistique', ar: 'المهن اللوجستية' },
        items: [
          { title: { fr: 'Commissionnaires en douane (Agrément & Annuaire)', ar: 'موسطو الديوانة (التراخيص والدليل)' }, page: 'professionnels', subpage: 'commissionnaires' },
          { title: { fr: 'Magasins et aires de dédouanement (MAD)', ar: 'مستودعات ومساحات التسريح الجمركي' }, page: 'professionnels', subpage: 'mad' },
          { title: { fr: 'Opérateurs Économiques Agréés (OEA)', ar: 'المتعاملون الاقتصاديون المعتمدون' }, page: 'professionnels', subpage: 'oea' },
        ],
      },
      {
        category: { fr: 'Entreprises & Régimes', ar: 'المؤسسات والأنظمة' },
        items: [
          { title: { fr: 'Entreprises exportatrices & Avantages fiscaux', ar: 'المؤسسات المصدرة والامتيازات الجبائية' }, page: 'professionnels', subpage: 'entreprises' },
          { title: { fr: 'Procédures simplifiées de dédouanement', ar: 'الإجراءات المبسطة للتسريح الديواني' }, page: 'professionnels', subpage: 'entreprises' },
          { title: { fr: 'Tarif douanier & Nomenclatures SH', ar: 'التعريفة الجمركية والبنود' }, page: 'professionnels', subpage: 'themes', action: 'tarif' },
          { title: { fr: 'Règles d’origine & Valeur en douane', ar: 'قواعد المنشأ والقيمة لدى الديوانة' }, page: 'professionnels', subpage: 'themes' },
          { title: { fr: 'Formulaires (Professionnels)', ar: 'استمارات المهنيين' }, page: 'professionnels', subpage: 'formulaires' },
        ],
      },
    ],
  },
  {
    id: 'douane',
    label: { fr: 'Douane', ar: 'عن الديوانة' },
    hasDropdown: true,
    sections: [
      {
        category: { fr: 'L’Institution', ar: 'المؤسسة' },
        items: [
          { title: { fr: 'Notre vision & Plan stratégique', ar: 'رؤيتنا والمخطط الاستراتيجي' }, page: 'douane', subpage: 'vision' },
          { title: { fr: 'Missions, Histoire & Organisation', ar: 'المهام، التاريخ والتنظيم' }, page: 'douane', subpage: 'histoire' },
          { title: { fr: 'Mutuelle & Centre Médical des Douanes', ar: 'تعاونية والمركز الطبي للديوانة' }, page: 'douane', subpage: 'mutuelle' },
        ],
      },
      {
        category: { fr: 'Législation & Concours', ar: 'التشريع والمناظرات' },
        items: [
          { title: { fr: 'Code des douanes & Bulletin Officiel (BOD)', ar: 'مجلة الديوانة والنشرية الرسمية' }, page: 'douane', subpage: 'textes' },
          { title: { fr: 'Recrutement & Concours externes 2026', ar: 'مناظرات الانتداب بعنوان 2026' }, page: 'douane', subpage: 'recrutement' },
          { title: { fr: 'Ventes aux enchères publiques & Avis', ar: 'البتات العمومية والإعلانات' }, page: 'douane', subpage: 'avis' },
          { title: { fr: 'Revue de la Douane & Dépliants', ar: 'مجلة الديوانة والأدلة التوجيهية' }, page: 'douane', subpage: 'revue' },
        ],
      },
    ],
  },
  {
    id: 'sinda',
    label: { fr: 'Projet SINDA II', ar: 'مشروع سندة II' },
  },
  {
    id: 'eservices',
    label: { fr: 'E-Service', ar: 'الخدمات الإلكترونية' },
    hasDropdown: true,
    sections: [
      {
        category: { fr: 'E-Services Particuliers', ar: 'خدمات الأفراد' },
        items: [
          { title: { fr: 'Taxation des Véhicules (Version 2026)', ar: 'احتساب معاليم السيارات (نسخة 2026)' }, page: 'eservices', action: 'taxation', badge: { fr: 'Officiel', ar: 'رسمي' } },
          { title: { fr: 'Taxation des véhicules par Description', ar: 'احتساب معاليم السيارات عبر الوصف' }, page: 'eservices', action: 'taxation', badge: { fr: 'Bêta', ar: 'تجريبي' } },
          { title: { fr: 'Formulaire d’importation de devises', ar: 'استمارة التصريح بتوريد العملة' }, page: 'eservices', action: 'devise', badge: { fr: 'Nouveau', ar: 'جديد' } },
          { title: { fr: 'Demande d’autorisation de circulation (Diptyque)', ar: 'استخراج رخصة جولان سيارة (DAC)' }, page: 'eservices', action: 'dac' },
          { title: { fr: 'Situation Véhicule (Wadh3iati 2026)', ar: 'وضعية سيارتي (Wadh3iati)' }, page: 'eservices', action: 'wadh3iati' },
          { title: { fr: 'Déclaration pour les navigations de plaisance', ar: 'تصريح دخول مراكب النزهة' }, page: 'eservices', subpage: 'plaisance' },
          { title: { fr: 'Déclaration des effets personnels', ar: 'التصريح بالأمتعة الشخصية' }, page: 'eservices', subpage: 'effets' },
          { title: { fr: 'Calcul de la durée de séjour', ar: 'احتساب مدة الإقامة بالخارج' }, page: 'eservices', subpage: 'sejour' },
        ],
      },
      {
        category: { fr: 'E-Services Entreprise', ar: 'خدمات المؤسسات' },
        items: [
          { title: { fr: 'Tarif Web (version 2026)', ar: 'جدول التعريفة الجمركية عبر الواب 2026' }, page: 'eservices', action: 'tarif' },
          { title: { fr: 'Demande de Transaction en ligne', ar: 'مطلب الصلح الإلكتروني' }, page: 'eservices', subpage: 'transaction', badge: { fr: 'Nouveau', ar: 'جديد' } },
          { title: { fr: 'Situation Dossier en Matière d’origine', ar: 'متابعة ملفات المنشأ وقواعده' }, page: 'eservices', subpage: 'origine' },
          { title: { fr: 'Situation Dossier en Matière de Valeur', ar: 'متابعة ملفات القيمة لدى الديوانة' }, page: 'eservices', subpage: 'valeur' },
          { title: { fr: 'Demande de certification OEA', ar: 'مطلب نيل صفة المتعامل الاقتصادي المعتمد' }, page: 'eservices', subpage: 'oea' },
        ],
      },
    ],
  },
  {
    id: 'contact',
    label: { fr: 'Contact', ar: 'الاتصال' },
  },
];

export const featureServices: FeatureService[] = [
  {
    id: 'taxation',
    title: {
      fr: 'Taxation de Véhicule',
      ar: 'الأداءات على العربات',
    },
    description: {
      fr: 'Le module « Taxation des véhicules » est un service en ligne qui permet aux utilisateurs et notamment les tunisiens résidents à l’étranger, de consulter les droits et taxes dus sur les voitures importées ou à importer, sur la base des données introduites.',
      ar: 'تمكنكم هذه الخدمة من معرفة مبلغ الآداءات والمعاليم الديوانية المستوجبة على السيارات الموردة من الخارج أو التي سيتمّ توريدها إلى البلاد التونسية على ضوء المعطيات المدخلة.',
    },
    iconName: 'Car',
    tag: { fr: 'Version 2026', ar: 'نسخة 2026' },
    actionType: 'modal_taxation',
    pageTarget: 'eservices',
  },
  {
    id: 'tarifs',
    title: {
      fr: 'Tarifs et Nomenclatures',
      ar: 'التصنيفة التعريفيّة',
    },
    description: {
      fr: 'Ce service vous permet de consulter les droits et taxes préférentiels ou de droit commun, les documents à produire au regard de la réglementation particulière et le régime du commerce extérieur applicables à l’importation et à l’exportation des marchandises.',
      ar: 'تمكنكم هذه الخدمة من معرفة نسب المعاليم الديوانيّة المذكورة بالتعريفة ونسب الأداءات، عند التوريد ولا توجد معاليم عند التصدير، مع الوثائق الواجب الإدلاء بها.',
    },
    iconName: 'Calculator',
    tag: { fr: 'Tarif Web 2026', ar: 'التعريفة المنسقة' },
    actionType: 'modal_tarif',
    pageTarget: 'eservices',
  },
  {
    id: 'wadh3iati',
    title: {
      fr: 'Situation Véhicule (Wadh3iati)',
      ar: 'وضعية سيارتي',
    },
    description: {
      fr: "Ce service vous permet de vous informer sur la situation des véhicules importés en Tunisie vis à vis la douane (Apurement). N.B: La confirmation des résultats de ce service reste sujette à la vérification des données de l'utilisateur.",
      ar: 'تمكن هذه الخدمة من الاطلاع على وضعية السيارة الموردة في تونس إزاء مصالح الديوانة (تسوية الجولان). ملاحظة : يبقى تأكيد نتائج هذه الخدمة رهن التثبّت من البيانات الرسمية.',
    },
    iconName: 'AlertTriangle',
    tag: { fr: 'Apurement en ligne', ar: 'تسوية الجولان' },
    actionType: 'modal_wadh3iati',
    pageTarget: 'eservices',
  },
  {
    id: 'dac',
    title: {
      fr: "DEMANDE D'AUTORISATION DE CIRCULATION",
      ar: 'استخراج رخصة جولان سيارة',
    },
    description: {
      fr: "Ce service vous permet d'accomplir à distance les procédures nécessaires à l'obtention de votre permis de circulation pour votre véhicule. L’utilisateur est invité à suivre les étapes suivantes: 1- Remplir le formulaire en ligne 2- Après la validation, imprimer ou présenter le QR code.",
      ar: 'تمكن هذه الخدمة من التسجيل عن بعد و استخراج رخصة جولان سيارة (Diptyque). يرجى اتباع المراحل: 1- تعمير الاستمارة بدقة 2- بعد المصادقة، طباعة الرخصة أو الاستظهار برمز QR.',
    },
    iconName: 'FileText',
    tag: { fr: 'Téléprocédure', ar: 'إجراء مميكن' },
    actionType: 'modal_dac',
    pageTarget: 'eservices',
  },
];

export const statistics: StatItem[] = [
  {
    number: '580 MD',
    numberAr: '580 مليون دينار',
    label: {
      fr: "Valeur des marchandises de contrebande saisies par la garde douanière , durant l'année 2025",
      ar: 'قيمة المحجوزات لوحدات الحرس الديواني خلال سنة 2025',
    },
    sublabel: {
      fr: 'Garde Douanière — République Tunisienne',
      ar: 'سلك الحرس الديواني — حماية الاقتصاد الوطني',
    },
  },
  {
    number: '16 492',
    numberAr: '16492',
    label: {
      fr: "Procès-verbaux de saisie établis par la garde douanière durant l'année 2025",
      ar: 'عدد محاضر الحجز لوحدات الحرس الديواني خلال سنة 2025',
    },
    sublabel: {
      fr: 'Opérations terrestres et maritimes coordonnées',
      ar: 'تدخلات نوعية ومحاضر رسمية منجزة',
    },
  },
  {
    number: '221',
    numberAr: '221',
    label: {
      fr: 'Entreprises certifiées Opérateur Économique Agréé, Mars 2026',
      ar: 'عدد المؤسسات المنتفعة بصفة المتعامل الإقتصادي المعتمد، مارس 2026',
    },
    sublabel: {
      fr: 'Label de confiance et fluidité logistique',
      ar: 'شراكة إستراتيجية وممر أخضر للتسريح السريع',
    },
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-concours-2026',
    title: {
      fr: 'Communiqué relatif au concours externe sur épreuves pour le recrutement de Sous-lieutenants des Douanes au titre des années 2024 et 2025',
      ar: 'بلاغ حول المناظرة الخارجية بالإختبارات لإنتداب ملازمين للديوانة بعنوان سنتي 2024 و2025',
    },
    category: {
      fr: 'La Douane Tunisienne News',
      ar: 'المستجدات الديوانية',
    },
    date: '23 Sep, 2026',
    dateAr: '23 سبتمبر, 2026',
    excerpt: {
      fr: 'La Direction Générale des Douanes informe que les résultats de la phase d’admissibilité pour le concours externe de recrutement de sous-lieutenants des douanes sont désormais disponibles en ligne...',
      ar: 'تُعلم الإدارة العامة للديوانة أنه تم نشر نتائج مرحلة القبول الأولي للمناظرة الخارجية بالإختبارات لإنتداب ملازمين للديوانة بعنوان سنتي 2024 و2025 عبر البوابة الرسمية...',
    },
    content: {
      fr: 'La Direction Générale des Douanes informe l’ensemble des candidates et candidats ayant passé les épreuves écrites du concours externe pour le recrutement de Sous-lieutenants des Douanes au titre des années 2024 et 2025 que la liste des admis à passer les épreuves d’aptitude physique et les visites médicales est officiellement consultable sur le portail web. Les candidats convoqués doivent se présenter aux dates fixées munis des pièces justificatives exigées.',
      ar: 'تُعلم الإدارة العامة للديوانة كافة المترشحين الذين اجتازوا الاختبارات الكتابية للمناظرة الخارجية لانتداب ملازمين للديوانة بعنوان سنتي 2024 و2025 أن قائمة المؤهلين لاجتياز اختبارات الفحص الطبي والقدرة البدنية قد تم إدراجها بالبوابة. ويتعين على المترشحين المعنيين الحضور في المواعيد المقررة مصحوبين بالوثائق المطلوبة.',
    },
    imageUrl: 'https://www.douane.gov.tn/wp-content/uploads/2026/07/2026-07-21_ACT_DGD_Concours-260x200.jpg',
    commentsCount: 0,
  },
  {
    id: 'news-ia-ecole-douanes',
    title: {
      fr: 'L’École Nationale des Douanes et l’École Nationale des Finances s’allient pour lancer le "Réseau Nouvelle Génération IA"',
      ar: 'المدرسة الوطنية للديوانة والمدرسة الوطنية للمالية تطلقان "شبكة الجيل الجديد للذكاء الاصطناعي"',
    },
    category: {
      fr: 'La Douane Tunisienne News',
      ar: 'المستجدات الديوانية',
    },
    date: '15 Sep, 2026',
    dateAr: '15 سبتمبر, 2026',
    excerpt: {
      fr: 'Sous le haut patronage de Madame la Ministre des Finances, signature d’une convention d’alliance stratégique pour la formation avancée aux technologies de ciblage par intelligence artificielle...',
      ar: 'تحت إشراف وزيرة المالية، تم إمضاء اتفاقية شراكة إستراتيجية بين المدرسة الوطنية للديوانة والمدرسة الوطنية للمالية لإطلاق برنامج التكوين في الذكاء الاصطناعي والرقمنة...',
    },
    content: {
      fr: 'Sous le haut patronage de Madame la Ministre des Finances, une cérémonie officielle s’est tenue entre l’École Nationale des Douanes (END) et l’École Nationale des Finances (ENF) pour sceller un partenariat précurseur : le déploiement du programme « Réseau Nouvelle Génération IA ». Ce projet vise à doter les cadres douaniers et financiers de compétences de pointe en analyse prédictive, lutte automatisée contre la fraude fiscale et douanière et gestion intelligente des flux aux frontières.',
      ar: 'تحت إشراف وزيرة المالية، تم الإعلان رسمياً عن إطلاق "شبكة الجيل الجديد للذكاء الاصطناعي" في إطار التعاون المشترك بين المدرسة الوطنية للديوانة والمدرسة الوطنية للمالية. ويهدف هذا البرنامج إلى تدريب الكفاءات الديوانية على تقنيات تحليل البيانات الضخمة، الرصد المبكر لمخاطر التهريب، وتوظيف الخوارزميات الذكية لتسهيل انسياب البضائع وتعزيز المداخيل الجبائية للدولة.',
    },
    imageUrl: 'https://www.douane.gov.tn/wp-content/uploads/2026/09/2026-09-15_END_ENF-EVENT_LOGO2-260x200.png',
    commentsCount: 0,
  },
  {
    id: 'news-concours-juillet',
    title: {
      fr: 'Communiqué relatif au concours externe sur épreuves pour le recrutement de Sous-lieutenants des Douanes au titre des années 2024 et 2025',
      ar: 'بلاغ حول المناظرة الخارجية بالإختبارات لإنتداب ملازمين للديوانة بعنوان سنتي 2024 و2025',
    },
    category: {
      fr: 'La Douane Tunisienne News',
      ar: 'المستجدات الديوانية',
    },
    date: '21 Juil, 2026',
    dateAr: '21 يوليو, 2026',
    excerpt: {
      fr: 'La Direction Générale des Douanes informe que les résultats des épreuves d’admissibilité et les convocations aux centres d’examen ont été mis à jour...',
      ar: 'تعلم الإدارة العامة للديوانة أنه تم نشر روزنامة ومراكز إجراء الاختبارات التكميلية لانتداب ملازمين للديوانة...',
    },
    content: {
      fr: 'Dans le cadre du calendrier des concours de recrutement au titre des exercices 2024 et 2025, la Direction Générale des Douanes rappelle aux postulants que toutes les notifications et convocations individuelles sont téléchargeables directement sur l’espace dédié aux concours.',
      ar: 'تذكر الإدارة العامة للديوانة كافة المترشحين بضرورة سحب الاستدعاءات الفردية وتأكيد الحضور عبر المنظومة المخصصة للمناظرات في الآجال المحددة قانوناً.',
    },
    imageUrl: 'https://www.douane.gov.tn/wp-content/uploads/2026/02/2026-02-17_communiqué_concours_SLD_fr-260x200.png',
    commentsCount: 0,
  },
  {
    id: 'news-bilan-saisies',
    title: {
      fr: 'Bilan semestriel : Saisies records et lutte contre la contrebande sur tout le territoire national',
      ar: 'محجوزات هامة خلال 6 أشهر أولى من سنة 2026 في إطار مكافحة التهريب',
    },
    category: {
      fr: 'La Douane Tunisienne News',
      ar: 'المستجدات الديوانية',
    },
    date: '09 Juil, 2026',
    dateAr: '09 يوليو, 2026',
    excerpt: {
      fr: 'Dans le cadre de la lutte acharnée contre la contrebande sur l’ensemble du territoire national, les unités de la Garde Douanière ont réalisé d’importantes saisies au premier semestre 2026...',
      ar: 'في إطار مكافحة التهريب على كامل التراب الوطني ، تمكنت مصالح الحرس الديواني خلال السداسي الأول من سنة 2026 من حجز بضائع استهلاكية ومبالغ مالية مهربة بقيمة ناهزت مئات الملايين...',
    },
    content: {
      fr: 'Les unités de la direction des enquêtes et de la garde douanière déployées sur les axes routiers stratégiques et frontières ont intensifié les contrôles inopinés. Les opérations menées à Sfax, Sousse, Ben Guerdane et Tunis ont abouti à l’interception de convois clandestins transportant des marchandises prohibées, des métaux précieux et des devises dissimulées.',
      ar: 'كثفت دوريات الحرس الديواني من عمليات التمشيط والمراقبة النوعية للمسالك الجبلية والصحراوية والطرقات السريعة. وأسفرت التدخلات الميدانية في تونس الكبرى والوسط والجنوب عن إحباط مخططات لتهريب كميات معتبرة من التبغ، العملة، والمواد الإلكترونية غير الخاضعة للمعاينة الجمركية.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    commentsCount: 0,
  },
];

export const douaneTvVideos: VideoItem[] = [
  {
    id: 'vid-podcast-devise',
    title: {
      fr: 'Podcast Douane : Déclaration de devises et procédures aux frontières',
      ar: 'بودكاست الديوانة: تصريح العملة والإجراءات عند المعابر الحدودية',
    },
    date: 'Mai 2025',
    thumbnailUrl: 'https://www.douane.gov.tn/wp-content/uploads/2025/05/podcast-devise-vignette2-550x450.jpg',
    embedUrl: 'https://www.youtube.com/embed/BI-RWs4mWI8',
  },
  {
    id: 'vid-rokhsati',
    title: {
      fr: 'DOUANE PODCAST : Tout savoir sur le service en ligne Rokhsati',
      ar: 'بودكاست الديوانة : كل ما يجب معرفته عن الخدمة الإلكترونية رخصتي (Rokhsati)',
    },
    date: '18 Avr, 2025',
    thumbnailUrl: 'https://www.douane.gov.tn/wp-content/uploads/2025/04/PODCAST-ROKHSATI-220x140.jpg',
    embedUrl: 'https://www.youtube.com/embed/asKPi7oYM2Y',
  },
  {
    id: 'vid-traversee-ctn',
    title: {
      fr: 'Traversée à bord du navire de la CTN, évaluation des services douaniers par les voyageurs à la saison estivale 2024',
      ar: 'رحلة بحرية على متن سفينة CTN، استطلاع آراء المسافرين وتقييم الخدمات الديوانية بصيف 2024',
    },
    date: '04 Fév, 2025',
    thumbnailUrl: 'https://www.douane.gov.tn/wp-content/uploads/2025/02/Traversée-à-bord-du-navire-de-la-CTN-évaluation-des-services-douaniers-par-les-voyageurs-à-la-saison-estivale-2024-220x140.png',
    embedUrl: 'https://www.youtube.com/embed/5iOd7mJ301g',
  },
];

export const allEServicesList: EServiceItem[] = [
  // Particuliers
  {
    id: 'es-taxation-2026',
    name: { fr: 'Taxation des Véhicules (Version 2026)', ar: 'احتساب معاليم السيارات (نسخة 2026)' },
    desc: { fr: 'Simulateur officiel de taxes et droits d’importation selon la loi de finances.', ar: 'المحتسب الآلي للرسوم والأداءات الديوانية المستوجبة على توريد السيارات.' },
    audience: 'particulier',
    badge: { fr: 'Officiel', ar: 'رسمي' },
    action: 'modal_taxation',
    page: 'eservices',
  },
  {
    id: 'es-taxation-desc',
    name: { fr: 'Taxation des véhicules par Description (Version bêta)', ar: 'احتساب معاليم السيارات عبر الوصف (نسخة تجريبية)' },
    desc: { fr: 'Recherche rapide par marque, modèle et caractéristiques techniques.', ar: 'محرك بحث متطور بالنوع التجاري والمواصفات الفنية للسيارة.' },
    audience: 'particulier',
    badge: { fr: 'Bêta', ar: 'تجريبي' },
    action: 'modal_taxation',
    page: 'eservices',
  },
  {
    id: 'es-declaration-devise',
    name: { fr: 'Formulaire d’importation de devises (Nouveau)', ar: 'استمارة التصريح بتوريد العملة الأجنبية (جديد)' },
    desc: { fr: 'Souscription en ligne de la déclaration de devises avant le passage frontalier.', ar: 'التصريح الإلكتروني بالعملة الأجنبية قبل الوصول لتسريع إجراءات التفتيش.' },
    audience: 'particulier',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    action: 'modal_devise',
    page: 'eservices',
  },
  {
    id: 'es-dac-rokhsati',
    name: { fr: 'Demande d’autorisation de circulation du véhicule (Diptyque)', ar: 'استخراج رخصة جولان سيارة (Diptyque / Rokhsati)' },
    desc: { fr: 'Demande et prolongation en ligne du permis de circulation touristique.', ar: 'طلب واستخراج رخصة الجولان المؤقتة للسيارات الأجنبية على الخط.' },
    audience: 'particulier',
    action: 'modal_dac',
    page: 'eservices',
  },
  {
    id: 'es-situation-vehicule',
    name: { fr: 'Situation Véhicule (Version 2026 - Wadh3iati)', ar: 'متابعة وضعية السيارة (Wadh3iati)' },
    desc: { fr: 'Vérification de l’apurement et du statut administratif des véhicules en Tunisie.', ar: 'التثبت الآني من الوضعية الجمركية وتاريخ انتهاء صلوحية الرخص.' },
    audience: 'particulier',
    action: 'modal_wadh3iati',
    page: 'eservices',
  },
  {
    id: 'es-plaisance',
    name: { fr: 'Déclaration d’entrée pour les navigations de plaisance', ar: 'تصريح دخول لمراكب النزهة والسفن السياحية' },
    desc: { fr: 'Formalités d’accostage et dédouanement des yachts et voiliers.', ar: 'إجراءات الرسو والتصريح الديواني لليخوت ومراكب الترفيه الأجنبية.' },
    audience: 'particulier',
    action: 'page',
    page: 'eservices',
    subpage: 'plaisance',
  },
  {
    id: 'es-effets-perso',
    name: { fr: 'Déclaration des effets personnels', ar: 'التصريح بالأمتعة الشخصية والأثاث' },
    desc: { fr: 'Formalités dématérialisées pour le déménagement et effets des résidents.', ar: 'تسهيلات الإعفاء والتصريح بالأمتعة الشخصية عند العودة.' },
    audience: 'particulier',
    action: 'page',
    page: 'eservices',
    subpage: 'effets',
  },
  {
    id: 'es-calcul-sejour',
    name: { fr: 'Calcul de la durée de séjour', ar: 'احتساب مدة الإقامة بالخارج' },
    desc: { fr: 'Calculateur automatique d’éligibilité aux franchises et au régime FCR.', ar: 'المحتسب الآلي لعدد أيام الإقامة بالخارج للتحقق من شروط FCR.' },
    audience: 'particulier',
    action: 'page',
    page: 'eservices',
    subpage: 'sejour',
  },

  // Entreprises
  {
    id: 'es-tarif-web',
    name: { fr: 'Tarif Web (version 2026)', ar: 'التعريفة الجمركية عبر الواب (نسخة 2026)' },
    desc: { fr: 'Base intégrale du Tarif Douanier Commun, taux de droits et taxes applicables.', ar: 'قاعدة بيانات جدول التعريفة المنسقة ونسب المعاليم المطبقة.' },
    audience: 'entreprise',
    action: 'modal_tarif',
    page: 'eservices',
  },
  {
    id: 'es-demande-transaction',
    name: { fr: 'Demande de Transaction (Nouveau)', ar: 'مطلب الصلح الإلكتروني في القضايا الديوانية (جديد)' },
    desc: { fr: 'Dépôt et instruction en ligne des demandes de règlement transactionnel.', ar: 'إيداع ومعالجة مطالب التسوية الصلحية في المخالفات الديوانية عن بعد.' },
    audience: 'entreprise',
    badge: { fr: 'Nouveau', ar: 'جديد' },
    action: 'page',
    page: 'eservices',
    subpage: 'transaction',
  },
  {
    id: 'es-dossier-origine',
    name: { fr: 'Demande de renseignement: Situation Dossier en Matière d’origine', ar: 'متابعة ملفات المنشأ وقواعد المنشأ التفضيلية' },
    desc: { fr: 'Suivi de validation des certificats EUR.1 et accords de libre-échange.', ar: 'الاستعلام عن شهادات المنشأ والاتفاقيات التجارية الثنائية والمتعددة.' },
    audience: 'entreprise',
    action: 'page',
    page: 'eservices',
    subpage: 'origine',
  },
  {
    id: 'es-dossier-valeur',
    name: { fr: 'Demande de renseignement: Situation Dossier en Matière de Valeur', ar: 'متابعة ملفات القيمة لدى الديوانة' },
    desc: { fr: 'Consultation des dossiers d’expertise et de taxation en valeur transactionnelle.', ar: 'التثبت من مآل ملفات تقييم البضائع لدى مصالح القيمة.' },
    audience: 'entreprise',
    action: 'page',
    page: 'eservices',
    subpage: 'valeur',
  },
  {
    id: 'es-certification-oea',
    name: { fr: 'Demande de certification OEA', ar: 'مطلب نيل صفة المتعامل الاقتصادي المعتمد (OEA)' },
    desc: { fr: 'Dossier de candidature pour le label d’Opérateur Économique Agréé.', ar: 'تقديم ملف الانخراط للحصول على ميزات المتعامل المعتمد.' },
    audience: 'entreprise',
    action: 'page',
    page: 'eservices',
    subpage: 'oea',
  },
];

export const particuliersServicesList = [
  {
    id: 'p-voyageurs',
    title: { fr: 'Voyageurs & Effets Personnels', ar: 'المسافرون والأمتعة الشخصية' },
    desc: {
      fr: 'Franchises douanières applicables aux bagages, achats détaxés, tabac, alcools et tolérances autorisées à l’entrée.',
      ar: 'أحكام الإعفاءات الجمركية الشخصية، المشتريات السياحية، ومقادير التبغ والمواد المسموح باصطحابها عند الدخول.',
    },
    icon: 'Plane',
    tag: { fr: 'Guide Voyageur', ar: 'دليل المسافر' },
    subpage: 'voyageurs',
  },
  {
    id: 'p-fcr',
    title: { fr: 'Tunisiens à l’Étranger & Régime FCR 2026', ar: 'التونسيون بالخارج وامتياز نـظام FCR' },
    desc: {
      fr: 'Conditions d’octroi du FCR, retour définitif, barème fiscal avec franchise totale ou paiement partiel de 25%.',
      ar: 'شروط التمتع بالإعفاء الجمركي عند العودة النهائية، الوثائق المطلوبة وجداول نسب الحط من الرسوم إلى 25%.',
    },
    icon: 'Car',
    tag: { fr: 'Avantage FCR', ar: 'امتياز جبائي' },
    subpage: 'fcr',
  },
  {
    id: 'p-devises',
    title: { fr: 'Devises, Change & Métaux Précieux', ar: 'العملة الأجنبية والمعادن النفيسة' },
    desc: {
      fr: 'Seuils déclaratifs obligatoires en devises étrangères, importation et réexportation de métaux précieux (or, bijoux).',
      ar: 'المبالغ الماليّة الخاضعة وجوباً للتصريح، وتوريد وإعادة تصدير المصوغ والمصنوعات النفيسة.',
    },
    icon: 'Coins',
    tag: { fr: 'Déclaration obligatoire', ar: 'تصريح إجباري' },
    subpage: 'devises',
  },
  {
    id: 'p-colis',
    title: { fr: 'Colis Postaux & Fret Aérien Express', ar: 'الطرود والإرساليات البريدية' },
    desc: {
      fr: 'Envois familiaux de la diaspora, cadeaux de valeur minime, taxation forfaitaire et formalités de dédouanement.',
      ar: 'إرساليات الأقارب، هدايا العائلة المعفاة، والمعاليم التقديرية لإجراءات التخليص السريع.',
    },
    icon: 'Package',
    tag: { fr: 'Procédure simplifiée', ar: 'إجراءات مبسطة' },
    subpage: 'colis',
  },
  {
    id: 'p-armes',
    title: { fr: 'Prohibitions & Produits Soumis à Autorisation', ar: 'المحظورات والمواد الخاضعة لتراخيص' },
    desc: {
      fr: 'Drones de prises de vue, équipements de télécommunication, armes de chasse, médicaments et espèces faune/flore protégées.',
      ar: 'طائرات الدرون، تجهيزات الاتصال اللاسلكي، أسلحة الصيد، والأدوية الخاضعة لرقابة أمنية وصحية مسبقة.',
    },
    icon: 'ShieldAlert',
    tag: { fr: 'Autorisation préalable', ar: 'ترخيص مسبق' },
    subpage: 'prohibitions',
  },
  {
    id: 'p-formulaires',
    title: { fr: 'Formulaires Officiels & Téléchargements', ar: 'المطبوعات والاستمارات الرسمية' },
    desc: {
      fr: 'Téléchargez en PDF les formulaires officiels (déclaration de devises, procuration véhicule, demande de franchise).',
      ar: 'تحميل الاستمارات الرسمية بصيغة PDF (تصريح العملة، توكيل سياقة، مطالب الإعفاء الجمركي).',
    },
    icon: 'DownloadCloud',
    tag: { fr: 'Téléchargement PDF', ar: 'تحميل مباشر' },
    subpage: 'formulaires',
  },
];
