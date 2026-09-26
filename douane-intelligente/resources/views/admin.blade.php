@extends('layout')

@section('title', 'Administration — Douane Intelligente')

@section('content')
    <style>
        /* --- Administration : tableaux et badges (HTML/CSS pur) --- */
        .admin-panel {
            background: #fff;
            border: 1px solid #dfe3e8;
            padding: 16px;
            margin-bottom: 20px;
            overflow-x: auto;
        }

        .admin-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 10px;
        }

        .admin-count {
            font-size: 13px;
            color: #66707c;
        }

        .admin-table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            font-size: 14px;
            border: 1px solid #dfe3e8;
        }

        .admin-table thead th {
            background: #1e3a5f;
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .04em;
            padding: 9px 12px;
            text-align: left;
            border: 1px solid #16304f;
        }

        .admin-table tbody td {
            border: 1px solid #e6eaef;
            padding: 9px 12px;
            vertical-align: middle;
        }

        .admin-table tbody tr:nth-child(even) {
            background: #f6f8fb;
        }

        .admin-table tbody tr:hover {
            background: #eef4fb;
        }

        .admin-table td.code-cell,
        .admin-table td.date-cell,
        .admin-table td.time-cell {
            white-space: nowrap;
        }

        .admin-table td.status-cell {
            text-align: center;
            white-space: nowrap;
        }

        .admin-table a {
            color: #1e3a5f;
            text-decoration: none;
        }

        .admin-table a:hover code.ref {
            background: #dfe9f5;
            text-decoration: underline;
        }

        .admin-table td code.ref {
            font-size: 13px;
        }

        .admin-empty {
            background: #fff;
            border: 1px dashed #cbd3dc;
            padding: 18px;
            text-align: center;
            color: #66707c;
            font-size: 14px;
        }

        /* --- Badges de statut --- */
        .badge {
            display: inline-block;
            min-width: 84px;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            line-height: 1.5;
            text-align: center;
            text-transform: capitalize;
            border: 1px solid transparent;
        }

        .badge.confirmed {
            background: #e5f6ea;
            color: #146c43;
            border-color: #9bd6ae;
        }

        .badge.pending {
            background: #fff3d6;
            color: #8a5b00;
            border-color: #f0d08a;
        }

        .badge.cancelled {
            background: #fdeaea;
            color: #a32020;
            border-color: #f0a8a8;
        }
    </style>

    <h1>Administration des rendez-vous</h1>

    <h2>Nouveau rendez-vous</h2>
    <form class="card" method="POST" action="{{ route('appointments.store') }}">
        @csrf

        <label for="citizen_name">Nom du citoyen</label>
        <input type="text" id="citizen_name" name="citizen_name" value="{{ old('citizen_name') }}" required>

        <label for="office_id">Bureau de douane</label>
        <select id="office_id" name="office_id" required>
            <option value="">— Sélectionner —</option>
            @foreach ($offices as $office)
                <option value="{{ $office->id }}" @selected(old('office_id') == $office->id)>
                    {{ $office->name }} ({{ $office->city }})
                </option>
            @endforeach
        </select>

        <label for="service_id">Service</label>
        <select id="service_id" name="service_id" required>
            <option value="">— Sélectionner —</option>
            @foreach ($services as $service)
                <option value="{{ $service->id }}" @selected(old('service_id') == $service->id)>
                    {{ $service->code }} — {{ $service->title }}
                </option>
            @endforeach
        </select>

        <label for="appointment_date">Date</label>
        <input type="date" id="appointment_date" name="appointment_date"
               value="{{ old('appointment_date') }}" min="{{ now()->toDateString() }}" required>

        <label for="appointment_time">Heure (créneaux de 30 min, 08:00 – 15:30)</label>
        <input type="time" id="appointment_time" name="appointment_time"
               value="{{ old('appointment_time', '09:00') }}" step="1800" min="08:00" max="15:30" required>

        <button type="submit">Réserver</button>
    </form>

    <h2>Liste des rendez-vous</h2>
    <div class="admin-panel">
        <div class="admin-toolbar">
            <span class="admin-count">
                {{ $appointments->count() }} rendez-vous enregistré(s)
            </span>
        </div>

        @if ($appointments->isEmpty())
            <div class="admin-empty">Aucun rendez-vous enregistré.</div>
        @else
            <table class="admin-table">
                <thead>
                <tr>
                    <th scope="col">Référence</th>
                    <th scope="col">Citoyen</th>
                    <th scope="col">Service</th>
                    <th scope="col">Bureau</th>
                    <th scope="col">Date</th>
                    <th scope="col">Heure</th>
                    <th scope="col">Statut</th>
                </tr>
                </thead>
                <tbody>
                @foreach ($appointments as $appointment)
                    <tr>
                        <td class="code-cell"><a href="{{ route('appointments.show', $appointment->reference_code) }}"><code class="ref">{{ $appointment->reference_code }}</code></a></td>
                        <td>{{ $appointment->citizen_name }}</td>
                        <td>{{ $appointment->service?->title ?? '—' }}</td>
                        <td>{{ $appointment->office?->name ?? '—' }}</td>
                        <td class="date-cell">{{ $appointment->appointment_date->format('d/m/Y') }}</td>
                        <td class="time-cell">{{ substr($appointment->appointment_time, 0, 5) }}</td>
                        <td class="status-cell"><span class="badge {{ $appointment->status }}">{{ $appointment->status }}</span></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        @endif
    </div>
@endsection
