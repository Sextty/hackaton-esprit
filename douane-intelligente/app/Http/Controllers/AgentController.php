<?php

namespace App\Http\Controllers;

use App\Services\AgentOrchestratorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    /**
     * Point d'entrée de l'agent conversationnel (tool-calls : search_legislation, book_appointment, get_appointment).
     */
    public function chat(Request $request, ?AgentOrchestratorService $agent = null): JsonResponse
    {
        $agent = $agent ?? app(AgentOrchestratorService::class);

        $data = $request->validate([
            'message' => ['required', 'string', 'max:4000'],
            'history' => ['sometimes', 'array', 'max:50'],
            'history.*.role' => ['required', 'in:user,assistant'],
            'history.*.content' => ['required', 'string', 'max:6000'],
        ]);

        return response()->json(
            $agent->chat($data['message'], $data['history'] ?? [])
        );
    }
}
