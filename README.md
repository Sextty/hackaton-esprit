# Douane Intelligente — MVP Hackathon ESPRIT

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)
![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4)
![Tests](https://img.shields.io/badge/tests-3%20passing-brightgreen)

> **Assistant IA douanier** : un chatbot qui répond **uniquement à partir des textes officiels** et **cite ses sources**, capable en plus de **réserver un rendez-vous** en guichet et d'émettre un **ticket PDF avec QR code** — le tout avec deux interfaces : un **portail usager React** fidèle à douane.gov.tn et un **backend Laravel** autonome.

---

## Sommaire

1. [Contexte et objectif](#contexte-et-objectif)
2. [Fonctionnalités](#fonctionnalités)
3. [Architecture du projet](#architecture-du-projet)
4. [Stack technique](#stack-technique)
5. [Démarrage rapide](#démarrage-rapide)
6. [Configuration du LLM](#configuration-du-llm)
7. [Parcours de démonstration](#parcours-de-démonstration)
8. [Routes et API](#routes-et-api)
9. [Base de données](#base-de-données)
10. [Widget d'assistance global](#widget-dassistance-global)
11. [Tests et qualité](#tests-et-qualité)
12. [Sécurité](#sécurité)
13. [Limites connues et pistes](#limites-connues-et-pistes)
14. [Structure du dépôt](#structure-du-dépôt)

---

## Contexte et objectif

Les usagers des douanes tunisiennes posent des questions récurrentes (conditions du régime FCR, plafond de déclaration des devises, franchise bagages, retrait de colis, régularisation de véhicule…) et doivent se déplacer en guichet pour une simple prise de rendez-vous.

Le MVP répond à ces deux irritants :

- **Informer avec fiabilité** — l'assistant ne hallucine pas : il recherche dans un **corpus réglementaire versionné en base** (RAG) et renvoie la **référence légale exacte** (article du Code des douanes, formulaire officiel BTE/DV…) avec chaque réponse.
- **Dédouaner le parcours usager** — depuis la conversation, l'agent peut **réserver un créneau** dans un bureau de douane, détecte les **conflits de créneaux**, puis délivre un **ticket PDF avec QR code** consultable par sa référence unique (`RDV-XXXXXX`).

## Fonctionnalités

### Backend (Laravel 12 — `douane-intelligente/`)

| Fonctionnalité | Détail |
|---|---|
| **Agent conversationnel** | `POST /api/agent/chat` — orchestration LLM en *tool-calling* avec 2 outils : `search_legislation` (RAG) et `book_appointment` (réservation). Réponse JSON `{reply, sources, history}`. |
| **Recherche RAG** | Scoring par mots-clés sur `title`/`content` (`LIKE`), découpe des chunks en parties **≤ 700 caractères** titrées `… (suite)`, `MAX_PARTS_PER_CHUNK = 3`, `MAX_RESULTS_TOTAL = 6`, puis troncature finale à `MAX_CONTENT = 800` par l'orchestrateur. Aucune troncature silencieuse (audit : 22 chunks, max mesuré 691 car/part). |
| **Prise de rendez-vous** | Validation stricte, gestion des **créneaux et conflits**, jours d'ouverture (hors dimanche), référence unique `RDV-` + 6 caractères. |
| **Ticket PDF + QR code** | Généré avec GD (`TicketGeneratorService`), servi en ligne ou en téléchargement (`?download=1`). |
| **Back-office `/admin`** | Liste des rendez-vous (référence, citoyen, service, bureau, date, heure, statut) + formulaire de création. **Lecture/écriture sans suppression.** |
| **Corpus réglementaire** | 22 documents seedés (`LegalChunkSeeder`), `updateOrCreate` sur `title` (idempotent), références du Code des douanes 2008-34 et formulaires officiels. |
| **Widget d'assistance** | Composant Blade réutilisable présent sur **toutes les pages** Laravel (voir plus bas). |

### Frontend (React 19 — `frontend/`)

Clone fidèle du portail **douane.gov.tn** (design Figma) :

- **9 sections** : Accueil, Particuliers, Professionnels, La Douane, e-Services, Actualités, Douane TV, Contact, Support.
- **Accueil** : `TopBar` + `Navbar` bleu marine `#003087`, `HeroSlider`, cartes services, chiffres clés, hub e-Services (14 services), **section Actualités**, Douane TV, footer.
- **Bilingue FR / AR** (bascule `dir="rtl"` automatique).
- **Modales interactives** : taxation, wadh3iati, tarifs, DAC, devises, recherche, détail d'article, lecteur vidéo.
- **`SupportWidget`** : chat + hotline + FAQ, qui appelle directement le backend Laravel (`POST http://127.0.0.1:8000/api/agent/chat`, CORS ouvert) — historique, chips de sources citées, contexte temporel.

## Architecture du projet

```
┌────────────────────────────────────────────────────────────────────┐
│  frontend/  (React 19 + Vite + Tailwind 4)   → http://127.0.0.1:8443│
│  Portail officiel douane.gov.tn (clone)                               │
│  └── SupportWidget ──── POST /api/agent/chat ─────────┐              │
└───────────────────────────────────────────────────────┼──────────────┘
                                                        ▼
┌────────────────────────────────────────────────────────────────────┐
│  douane-intelligente/  (Laravel 12)            → http://127.0.0.1:8000│
│                                                                      │
│  /assistant  (chat Blade) ─┐                                         │
│  / (landing)  /admin       │                                         │
│                            ▼                                         │
│              AgentController → AgentOrchestratorService (LLM)        │
│                   │                                                  │
│                   ├─ tool search_legislation → LegalSearchService    │
│                   │        └── table legal_chunks (22 docs, RAG)     │
│                   └─ tool book_appointment  → AppointmentService     │
│                            ├── tables appointments / customs_* (FK)  │
│                            └── TicketGeneratorService → PDF + QR     │
│                                                                      │
│  SQLite (database/database.sqlite) — sessions, cache, queue inclus   │
└──────────────────────────────────────────────────────────────────────┘
```

Les deux apps sont **indépendantes** : le backend est testable seul (aucun build front requis), le frontend appelle l'API en cross-origin (réponses `Access-Control-Allow-Origin: *`).

## Stack technique

| Couche | Technologie |
|---|---|
| Backend | Laravel 12, PHP 8.2+ (`gd`, `curl`, `pdo_sqlite`, `mbstring`, `xml`) |
| Base de données | **SQLite** en fichier (sessions, cache et queue stockées aussi en base) |
| LLM | API compatible OpenAI — OpenRouter / Groq (replis documentés) |
| RAG | Recherche par mots-clés + scoring maison, découpe de chunks (pas de dépendance vectorielle) |
| Tickets | GD + QR code, Blade `resources/views/pdf/ticket.blade.php` |
| Frontend | React 19, TypeScript 5.7, Vite 8, Tailwind CSS v4, lucide-react |
| Tests / style | PHPUnit (`php artisan test`), Laravel Pint (`vendor/bin/pint`), `tsc --noEmit`, oxfmt |

## Démarrage rapide

### 1. Backend

```bash
cd douane-intelligente
composer install
cp .env.example .env            # PowerShell : Copy-Item .env.example .env
php artisan key:generate
New-Item database/database.sqlite -ItemType File   # bash : touch database/database.sqlite
php artisan migrate --seed
php artisan serve               # → http://127.0.0.1:8000
```

Détails complets (variables d'environnement, replis LLM, notes) : [`douane-intelligente/README.md`](douane-intelligente/README.md).

### 2. Frontend

```bash
cd frontend
npm install                     # ou pnpm install
npm run dev                     # → http://127.0.0.1:8443
```

Sans Node, le backend reste totalement démontrable (`/assistant`, widget, admin, tickets).

## Configuration du LLM

```env
LLM_API_URL=https://openrouter.ai/api/v1/chat/completions
LLM_API_KEY=                    # jamais commitée (.env est ignoré par git)
LLM_MODEL=z-ai/glm-5.2:free
```

- Ordre de priorité : `LLM_*` → `GROQ_*` → `OPENROUTER_API_KEY`.
- **Sans clé**, l'API répond quand même `200` avec un message de repli gracieux (aucun `500`) ; la démo « agent » demande une clé valide.

## Parcours de démonstration

1. **Accueil** → <http://127.0.0.1:8443> : portail officiel (header bleu marine, actualités, e-Services).
2. **Assistant** → <http://127.0.0.1:8000/assistant> : « Quelles sont les conditions pour le régime FCR ? » → réponse + **sources citées** (ex. *Art. 39*, *BTE-007-FR-0920*).
3. **Réservation** dans la conversation → l'outil `book_appointment` valide le créneau et renvoie une référence `RDV-XXXXXX`.
4. **Ticket** → <http://127.0.0.1:8000/appointments/RDV-DEMO01/ticket> : PDF avec QR code.
5. **Back-office** → <http://127.0.0.1:8000/admin> : liste des rendez-vous (démo : `RDV-DEMO01` La Goulette/FCR 09:00, `RDV-DEMO02` Sfax/COLIS 10:30).
6. **Widget flottant** : le bouton bleu marine `#003087` en bas à droite ouvre l'assistant depuis n'importe quelle page Laravel.

Test API rapide :

```bash
curl -X POST http://127.0.0.1:8000/api/agent/chat \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"message":"Quelles sont les conditions pour le régime FCR ?","history":[]}'
```

## Routes et API

| Méthode | Route | Usage |
|---|---|---|
| `GET` | `/` | Page d'accueil (route `home`) |
| `GET` | `/assistant` | Interface de chat (POST JSON `{message, history}`) |
| `GET` | `/admin` | Back-office des rendez-vous |
| `POST` | `/appointments` | Création d'un RDV → `201` + `reference_code`, `422` sur conflit |
| `GET` | `/appointments/{reference_code}` | Détail d'un RDV (HTML ou JSON selon `Accept`) |
| `GET` | `/appointments/{reference_code}/ticket` | Ticket PDF + QR (`?download=1` pour forcer le téléchargement) |
| `POST` | `/api/agent/chat` | Agent conversationnel → `{reply, sources, history}` (CSRF exclu) |

## Base de données

**13 tables** (SQLite), migrations toutes appliquées, intégrité référentielle vérifiée (`PRAGMA foreign_key_check` = 0 violation) :

| Table | Lignes (seed) | Contenu |
|---|---|---|
| `legal_chunks` | 22 | Corpus RAG : `title`, `content`, `reference` |
| `customs_offices` | 5 | La Goulette, Radès, Sfax, Sousse, Bizerte |
| `customs_services` | 5 | FCR, DEVISES, BAGAGES, COLIS, VEHICULE |
| `appointments` | 2 à la seed* | Rendez-vous + `reference_code` unique, FK → offices/services |
| `users`, `cache`, `jobs`… | 0 | Structures Laravel prêtes (pas d'auth dans ce MVP) |

\* `DemoAppointmentSeeder` crée `RDV-DEMO01` et `RDV-DEMO02` (dates calculées relatifs à aujourd'hui) ; d'autres RDV peuvent s'ajouter en démonstration.

## Widget d'assistance global

- Composant Blade `resources/views/components/chat-widget.blade.php`, inclus par `layout.blade.php` (assistant, admin, détails) **et** `welcome.blade.php`.
- Bouton flottant **→ lien `<a>`** vers `route('assistant')` (`target="_blank"`), mêmes classes/SVG que le design existant, `z-index: 9999`, styles scopés `#douane-chat-root` (aucun conflit d'IDs).
- Double d'intégration côté React : `SupportWidget` (chat + hotline + FAQ, FR/AR).

## Tests et qualité

```bash
cd douane-intelligente
php artisan test        # Tests: 3 passed (10 assertions) — Feature + TicketTest
vendor/bin/pint         # style PHP

cd ../frontend
npx tsc --noEmit        # typage TypeScript
npm run format          # oxfmt
```

## Sécurité

- **`.env` n'est jamais versionné** (ignoré par git) — les clés `LLM_API_KEY` / `OPENROUTER_API_KEY` restent locales ; `.env.example` est un modèle vide.
- **Base SQLite, PDF de tickets et `vendor/` exclus du dépôt** (`database/*.sqlite*`, `.gitignore` Laravel sur `storage/`).
- CSRF désactivé uniquement sur `api/*` (appels JSON cross-origin).
- Scan de signatures de clés effectué avant publication : **aucune**.
- ⚠️ **`/admin` n'a pas d'authentification** (aucun système de login dans ce MVP) : acceptable en démo (données fictives, aucune suppression possible), à protéger avant toute mise en ligne — voir section suivante.

## Limites connues et pistes

| Point | État | Piste |
|---|---|---|
| `/admin` sans login | Non protégé (démo) | Ajouter Breeze/Fortify ou une garde par token |
| Route `/` | Sert encore `welcome` (défaut Laravel) au lieu de `home.blade.php` | 1 ligne dans `routes/web.php` : `return view('home')` |
| Corpus réglementaire | Contenu de démonstration | Remplacer par les textes officiels avant production |
| Authentification | Table `users` vide, aucune route de login | Installer un scaffolding d'auth |
| Quota LLM | Dépend du fournisseur (OpenRouter/Groq) | Fallback message déjà géré côté API |

## Structure du dépôt

```
hackaton-esprit/
├── README.md                     ← ce fichier
├── douane-intelligente/          # Backend Laravel 12
│   ├── app/
│   │   ├── Http/Controllers/     # AgentController, AppointmentController
│   │   ├── Models/               # Appointment, CustomsOffice/Service, LegalChunk
│   │   └── Services/             # AgentOrchestrator, LegalSearch, Appointment, Ticket
│   ├── database/
│   │   ├── migrations/           # 7 migrations (users, offices, services, RDV, chunks…)
│   │   └── seeders/              # 5 bureaux, 5 services, 22 chunks, 2 RDV de démo
│   ├── resources/views/          # layout, assistant, admin, home, widget, ticket PDF
│   ├── routes/web.php            # 7 routes
│   └── tests/                    # PHPUnit (3 tests)
└── frontend/                     # Portail React (Vite + Tailwind 4)
    ├── src/App.tsx               # Routage par états (9 sections)
    ├── src/components/           # Header, HeroSlider, News, Pages, Modals, SupportWidget
    └── src/data/mockData.ts      # Actualités, vidéos, services
```

---

**Hackathon ESPRIT** — MVP : assistant IA douanier à sources citées, réservation de rendez-vous avec ticket QR et portail usager. Le README détaillé du backend se trouve dans [`douane-intelligente/README.md`](douane-intelligente/README.md).
