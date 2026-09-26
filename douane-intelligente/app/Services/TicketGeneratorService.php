<?php

namespace App\Services;

use App\Models\Appointment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TicketGeneratorService
{
    public const DISK = 'public';

    public const DIRECTORY = 'tickets';

    public function generate(Appointment $appointment): string
    {
        $referenceCode = (string) $appointment->reference_code;

        Storage::disk(self::DISK)->makeDirectory(self::DIRECTORY);

        $pdf = Pdf::loadView('pdf.ticket', [
            'appointment' => $appointment,
            'referenceCode' => $referenceCode,
            'officeName' => $appointment->office?->name ?? '—',
            'serviceName' => $appointment->service?->title ?? $appointment->service?->name ?? '—',
            'appointmentDate' => $appointment->appointment_date,
            'appointmentTime' => $appointment->appointment_time,
            'qrCode' => $this->buildQrCodeDataUri($referenceCode),
        ])->setPaper('a4', 'portrait');

        $relativePath = self::DIRECTORY.'/'.$this->fileName($referenceCode).'.pdf';

        Storage::disk(self::DISK)->put($relativePath, $pdf->output());

        return Storage::disk(self::DISK)->path($relativePath);
    }

    protected function buildQrCodeDataUri(string $value): string
    {
        $raw = (string) QrCode::format('svg')->size(400)->margin(2)->generate($value);
        $mime = 'image/svg+xml';

        if (str_starts_with($raw, 'data:')) {
            return $raw;
        }

        return 'data:'.$mime.';base64,'.base64_encode($raw);
    }

    protected function fileName(string $referenceCode): string
    {
        $safe = preg_replace('/[^A-Za-z0-9\-_]/', '', $referenceCode);

        return $safe !== '' && $safe !== null ? $safe : 'ticket-'.uniqid();
    }
}
