<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\CustomsOffice;
use App\Models\CustomsService;
use App\Services\AppointmentService;
use App\Services\TicketGeneratorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Throwable;

class AppointmentController extends Controller
{
    /**
     * Réservation d'un rendez-vous (validation, créneaux, conflits) + ticket PDF.
     */
    public function store(
        Request $request,
        ?AppointmentService $appointments = null,
        ?TicketGeneratorService $ticketGenerator = null
    ): JsonResponse {
        $appointments = $appointments ?? app(AppointmentService::class);
        $ticketGenerator = $ticketGenerator ?? app(TicketGeneratorService::class);

        try {
            $result = $appointments->book($request->all());
        } catch (ValidationException $e) {
            $errors = $e->errors();

            return response()->json([
                'message' => collect($errors)->flatten()->first() ?? 'Données de rendez-vous invalides.',
                'errors' => $errors,
            ], 422);
        }

        $appointment = $result['appointment'];
        $ticketUrl = "/appointments/{$result['reference_code']}/ticket";

        try {
            $ticketGenerator->generate($appointment);
        } catch (Throwable $e) {
            $ticketUrl = null;
        }

        return response()->json([
            'reference_code' => $result['reference_code'],
            'appointment' => $appointment,
            'ticket_url' => $ticketUrl,
        ], 201);
    }

    /**
     * Liste admin des rendez-vous, du plus récent au plus ancien.
     */
    public function adminIndex(): View
    {
        return view('admin', [
            'appointments' => Appointment::with(['office', 'service'])
                ->orderByDesc('appointment_date')
                ->orderByDesc('appointment_time')
                ->get(),
            'offices' => CustomsOffice::orderBy('name')->get(),
            'services' => CustomsService::orderBy('title')->get(),
        ]);
    }

    /**
     * Détails d'un rendez-vous : JSON si Accept: application/json, sinon vue HTML (404 si inconnu).
     */
    public function show(string $reference_code, Request $request): View|JsonResponse
    {
        $appointment = Appointment::with(['office', 'service'])
            ->where('reference_code', $reference_code)
            ->firstOrFail();

        if ($request->expectsJson()) {
            return response()->json([
                'appointment' => $appointment,
            ]);
        }

        return view('appointment-show', [
            'appointment' => $appointment,
            'reference' => $reference_code,
        ]);
    }

    /**
     * Téléchargement / streaming direct du ticket PDF.
     */
    public function ticket(string $reference_code, Request $request, ?TicketGeneratorService $ticketGenerator = null): BinaryFileResponse
    {
        $ticketGenerator = $ticketGenerator ?? app(TicketGeneratorService::class);

        $appointment = Appointment::with(['office', 'service'])
            ->where('reference_code', $reference_code)
            ->firstOrFail();

        $filePath = $ticketGenerator->generate($appointment);

        $disposition = $request->has('download') ? 'attachment' : 'inline';

        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "{$disposition}; filename=\"{$reference_code}.pdf\"",
        ]);
    }
}
