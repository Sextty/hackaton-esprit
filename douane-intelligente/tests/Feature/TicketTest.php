<?php

namespace Tests\Feature;

use App\Models\CustomsOffice;
use App\Models\CustomsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TicketTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_appointment_and_receive_ticket_url(): void
    {
        $office = CustomsOffice::create([
            'name' => 'Bureau de Douane de Casablanca-Port',
            'city' => 'Casablanca',
        ]);

        $service = CustomsService::create([
            'code' => 'IMPORT',
            'title' => 'Déclaration d\'importation (D1)',
            'required_documents' => 'Passeport, Facture',
        ]);

        $response = $this->postJson('/appointments', [
            'office_id' => $office->id,
            'service_id' => $service->id,
            'appointment_date' => '2026-10-01',
            'appointment_time' => '09:30',
            'citizen_name' => 'Test Citoyen',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure(['reference_code', 'ticket_url']);

        $ref = $response->json('reference_code');
        $expectedUrl = "/appointments/{$ref}/ticket";
        $this->assertEquals($expectedUrl, $response->json('ticket_url'));

        // Test ticket stream download route
        $ticketResponse = $this->get($expectedUrl);
        $ticketResponse->assertStatus(200);
        $ticketResponse->assertHeader('Content-Type', 'application/pdf');
        $this->assertStringContainsString("filename=\"{$ref}.pdf\"", $ticketResponse->headers->get('Content-Disposition'));
    }
}
