// FILE: app.js (stagger text + parallax mai evident pentru scenă)
const page = document.body.getAttribute('data-page') || 'home';

/* Year */
document.addEventListener('DOMContentLoaded', () => {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
});

/* Mobile nav */
(() => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
})();

/* Active nav link */
(() => {
    const navLinks = document.querySelectorAll('.site-nav a[href]');
    navLinks.forEach(a => {
        const href = a.getAttribute('href');
        if (location.pathname.endsWith(href)) a.classList.add('active');
    });
})();

/* Parallax mai vizibil pe grid + blob stage */
(() => {
    const bg = document.getElementById('gridBg');
    const stage = document.getElementById('blobStage');
    if (!bg || !stage) return;

    let gx=0, gy=0, tgx=0, tgy=0, sx=0, sy=0, tsx=0, tsy=0;
    const lerp = (a,b,t)=> a + (b-a)*t;

    const loop = ()=> {
        gx = lerp(gx, tgx, .08);
        gy = lerp(gy, tgy, .08);
        bg.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
        sx = lerp(sx, tsx, .06);
        sy = lerp(sy, tsy, .06);
        stage.style.transform = `translate3d(${sx}px, ${sy}px, 0)`;
        requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', e=>{
        const nx = (e.clientX / innerWidth) - .5;
        const ny = (e.clientY / innerHeight) - .5;
        tgx = nx * 12;  tgy = ny * 12;      // grid
        tsx = nx * -24; tsy = ny * -18;     // blobs – mișcare inversă mai amplă
    }, {passive:true});

    loop();
})();

/* HERO text stagger */
(() => {
    if (page !== 'home') return;
    const hero = document.querySelector('.hero-blob');
    const lines = document.querySelectorAll('#headline .line');
    if (!hero || !lines.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const base = 140; // puțin mai lung
    if (reduced){
        lines.forEach(l => l.classList.add('in'));
        hero.classList.add('ready');
        return;
    }
    lines.forEach((line, i)=> setTimeout(()=> line.classList.add('in'), 100 + i*base));
    setTimeout(()=> hero.classList.add('ready'), 100 + lines.length*base + 140);
})();

/* Liquid Glass tracker — mută highlight-ul după cursor pe .btn / .nav-link(-dark) / .mini */
(() => {
    const els = document.querySelectorAll('.btn, .nav-link, .nav-link-dark, .mini');
    if (!els.length) return;

    els.forEach(el => {
        let raf, mx=0, my=0, tx=0, ty=0;
        const lerp = (a,b,t) => a + (b-a)*t;

        const loop = () => {
            mx = lerp(mx, tx, .22);
            my = lerp(my, ty, .22);
            el.style.setProperty('--mx', `${mx}px`);
            el.style.setProperty('--my', `${my}px`);
            raf = requestAnimationFrame(loop);
        };

        el.addEventListener('pointerenter', e => {
            const r = el.getBoundingClientRect();
            tx = e.clientX - r.left;  ty = e.clientY - r.top;
            if (!raf) raf = requestAnimationFrame(loop);
        });

        el.addEventListener('pointermove', e => {
            const r = el.getBoundingClientRect();
            tx = e.clientX - r.left;  ty = e.clientY - r.top;
        }, {passive:true});

        const stop = () => { cancelAnimationFrame(raf); raf = null; };
        el.addEventListener('pointerleave', stop);
        el.addEventListener('blur', stop);
    });
})();


// FOLLOW GLOW pentru butoane, icon-uri, mini-cards și carduri din portofoliu
// Extinde lista de ținte
(function attachFollowGlow(){
    const targets = document.querySelectorAll('.glass-btn, .glass-icon, .mini, .p-card, .plan-card, .track-card, .todo-item');
    if (!targets.length) return;
    const set = (el, clientX, clientY) => {
        const r = el.getBoundingClientRect();
        const x = ((clientX - r.left) / r.width) * 100;
        const y = ((clientY - r.top)  / r.height) * 100;
        el.style.setProperty('--mx', x.toFixed(2) + '%');
        el.style.setProperty('--my', y.toFixed(2) + '%');
    };
    targets.forEach(el => {
        el.addEventListener('mousemove', e => set(el, e.clientX, e.clientY));
        el.addEventListener('mouseleave', () => { el.style.setProperty('--mx','50%'); el.style.setProperty('--my','50%'); });
        el.addEventListener('touchmove', e => { const t=e.touches[0]; if(!t) return; set(el,t.clientX,t.clientY); }, {passive:true});
    });
})();

/* ===== Tracker logic ===== */
(function trackerInit(){
    if (document.body.getAttribute('data-page') !== 'tracker') return;

    const codeInput = document.getElementById('codeInput');
    const checkBtn  = document.getElementById('checkBtn');
    const pasteBtn  = document.getElementById('pasteBtn');
    const pf        = document.getElementById('pf');
    const pcent     = document.getElementById('pcent');
    const stagesEl  = document.getElementById('stages');
    const todoPanel = document.getElementById('todoPanel');
    const todoList  = document.getElementById('todoList');

    // mici utilitare
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    const hashToPercent = (str) => {
        if (!str) return 0;
        let h = 0;
        for (let i = 0; i < str.length; i++) { h = ((h << 5) - h) + str.charCodeAt(i); h |= 0; }
        const p = Math.abs(h) % 76 + 20;           // 20..95
        return clamp(p, 20, 95);
    };

    const STAGES = ['Briefing', 'Wireframe', 'Design', 'Content', 'Dezvoltare', 'QA', 'Lansare'];

    function renderStages(percent){
        stagesEl.innerHTML = '';
        const idxNow = Math.floor((percent / 100) * (STAGES.length - 1));
        STAGES.forEach((name, i) => {
            const pill = document.createElement('div');
            pill.className = 'stage';
            pill.dataset.state = i < idxNow ? 'done' : (i === idxNow ? 'now' : 'todo');
            pill.textContent = name;
            stagesEl.appendChild(pill);
        });
    }

    // To-Do preset (îl poți edita după gust)
    function buildTodos(percent){
        const groups = [
            { t:'Kickoff & obiective', n:'Call de aliniere, definim conversiile și KPI.' },
            { t:'Sitemap & wireframe', n:'Flow pagini, structură secțiuni, CTA-uri.' },
            { t:'Design vizual', n:'Hero, tipografie, culori, sticlă & motion.' },
            { t:'Content & asset-uri', n:'Texte, imagini, logo-uri, iconografie.' },
            { t:'Implementare', n:'HTML/CSS/JS, animații, optimizare performanță.' },
            { t:'QA & fixuri', n:'Cross-browser, mobil, accesibilitate, SEO de bază.' },
            { t:'Lansare', n:'Deploy, tracking GA4, handover & training.' },
        ];
        // marchează câteva ca “făcute” în funcție de procent
        const doneCount = Math.floor((percent / 100) * (groups.length - 1));
        todoList.innerHTML = '';
        groups.forEach((g, i) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
        <input type="checkbox" ${i < doneCount ? 'checked' : ''} aria-label="Marchează '${g.t}' ca făcut">
        <div>
          <p class="t-title">${g.t}</p>
          <p class="t-note">${g.n}</p>
        </div>
      `;
            todoList.appendChild(li);
            // stagger in
            setTimeout(() => li.classList.add('in'), 100 + i * 70);
        });
    }

    function animateFill(to){
        // reset width pentru o nouă animație
        pf.style.transition = 'none';
        pf.style.width = '0%';
        void pf.offsetWidth; // reflow
        pf.style.transition = 'width 1s ease';
        pf.style.width = to + '%';
    }

    async function handleCheck(){
        const code = codeInput.value.trim();
        if (!code) { codeInput.focus(); return; }

        // (aici poți face fetch la API-ul tău când e gata)
        // Simulam “verificare” rapidă:
        const percent = hashToPercent(code);

        animateFill(percent);
        pcent.textContent = percent + '%';
        renderStages(percent);

        // afișează To-Do cu animație
        todoPanel.classList.remove('show');
        // mic delay pentru senzație de “apare după ce s-a umplut”
        setTimeout(() => {
            buildTodos(percent);
            todoPanel.classList.add('show');
        }, 650);
    }

    checkBtn.addEventListener('click', handleCheck);
    codeInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleCheck(); });

    // Pastrează din clipboard (unde e permis)
    pasteBtn.addEventListener('click', async () => {
        try{
            const txt = await navigator.clipboard.readText();
            if (txt) { codeInput.value = txt.trim(); handleCheck(); }
        }catch(_){}
    });

    // auto-run dacă avem ?code= în URL
    const params = new URLSearchParams(location.search);
    if (params.get('code')) { codeInput.value = params.get('code'); handleCheck(); }
})();

/* ===== Contact page: reveal form ===== */
(function contactReveal(){
    if (document.body.getAttribute('data-page') !== 'contact') return;
    const btn = document.getElementById('startContact');
    const reveal = document.getElementById('contactReveal');
    const card = document.getElementById('contactCard');
    const form = document.getElementById('contactForm');

    const show = () => {
        btn.setAttribute('aria-expanded','true');
        reveal.setAttribute('aria-hidden','false');
        reveal.classList.add('show');
        // dăm un mic delay ca să activeze tranzițiile inner
        setTimeout(() => {
            card.classList.add('in');
            // focus pe primul câmp
            const first = form.querySelector('input,select,textarea');
            if (first) first.focus({preventScroll:true});
            // scroll ușor către formular
            card.scrollIntoView({behavior:'smooth', block:'start'});
        }, 60);
    };

    btn.addEventListener('click', show);
})();

/* ===== Extend Follow Glow targets cu .contact-card ===== */
(function extendGlow(){
    const existing = document.querySelectorAll('.contact-card');
    if (!existing.length) return;
    const set = (el, clientX, clientY) => {
        const r = el.getBoundingClientRect();
        const x = ((clientX - r.left) / r.width) * 100;
        const y = ((clientY - r.top)  / r.height) * 100;
        el.style.setProperty('--mx', x.toFixed(2) + '%');
        el.style.setProperty('--my', y.toFixed(2) + '%');
    };
    existing.forEach(el => {
        el.addEventListener('mousemove', e => set(el, e.clientX, e.clientY));
        el.addEventListener('mouseleave', () => { el.style.setProperty('--mx','50%'); el.style.setProperty('--my','50%'); });
        el.addEventListener('touchmove', e => { const t=e.touches[0]; if(!t) return; set(el, t.clientX, t.clientY); }, {passive:true});
    });
})();

/* ===== Optional: prevent default submit (până ai backend) ===== */
(function interceptContactSubmit(){
    if (document.body.getAttribute('data-page') !== 'contact') return;
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // aici poți integra un endpoint real; momentan doar feedback scurt:
        const btn = form.querySelector('button[type="submit"]');
        const label = btn.textContent;
        btn.disabled = true; btn.textContent = 'Trimis ✓';
        setTimeout(() => { btn.disabled = false; btn.textContent = label; }, 1800);
    });
})();


/* ===== Enhance all <select.glass-select> into Glass Dropdowns ===== */
(function enhanceAllGlassSelects(){
    const selects = document.querySelectorAll('select.glass-select');
    if (!selects.length) return;

    selects.forEach(select => enhanceGlassSelect(select));

    function enhanceGlassSelect(select){
        // wrapper
        const wrap = document.createElement('div');
        wrap.className = 'glass-dd';
        // trigger
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dd-trigger';
        btn.setAttribute('aria-haspopup', 'listbox');
        btn.setAttribute('aria-expanded', 'false');
        const currentText = select.options[select.selectedIndex]?.text || 'Alege';
        btn.innerHTML =
            `<span class="dd-label">${currentText}</span>
       <svg class="dd-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;

        // menu
        const menu = document.createElement('div');
        menu.className = 'dd-menu';
        menu.setAttribute('role', 'listbox');
        menu.tabIndex = -1;

        // options
        [...select.options].forEach((opt, i) => {
            const o = document.createElement('div');
            o.className = 'dd-option';
            o.setAttribute('role', 'option');
            o.dataset.value = opt.value;
            o.textContent = opt.text;
            if (i === select.selectedIndex) o.setAttribute('aria-selected', 'true');
            menu.appendChild(o);
        });

        // inject
        select.parentNode.insertBefore(wrap, select);
        wrap.appendChild(select);
        wrap.appendChild(btn);
        wrap.appendChild(menu);

        // state
        let open = false;
        let hoverIdx = select.selectedIndex;

        const setGlow = (e) => {
            const r = menu.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top)  / r.height) * 100;
            menu.style.setProperty('--mx', x.toFixed(2) + '%');
            menu.style.setProperty('--my', y.toFixed(2) + '%');
        };

        function openMenu(){
            if (open) return;
            open = true;
            wrap.classList.add('open');
            btn.setAttribute('aria-expanded','true');
            menu.classList.add('open');
            menu.focus();
            highlight(hoverIdx);
        }
        function closeMenu(){
            if (!open) return;
            open = false;
            wrap.classList.remove('open');
            btn.setAttribute('aria-expanded','false');
            menu.classList.remove('open');
        }
        function selectOption(item){
            const val = item.dataset.value;
            const txt = item.textContent;
            select.value = val;
            btn.querySelector('.dd-label').textContent = txt;
            menu.querySelectorAll('.dd-option[aria-selected="true"]').forEach(el=>el.removeAttribute('aria-selected'));
            item.setAttribute('aria-selected','true');
            select.dispatchEvent(new Event('change', {bubbles:true}));
            hoverIdx = [...menu.children].indexOf(item);
            closeMenu();
            btn.focus();
        }
        function highlight(i){
            const opts = [...menu.children];
            if (!opts.length) return;
            hoverIdx = Math.max(0, Math.min(opts.length-1, i));
            opts.forEach((el, idx) => el.classList.toggle('hover', idx === hoverIdx));
            opts[hoverIdx].scrollIntoView({block:'nearest'});
        }

        // events
        btn.addEventListener('click', () => open ? closeMenu() : openMenu());
        document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) closeMenu(); });
        menu.addEventListener('mousemove', setGlow);
        menu.addEventListener('mouseleave', () => { menu.style.removeProperty('--mx'); menu.style.removeProperty('--my'); });

        menu.addEventListener('click', (e) => {
            const item = e.target.closest('.dd-option'); if (!item) return;
            selectOption(item);
        });

        menu.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown'){ e.preventDefault(); highlight(hoverIdx+1); }
            else if (e.key === 'ArrowUp'){ e.preventDefault(); highlight(hoverIdx-1); }
            else if (e.key === 'Enter'){ e.preventDefault(); const item = menu.children[hoverIdx]; if (item) selectOption(item); }
            else if (e.key === 'Escape'){ e.preventDefault(); closeMenu(); btn.focus(); }
            else if (e.key === 'Home'){ e.preventDefault(); highlight(0); }
            else if (e.key === 'End'){ e.preventDefault(); highlight(menu.children.length-1); }
        });
    }
})();

(function presetPackageFromQuery(){
    if (document.body.dataset.page !== 'contact') return;
    const params = new URLSearchParams(location.search);
    const pkg = params.get('package');
    if (!pkg) return;
    const select = document.getElementById('package');
    const opt = [...select.options].find(o => o.text.toLowerCase() === pkg.toLowerCase());
    if (opt){ select.value = opt.value; select.dispatchEvent(new Event('change',{bubbles:true})); }
})();

/* ===== Page Transition: fade + motion-blur on enter/leave ===== */
(function pageTransitions(){
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // creez overlay-ul; nu trebuie să-l pui în HTML
    const fx = document.createElement('div');
    fx.className = 'page-xfade';
    fx.setAttribute('aria-hidden','true');
    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(fx);
        // ENTRANCE: după un frame îl ascundem = fade-in către pagină
        requestAnimationFrame(() => fx.classList.add('hide'));
    });

    const DURATION = 420; // ținut în sync cu --xfade-dur

    // helper: e link intern și navigăm în același tab?
    const isInternal = (a) => {
        const url = new URL(a.href, location.href);
        const sameOrigin = url.origin === location.origin;
        const hashOnly   = url.pathname === location.pathname && url.hash && !url.search;
        const newTab     = a.target === '_blank' || a.hasAttribute('download');
        return sameOrigin && !hashOnly && !newTab;
    };

    // rulează OUTRO și apoi navighează
    const go = (href) => {
        fx.classList.remove('hide');               // arăt overlay-ul (fade-out pagina)
        setTimeout(() => { location.href = href; }, DURATION - 20);
    };

    // Interceptăm clickurile pe linkuri
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href]');
        if (!a) return;
        // lasă Ctrl/Meta pentru “deschide în tab nou”
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (!isInternal(a)) return;
        e.preventDefault();
        go(a.href);
    });

    // Interceptăm submit-urile de formulare (în același tab)
    document.addEventListener('submit', (e) => {
        const f = e.target;
        if (f.target && f.target !== '_self') return;
        // dacă ai un submit AJAX, poți elimina secțiunea asta
        fx.classList.remove('hide');
    }, true);

    // La back/forward din bfcache: rulăm iar ENTER
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            fx.classList.remove('hide'); // vizibil
            requestAnimationFrame(() => fx.classList.add('hide')); // și se estompează
        }
    });

    // “leaving site” (close/tab change) – încercăm un mic fade-out
    window.addEventListener('pagehide', () => { fx.classList.remove('hide'); });
})();

(function dottedParallax(){
    if (document.body.dataset.page !== 'home') return;
    const tl = document.querySelector('.hero-blob .dots-tl');
    const br = document.querySelector('.hero-blob .dots-br');
    if (!tl || !br) return;

    let y = 0;
    const onScroll = () => {
        const s = window.scrollY || 0;
        // mișcări opuse, foarte mici
        tl.style.transform = `translate3d(${s * 0.02}px, ${s * 0.03}px, 0)`;
        br.style.transform = `translate3d(${-s * 0.02}px, ${-s * 0.03}px, 0)`;
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
})();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".p-card img").forEach(img => {
        if (img.complete) {
            img.closest(".p-card").classList.remove("loading");
        } else {
            img.addEventListener("load", () => {
                img.closest(".p-card").classList.remove("loading");
            });
            img.addEventListener("error", () => {
                img.closest(".p-card").classList.remove("loading");
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const mm = (q) => window.matchMedia && window.matchMedia(q).matches;

    // Heuristici pentru mod "lite"
    const isMobile = mm('(max-width: 768px)') || navigator.userAgent.toLowerCase().includes('mobile');
    const saveData = (navigator.connection && navigator.connection.saveData) || false;
    const dprHigh = window.devicePixelRatio && window.devicePixelRatio > 2.5; // ecrane foarte dense
    const prefersReduce = mm('(prefers-reduced-motion: reduce)');

    if (isMobile || saveData || dprHigh || prefersReduce) {
        document.body.classList.add('is-lite');
    }

    // Evită listeners grele pe touch (ex. “follow glow” pe mouse)
    const isCoarse = mm('(pointer: coarse)');
    if (isCoarse) {
        // Dacă ai cod de mousemove pentru glow-uri / trackere, oprește-l aici.
        // Exemplu:
        // window.removeEventListener('mousemove', handleMouseGlow, {passive:true});
    }

    // Pausăm animatiile când tab-ul pierde focus (free FPS & baterie)
    const togglePause = () => {
        if (document.hidden) document.body.classList.add('is-paused');
        else document.body.classList.remove('is-paused');
    };
    document.addEventListener('visibilitychange', togglePause, { passive: true });

    // (Opțional) încărcăm scena de blobs doar după prima interacțiune (reduce jank la load)
    let blobsArmed = false;
    const armBlobs = () => {
        if (blobsArmed) return;
        blobsArmed = true;
        document.querySelector('.hero-blob')?.classList.add('ready'); // dacă folosești această clasă
        window.removeEventListener('scroll', armBlobs);
        window.removeEventListener('pointerdown', armBlobs);
    };
    window.addEventListener('scroll', armBlobs, { passive: true });
    window.addEventListener('pointerdown', armBlobs, { passive: true });

    // Siguranță: dacă nu există interacțiune, armăm oricum după 1.2s
    setTimeout(armBlobs, 1200);
});
