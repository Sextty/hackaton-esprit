{{--
  Lien d'accès flottant vers l'assistant - "Douane Intelligente"
  --------------------------------------------------------------
  Inclus une seule fois dans le layout principal, juste avant </body> :
      @include('components.chat-widget')
  (resources/views/components/chat-widget.blade.php)

  Ce n'est plus un widget inline : le bouton est devenu un simple lien
  <a href="{{ route('assistant') }}" target="_blank" rel="noopener">
  qui ouvre la page GET /assistant (route nommée "assistant",
  routes/web.php:11) dans un nouvel onglet.

  Aucun panneau, aucun JavaScript : plus de listener de clic, donc plus
  de risque de querySelector() retournant null.

  Classes Tailwind, icône SVG et style visuel identiques à l'ancien
  <button>. Le layout ne charge ni Vite ni Tailwind (CSS 100 % inline),
  d'où le bloc <style> scopé sous #douane-chat-root qui assure le
  rendu du bouton sur toutes les pages (aucun build requis).
--}}

<style>
    /* ---- Bouton flottant (identique à l'ancien <button>) ---- */
    #douane-chat-root #douane-chat-toggle {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 9999;
        width: 48px;
        height: 48px;
        border-radius: 9999px;
        background: #003087;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(200, 169, 81, .4);
        box-shadow: 0 4px 12px rgba(0, 48, 135, .4);
        transition: all .2s;
        text-decoration: none;
    }

    #douane-chat-root #douane-chat-toggle:hover {
        background: #002266;
        transform: scale(1.05);
    }

    #douane-chat-root #douane-chat-toggle:focus-visible {
        outline: 2px solid #C8A951;
        outline-offset: 2px;
    }

    #douane-chat-root #douane-chat-toggle svg {
        display: block;
        width: 24px;
        height: 24px;
    }
</style>

<div id="douane-chat-root">
  {{-- Lien flottant vers /assistant (remplace l'ancien bouton de widget) --}}
  <a
    id="douane-chat-toggle"
    href="{{ route('assistant') }}"
    target="_blank"
    rel="noopener"
    class="w-12 h-12 rounded-full bg-[#003087] hover:bg-[#002266] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,48,135,0.4)] hover:scale-105 transition-all duration-200 cursor-pointer border border-[#C8A951]/40 fixed bottom-6 right-6 z-[9999]"
    title="Assistance &amp; Support Douane"
    aria-label="Ouvrir l'assistant Douane"
  >
    <svg id="douane-chat-icon-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-text w-6 h-6 text-white" aria-hidden="true">
      <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
      <path d="M7 11h10"></path>
      <path d="M7 15h6"></path>
      <path d="M7 7h8"></path>
    </svg>
  </a>
</div>
