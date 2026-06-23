// ──────────────────────────────────────────────
//  Le Prénom — Réservation
//
//  Pour activer la réservation en ligne plus tard :
//  renseignez simplement RESERVATION_URL ci-dessous
//  (lien Tableo, TheFork, Zenchef, etc.).
//  - Si l'URL est vide  → fenêtre « bientôt disponible » + téléphone.
//  - Si l'URL est définie → la réservation s'ouvre dans une fenêtre intégrée.
// ──────────────────────────────────────────────
// Filet de sécurité — révélations au scroll.
// Les animations (clip-path, opacité…) reposent sur des TRANSITIONS qui ne progressent
// que si l'onglet peint. En arrière-plan / rendu gelé, une transition resterait bloquée
// sur l'état masqué. On force alors l'état final SANS transition (classe html.reveal-now),
// pour qu'aucune image ni aucun texte ne reste jamais invisible.
(function () {
    const forceShow = () => document.documentElement.classList.add('reveal-now');
    // Onglet non peint (arrière-plan) ou navigateur sans IntersectionObserver → affichage direct.
    if (!('IntersectionObserver' in window) || document.visibilityState !== 'visible') {
        forceShow();
    }
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState !== 'visible') forceShow();
    });
    // Contrôle de bonne santé : si un élément DÉJÀ visible à l'écran n'a pas été révélé
    // par l'IntersectionObserver après un court délai, c'est que les animations ne tournent
    // pas (onglet bridé / aperçu) → on force l'affichage complet, sans transition.
    // En vrai navigateur au premier plan, l'observer révèle à temps → animations préservées.
    setTimeout(function () {
        if (document.documentElement.classList.contains('reveal-now')) return;
        var els = document.querySelectorAll('.reveal, .img-reveal, .fade-up, .mask-reveal');
        for (var i = 0; i < els.length; i++) {
            var r = els[i].getBoundingClientRect();
            if (r.top < window.innerHeight * 0.9 && r.bottom > 0) { // dans le viewport
                if (!els[i].classList.contains('visible')) forceShow();
                return;
            }
        }
    }, 900);
})();

// Masque le bouton flottant « Réserver » quand le pied de page est visible
// (évite qu'il recouvre les mentions du bas de page).
(function () {
    const fab = document.querySelector('.reserve-fab');
    const footer = document.querySelector('.footer');
    if (!fab || !footer || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { fab.classList.toggle('fab-hidden', e.isIntersecting); });
    }, { rootMargin: '0px 0px -60px 0px' }).observe(footer);
})();

(function () {
    const RESERVATION_URL = ''; // ← coller ici le lien de la plateforme le moment venu
    const PHONE_DISPLAY = '07 67 25 20 31';
    const PHONE_TEL = '+33767252031';

    const modal = document.createElement('div');
    modal.className = 'reservation-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Réserver une table');

    if (RESERVATION_URL) {
        // Mode plateforme : iframe intégrée
        modal.innerHTML = `
            <div class="reservation-modal-card iframe-mode" role="document">
                <button class="reservation-modal-close" aria-label="Fermer">✕</button>
                <div class="reservation-modal-iframe-wrap"></div>
            </div>`;
    } else {
        // Mode « bientôt disponible » + téléphone
        modal.innerHTML = `
            <div class="reservation-modal-card" role="document">
                <button class="reservation-modal-close" aria-label="Fermer">✕</button>
                <img class="reservation-modal-logo" src="assets/logo-color.png" alt="Le Prénom">
                <h2 class="reservation-modal-title">Réserver une table</h2>
                <p class="reservation-modal-text">
                    La réservation en ligne arrive très bientôt.<br>
                    En attendant, appelez-nous — on vous accueille par votre prénom.
                </p>
                <a class="reservation-modal-phone" href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>
                <div><a class="btn" href="tel:${PHONE_TEL}">Appeler le restaurant</a></div>
            </div>`;
    }
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.reservation-modal-close');
    let iframeLoaded = false;

    function openModal() {
        if (RESERVATION_URL && !iframeLoaded) {
            const wrap = modal.querySelector('.reservation-modal-iframe-wrap');
            const iframe = document.createElement('iframe');
            iframe.src = RESERVATION_URL;
            iframe.setAttribute('title', 'Réservation Le Prénom');
            iframe.setAttribute('referrerpolicy', 'unsafe-url');
            wrap.appendChild(iframe);
            iframeLoaded = true;
        }
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    function attachHandlers() {
        const triggers = document.querySelectorAll('a[data-reserve], a.btn-reserve, a[href="#reserver"]');
        triggers.forEach(link => {
            if (link.dataset.reserveAttached) return;
            link.dataset.reserveAttached = '1';
            link.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachHandlers);
    } else {
        attachHandlers();
    }
})();
