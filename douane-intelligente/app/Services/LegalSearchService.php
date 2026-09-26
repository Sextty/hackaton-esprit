<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class LegalSearchService
{
    private const STOP_WORDS = [
        'le', 'la', 'les', 'de', 'du', 'des', 'et', 'un', 'une',
        'je', 'nous', 'vous', 'il', 'elle', 'ils', 'elles', 'ce', 'cette',
        'ces', 'au', 'aux', 'en', 'pour', 'par', 'sur', 'dans', 'avec',
        'que', 'qui', 'quoi', 'est', 'sont', 'ou', 'où', 'ne', 'pas',
        'se', 'sa', 'son', 'ses', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes',
        'y', 'a', 'à', 'd', 'l', 'c', 'n', 's', 'j', 't',
        'شنو', 'شني', 'شنية', 'كاين', 'كيفاش', 'واش', 'باهي', 'راني',
        'هاذا', 'هاذی', 'ديال', 'تاع', 'اللي', 'باش', 'بزاف',
        'في', 'من', 'على', 'الى', 'إلى', 'عن', 'مع', 'هذا', 'هذه', 'ذلك',
        'كان', 'يكون', 'لا', 'ما', 'او', 'أو', 'و', 'أ', 'ان', 'أن',
    ];

    /**
     * Longueur maximale d'une entrée retournée, en dessous de la troncature
     * de contexte appliquée par l'orchestrateur (MAX_CONTENT = 800).
     */
    private const SAFE_CONTENT_LENGTH = 700;

    /**
     * Nombre maximal d'entrées (parties) générées pour un même chunk.
     */
    private const MAX_PARTS_PER_CHUNK = 3;

    /**
     * Nombre maximal d'entrées retournées au total (MAX_RESULTS de l'orchestrateur).
     */
    private const MAX_RESULTS_TOTAL = 6;

    /**
     * Recherche par mots-clés dans la table legal_chunks.
     *
     * Les chunks plus longs que SAFE_CONTENT_LENGTH sont découpés en plusieurs
     * entrées consécutives (même "reference", titre suivi de « (suite) ») afin
     * que l'orchestrateur ne tronque aucun passage : le texte reste verbatim.
     *
     * @return array<int, array{title: string, content: string, reference: string}>
     */
    public function search(string $query, int $limit = 3): array
    {
        if ($limit < 1) {
            return [];
        }

        $keywords = $this->extractKeywords($query);

        if ($keywords === []) {
            return [];
        }

        $rows = DB::table('legal_chunks')
            ->where(function ($q) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $pattern = $this->likePattern($keyword);
                    $q->orWhere('title', 'like', $pattern)
                        ->orWhere('content', 'like', $pattern);
                }
            })
            ->get();

        $scored = [];

        foreach ($rows as $row) {
            $content = (string) $row->content;
            $score = 0;

            foreach ($keywords as $keyword) {
                $score += $this->countOccurrences($content, $keyword);
            }

            if ($score <= 0) {
                $score = 1;
            }

            $scored[] = [
                'score' => $score,
                'title' => (string) $row->title,
                'content' => $content,
                'reference' => (string) $row->reference,
            ];
        }

        usort($scored, function (array $a, array $b): int {
            return $b['score'] <=> $a['score'];
        });

        $results = [];

        foreach (array_slice($scored, 0, $limit) as $item) {
            $parts = array_slice($this->splitContent((string) $item['content']), 0, self::MAX_PARTS_PER_CHUNK);

            foreach ($parts as $index => $part) {
                if (count($results) >= self::MAX_RESULTS_TOTAL) {
                    break 2;
                }

                $results[] = [
                    'title' => $index === 0
                        ? $item['title']
                        : $item['title'].' (suite)',
                    'content' => $part,
                    'reference' => $item['reference'],
                ];
            }
        }

        return $results;
    }

    /**
     * Découpe un contenu en parties d'au plus SAFE_CONTENT_LENGTH caractères,
     * aux frontières de phrases lorsque c'est possible.
     *
     * @return array<int, string>
     */
    private function splitContent(string $content): array
    {
        if (mb_strlen($content) <= self::SAFE_CONTENT_LENGTH) {
            return [$content];
        }

        $sentences = preg_split('/(?<=[.!?…])\s+/u', $content);

        if (! is_array($sentences) || $sentences === []) {
            $sentences = [$content];
        }

        $parts = [];
        $current = '';

        foreach ($sentences as $sentence) {
            if ($sentence === '') {
                continue;
            }

            $candidate = $current === '' ? $sentence : $current.' '.$sentence;

            if (mb_strlen($candidate) <= self::SAFE_CONTENT_LENGTH) {
                $current = $candidate;

                continue;
            }

            if ($current !== '') {
                $parts[] = $current;
                $current = '';
            }

            if (mb_strlen($sentence) <= self::SAFE_CONTENT_LENGTH) {
                $current = $sentence;

                continue;
            }

            foreach ($this->splitLongSentence($sentence) as $piece) {
                $parts[] = $piece;
            }

            $current = (string) array_pop($parts);
        }

        if ($current !== '') {
            $parts[] = $current;
        }

        return $parts === [] ? [$content] : $parts;
    }

    /**
     * Découpe une phrase trop longue à la frontière de mots la plus proche.
     *
     * @return array<int, string>
     */
    private function splitLongSentence(string $sentence): array
    {
        $pieces = [];
        $remaining = $sentence;

        while (mb_strlen($remaining) > self::SAFE_CONTENT_LENGTH) {
            $window = mb_substr($remaining, 0, self::SAFE_CONTENT_LENGTH);
            $cut = mb_strrpos($window, ' ');
            $cut = $cut === false ? self::SAFE_CONTENT_LENGTH : $cut;

            $pieces[] = mb_substr($remaining, 0, $cut);
            $remaining = ltrim(mb_substr($remaining, $cut));
        }

        if ($remaining !== '') {
            $pieces[] = $remaining;
        }

        return $pieces;
    }

    /**
     * @return array<int, string>
     */
    private function extractKeywords(string $query): array
    {
        $tokens = preg_split('/[^\p{L}\p{N}]+/u', mb_strtolower($query), -1, PREG_SPLIT_NO_EMPTY);

        if ($tokens === false) {
            return [];
        }

        $keywords = [];

        foreach ($tokens as $token) {
            $token = trim($token);

            if ($token === '' || mb_strlen($token) < 2) {
                continue;
            }

            if (in_array($token, self::STOP_WORDS, true)) {
                continue;
            }

            $keywords[$token] = $token;
        }

        return array_values($keywords);
    }

    private function likePattern(string $keyword): string
    {
        $escaped = str_replace(
            ['\\', '%', '_'],
            ['\\\\', '\%', '\_'],
            $keyword
        );

        return '%'.$escaped.'%';
    }

    private function countOccurrences(string $haystack, string $needle): int
    {
        if ($needle === '') {
            return 0;
        }

        $haystack = mb_strtolower($haystack);
        $count = 0;
        $offset = 0;
        $needleLength = mb_strlen($needle);

        while (($pos = mb_strpos($haystack, $needle, $offset)) !== false) {
            $count++;
            $offset = $pos + $needleLength;
        }

        return $count;
    }
}
