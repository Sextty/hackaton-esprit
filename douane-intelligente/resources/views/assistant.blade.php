@extends('layout')

@section('title', 'Assistant — Douane Intelligente')

@section('content')
    <h1>Assistant douanier</h1>
    <p class="muted">
        Posez une question sur la législation douanière ou demandez un rendez-vous.
        L'agent répond uniquement à partir des textes disponibles et cite ses références.
    </p>

    <div class="chat-log" id="chat-log" role="log" aria-live="polite">
        <div class="bubble agent" id="chat-welcome">
            Bonjour, je suis l'assistant douanier. Comment puis-je vous aider aujourd'hui ?
        </div>
    </div>

    <form class="card chat-form" id="chat-form">
        <label for="chat-input">Votre message</label>
        <div class="chat-row">
            <textarea id="chat-input" rows="2"
                      placeholder="Ex : Quels documents pour une importation ?" required></textarea>
            <button type="submit" id="chat-send">Envoyer</button>
        </div>
        <p class="muted" style="margin-bottom:0;">Historique conservé pendant la session en cours uniquement.</p>
    </form>

    <script>
        (function () {
            const log = document.getElementById('chat-log');
            const form = document.getElementById('chat-form');
            const input = document.getElementById('chat-input');
            const send = document.getElementById('chat-send');
            const CHAT_URL = @json(route('agent.chat'));

            const history = [];

            function escapeHtml(text) {
                return text.replace(/[&<>"']/g, function (c) {
                    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
                });
            }

            function linkify(text) {
                return escapeHtml(text).replace(/(?:https?:\/\/|\/)[^\s<>"']+/gi, function (url) {
                    const href = url.charAt(0) === '/' ? window.location.origin + url : url;
                    return '<a href="' + href + '" target="_blank" rel="noopener">' + url + '</a>';
                });
            }

            function scrollDown() {
                log.scrollTop = log.scrollHeight;
            }

            function addBubble(role, html, extraClass) {
                const div = document.createElement('div');
                div.className = 'bubble ' + role + (extraClass ? ' ' + extraClass : '');
                div.innerHTML = html;
                log.appendChild(div);
                scrollDown();
                return div;
            }

            function addTyping() {
                return addBubble('agent',
                    '<span class="typing"><span></span><span></span><span></span></span>',
                    'is-typing');
            }

            function renderReply(bubble, data) {
                const reply = data.reply || data.error || 'Réponse indisponible.';
                let html = linkify(reply);

                if (Array.isArray(data.sources) && data.sources.length) {
                    html += '<span class="sources">Références : ' +
                        data.sources.map(escapeHtml).join(' · ') + '</span>';
                }

                if (data.ticket_url) {
                    html += '<a class="ticket-link" href="' + escapeHtml(data.ticket_url) +
                        '" target="_blank" rel="noopener">Voir mon ticket de rendez-vous</a>';
                }

                bubble.classList.remove('is-typing');
                bubble.innerHTML = html;
                scrollDown();
            }

            form.addEventListener('submit', async function (event) {
                event.preventDefault();

                const message = input.value.trim();
                if (!message || send.disabled) return;

                addBubble('user', escapeHtml(message));
                history.push({ role: 'user', content: message });
                input.value = '';
                send.disabled = true;

                const pending = addTyping();

                try {
                    const res = await fetch(CHAT_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        body: JSON.stringify({ message: message, history: history }),
                    });

                    const data = await res.json().catch(function () { return {}; });

                    if (!res.ok) {
                        const detail = data.message
                            || (data.errors ? Object.values(data.errors).flat().join(' ') : null);
                        throw new Error(detail || 'Erreur serveur (' + res.status + ').');
                    }

                    renderReply(pending, data);

                    const reply = data.reply || '';
                    history.push({ role: 'assistant', content: reply });
                } catch (err) {
                    pending.classList.remove('is-typing');
                    pending.classList.add('error');
                    pending.textContent = err.message
                        || 'Erreur réseau — le service est-il démarré ?';
                    scrollDown();
                } finally {
                    send.disabled = false;
                    input.focus();
                }
            });

            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    form.requestSubmit();
                }
            });
        })();
    </script>
@endsection
