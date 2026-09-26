# Spécification Design — Portail Douane Tunisienne
> Inspiré de douane.gov.tn — usage : recréation manuelle dans Penpot  
> Document de référence uniquement, ne reproduit aucun asset protégé

---

## 1. COULEURS

### Palette principale

| Rôle | Hex | Usage |
|------|-----|-------|
| Primaire — Bleu marine foncé | `#003087` | Fond header, nav principale, boutons primaires, accents de titres |
| Secondaire — Bleu roi | `#0055B3` | Liens actifs, hover nav, variante bouton |
| Accent — Or/Doré | `#C8A951` | Touches décoratives, icônes sélectionnées, underline actif |
| Fond statistiques | `#1A1A2E` | Bandeau de statistiques (fond sombre pleine largeur) |
| Fond page | `#F5F5F5` | Arrière-plan général hors sections spéciales |
| Surface card | `#FFFFFF` | Fond des cards, dropdowns, zones de contenu |
| Texte principal | `#333333` | Corps de texte courant |
| Texte secondaire | `#666666` | Sous-titres, excerpts, métadonnées (date, catégorie) |
| Texte sur fond sombre | `#FFFFFF` | Texte dans header, footer, bandeau stats |
| Bordure légère | `#E0E0E0` | Séparateurs de cards, bordures de formulaires |
| Bordure focus | `#0055B3` | État focus des champs de formulaire |
| Fond top bar | `#002266` | Barre utilitaire au-dessus du header (plus sombre que primaire) |
| Badge / tag catégorie | `#E8F0FE` | Fond du badge catégorie actualité (texte `#003087`) |
| Erreur | `#CC0000` | Messages d'erreur formulaires |

### Dégradés

| Usage | Description |
|-------|-------------|
| Overlay hero slider | Dégradé linéaire de gauche à droite : `rgba(0,48,135,0.7)` → `transparent` |
| Hover card | Légère ombre portée sans changement de fond : `box-shadow 0 4px 12px rgba(0,0,0,0.12)` |

---

## 2. TYPOGRAPHIE

### Famille de polices

| Rôle | Police | Fallback |
|------|--------|---------|
| Principale (corps + titres) | `Arial` | `Helvetica, sans-serif` |
| Chiffres statistiques | `Arial` bold | même stack |

> Note Penpot : Arial est une police système ; aucun import Google Fonts n'est nécessaire.  
> Utiliser `Arial` comme famille de texte pour tous les styles.

### Échelle typographique

| Contexte | Poids | Taille | Interligne | Transformation | Couleur par défaut |
|----------|-------|--------|------------|----------------|--------------------|
| H1 — Titre héro (slider) | Bold (700) | 36 px | 44 px | Majuscule | `#FFFFFF` |
| H2 — Titre de section | Bold (700) | 24 px | 32 px | Majuscule | `#003087` |
| H3 — Titre de card feature | SemiBold (600) | 16 px | 22 px | Normal | `#003087` |
| H4 — Titre de card actualité | Regular (400) | 15 px | 21 px | Normal | `#333333` |
| Chiffre statistique | Bold (700) | 40 px | 48 px | Normal | `#FFFFFF` |
| Label statistique | Regular (400) | 13 px | 18 px | Normal | `#CCCCCC` |
| Corps de texte courant | Regular (400) | 14 px | 20 px | Normal | `#333333` |
| Texte excerpt / résumé | Regular (400) | 13 px | 18 px | Normal | `#666666` |
| Libellé navigation (niveau 1) | Bold (700) | 13 px | — | Majuscule | `#FFFFFF` |
| Libellé navigation (niveau 2+) | Regular (400) | 13 px | — | Normal | `#333333` |
| Bouton primaire | Bold (700) | 13 px | — | Majuscule | `#FFFFFF` |
| Bouton secondaire | Bold (700) | 13 px | — | Majuscule | `#003087` |
| Métadonnée (date, catégorie) | Regular (400) | 11 px | — | Majuscule | `#888888` |
| Lien de fil d'ariane | Regular (400) | 12 px | — | Normal | `#0055B3` |
| Copyright footer | Regular (400) | 12 px | — | Normal | `#999999` |

---

## 3. STRUCTURE DES PAGES

### 3.1 Accueil — Wireframe textuel (de haut en bas)

```
┌─────────────────────────────────────────────────────────┐
│ TOP BAR — hauteur : 36 px — fond : #002266              │
│  [Lien support/ticket — gauche]    [FR | AR — droite]   │
│  Icônes réseaux sociaux : Twitter · Facebook · YouTube  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ HEADER — hauteur : 80 px — fond : #003087               │
│  [Logo : emblème à gauche, ~180×60 px]                  │
│  Navigation principale — droite, items espacés 24 px    │
│  Accueil · Particuliers▾ · Professionnels▾ · Douane▾   │
│           Projet SINDA II · E Service▾ · Contact        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ HERO SLIDER — hauteur : 450 px — pleine largeur         │
│  Image de fond pleine largeur (photographie institution) │
│  Overlay dégradé gauche→droite (#003087·70% → transp.)  │
│  Texte gauche : Slogan institutionnel (H1 blanc)         │
│  Sous-titre en italique (corps 18 px, blanc, opacité 80%)│
│  [Bouton CTA "Accéder" — fond blanc, texte #003087]     │
│  Indicateurs de slide : points ronds en bas centré       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ FEATURE CARDS ROW — hauteur : ~240 px — fond : #FFFFFF  │
│  Conteneur max-width 1200 px, centré, padding 0 32 px   │
│  4 cards égales (calc 25% − 16 px), gap 16 px           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ [Icône]  │ │ [Icône]  │ │ [Icône]  │ │ [Icône]  │  │
│  │ Titre H3 │ │ Titre H3 │ │ Titre H3 │ │ Titre H3 │  │
│  │ Texte    │ │ Texte    │ │ Texte    │ │ Texte    │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│  Thèmes : Taxation Véhicule · Tarifs · Wadh3iati · DAC │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ BANDEAU STATISTIQUES — hauteur : 140 px — fond : #1A1A2E│
│  3 blocs égaux en flex, séparés par bordures verticales  │
│  Chaque bloc :                                           │
│    Chiffre clé (40 px, bold, blanc)                      │
│    Libellé descriptif (13 px, #CCCCCC)                   │
│  Ex : 580 MD · 16 492 PV · 221 OEA                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ SECTION ACTUALITÉS — fond : #F5F5F5, padding : 48 px 0  │
│  En-tête de section :                                    │
│    H2 "INFOS & ACTUALITÉS" (gauche)                      │
│    Lien "Plus d'Actualité ›" (droite, #0055B3)          │
│    Trait décoratif sous le titre (3 px, #C8A951, 40 px) │
│  Grille 3 colonnes, gap 24 px :                          │
│  ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
│  │ Image 100%×180 │ │ Image 100%×180 │ │ Image 100%×  │ │
│  │ [Badge catégo] │ │ [Badge catégo] │ │ 180          │ │
│  │ Date — 11px    │ │ Date — 11px    │ │ [Badge]      │ │
│  │ Titre H4       │ │ Titre H4       │ │ Date         │ │
│  │ Excerpt 2 lig. │ │ Excerpt 2 lig. │ │ Titre H4     │ │
│  └────────────────┘ └────────────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ SECTION DOUANE-TV — fond : #FFFFFF, padding : 48 px 0   │
│  H2 "EXPLOREZ NOTRE DOUANE-TV" + trait #C8A951          │
│  Slider horizontal : vignettes vidéo YouTube             │
│  Chaque vignette : image 280×158, titre, date, icône ▶  │
│  Lien CTA "Voir Plus de Vidéos" (bouton secondaire)      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ FOOTER — fond : #003087, padding : 32 px 0 24 px        │
│  Ligne réseaux sociaux : icônes Twitter·Facebook·YT·RSS │
│  (centrés, blancs, espacement 16 px)                    │
│  Ligne copyright : texte 12 px #CCCCCC, centré          │
│  "Tous droits réservés à la Douane Tunisienne"          │
└─────────────────────────────────────────────────────────┘

[Widget support flottant — fixed bas-droit]
  Bouton rond ~48×48 px, fond #003087, icône blanche
```

---

### 3.2 Page de service (ex. Particuliers) — Wireframe textuel

```
[Header + nav — identique à l'accueil]

┌─────────────────────────────────────────────────────────┐
│ BAND TITRE DE PAGE — hauteur : 80 px — fond : #003087   │
│  H1 "Particuliers" (blanc, centré)                       │
│  Fil d'ariane : Accueil › Particuliers (blanc, 12 px)   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ CORPS — max-width 1200 px, centré, padding : 48 px 32 px│
│  Disposition : colonne principale (100% ou 8/12 col.)   │
│                                                          │
│  Sous-section thématique :                               │
│    H2 thème + trait #C8A951                              │
│    Grille de cards de service 3 ou 4 colonnes :          │
│    ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│    │ [Icône]  │ │ [Icône]  │ │ [Icône]  │               │
│    │ Titre    │ │ Titre    │ │ Titre    │               │
│    │ Résumé   │ │ Résumé   │ │ Résumé   │               │
│    │ [Lien ›] │ │ [Lien ›] │ │ [Lien ›] │               │
│    └──────────┘ └──────────┘ └──────────┘               │
└─────────────────────────────────────────────────────────┘

[Footer — identique à l'accueil]
[Widget flottant support]
```

---

### 3.3 Footer — Détail des colonnes

> Le footer du site est minimaliste (une seule bande). Structure :

```
┌─────────────────────────────────────────────────────────┐
│  FOOTER — fond #003087                                   │
│                                                          │
│  ─── Ligne 1 : Icônes réseaux sociaux (centrées) ───    │
│  [Twitter 24px] [Facebook 24px] [YouTube 24px] [RSS 24px]│
│  Espacement entre icônes : 16 px                         │
│  Couleur icônes : blanc (#FFFFFF)                        │
│  Padding haut : 32 px                                    │
│                                                          │
│  ─── Ligne 2 : Copyright (centrée) ───                  │
│  "Tous droits réservés à la Douane Tunisienne, 2018"    │
│  12 px · Regular · #CCCCCC                              │
│  Padding bas : 24 px                                     │
└─────────────────────────────────────────────────────────┘
```

---

### 3.4 Navigation — Structure du méga-menu

```
Niveau 1 (visible en permanence dans le header) :
  Accueil | Particuliers | Professionnels | Douane | Projet SINDA II | E Service | Contact

Particuliers ▾
  ├── Voyageurs
  ├── Tunisiens à l'étranger
  ├── Devises et Change
  ├── Colis postaux
  ├── Prohibitions et restrictions
  └── Formulaires

Professionnels ▾
  ├── Commissionnaires en douane
  ├── Entreprises exportatrices
  ├── Magasins et aires de dédouanement
  ├── Opérateurs Économiques Agréés
  ├── Thèmes douaniers
  ├── Statuts particuliers
  └── Formulaires

Douane ▾
  ├── Connaître la Douane
  ├── Textes législatifs et règlementaires
  ├── Recrutement et formation
  ├── Avis
  └── Communication

E Service ▾
  ├── Taxation de Véhicule
  ├── Tarifs et Nomenclatures
  ├── Situation Véhicule (Wadh3iati)
  └── Demande d'Autorisation de Circulation
```

---

## 4. COMPOSANTS RÉUTILISABLES

### 4.1 Bouton primaire

| Propriété | Valeur |
|-----------|--------|
| Fond | `#003087` |
| Fond hover | `#002266` |
| Texte | `#FFFFFF` |
| Police | Arial Bold 13 px, majuscule |
| Padding | 10 px 24 px |
| Border-radius | 3 px |
| Bordure | Aucune |
| Transition hover | `background 0.2s ease` |
| Ombre hover | `0 2px 8px rgba(0,48,135,0.3)` |

---

### 4.2 Bouton secondaire / CTA clair

| Propriété | Valeur |
|-----------|--------|
| Fond | `#FFFFFF` |
| Fond hover | `#F0F4FF` |
| Texte | `#003087` |
| Bordure | `1px solid #003087` |
| Police | Arial Bold 13 px, majuscule |
| Padding | 10 px 24 px |
| Border-radius | 3 px |

---

### 4.3 Bouton CTA hero (sur slider)

| Propriété | Valeur |
|-----------|--------|
| Fond | `rgba(255,255,255,0.90)` |
| Texte | `#003087` |
| Police | Arial Bold 14 px, majuscule |
| Padding | 12 px 32 px |
| Border-radius | 3 px |
| Bordure | Aucune |
| Hover | fond `#FFFFFF` opaque, légère ombre |

---

### 4.4 Card Feature (4 grands services)

| Propriété | Valeur |
|-----------|--------|
| Largeur | calc(25% − 12 px) en flex, min 200 px |
| Fond | `#FFFFFF` |
| Bordure | `1px solid #E0E0E0` |
| Border-radius | 4 px |
| Padding | 24 px 16 px |
| Alignement | Centré (texte + icône) |
| Ombre hover | `0 4px 12px rgba(0,0,0,0.12)` |
| Transition | `box-shadow 0.2s ease, transform 0.2s ease` |
| Transform hover | `translateY(-3px)` |

**Anatomie interne :**
```
┌────────────────────────┐
│                        │
│   [Icône / image]      │  ← ~64×64 px, centré
│   ~64×64 px            │
│                        │
│   Titre H3             │  ← 16 px, bold, #003087
│   (2 lignes max)       │
│                        │
│   Texte de description │  ← 13 px, #666666, 3 lignes max
│   (excerpt)            │
│                        │
└────────────────────────┘
```

---

### 4.5 Card Actualité (news)

| Propriété | Valeur |
|-----------|--------|
| Largeur | calc(33.33% − 16 px) en grille 3 col. |
| Fond | `#FFFFFF` |
| Bordure | Aucune |
| Ombre | `0 2px 8px rgba(0,0,0,0.08)` |
| Border-radius | 4 px |
| Overflow | hidden (pour image) |
| Hover | ombre renforcée `0 4px 16px rgba(0,0,0,0.14)` |

**Anatomie interne :**
```
┌────────────────────────────┐
│  [Image thumbnail]         │  ← 100% × 180 px, object-fit: cover
│                            │
├────────────────────────────┤
│  [Badge catégorie]         │  ← fond #E8F0FE, texte #003087, 10px, uppercase
│                            │     padding 2px 8px, border-radius 2px
│  Date · Commentaires       │  ← 11 px, #888888, uppercase
│  Titre de l'article        │  ← H4 15 px, regular, #333333, 2 lignes
│  Texte extrait / résumé    │  ← 13 px, #666666, 2-3 lignes, clamp
│                            │
│  [Lire la suite ›]         │  ← lien texte, 12 px, #0055B3, bold
└────────────────────────────┘
```

---

### 4.6 Bloc statistique (item dans le bandeau)

| Propriété | Valeur |
|-----------|--------|
| Largeur | 33.33% du bandeau |
| Alignement | Centré |
| Padding | 32 px 24 px |
| Séparateur | `1px solid rgba(255,255,255,0.15)` vertical entre blocs |

**Anatomie interne :**
```
Chiffre principal   ← 40 px, Bold, #FFFFFF
Libellé descriptif  ← 13 px, Regular, #CCCCCC, max 2 lignes
```

---

### 4.7 Item navigation principale (état normal / hover / actif)

| État | Fond | Texte | Bordure bas |
|------|------|-------|-------------|
| Normal | transparent | `#FFFFFF` | Aucune |
| Hover | `rgba(255,255,255,0.10)` | `#FFFFFF` | Aucune |
| Actif | `rgba(255,255,255,0.15)` | `#FFFFFF` | `3px solid #C8A951` |

**Dropdown :**

| Propriété | Valeur |
|-----------|--------|
| Fond | `#FFFFFF` |
| Ombre | `0 4px 12px rgba(0,0,0,0.15)` |
| Largeur min | 220 px |
| Padding item | 10 px 20 px |
| Texte item | 13 px, Regular, `#333333` |
| Hover item | fond `#F5F5F5`, texte `#003087` |
| Séparateur | `1px solid #F0F0F0` |

---

### 4.8 Barre de navigation supérieure (Top Bar)

| Propriété | Valeur |
|-----------|--------|
| Hauteur | 36 px |
| Fond | `#002266` |
| Texte / liens | 12 px, Regular, `#CCCCCC` |
| Hover lien | `#FFFFFF` |
| Disposition | Flexbox : lien support à gauche · [switcher FR\|AR + réseaux] à droite |
| Icônes réseaux | 16×16 px, blancs |

---

### 4.9 Switcher de langue

| Propriété | Valeur |
|-----------|--------|
| Forme | Deux boutons/liens texte : "FR" et "AR" |
| Séparateur | `\|` (pipe) |
| Taille | 12 px, Regular |
| Couleur | `#CCCCCC` / hover `#FFFFFF` |
| Actif | `#FFFFFF`, souligné |

---

### 4.10 Widget support flottant

| Propriété | Valeur |
|-----------|--------|
| Position | Fixed, bas-droite, offset 20 px |
| Dimensions | 48×48 px (bouton rond) |
| Fond | `#003087` |
| Icône | Blanche, ~24×24 px (chat ou ticket) |
| Border-radius | 50% (cercle parfait) |
| Ombre | `0 4px 12px rgba(0,48,135,0.4)` |
| Hover | fond `#002266`, légère scale `1.05` |
| Z-index | Élevé (par-dessus tout le contenu) |

---

### 4.11 En-tête de section (pattern récurrent)

Chaque section du contenu utilise ce pattern d'en-tête :

```
[Titre H2 en majuscule — #003087]
[Trait décoratif 3×40 px — couleur #C8A951 — aligné à gauche]
[Sous-titre ou description courte en italique — 14 px, #666666]
```

Spacing :
- Margin-top section : 48 px
- Margin-bottom titre : 8 px
- Margin-bottom trait : 16 px
- Margin-bottom sous-titre : 24 px

---

### 4.12 Vignette vidéo (Douane-TV)

| Propriété | Valeur |
|-----------|--------|
| Largeur | ~280 px |
| Image | 280×158 px (ratio 16:9), object-fit: cover |
| Icône lecture | Cercle blanc semi-transparent, ▶ centré sur l'image |
| Titre | 14 px, Regular, #333333, 2 lignes max |
| Date | 11 px, #888888 |
| Border-radius | 4 px |

---

## RÉCAPITULATIF RAPIDE POUR PENPOT

### Tokens de couleur à créer dans Penpot

```
primary-navy:      #003087
primary-dark:      #002266
primary-mid:       #0055B3
accent-gold:       #C8A951
stats-bg:          #1A1A2E
surface-white:     #FFFFFF
surface-light:     #F5F5F5
text-dark:         #333333
text-medium:       #666666
text-light:        #888888
text-muted:        #CCCCCC
text-on-dark:      #FFFFFF
border-light:      #E0E0E0
badge-bg:          #E8F0FE
link-blue:         #0055B3
error-red:         #CC0000
```

### Styles de texte à créer dans Penpot

```
heading-hero:       Arial Bold 36px/44px — MAJUSCULE
heading-section:    Arial Bold 24px/32px — MAJUSCULE
heading-card:       Arial SemiBold 16px/22px
heading-news:       Arial Regular 15px/21px
stat-number:        Arial Bold 40px/48px
body-default:       Arial Regular 14px/20px
body-small:         Arial Regular 13px/18px
nav-level1:         Arial Bold 13px — MAJUSCULE
nav-level2:         Arial Regular 13px
btn-label:          Arial Bold 13px — MAJUSCULE
meta-label:         Arial Regular 11px — MAJUSCULE
caption:            Arial Regular 12px
```

### Rayons de bordure (border-radius)

| Composant | Valeur |
|-----------|--------|
| Boutons | 3 px |
| Cards | 4 px |
| Badge catégorie | 2 px |
| Widget flottant | 50% |
| Dropdown menu | 0 px (carré) |

### Espacements fréquents

| Usage | Valeur |
|-------|--------|
| Gap entre feature cards | 16 px |
| Gap entre news cards | 24 px |
| Padding section verticale | 48 px |
| Padding horizontal conteneur | 32 px |
| Largeur max conteneur | 1200 px |
| Hauteur top bar | 36 px |
| Hauteur header | 80 px |
| Hauteur hero slider | 450 px |
| Hauteur bandeau stats | 140 px |
| Padding bouton | 10 px 24 px |
| Padding card feature | 24 px 16 px |
| Padding item nav dropdown | 10 px 20 px |
