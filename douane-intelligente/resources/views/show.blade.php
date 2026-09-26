@extends('layout')

@section('title', 'Rendez-vous — Douane Intelligente')

@section('content')
    <h1>Confirmation de rendez-vous</h1>

    @if (! $appointment)
        <div class="card">
            <p class="muted">Aucun rendez-vous trouvé pour la référence <code class="ref">{{ $reference }}</code>.</p>
            <p><a href="{{ route('admin.index') }}">Retour à l'administration</a></p>
        </div>
    @else
        <div class="card">
            <table>
                <tbody>
                <tr>
                    <th>Référence</th>
                    <td><code class="ref">{{ $appointment->reference_code }}</code></td>
                </tr>
                <tr>
                    <th>Citoyen</th>
                    <td>{{ $appointment->citizen_name }}</td>
                </tr>
                <tr>
                    <th>Service</th>
                    <td>
                        {{ $appointment->service?->title ?? '—' }}
                        @if ($appointment->service)
                            <div class="muted">Documents requis : {{ $appointment->service->required_documents }}</div>
                        @endif
                    </td>
                </tr>
                <tr>
                    <th>Bureau</th>
                    <td>
                        {{ $appointment->office?->name ?? '—' }}
                        @if ($appointment->office)
                            <div class="muted">{{ $appointment->office->city }}</div>
                        @endif
                    </td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>{{ $appointment->appointment_date->format('d/m/Y') }}</td>
                </tr>
                <tr>
                    <th>Heure</th>
                    <td>{{ substr($appointment->appointment_time, 0, 5) }}</td>
                </tr>
                <tr>
                    <th>Statut</th>
                    <td><span class="badge {{ $appointment->status }}">{{ $appointment->status }}</span></td>
                </tr>
                </tbody>
            </table>
            <p class="muted">Présentez ce code au guichet : <strong>{{ $appointment->reference_code }}</strong></p>
        </div>
    @endif
@endsection
