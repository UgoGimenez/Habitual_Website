/* habitual — home page interactions. No dependencies. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  /* ---------------------------------------------------------
     Content
     --------------------------------------------------------- */
  const ES = {
    tagline: 'Baño seco ecológico',
    navField: 'En el territorio', navModels: 'Modelos', navBuild: 'Cómo se arma', navUse: 'Cómo funciona', navStory: 'Historia', navFaq: 'Preguntas', navContact: 'Hablemos', navContactPage: 'Contacto',
    showPhotos: 'Ver las fotos',
    heroKicker: 'Saneamiento sin agua · Diseñado en Argentina',
    heroTitle: 'Dignidad,<br><em>sin caños</em><br>de por medio.',
    heroSub: 'Baños secos que viajan en plano, para zonas de desastre, comunidades remotas y donde sea que la cloaca no llega. Sin agua. Sin electricidad. Armados en menos de 30 minutos.',
    heroPhotos: 'Velo en acción', heroPilot: 'Pedí un piloto',
    stat1: 'litros de agua por uso', stat2: 'para armar un Mini', stat3: 'unidades en uso diario', stat4: 'países hasta ahora',
    ideaKicker: '01 — La idea',
    ideaTitle: 'Cuando la infraestructura falla, <em>la gente igual necesita un baño.</em>',
    ideaLead: 'Inundaciones, terremotos, campamentos, festivales, refugios de montaña. El saneamiento suele ser lo primero que se rompe y lo último que llega. habitual lo lleva con vos, en una caja.',
    sticker: 'Listo<br>para todo<b>✳</b>',
    p1: 'Sin cloaca.', p1d: 'Nada que cavar, conectar ni bombear. Se sostiene solo donde lo apoyes.',
    p2: 'Sin agua.', p2d: 'Un asiento separador y un puñado de aserrín reemplazan la descarga, y el olor.',
    p3: 'Sin desperdicio.', p3d: 'Lo que entra se convierte en compost y fertilizante, no en aguas negras.',
    fieldKicker: '02 — Bitácora de campo',
    fieldTitle: 'De la montaña <em>a la terraza.</em>',
    fieldLead: 'Unidades reales, lugares reales, clima real. Deslizá para ver por dónde ya anduvo habitual.',
    mar24: 'Mar 2024', jul23: 'Jul 2023', sep23: 'Sep 2023', cordobaCity: 'Córdoba Capital',
    log1: 'Al servicio de un refugio de montaña.', log2: 'Niebla, viento, altura. Siempre en pie.', log3: 'Negro divino, en pleno monte.', log4: 'El Mini en un encuentro al aire libre.', log5: 'Un baño en el patio, para cuando viene gente.', log6: 'Una terraza en pleno centro.', log7: 'Encendido al atardecer.',
    logEnd: 'Tu lugar puede ser el próximo.', logEndCta: 'Empezá un piloto',
    modelsKicker: '03 — Los modelos', modelsTitle: 'Una idea. <em>Dos escalas.</em>',
    miniTag: 'Llega a donde sea. No deja nada atrás.', jardinTag: 'Para quedarse. Con todo incluido.',
    miniKicker: 'Despliegue rápido', miniDesc: 'Un baño seco liviano que viaja en plano, para emergencias, misiones humanitarias y campamentos fuera de la red. Una persona, sin herramientas, menos de 30 minutos.',
    specSetup: 'Armado', specWeight: 'Peso', specShips: 'Envío', flat: 'En plano',
    mini1: 'Se arma sin herramientas', mini2: 'Techo en arco de polipropileno, resistente al clima', mini3: 'Para uso temporal o rotativo',
    colors: 'Colores', miniCta: 'Conocé el Mini',
    jardinKicker: 'Instalación completa', jardinDesc: 'Un sanitario exterior completo, con lavamanos interior, techo galvanizado y energía solar opcional. Para sitios permanentes o semipermanentes.',
    specBuild: 'Fabricación', toOrder: 'A pedido', specPower: 'Solar', solar: 'Opcional', specSink: 'Lavamanos', included: 'Incluido',
    jar1: 'Madera con terminaciones en acero galvanizado', jar2: 'Acceso trasero sellado a la cámara de compost', jar3: 'Luz solar y carga USB opcionales', jardinCta: 'Pedí presupuesto',
    buildKicker: '04 — De plano a terminado', buildTitle: 'Seis paneles. <em>Una persona.</em>', buildHint: 'Seguí bajando para armarlo ↓',
    breatherTitle: 'Entra en una camioneta. <em>Funciona en la montaña.</em>',
    breatherSub: 'Si llega una camioneta, un bote o un par de manos, llega habitual.',
    useKicker: '05 — Cómo funciona', useTitle: 'Más simple que <em>tirar la cadena.</em>',
    u1: 'Usalo como cualquier inodoro.', u1d: 'Mismo asiento, misma posición para todos. El separador mantiene aparte la orina y los sólidos: nada fermenta y nada huele.',
    u2: 'Cubrí con un vaso.', u2d: 'Agregá unos 250 ml de aserrín, ceniza, tierra seca o cáscara de arroz. Absorbe la humedad y neutraliza el olor.',
    u3: 'Cerrá y dejá reposar.', u3d: 'Cuando el contenedor se llena, cerralo herméticamente desde atrás y dejalo reposar al menos seis meses.', u3t: '6 meses',
    u4: 'De vuelta a la tierra.', u4d: 'Tras unos 24 meses en un compostador cerrado se convierte en humus para la huerta. La orina diluida sirve como fertilizante líquido.', u4t: '24 meses',
    wallKicker: '06 — Fotos', wallTitle: 'Sin renders. <em>Solo lo real.</em>', wallPlay: 'Ver todas las fotos',
    storyKicker: '07 — Nuestra historia', storyTitle: 'Nacido en Córdoba. <em>Hecho para cualquier lugar.</em>',
    storyLead: 'Fundado por Marcos y Hugo, habitual creció a la manera lenta: prototipos, clientes reales y cada aprendizaje del territorio aplicado a la siguiente unidad.',
    t1: 'Una idea simple: una respuesta sustentable a la falta de saneamiento, empezando en Argentina.',
    t2: 'Se construye y se vende el primer prototipo Jardín. Lo aprendido en el uso da origen al Mini.',
    t3: 'El Mini recorre eventos, patios y terrazas de Córdoba, y cruza a Uruguay.',
    t4: 'Más de diez unidades en uso diario, hasta un refugio en el Cerro Champaquí. El equipo se muda a España y Suiza.',
    t5: 'Una nueva misión: saneamiento seguro para ONG y gobiernos en zonas de desastre, campamentos de refugiados y comunidades remotas.',
    faqKicker: '08 — Buenas preguntas', faqTitle: '¿Dudas? <em>Bien.</em>', faqAll: 'Todas las preguntas →',
    q1: '¿Tiene olor?', a1: 'No. El olor aparece solo cuando se mezclan la orina y los sólidos. El separador los mantiene aparte y el material absorbente se encarga del resto.',
    q2: '¿Necesita agua o electricidad?', a2: 'No. Funciona totalmente fuera de la red: sin cañerías, sin cloaca y sin energía. El Mini llega en plano y se arma en minutos.',
    q3: '¿Es higiénico?', a3: 'Sí. Solo tocás el asiento, como en cualquier inodoro. Los contenedores son herméticos y no pierden, así que se pueden trasladar sin derrames.',
    q4: '¿Se ven los residuos?', a4: 'No. El contenedor es negro y la luz no llega. Como el papel y el absorbente van al final, solo se ve el material de cobertura.',
    q5: '¿Necesito un permiso de obra?', a5: 'En general no, para modelos exteriores: el sistema no genera lixiviados ni aguas negras. Igual conviene consultar con tu municipio.',
    q6: '¿Cómo hago un pedido o pido precio?', a6: 'Escribinos abajo o llamanos. Cotizamos según cantidad y lugar de entrega.',
    contactKicker: '¿Tenés un lugar en mente?', contactTitle: 'Pongamos la dignidad <em>en el mapa.</em>',
    contactLead: 'Contanos sobre el lugar, la gente y el desafío. Respondemos en 48 horas.',
    fName: 'Nombre', fOrg: 'Organización', fEmail: 'Email', fPhone: 'Teléfono', fMsg: 'Mensaje', fSend: 'Enviar mensaje',
    footerLine: 'Diseñado en Argentina, hecho para cualquier lugar.',
    dockPhotos: 'Fotos', dockContact: 'Contacto',
    storiesHint: 'Tocá para avanzar · mantené para pausar'
  };
  const UI = {
    en: { sending: 'Sending…', sent: 'Thanks! We’ll get back to you within 48 hours.', failed: 'Something went wrong. Please call us or try again.', of: 'of', langLabel: 'Cambiar a español' },
    es: { sending: 'Enviando…', sent: '¡Gracias! Te respondemos dentro de las 48 horas.', failed: 'Algo salió mal. Llamanos o probá de nuevo.', of: 'de', langLabel: 'Switch to English' }
  };

  const STEPS = [
    { en: ['Lay the base.', 'Everything starts flat. The base panel sets the footprint on almost any ground.'], es: ['Apoyá la base.', 'Todo empieza en plano. La base define el espacio sobre casi cualquier terreno.'] },
    { en: ['Drop in the seat.', 'The seat box and urine-diverting separator: the heart of the waterless system.'], es: ['Colocá el asiento.', 'La caja del asiento y el separador de orina: el corazón del sistema sin agua.'] },
    { en: ['Raise the back.', 'The rear panel stands up and gives the sides something to lock into.'], es: ['Levantá el fondo.', 'El panel trasero se para y les da a los laterales dónde encastrar.'] },
    { en: ['Close the sides.', 'Side panels complete the lower module for privacy and stability.'], es: ['Cerrá los laterales.', 'Los laterales completan el módulo inferior: privacidad y estabilidad.'] },
    { en: ['Shape the arch.', 'The curved walls and door give habitual its unmistakable silhouette.'], es: ['Formá el arco.', 'Las paredes curvas y la puerta le dan a habitual su silueta inconfundible.'] },
    { en: ['Roof on. Done.', 'The light arched roof closes it up. Ready to use, with no water or sewer.'], es: ['Techo y listo.', 'El techo liviano en arco lo cierra. Listo para usar, sin agua ni cloaca.'] }
  ];

  // place: [en, es] or null; text: [en, es]
  const PHOTOS = [
    { src: 'field-champaqui-camp.jpg', place: 'Cerro Champaquí, Córdoba', text: ['Serving a remote mountain camp.', 'Al servicio de un refugio de montaña.'], size: 'big' },
    { src: 'field-champaqui-fog.jpg', place: 'Cerro Champaquí, Córdoba', text: ['Fog, wind, altitude. Still standing.', 'Niebla, viento, altura. Siempre en pie.'] },
    { src: 'field-uruguay.jpg', place: 'Canelones, Uruguay', text: ['Black finish, out in the bush.', 'Negro divino, en pleno monte.'], size: 'big' },
    { src: 'field-calamuchita.jpg', place: 'Valle de Calamuchita, Córdoba', text: ['The Mini at an outdoor gathering.', 'El Mini en un encuentro al aire libre.'], size: 'wide' },
    { src: 'field-mendiolaza.jpg', place: 'Mendiolaza, Córdoba', text: ['A toilet in the garden, for when guests come.', 'Un baño en el patio, para cuando viene gente.'], size: 'wide' },
    { src: 'field-cordoba-rooftop.jpg', place: 'Córdoba', text: ['A rooftop in the middle of the city.', 'Una terraza en pleno centro.'] },
    { src: 'field-cordoba-night.jpg', place: 'Nueva Córdoba', text: ['Glowing at dusk.', 'Encendido al atardecer.'] },
    { src: 'hero-poster.jpg', text: ['In its element.', 'En su elemento.'] },
    { src: 'carousel-7.jpg', text: ['Step inside.', 'Pasá nomás.'], size: 'tall' },
    { src: 'carousel-13.jpg', text: ['Natural wood, wild garden.', 'Madera natural, jardín silvestre.'] },
    { src: 'carousel-12.jpg', text: ['Standing on its own in an open field.', 'Solo, en medio del campo.'], size: 'wide' },
    { src: 'carousel-9.jpg', text: ['Seat and compost chamber, all in wood.', 'Asiento y cámara de compost, todo en madera.'] },
    { src: 'carousel-10.jpg', text: ['Every surface in solid wood.', 'Cada superficie, en madera maciza.'] },
    { src: 'carousel-8.jpg', text: ['The urine-diverting seat.', 'El asiento separador de orina.'] },
    { src: 'carousel-11.jpg', text: ['The arch, against the sky.', 'El arco, contra el cielo.'] },
    { src: 'hero-portrait.jpg', text: ['Human scale.', 'A escala humana.'] },
    { src: 'carousel-1.jpg', text: ['Loaded onto a pickup.', 'A la camioneta.'] },
    { src: 'carousel-2.jpg', text: ['Panels ship flat.', 'Los paneles viajan en plano.'], size: 'tall' },
    { src: 'carousel-4.jpg', text: ['Assembled on site.', 'Se arma en el lugar.'], size: 'tall' },
    { src: 'carousel-6.jpg', text: ['The roof slots into place.', 'El techo encastra en su lugar.'], size: 'tall' },
    { src: 'carousel-5.jpg', text: ['Tested in the field.', 'Probado en el territorio.'] },
    { src: 'carousel-3.jpg', text: ['Built by hand.', 'Hecho a mano.'], size: 'wide' }
  ];

  const MODELS = {
    mini: { img: 'assets/carousel-13.jpg', alt: ['The habitual Mini standing in a garden', 'El Mini de habitual en un jardín'], tag: 'miniTag' },
    jardin: { img: 'assets/hero-portrait.jpg', alt: ['The habitual Jardín, a full wooden sanitation structure', 'El Jardín de habitual, un sanitario completo de madera'], tag: 'jardinTag' }
  };
  const EN_TAGS = { miniTag: 'Go anywhere. Leave nothing behind.', jardinTag: 'Built to stay. Everything included.' };

  /* ---------------------------------------------------------
     Language
     --------------------------------------------------------- */
  let lang = store.get('habitual-lang') || ((navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en');
  const L = () => (lang === 'es' ? 1 : 0);
  const i18nEls = $$('[data-i18n]');
  i18nEls.forEach(el => { el.dataset.en = el.innerHTML; });

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    i18nEls.forEach(el => {
      const k = el.dataset.i18n;
      el.innerHTML = lang === 'es' && ES[k] ? ES[k] : el.dataset.en;
    });
    $$('.lang span').forEach(s => s.classList.toggle('on', s.dataset.l === lang));
    $('#langToggle').setAttribute('aria-label', UI[lang].langLabel);
    store.set('habitual-lang', lang);
    setModel(currentModel, false);
    renderStep(currentStep, false);
    if (storyOpen) showStory(storyIndex, false);
  }
  $('#langToggle').addEventListener('click', () => applyLang(lang === 'en' ? 'es' : 'en'));

  /* ---------------------------------------------------------
     Header, menu, progress, dock
     --------------------------------------------------------- */
  const header = $('#header'), bar = $('#progress'), dock = $('#dock');
  const contact = $('#contact');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
      header.classList.toggle('solid', y > 40);
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const nearContact = contact.getBoundingClientRect().top < innerHeight * .6;
      dock.classList.toggle('show', y > innerHeight * .7 && !nearContact);
      updateBuild();
      updateBreather();
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  const menu = $('#menu'), burger = $('#burger');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('lock', open);
  }
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---------------------------------------------------------
     Reveal + counters
     --------------------------------------------------------- */
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => io.observe(el));

    const counters = $$('[data-count]');
    const cio = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      cio.disconnect();
      const t0 = performance.now();
      (function frame(now) {
        const k = Math.min(1, (now - t0) / 1400), ease = 1 - Math.pow(1 - k, 3);
        counters.forEach(el => { el.textContent = Math.round(+el.dataset.count * ease); });
        if (k < 1) requestAnimationFrame(frame);
      })(t0);
    }, { threshold: .4 });
    cio.observe($('.numbers'));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------------------------------------------------------
     Field log: progress, arrows, mouse drag
     --------------------------------------------------------- */
  const log = $('#log'), logBar = $('#logBar');
  function updateLog() {
    const max = log.scrollWidth - log.clientWidth;
    const visible = log.clientWidth / log.scrollWidth;
    logBar.style.transform = `scaleX(${Math.max(visible, max > 0 ? visible + (1 - visible) * (log.scrollLeft / max) : 1)})`;
  }
  log.addEventListener('scroll', updateLog, { passive: true });
  const cardStep = () => ($('.log-card', log).getBoundingClientRect().width + 18);
  $('#logPrev').addEventListener('click', () => log.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
  $('#logNext').addEventListener('click', () => log.scrollBy({ left: cardStep(), behavior: 'smooth' }));
  let drag = null, dragged = false;
  log.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    drag = { x: e.clientX, left: log.scrollLeft }; dragged = false;
  });
  addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) { dragged = true; log.classList.add('dragging'); }
    log.scrollLeft = drag.left - dx;
  });
  addEventListener('pointerup', () => {
    if (!drag) return;
    drag = null;
    if (log.classList.contains('dragging')) {
      log.classList.remove('dragging');
      const n = Math.round(log.scrollLeft / cardStep());
      log.scrollTo({ left: n * cardStep(), behavior: 'smooth' });
    }
  });
  log.addEventListener('click', e => { if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; } }, true);
  log.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') log.scrollBy({ left: cardStep(), behavior: 'smooth' });
    if (e.key === 'ArrowLeft') log.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  });
  updateLog();

  /* ---------------------------------------------------------
     Model explorer
     --------------------------------------------------------- */
  let currentModel = 'mini';
  const modelImg = $('#modelImg'), modelTag = $('#modelTag');
  function setModel(m, animate = true) {
    const changed = m !== currentModel;
    currentModel = m;
    $$('.tab').forEach(t => { const on = t.dataset.model === m; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
    $$('.model').forEach(p => { p.hidden = p.dataset.panel !== m; });
    const d = MODELS[m];
    modelTag.dataset.i18n = d.tag;
    modelTag.innerHTML = lang === 'es' ? ES[d.tag] : EN_TAGS[d.tag];
    modelImg.alt = d.alt[L()];
    if (changed) {
      if (animate && !reduced) {
        modelImg.classList.add('fade');
        setTimeout(() => { modelImg.src = d.img; modelImg.onload = () => modelImg.classList.remove('fade'); }, 220);
      } else modelImg.src = d.img;
    }
  }
  modelTag.dataset.en = EN_TAGS.miniTag;
  $$('.tab').forEach(t => t.addEventListener('click', () => setModel(t.dataset.model)));

  /* ---------------------------------------------------------
     Build: scroll-driven assembly
     --------------------------------------------------------- */
  const build = $('#build'), buildImgs = $$('.build-stage img'), buildDots = $('#buildDots');
  let currentStep = -1;
  STEPS.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Step ${i + 1}`);
    b.addEventListener('click', () => {
      const r = build.getBoundingClientRect(), span = build.offsetHeight - innerHeight;
      scrollTo({ top: scrollY + r.top + span * ((i + .5) / STEPS.length), behavior: reduced ? 'auto' : 'smooth' });
    });
    buildDots.appendChild(b);
  });
  function renderStep(i, animate = true) {
    if (i < 0) i = 0;
    const s = STEPS[i][lang], pad = String(i + 1).padStart(2, '0');
    $('#buildNum').textContent = pad;
    $('#buildWater').textContent = pad;
    $('#buildTitle').textContent = s[0];
    $('#buildText').textContent = s[1];
    buildImgs.forEach(img => {
      img.classList.toggle('on', +img.dataset.step === i);
      img.alt = +img.dataset.step === i ? s[0] : '';
    });
    $$('button', buildDots).forEach((b, j) => { b.classList.toggle('on', j <= i); b.setAttribute('aria-current', String(j === i)); });
    const box = $('.build-step');
    if (animate && !reduced) { box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap'); }
    build.classList.toggle('done', i === STEPS.length - 1);
  }
  function updateBuild() {
    const r = build.getBoundingClientRect(), span = build.offsetHeight - innerHeight;
    const p = Math.min(.999, Math.max(0, -r.top / span));
    const i = Math.floor(p * STEPS.length);
    if (i !== currentStep) { currentStep = i; renderStep(i); }
  }

  /* ---------------------------------------------------------
     Breather parallax
     --------------------------------------------------------- */
  const breather = $('.breather'), breatherImg = $('.breather > img');
  function updateBreather() {
    if (reduced) return;
    const r = breather.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    breatherImg.style.transform = `translate3d(0, ${p * -60}px, 0)`;
  }

  /* ---------------------------------------------------------
     Gallery wall
     --------------------------------------------------------- */
  const wall = $('#wallGrid');
  PHOTOS.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.stories = i;
    if (p.size) b.className = p.size;
    const img = document.createElement('img');
    img.src = 'assets/' + p.src; img.loading = 'lazy'; img.alt = p.text[0];
    const cap = document.createElement('span');
    cap.textContent = p.place || p.text[0].replace(/\.$/, '');
    b.append(img, cap);
    wall.appendChild(b);
  });

  /* ---------------------------------------------------------
     Stories player
     --------------------------------------------------------- */
  const stories = $('#stories'), sImg = $('#storiesImg'), sNext = $('#storiesImgNext');
  const sBars = $('#storiesBars'), sPlace = $('#storiesPlace'), sText = $('#storiesText'), sCount = $('#storiesCount');
  const DURATION = 5000;
  let storyOpen = false, storyIndex = 0, t0 = 0, elapsed = 0, raf = 0, paused = false, lastFocus = null;
  PHOTOS.forEach(() => { const s = document.createElement('span'); s.appendChild(document.createElement('i')); sBars.appendChild(s); });
  const barEls = $$('span', sBars);

  function preload(i) { const p = PHOTOS[(i + PHOTOS.length) % PHOTOS.length]; sNext.src = 'assets/' + p.src; }
  function showStory(i, restart = true) {
    storyIndex = (i + PHOTOS.length) % PHOTOS.length;
    const p = PHOTOS[storyIndex];
    const src = 'assets/' + p.src;
    if (!sImg.src.endsWith(src)) {
      sImg.src = src;
      $('#storiesBg').src = src;
      sImg.style.animation = 'none'; void sImg.offsetWidth; sImg.style.animation = '';
    }
    // fill the screen with portrait photos on portrait screens, show landscape photos whole
    const fit = () => sImg.classList.toggle('cover', (sImg.naturalHeight > sImg.naturalWidth) === (innerHeight > innerWidth));
    if (sImg.complete) fit(); else sImg.onload = fit;
    sImg.alt = p.text[L()];
    sPlace.textContent = p.place || '';
    sText.textContent = p.text[L()];
    sCount.textContent = `${storyIndex + 1} ${UI[lang].of} ${PHOTOS.length}`;
    barEls.forEach((b, j) => { b.classList.toggle('done', j < storyIndex); b.firstChild.style.transform = j < storyIndex ? 'scaleX(1)' : 'scaleX(0)'; });
    preload(storyIndex + 1);
    if (restart) { elapsed = 0; t0 = performance.now(); }
  }
  function tick(now) {
    if (!storyOpen) return;
    if (!paused) {
      const k = (elapsed + now - t0) / DURATION;
      barEls[storyIndex].firstChild.style.transform = `scaleX(${Math.min(1, k)})`;
      if (k >= 1) showStory(storyIndex + 1);
    }
    raf = requestAnimationFrame(tick);
  }
  function openStories(i) {
    lastFocus = document.activeElement;
    stories.hidden = false; storyOpen = true; paused = false;
    stories.classList.remove('paused');
    document.body.classList.add('lock');
    setMenu(false);
    showStory(i);
    cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
    $('#storiesClose').focus({ preventScroll: true });
    if (stories.requestFullscreen && matchMedia('(pointer: coarse)').matches) stories.requestFullscreen().catch(() => {});
  }
  function closeStories() {
    storyOpen = false; stories.hidden = true; cancelAnimationFrame(raf);
    document.body.classList.remove('lock');
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  function pause(on) {
    if (on === paused) return;
    if (on) elapsed += performance.now() - t0; else t0 = performance.now();
    paused = on;
    stories.classList.toggle('paused', on);
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-stories]');
    if (t) { e.preventDefault(); openStories(+t.dataset.stories); }
  });
  $('#storiesClose').addEventListener('click', closeStories);

  // tap left/right to navigate, hold to pause, swipe down to close
  let press = null;
  ['storiesPrev', 'storiesNext'].forEach(id => {
    const el = $('#' + id), dir = id === 'storiesNext' ? 1 : -1;
    el.addEventListener('pointerdown', e => { press = { t: performance.now(), x: e.clientX, y: e.clientY }; pause(true); });
    el.addEventListener('pointerup', e => {
      if (!press) return;
      const held = performance.now() - press.t, dx = e.clientX - press.x, dy = e.clientY - press.y;
      press = null; pause(false);
      if (dy > 90 && Math.abs(dy) > Math.abs(dx)) return closeStories();
      if (Math.abs(dx) > 50) return showStory(storyIndex + (dx < 0 ? 1 : -1));
      if (held < 300) showStory(storyIndex + dir);
    });
    el.addEventListener('pointercancel', () => { press = null; pause(false); });
    el.addEventListener('contextmenu', e => e.preventDefault());
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    if (!storyOpen) return;
    if (e.key === 'Escape') closeStories();
    if (e.key === 'ArrowRight') showStory(storyIndex + 1);
    if (e.key === 'ArrowLeft') showStory(storyIndex - 1);
    if (e.key === ' ') { e.preventDefault(); pause(!paused); }
  });
  document.addEventListener('visibilitychange', () => { if (storyOpen) pause(document.hidden); });

  /* ---------------------------------------------------------
     Contact form (Formspree, without leaving the page)
     --------------------------------------------------------- */
  const form = $('#contactForm'), status = $('#formStatus');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.company.value) return; // honeypot
    const btn = $('button[type=submit]', form);
    btn.disabled = true; status.textContent = UI[lang].sending;
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset(); status.textContent = UI[lang].sent;
    } catch (err) {
      status.textContent = UI[lang].failed;
    } finally { btn.disabled = false; }
  });

  /* ---------------------------------------------------------
     Start
     --------------------------------------------------------- */
  applyLang(lang);
  onScroll();
})();
