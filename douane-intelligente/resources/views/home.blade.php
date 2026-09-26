@extends('layout')

@section('title', 'Accueil — Douane Intelligente')

@section('content')
    <section class="hero">
        <h1>Douane Intelligente</h1>
        <p class="lead">
            Un prototype d'assistance aux usagers des douanes : posez vos questions sur la
            législation douanière à notre assistant, qui répond <strong>uniquement à partir des
            textes officiels</strong> et cite ses références.
        </p>
        <p class="lead">
            Besoin d'un passage au guichet ? L'assistant peut également vous orienter vers un
            rendez-vous et vous délivrer un ticket.
        </p>
        <div class="actions">
            <a class="btn btn-gold btn-lg" href="{{ route('assistant') }}">Ouvrir l'assistant</a>
            <a class="btn btn-lg" href="{{ route('admin.index') }}">Espace administration</a>
        </div>
    </section>

    <div class="grid">
        <div class="card">
            <h3>Réponses sourcées</h3>
            <p>L'agent consulte la base de textes douaniers et renvoie la référence légale utilisée à chaque réponse.</p>
        </div>
        <div class="card">
            <h3>Prise de rendez-vous</h3>
            <p>Depuis la conversation, réservez un créneau dans un bureau de douane et récupérez votre ticket.</p>
        </div>
        <div class="card">
            <h3>Suivi en un clic</h3>
            <p>Chaque réservation possède une référence unique permettant de consulter ou télécharger le ticket.</p>
        </div>
    </div>
@endsection
