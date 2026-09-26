<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Douane Intelligente')</title>
    <style>
        :root {
            --navy: #0a3d62;
            --navy-dark: #072b45;
            --navy-soft: #14567f;
            --gold: #e0a800;
            --gold-soft: #f5c542;
            --bg: #f4f6f9;
            --border: #d8dee6;
            --text: #1b2733;
            --muted: #5c6b7a;
        }

        * { box-sizing: border-box; }

        body {
            font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* ---------- Header institutionnel ---------- */
        .site-header {
            background: var(--navy);
            border-bottom: 4px solid var(--gold);
            color: #fff;
        }
        .site-header .bar {
            max-width: 1000px;
            margin: 0 auto;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 28px;
            flex-wrap: wrap;
        }
        .brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
            font-size: 16px;
            letter-spacing: .3px;
            color: #fff;
            text-decoration: none;
        }
        .brand .seal {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border: 2px solid var(--gold);
            border-radius: 50%;
            color: var(--gold-soft);
            font-size: 13px;
            font-weight: 700;
        }
        .brand .sub {
            display: block;
            font-size: 11px;
            font-weight: 400;
            color: #b9cbdc;
            letter-spacing: .5px;
            text-transform: uppercase;
        }
        .site-header nav { display: flex; gap: 4px; flex-wrap: wrap; }
        .site-header nav a {
            color: #cddbeb;
            text-decoration: none;
            font-size: 14px;
            padding: 7px 12px;
            border-radius: 3px;
            border-bottom: 2px solid transparent;
        }
        .site-header nav a:hover { color: #fff; background: rgba(255, 255, 255, .08); }
        .site-header nav a.active {
            color: #fff;
            background: rgba(224, 168, 0, .16);
            border-bottom-color: var(--gold);
            font-weight: 600;
        }

        /* ---------- Contenu ---------- */
        main {
            flex: 1 0 auto;
            width: 100%;
            max-width: 1000px;
            margin: 28px auto;
            padding: 0 16px;
        }
        h1 { font-size: 22px; margin: 0 0 16px; color: var(--navy); }
        h2 { font-size: 17px; margin: 26px 0 10px; color: var(--navy); }
        a { color: var(--navy); }

        table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            font-size: 14px;
            border: 1px solid var(--border);
        }
        th, td { border: 1px solid var(--border); padding: 8px 10px; text-align: left; vertical-align: top; }
        th { background: #eaeff5; font-weight: 600; color: var(--navy); }

        form.card, .card {
            background: #fff;
            border: 1px solid var(--border);
            border-top: 3px solid var(--navy);
            padding: 16px;
            margin-bottom: 20px;
            border-radius: 4px;
        }

        label { display: block; font-size: 13px; font-weight: 600; margin: 10px 0 4px; color: var(--navy); }
        input, select, textarea {
            width: 100%;
            padding: 8px 10px;
            font-size: 14px;
            border: 1px solid #b9c2cc;
            border-radius: 3px;
            background: #fff;
            color: var(--text);
            font-family: inherit;
        }
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--navy-soft);
            box-shadow: 0 0 0 2px rgba(10, 61, 98, .12);
        }

        button, .btn {
            display: inline-block;
            margin-top: 14px;
            padding: 10px 18px;
            font-size: 14px;
            font-weight: 600;
            background: var(--navy);
            color: #fff;
            border: 1px solid var(--navy);
            border-bottom: 3px solid var(--gold);
            border-radius: 3px;
            cursor: pointer;
            text-decoration: none;
            font-family: inherit;
        }
        button:hover, .btn:hover { background: var(--navy-soft); color: #fff; }
        button:disabled { opacity: .55; cursor: not-allowed; }
        .btn-gold { background: var(--gold); border-color: var(--gold); color: var(--navy-dark); }
        .btn-gold:hover { background: var(--gold-soft); color: var(--navy-dark); }
        .btn-lg { padding: 13px 26px; font-size: 15px; }

        .flash { padding: 10px 12px; border-radius: 3px; margin-bottom: 16px; font-size: 14px; }
        .flash.ok { background: #e5f6ea; border: 1px solid #9bd6ae; }
        .flash.err { background: #fdeaea; border: 1px solid #f0a8a8; }
        .errors { background: #fdeaea; border: 1px solid #f0a8a8; padding: 10px 12px; margin-bottom: 16px; font-size: 14px; }
        .errors ul { margin: 4px 0 0; padding-left: 18px; }

        .muted { color: var(--muted); font-size: 13px; }
        code.ref { background: #eaeff5; color: var(--navy); padding: 2px 6px; border-radius: 3px; font-size: 13px; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 12px; background: #eaeff5; }
        .badge.pending { background: #fff3d6; color: #7a5b00; }
        .badge.confirmed { background: #e5f6ea; color: #1c6b39; }
        .badge.cancelled { background: #fdeaea; color: #96271f; }
        pre { background: var(--navy); color: #e6edf3; padding: 12px; border-radius: 3px; overflow: auto; font-size: 12px; }

        /* ---------- Page d'accueil ---------- */
        .hero {
            background: #fff;
            border: 1px solid var(--border);
            border-top: 4px solid var(--gold);
            border-radius: 4px;
            padding: 34px 30px;
            margin-bottom: 24px;
        }
        .hero h1 { font-size: 28px; margin-bottom: 8px; }
        .hero .lead { font-size: 16px; line-height: 1.6; color: #33414f; margin: 0 0 8px; max-width: 720px; }
        .hero .actions { margin-top: 22px; display: flex; gap: 12px; flex-wrap: wrap; }
        .hero .btn { margin-top: 0; }
        .grid { display: flex; gap: 16px; flex-wrap: wrap; }
        .grid .card { flex: 1 1 240px; margin-bottom: 0; }
        .grid .card h3 { margin: 0 0 8px; font-size: 15px; color: var(--navy); }
        .grid .card p { margin: 0; font-size: 14px; color: var(--muted); line-height: 1.5; }

        /* ---------- Chat ---------- */
        .chat-log {
            background: #fff;
            border: 1px solid var(--border);
            border-top: 3px solid var(--navy);
            border-radius: 4px;
            padding: 14px;
            min-height: 220px;
            max-height: 60vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .bubble {
            max-width: 78%;
            padding: 9px 12px;
            border-radius: 10px;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-wrap;
            word-break: break-word;
        }
        .bubble.user {
            align-self: flex-end;
            background: var(--navy);
            color: #fff;
            border-bottom-right-radius: 3px;
        }
        .bubble.agent {
            align-self: flex-start;
            background: #eef2f7;
            border: 1px solid var(--border);
            color: var(--text);
            border-bottom-left-radius: 3px;
        }
        .bubble.agent a { color: var(--navy); font-weight: 600; }
        .bubble.error { background: #fdeaea; border: 1px solid #f0a8a8; color: #96271f; }
        .bubble .sources { display: block; margin-top: 7px; font-size: 12px; color: var(--muted); }
        .bubble .ticket-link {
            display: inline-block;
            margin-top: 9px;
            padding: 7px 12px;
            background: var(--gold);
            color: var(--navy-dark);
            border-radius: 3px;
            text-decoration: none;
            font-weight: 600;
            font-size: 13px;
        }
        .bubble .ticket-link:hover { background: var(--gold-soft); }
        .typing { display: inline-flex; gap: 5px; align-items: center; padding: 4px 2px; }
        .typing span {
            width: 7px; height: 7px; border-radius: 50%;
            background: var(--navy-soft);
            animation: blink 1.2s infinite ease-in-out both;
        }
        .typing span:nth-child(2) { animation-delay: .2s; }
        .typing span:nth-child(3) { animation-delay: .4s; }
        @keyframes blink { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }

        .chat-form { display: flex; flex-direction: column; }
        .chat-form textarea { resize: vertical; }
        .chat-row { display: flex; gap: 10px; align-items: flex-end; }
        .chat-row textarea { flex: 1; }
        .chat-row button { margin-top: 0; }

        /* ---------- Footer ---------- */
        .site-footer {
            flex-shrink: 0;
            background: var(--navy-dark);
            border-top: 4px solid var(--gold);
            color: #b9cbdc;
            font-size: 13px;
            margin-top: 32px;
        }
        .site-footer .bar {
            max-width: 1000px;
            margin: 0 auto;
            padding: 16px;
            display: flex;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
        }
        .site-footer strong { color: var(--gold-soft); font-weight: 600; }
    </style>
    @yield('head')
</head>
<body>
<header class="site-header">
    <div class="bar">
        <a class="brand" href="{{ route('home') }}">
            <span class="seal">DI</span>
            <span>
                Douane Intelligente
                <span class="sub">Assistance juridique &amp; rendez-vous</span>
            </span>
        </a>
        <nav>
            <a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'active' : '' }}">Accueil</a>
            <a href="{{ route('assistant') }}" class="{{ request()->routeIs('assistant') ? 'active' : '' }}">Assistant</a>
            <a href="{{ route('admin.index') }}" class="{{ request()->routeIs('admin.*') ? 'active' : '' }}">Admin</a>
        </nav>
    </div>
</header>

<main>
    @if (session('success'))
        <div class="flash ok">{{ session('success') }}</div>
    @endif
    @if (session('error'))
        <div class="flash err">{{ session('error') }}</div>
    @endif
    @if ($errors->any())
        <div class="errors">
            <strong>Formulaire invalide :</strong>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    @yield('content')
</main>

<footer class="site-footer">
    <div class="bar">
        <span><strong>Douane Intelligente</strong> — Assistance aux formalités douanières</span>
        <span>Prototype — Hackathon 2026</span>
    </div>
</footer>
@include('components.chat-widget')
</body>
</html>
