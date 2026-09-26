<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Ticket {{ $referenceCode }}</title>
    <style>
        @page {
            margin: 18mm 15mm;
        }

        * {
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            color: #1c2833;
            font-size: 11pt;
            margin: 0;
        }

        .ticket {
            border: 2px solid #0b3d6b;
            width: 100%;
        }

        .header {
            background-color: #0b3d6b;
            color: #ffffff;
            text-align: center;
            padding: 14px 10px 12px 10px;
        }

        .header .institution {
            font-size: 13pt;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin: 0;
        }

        .header .subtitle {
            font-size: 9.5pt;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin: 6px 0 0 0;
            color: #d9e6f2;
        }

        .gold-bar {
            background-color: #c9a227;
            height: 6px;
            width: 100%;
        }

        .body {
            padding: 18px 22px 10px 22px;
        }

        .ticket-title {
            text-align: center;
            font-size: 11pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #0b3d6b;
            margin: 0 0 4px 0;
        }

        .divider {
            border-bottom: 1px dashed #9aa7b4;
            margin: 12px 0 16px 0;
        }

        .ref-label {
            text-align: center;
            font-size: 9pt;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #5a6b7b;
            margin: 0;
        }

        .ref-code {
            text-align: center;
            font-size: 24pt;
            font-weight: bold;
            letter-spacing: 3px;
            color: #0b3d6b;
            margin: 4px 0 0 0;
        }

        table.infos {
            width: 100%;
            border-collapse: collapse;
            margin-top: 18px;
        }

        table.infos td {
            border: 1px solid #c8d2dc;
            padding: 9px 12px;
            vertical-align: middle;
        }

        table.infos .label {
            background-color: #eef3f8;
            width: 34%;
            font-size: 9pt;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #0b3d6b;
            font-weight: bold;
        }

        table.infos .value {
            font-size: 11pt;
            color: #1c2833;
        }

        .qr-block {
            text-align: center;
            margin-top: 20px;
            padding: 14px 0 6px 0;
            border-top: 1px dashed #9aa7b4;
        }

        .qr-block img {
            width: 170px;
            height: 170px;
            border: 1px solid #c8d2dc;
            padding: 8px;
        }

        .qr-caption {
            font-size: 9pt;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #5a6b7b;
            margin: 8px 0 0 0;
        }

        .footer {
            background-color: #0b3d6b;
            color: #ffffff;
            text-align: center;
            font-size: 8.5pt;
            padding: 9px 12px;
            line-height: 1.5;
        }

        .note {
            text-align: center;
            font-size: 9pt;
            color: #5a6b7b;
            margin: 14px 0 0 0;
            line-height: 1.5;
        }
    </style>
</head>
<body>
<div class="ticket">
    <div class="header">
        <p class="institution">Administration des Douanes</p>
        <p class="subtitle">Guichet électronique de rendez-vous</p>
    </div>
    <div class="gold-bar"></div>

    <div class="body">
        <p class="ticket-title">Bulletin de rendez-vous</p>
        <div class="divider"></div>

        <p class="ref-label">Référence du dossier</p>
        <p class="ref-code">{{ $referenceCode }}</p>

        <table class="infos">
            <tr>
                <td class="label">Bureau de douane</td>
                <td class="value">{{ $officeName }}</td>
            </tr>
            <tr>
                <td class="label">Service</td>
                <td class="value">{{ $serviceName }}</td>
            </tr>
            <tr>
                <td class="label">Date</td>
                <td class="value">{{ \Illuminate\Support\Carbon::parse($appointmentDate)->isoFormat('DD/MM/YYYY') }}</td>
            </tr>
            <tr>
                <td class="label">Heure</td>
                <td class="value">{{ \Illuminate\Support\Carbon::parse($appointmentTime)->format('H:i') }}</td>
            </tr>
        </table>

        <div class="qr-block">
            <img src="{{ $qrCode }}" alt="QR Code">
            <p class="qr-caption">Présentez ce code au point d'accueil</p>
        </div>

        <p class="note">
            Merci d'arriver 10 minutes avant l'heure indiquée et de vous munir
            d'une pièce d'identité valide.
        </p>
    </div>

    <div class="footer">
        Ce bulletin est généré automatiquement et fait foi de réservation.
    </div>
</div>
</body>
</html>
