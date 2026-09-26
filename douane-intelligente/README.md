# Douane Intelligente — MVP (hackathon)

## Description

Assistant conversationnel de douane : l'utilisateur discute sur `/assistant`, le LLM (tool-calling) peut **rechercher dans le corpus réglementaire** (`search_legislation`) et **réserver un rendez-vous** (`book_appointment`), puis afficher un **ticket PDF avec QR code**. Le projet est un backend Laravel 12 complet : API d'agents, prise de rendez-vous avec gestion des créneaux/conflits, et back-office `/admin`.

## Prérequis

- **PHP 8.2+** avec les extensions : `gd` (QR + rendu), `curl` (appels LLM), `pdo_sqlite` (base SQLite), `mbstring`, `xml`
- **Composer 2**
- Aucun serveur MySQL/Postgres nécessaire (SQLite en fichier)
- Node/npm **non requis** pour la démo (les assets Vite sont livrés pré-construits)

## Installation

```bash
composer install
cp .env.example .env          # Windows (PowerShell) : Copy-Item .env.example .env
php artisan key:generate
touch database/database.sqlite # Windows (PowerShell) : New-Item database/database.sqlite -ItemType File
php artisan migrate --seed
php artisan storage:link       # optionnel, voir « Notes »
```

`migrate --seed` crée les tables (users, cache, jobs, bureaux, services, rendez-vous, corpus réglementaire) et charge le jeu de démonstration : **5 bureaux de douane**, **5 services**, **22 documents réglementaires** (corpus RAG) et **2 rendez-vous de démo**.

## Variables d'environnement requises

L'assistant conversationnel lit ces trois variables (dans cet ordre de priorité) :

| Variable | Rôle | Exemple (OpenRouter) |
|---|---|---|
| `LLM_API_URL` | Endpoint compatible OpenAI (`/chat/completions`) | `https://openrouter.ai/api/v1/chat/completions` |
| `LLM_API_KEY` | Clé d'API (jamais commitée) | `sk-or-v1-...` |
| `LLM_MODEL` | Identifiant du modèle | `z-ai/glm-5.2:free` |

```env
LLM_API_URL=https://openrouter.ai/api/v1/chat/completions
LLM_API_KEY=
LLM_MODEL=z-ai/glm-5.2:free
```

Replis acceptés (si `LLM_*` est vide) : `GROQ_API_URL` / `GROQ_API_KEY` / `GROQ_MODEL`, puis `OPENROUTER_API_KEY`.
Défauts internes du code : endpoint Groq (`https://api.groq.com/openai/v1/chat/completions`) et modèle `llama-3.3-70b-versatile`.

> Sans clé, l'application tourne quand même : `/api/agent/chat` répond 200 avec un **message de repli gracieux** (aucun 500). La démo « agent » nécessite donc une clé valide dans `.env`.

Autres variables utiles : `DB_CONNECTION=sqlite`, `SESSION_DRIVER=database`, `CACHE_STORE=database`, `QUEUE_CONNECTION=database` (déjà dans `.env.example` — les tables correspondantes viennent des migrations).

## Lancement

```bash
php artisan serve
```

Application sur <http://127.0.0.1:8000>.

## Routes principales

| Méthode | Route | Usage |
|---|---|---|
| `GET` | `/` | Page d'accueil (landing) |
| `GET` | `/assistant` | Interface de chat avec l'assistant (POST en JSON `{message, history}`) |
| `GET` | `/admin` | Back-office : liste des rendez-vous triés date/heure |
| `POST` | `/appointments` | Création d'un rendez-vous (JSON → `201` + `reference_code`, `422` sur conflit/créneau invalide) |
| `GET` | `/appointments/{reference_code}` | Détail d'un rendez-vous (HTML ou JSON selon l'en-tête `Accept`) |
| `GET` | `/appointments/{reference_code}/ticket` | Ticket PDF (QR code) ; `?download=1` pour forcer le téléchargement |
| `POST` | `/api/agent/chat` | API de l'agent conversationnel → JSON `{reply, sources, history}` (CSRF exclu) |

Aucune authentification n'est requise (pas de login dans ce MVP).

## Comptes / données de démo

- **Aucun compte** : aucune route d'authentification n'est exposée.
- **Rendez-vous seedés** (dates calculées relatif à aujourd'hui : 1er et 2e jours d'ouverture ouvrés, hors dimanche) :
  - `RDV-DEMO01` — Bureau de douane de **La Goulette**, service **FCR**, **09:00**, Amel Ben Salah
  - `RDV-DEMO02` — Bureau de douane de **Sfax**, service **COLIS**, **10:30**, Mohamed Trabelsi
- URLs d'exemple :
  - Détail : <http://127.0.0.1:8000/appointments/RDV-DEMO01>
  - Ticket : <http://127.0.0.1:8000/appointments/RDV-DEMO01/ticket>
  - Back-office : <http://127.0.0.1:8000/admin>
- Bureaux (office_id) : 1 La Goulette, 2 Radès, 3 Sfax, 4 Sousse, 5 Bizerte.
- Services (service_id) : 1 FCR, 2 DEVISES, 3 BAGAGES, 4 COLIS, 5 VEHICULE.

### Test rapide de l'agent (API)

```bash
curl -X POST http://127.0.0.1:8000/api/agent/chat \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"message":"Quelles sont les conditions pour le régime FCR ?","history":[]}'
```

Réponse JSON : `{ "reply": "...", "sources": ["..."], "history": [...] }`.

## Notes

- **Base de données** : SQLite (`database/database.sqlite`) ; `SESSION_DRIVER`, `CACHE_STORE` et `QUEUE_CONNECTION` utilisent aussi la base → `php artisan migrate` est obligatoire après un clone.
- **`php artisan storage:link`** : optionnel. Les tickets PDF sont écrits sur le disque `public` (`storage/app/public/tickets`) et servis par `response()->file()` avec un chemin absolu ; le lien de symboles n'est nécessaire que si tu sers ces fichiers via l'URL `/storage/...`.
- **Qualité du code** : `vendor/bin/pint` (style), `php artisan test` (tests PHPUnit).
- Les données seedées sont **du contenu de démonstration** : à remplacer par les textes réglementaires officiels avant toute mise en production.
