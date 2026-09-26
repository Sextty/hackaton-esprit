<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\CustomsOffice;
use App\Models\CustomsService;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\TransferException;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Throwable;

class AgentOrchestratorService
{
    private const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

    private const MODEL = 'llama-3.3-70b-versatile';

    private const TIMEOUT = 30;

    private const MAX_ROUNDS = 3;

    private const MAX_RESULTS = 6;

    private const MAX_CONTENT = 800;

    private const FALLBACK_TIMEOUT = "Désolé, l'assistant met trop de temps à répondre (délai de 30 secondes dépassé). Merci de réessayer dans quelques instants.";

    private const FALLBACK_ERROR = "Désolé, une erreur technique empêche actuellement l'assistant de répondre. Merci de réessayer dans quelques instants.";

    private const SYSTEM_PROMPT = <<<'PROMPT'
Tu es l'assistant juridique officiel de la plateforme "Douane Intelligente" (droit des douanes et formalités).

Règles strictes et non négociables :
1. Tu réponds UNIQUEMENT à partir des documents retournés par l'outil search_legislation. Tu ne t'appuies jamais sur ta propre connaissance du droit.
2. Tu cites TOUJOURS la référence légale (champ "reference") du document utilisé, sous la forme "Référence : ...".
3. Tu n'inventes JAMAIS de loi, d'article, de décret, d'arrêté ou de texte qui n'apparaît pas dans les résultats de search_legislation.
4. Si aucun document pertinent n'est trouvé, dis-le clairement, n'affirme rien et propose une reformulation de la recherche.
5. book_appointment : si l'utilisateur exprime explicitement une demande de rendez-vous (ex : « je veux réserver… ») et que bureau, service, date et heure sont fournis, appelle l'outil directement. Sinon, demande d'abord les informations manquantes puis une confirmation explicite (« Confirmez-vous ce rendez-vous ? ») avant d'appeler book_appointment. Ne déclare JAMAIS un rendez-vous réservé sans avoir appelé book_appointment et obtenu son reference_code.
6. get_appointment sert uniquement à consulter un rendez-vous existant à partir de son code de référence.
7. Réponds en français, de façon claire, concise et factuelle.
8. Si la question sort du cadre du droit des douanes, rappelle poliment ton périmètre.

Tu peux appeler un outil à la fois et tu dois toujours finaliser avec une réponse en langage naturel.
PROMPT;

    public function chat(string $userMessage, array $history = []): array
    {
        $userMessage = trim($userMessage);

        if ($userMessage === '') {
            return $this->respond('Merci de saisir une question.', [], $history);
        }

        $messages = $this->buildMessages($userMessage, $history);
        $sources = [];
        $ticketUrl = null;

        for ($round = 0; $round < self::MAX_ROUNDS; $round++) {
            try {
                $payload = $this->callLlm($messages);
            } catch (Throwable $e) {
                return $this->fallback($e, $messages, $ticketUrl);
            }

            $assistant = $payload['choices'][0]['message'] ?? null;

            if (! is_array($assistant)) {
                Log::warning('AgentOrchestrator: réponse LLM invalide', ['payload' => $payload]);

                return $this->respond(self::FALLBACK_ERROR, $sources, $messages, $ticketUrl);
            }

            $toolCalls = is_array($assistant['tool_calls'] ?? null) ? $assistant['tool_calls'] : [];

            if ($toolCalls === []) {
                return $this->respond(trim((string) ($assistant['content'] ?? '')), $sources, $messages, $ticketUrl);
            }

            $messages[] = [
                'role' => 'assistant',
                'content' => $assistant['content'] ?? null,
                'tool_calls' => $toolCalls,
            ];

            foreach ($toolCalls as $toolCall) {
                $name = (string) ($toolCall['function']['name'] ?? '');
                $rawArguments = (string) ($toolCall['function']['arguments'] ?? '');
                $arguments = json_decode($rawArguments, true);

                if (! is_array($arguments)) {
                    $arguments = [];
                }

                $result = $this->executeTool($name, $arguments);

                if ($name === 'search_legislation') {
                    $sources = array_merge($sources, $this->extractSources($result));
                }

                if ($name === 'book_appointment' && isset($result['ticket_url'])) {
                    $ticketUrl = (string) $result['ticket_url'];
                }

                $messages[] = [
                    'role' => 'tool',
                    'tool_call_id' => (string) ($toolCall['id'] ?? ''),
                    'name' => $name,
                    'content' => $this->encode($result),
                ];
            }
        }

        try {
            $payload = $this->callLlm($messages);
        } catch (Throwable $e) {
            return $this->fallback($e, $messages, $ticketUrl);
        }

        $final = $payload['choices'][0]['message'] ?? null;
        $reply = is_array($final) ? trim((string) ($final['content'] ?? '')) : '';

        if ($reply === '') {
            $reply = self::FALLBACK_ERROR;
        }

        return $this->respond($reply, $sources, $messages, $ticketUrl);
    }

    private function buildMessages(string $userMessage, array $history): array
    {
        $normalized = [];

        foreach ($history as $entry) {
            if (! is_array($entry)) {
                continue;
            }

            $role = (string) ($entry['role'] ?? '');
            $content = trim((string) ($entry['content'] ?? ''));

            if ($content === '' || ! in_array($role, ['user', 'assistant'], true)) {
                continue;
            }

            $normalized[] = ['role' => $role, 'content' => mb_substr($content, 0, 6000)];
        }

        $cappedUserMessage = mb_substr(trim($userMessage), 0, 6000);
        $last = $normalized === [] ? null : $normalized[array_key_last($normalized)];

        if ($last !== null && $last['role'] === 'user' && $last['content'] === $cappedUserMessage) {
            array_pop($normalized);
        }

        return array_merge(
            [['role' => 'system', 'content' => self::SYSTEM_PROMPT."\n\n".$this->catalogue()]],
            $normalized,
            [['role' => 'user', 'content' => $userMessage]]
        );
    }

    /**
     * Données de référence injectées dans le prompt système (permet au LLM
     * d'utiliser les bons office_id / service_id sans les inventer).
     */
    private function catalogue(): string
    {
        $lines = ['Bureaux de douane disponibles (office_id) :'];

        foreach (CustomsOffice::orderBy('id')->get() as $office) {
            $lines[] = "- {$office->id} : {$office->name} ({$office->city})";
        }

        $lines[] = '';
        $lines[] = 'Services disponibles (service_id) :';

        foreach (CustomsService::orderBy('id')->get() as $service) {
            $lines[] = "- {$service->id} : {$service->code} — {$service->title}";
        }

        $lines[] = '';
        $lines[] = 'Règles de réservation : créneaux de '.implode(', ', AppointmentService::slots())
            .' (30 minutes), pas de rendez-vous le dimanche, horizon maximal de 30 jours.';
        $lines[] = 'Date du jour : '.now()->format('Y-m-d').' ('.now()->translatedFormat('l').'). '
            .'Toute date de rendez-vous doit être comprise entre cette date et '.now()->addDays(30)->format('Y-m-d').' inclusive.';

        return implode("\n", $lines);
    }

    private function callLlm(array $messages): array
    {
        $apiKey = (string) (env('LLM_API_KEY') ?: env('GROQ_API_KEY') ?: env('OPENROUTER_API_KEY'));
        $endpoint = (string) (env('LLM_API_URL') ?: env('GROQ_API_URL') ?: '');
        $model = (string) (env('LLM_MODEL') ?: env('GROQ_MODEL') ?: env('OPENROUTER_MODEL') ?: self::MODEL);

        if ($endpoint === '') {
            $endpoint = str_starts_with($apiKey, 'sk-or-')
                ? 'https://openrouter.ai/api/v1/chat/completions'
                : self::ENDPOINT;
        }

        if ($apiKey === '') {
            throw new \RuntimeException('Clé API LLM manquante : renseignez LLM_API_KEY (ou GROQ_API_KEY / OPENROUTER_API_KEY) dans .env');
        }

        $client = new Client;
        $maxAttempts = 3;

        // Le fournisseur peut renvoyer une erreur soit en code HTTP (429/5xx),
        // soit en HTTP 200 avec un objet "error" imbriqué : on retente dans les
        // deux cas (modèles gratuits parfois saturés).
        for ($attempt = 1; ; $attempt++) {
            $response = $client->post($endpoint, [
                'headers' => [
                    'Authorization' => 'Bearer '.$apiKey,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
                'json' => [
                    'model' => $model,
                    'messages' => $messages,
                    'tools' => $this->tools(),
                    'tool_choice' => 'auto',
                    'temperature' => 0.2,
                    'max_tokens' => 2500,
                ],
                'timeout' => self::TIMEOUT,
                'connect_timeout' => self::TIMEOUT,
                'http_errors' => false,
            ]);

            $status = $response->getStatusCode();
            $decoded = json_decode((string) $response->getBody(), true);
            $error = null;

            if ($status >= 400) {
                $error = is_array($decoded)
                    ? (string) ($decoded['error']['message'] ?? $response->getReasonPhrase())
                    : $response->getReasonPhrase();
            } elseif (! is_array($decoded)) {
                $error = 'Réponse du LLM illisible';
            } elseif (isset($decoded['error'])) {
                $error = (string) ($decoded['error']['message'] ?? 'erreur inconnue');
            }

            if ($error === null) {
                return $decoded;
            }

            $embeddedCode = is_array($decoded) ? (int) ($decoded['error']['code'] ?? 0) : 0;
            $isTransient = $status === 429
                || $status >= 500
                || $embeddedCode === 429
                || $embeddedCode >= 500
                || (bool) preg_match('/overload|temporar|rate limit|unavailable|provider/i', $error);

            if ($isTransient && $attempt < $maxAttempts) {
                Log::warning('AgentOrchestrator: erreur LLM transitoire, tentative '.$attempt.'/'.$maxAttempts, [
                    'status' => $status,
                    'error' => $error,
                ]);
                usleep(1_200_000 * $attempt);

                continue;
            }

            throw new \RuntimeException('LLM API '.$status.' : '.$error);
        }
    }

    private function tools(): array
    {
        return [
            [
                'type' => 'function',
                'function' => [
                    'name' => 'search_legislation',
                    'description' => "Recherche la législation et la réglementation douanière pertinentes pour répondre à la question de l'utilisateur. Retourne des documents avec un titre, un contenu et une référence légale.",
                    'parameters' => [
                        'type' => 'object',
                        'properties' => [
                            'query' => [
                                'type' => 'string',
                                'description' => "Requête de recherche en français, ex : 'déclaration en douane marchandises importées'",
                            ],
                        ],
                        'required' => ['query'],
                    ],
                ],
            ],
            [
                'type' => 'function',
                'function' => [
                    'name' => 'book_appointment',
                    'description' => "Crée un rendez-vous dans un guichet douanier. À utiliser UNIQUEMENT après confirmation explicite de l'utilisateur.",
                    'parameters' => [
                        'type' => 'object',
                        'properties' => [
                            'office_id' => [
                                'type' => 'integer',
                                'description' => 'Identifiant du bureau de douane',
                            ],
                            'service_id' => [
                                'type' => 'integer',
                                'description' => 'Identifiant du service demandé',
                            ],
                            'date' => [
                                'type' => 'string',
                                'description' => 'Date du rendez-vous au format YYYY-MM-DD',
                            ],
                            'time' => [
                                'type' => 'string',
                                'description' => 'Heure du rendez-vous au format HH:MM, ex : 09:30',
                            ],
                            'citizen_name' => [
                                'type' => 'string',
                                'description' => 'Nom et prénom du citoyen pour lequel le rendez-vous est pris (optionnel)',
                            ],
                        ],
                        'required' => ['office_id', 'service_id', 'date', 'time'],
                    ],
                ],
            ],
            [
                'type' => 'function',
                'function' => [
                    'name' => 'get_appointment',
                    'description' => "Récupère les détails d'un rendez-vous existant à partir de son code de référence.",
                    'parameters' => [
                        'type' => 'object',
                        'properties' => [
                            'reference_code' => [
                                'type' => 'string',
                                'description' => 'Code de référence du rendez-vous, ex : RDV-ABC123',
                            ],
                        ],
                        'required' => ['reference_code'],
                    ],
                ],
            ],
        ];
    }

    private function executeTool(string $name, array $arguments): array
    {
        Log::info("AgentOrchestrator: tool_call {$name}", ['arguments' => $arguments]);

        try {
            return match ($name) {
                'search_legislation' => $this->searchLegislation((string) ($arguments['query'] ?? '')),
                'book_appointment' => $this->bookAppointment($arguments),
                'get_appointment' => $this->getAppointment((string) ($arguments['reference_code'] ?? '')),
                default => ['error' => "Outil inconnu : {$name}"],
            };
        } catch (Throwable $e) {
            Log::warning("AgentOrchestrator: échec de l'outil {$name}", ['error' => $e->getMessage()]);

            return ['error' => "La fonction {$name} a échoué : ".$e->getMessage()];
        }
    }

    private function searchLegislation(string $query): array
    {
        $query = trim($query);

        if ($query === '') {
            return ['error' => 'Le paramètre "query" est obligatoire.'];
        }

        $documents = app(LegalSearchService::class)->search($query);

        if (! is_array($documents) || $documents === []) {
            return [
                'results' => [],
                'message' => 'Aucun document législatif trouvé pour cette requête.',
            ];
        }

        $results = [];

        foreach (array_slice(array_values($documents), 0, self::MAX_RESULTS) as $document) {
            if (! is_array($document)) {
                continue;
            }

            $results[] = [
                'title' => (string) ($document['title'] ?? ''),
                'content' => mb_substr((string) ($document['content'] ?? ''), 0, self::MAX_CONTENT),
                'reference' => (string) ($document['reference'] ?? ''),
            ];
        }

        return ['results' => $results];
    }

    private function bookAppointment(array $arguments): array
    {
        $payload = [
            'office_id' => (int) ($arguments['office_id'] ?? 0),
            'service_id' => (int) ($arguments['service_id'] ?? 0),
            'date' => (string) ($arguments['date'] ?? ''),
            'time' => (string) ($arguments['time'] ?? ''),
            'citizen_name' => trim((string) ($arguments['citizen_name'] ?? '')),
        ];

        if ($payload['office_id'] <= 0 || $payload['service_id'] <= 0 || $payload['date'] === '' || $payload['time'] === '') {
            return ['error' => 'office_id, service_id, date et time sont obligatoires.'];
        }

        try {
            $result = app(AppointmentService::class)->book($payload);
        } catch (ValidationException $e) {
            $errors = $e->errors();

            return [
                'error' => collect($errors)->flatten()->first() ?? 'Données de rendez-vous invalides.',
                'errors' => $errors,
            ];
        }

        return [
            'reference_code' => $result['reference_code'],
            'appointment' => $result['appointment'],
            'ticket_url' => '/appointments/'.$result['reference_code'].'/ticket',
        ];
    }

    private function getAppointment(string $referenceCode): array
    {
        $referenceCode = trim($referenceCode);

        if ($referenceCode === '') {
            return ['error' => 'Le paramètre "reference_code" est obligatoire.'];
        }

        $appointment = Appointment::query()
            ->where('reference_code', $referenceCode)
            ->first();

        if (! $appointment) {
            return ['error' => "Aucun rendez-vous trouvé pour la référence {$referenceCode}."];
        }

        return ['appointment' => $appointment->toArray()];
    }

    private function extractSources(array $result): array
    {
        $sources = [];

        foreach ($result['results'] ?? [] as $document) {
            $reference = trim((string) ($document['reference'] ?? ''));

            if ($reference !== '') {
                $sources[] = $reference;
            }
        }

        return array_values(array_unique($sources));
    }

    private function respond(string $reply, array $sources, array $messages, ?string $ticketUrl = null): array
    {
        $reply = $this->sanitizeReply($reply);

        $messages[] = ['role' => 'assistant', 'content' => $reply];

        return [
            'reply' => $reply,
            'sources' => array_values(array_unique($sources)),
            'ticket_url' => $ticketUrl,
            'history' => $this->publicHistory($messages),
        ];
    }

    private function fallback(Throwable $e, array $messages, ?string $ticketUrl = null): array
    {
        $message = $e->getMessage();
        $isTimeout = $e instanceof TransferException
            && (str_contains($message, 'cURL error 28')
                || stripos($message, 'timed out') !== false
                || stripos($message, 'timeout') !== false);

        if (! $isTimeout) {
            Log::warning('AgentOrchestrator: appel LLM en échec', ['error' => $message]);
        }

        return $this->respond($isTimeout ? self::FALLBACK_TIMEOUT : self::FALLBACK_ERROR, [], $messages, $ticketUrl);
    }

    /**
     * Nettoie la réponse finale : supprime les artefacts JSON parasites que le
     * modèle laisse parfois dans son texte (blocs 【...】 ou tableaux/objets
     * JSON bruts tels que [{"id":0,...}]), sans toucher au reste du message.
     */
    private function sanitizeReply(string $reply): string
    {
        if (trim($reply) === '') {
            return $reply;
        }

        // Placeholders de type 【search_legislation[0]["reference"]】 ou 【{...}】.
        $reply = (string) preg_replace_callback('/【(.*?)】/s', function (array $match): string {
            return preg_match('/[\[\]{}"]/', $match[1]) === 1 ? ' ' : $match[0];
        }, $reply);

        $artifacts = $this->jsonArtifacts($reply);

        if ($artifacts !== []) {
            $reply = str_replace($artifacts, ' ', $reply);
        }

        $reply = (string) preg_replace('/[ \t]+\n/', "\n", $reply);
        $reply = (string) preg_replace('/\n{3,}/', "\n\n", $reply);
        $reply = (string) preg_replace('/[ \t]{2,}/', ' ', $reply);

        return trim($reply);
    }

    /**
     * Liste les fragments JSON parasites contenus dans le texte.
     *
     * @return list<string>
     */
    private function jsonArtifacts(string $text): array
    {
        $artifacts = [];

        $length = strlen($text);

        for ($i = 0; $i < $length; $i++) {
            $char = $text[$i];

            if ($char !== '[' && $char !== '{') {
                continue;
            }

            $decoded = $this->decodeBalanced($text, $i);

            if ($decoded === null) {
                continue;
            }

            [$json, $raw] = $decoded;

            if (! is_array($json) || ! $this->looksLikeArtifact($json)) {
                continue;
            }

            // Englobe les guillemets 【】 éventuellement autour du JSON.
            $start = $i;
            $end = $i + strlen($raw);

            while ($start > 0 && in_array($text[$start - 1], [' ', "\t"], true)) {
                $start--;
            }

            if ($start >= 3 && substr($text, $start - 3, 3) === "\u{3010}") {
                $start -= 3;
            } elseif ($start >= 1 && $text[$start - 1] === "\u{3010}") {
                $start -= 1;
            }

            $close = $this->nextClosingBracket($text, $end);

            if ($close !== null) {
                $end = $close;
            }

            $artifacts[] = substr($text, $start, $end - $start);
            $i = max($i, $end - 1);
        }

        return array_values(array_unique($artifacts));
    }

    /**
     * Décodage d'un JSON équilibré commencé à $start.
     *
     * @return array{0: mixed, 1: string}|null
     */
    private function decodeBalanced(string $text, int $start): ?array
    {
        $open = $text[$start];
        $close = $open === '[' ? ']' : '}';
        $depth = 0;
        $inString = false;
        $escaped = false;
        $length = strlen($text);

        for ($i = $start; $i < $length; $i++) {
            $char = $text[$i];

            if ($inString) {
                if ($escaped) {
                    $escaped = false;
                } elseif ($char === '\\') {
                    $escaped = true;
                } elseif ($char === '"') {
                    $inString = false;
                }

                continue;
            }

            if ($char === '"') {
                $inString = true;
                continue;
            }

            if ($char === $open || ($open === '[' && $char === '{') || ($open === '{' && $char === '[')) {
                $depth++;
            } elseif ($char === $close || ($open === '[' && $char === '}') || ($open === '{' && $char === ']')) {
                $depth--;

                if ($depth === 0) {
                    $raw = substr($text, $start, $i - $start + 1);
                    $decoded = json_decode($raw, true);

                    return json_last_error() === JSON_ERROR_NONE ? [$decoded, $raw] : null;
                }
            }
        }

        return null;
    }

    /**
     * Un artefact est un JSON sans usage en langage naturel : tableau ou objet
     * possédant une clé "id", ou liste d'objets de ce type.
     */
    private function looksLikeArtifact(mixed $json): bool
    {
        if (! is_array($json)) {
            return false;
        }

        if (array_key_exists('id', $json)) {
            return true;
        }

        $first = reset($json);

        return is_array($first) && array_key_exists('id', $first);
    }

    private function nextClosingBracket(string $text, int $offset): ?int
    {
        $length = strlen($text);

        for ($i = $offset; $i < $length; $i++) {
            if (substr($text, $i, 3) === "\u{3011}") {
                return $i + 3;
            }

            $char = $text[$i];

            if ($char === ']' || $char === '}' || $char === "\n") {
                return null;
            }
        }

        return null;
    }

    private function publicHistory(array $messages): array
    {
        $history = [];

        foreach ($messages as $message) {
            $role = (string) ($message['role'] ?? '');
            $content = trim((string) ($message['content'] ?? ''));

            if (in_array($role, ['user', 'assistant'], true) && $content !== '') {
                $history[] = ['role' => $role, 'content' => $content];
            }
        }

        return $history;
    }

    private function encode(array $value): string
    {
        $encoded = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        return $encoded === false ? json_encode(['error' => 'Résultat illisible']) : $encoded;
    }
}
