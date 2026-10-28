/*!
 * Insur·Insights · Navegación de artículos  (v1.2 · colores COI)
 * ---------------------------------------------------------------
 * Añade a CUALQUIER artículo del hub:
 *   1. Dock flotante inferior:  ← Biblioteca  |  ☰ Artículos  |  ↑
 *   2. Panel "Biblioteca" con buscador, filtros por área y artículo actual marcado
 *   3. Barra de progreso de lectura (fija arriba, sin mover el diseño)
 *   4. Bloque final "Seguir leyendo" con artículos relacionados y botón de vuelta al índice
 *   5. El rótulo "Insur·Insights" de la cabecera pasa a ser un enlace al índice (si existe)
 *
 * Instalación: una sola línea antes de </body> en cada artículo
 *   <script src="../ii-nav.js" defer></script>
 * (el script instalador lo hace solo para todos los artículos).
 *
 * Mantenimiento: al publicar un artículo nuevo, añade UNA línea a la lista ARTICULOS.
 * Un artículo puede estar en varias áreas: c: 2  ó  c: [7, 6]  (la primera es la principal).
 * Colores COI (#E4382E · #F1957C · #595959) y tipografías Lora/Inter del hub.
 * Todo el CSS está encapsulado bajo .iinav-* : no interfiere con el diseño del artículo.
 */
(function () {
  'use strict';
  if (window.__iiNavLoaded) return;
  window.__iiNavLoaded = true;

  /* ───────────── 1 · CATÁLOGO (fuente única) ─────────────
     f = archivo en /articulos/ · t = título · c = área (número o lista [principal, otras]) · m = minutos · n = 1 si es "Nuevo" */
  var AREAS = [
    'IA y Tecnología',
    'Ciberriesgos',
    'Corredores y Distribución',
    'Factor Humano y Seguro',
    'Insurtech',
    'Mercados e Informes',
    'Líderes en acción',
    'Risks Management'
  ];
  /* Orden de los bloques en el panel (índices de AREAS) */
  var ORDEN = [2, 0, 1, 3, 4, 5, 6, 7];
  var ARTICULOS = [
    /* Corredores y Distribución */
    { f: 'articulo-gpbk-alvarado.html', t: 'La estructura que permite a una correduría trascender a su fundador', c: [2, 6], m: 6, n: 1 },
    { f: 'estudio-software-broker-seguros.html', t: 'Estudio de software para brokers de seguros', c: 2, m: 8, n: 1 },
    { f: 'revolut-informe-hub.html', t: 'Revolut: de la tarjeta multidivisa a la aspiración de banco global', c: 2, m: 9 },
    { f: 'axa-correos-espana-vaciada.html', t: 'AXA y Correos en la España Vaciada: cuando la protección recupera la humanidad', c: 2, m: 10 },
    { f: 'corredor-latam-ia-2030.html', t: 'El corredor latinoamericano ante la IA: hoja de ruta hacia 2030', c: 2, m: 9 },
    { f: 'ranking-brokers-2025.html', t: 'Ranking de brokers España 2025: concentración, cifras y tendencias', c: 2, m: 8 },
    { f: 'ratio-tecnologia-ingresos-brokers.html', t: 'Ratio tecnología/ingresos en los brokers: quién invierte y quién se queda atrás', c: 2, m: 6 },
    { f: 'seguros_embebidos_brokers_2026.html', t: 'Seguros embebidos y el corredor: ¿amenaza o nueva oportunidad?', c: 2, m: 7 },
    { f: 'mga-informe-coi.html', t: 'MGA: el auge del modelo de agencia gestora en el mercado asegurador', c: 2, m: 7 },
    /* IA y Tecnología */
    { f: '2026-10-26_axa-future-risks-2026-ia-corredores.html', t: 'La IA, el principal riesgo para los expertos', c: 0, m: 7, n: 1 },
    { f: 'bcg-modelo-ia-transparente.html', t: 'BCG y el modelo de IA transparente', c: 0, m: 7 },
    { f: 'infinitewatch-openai.html', t: 'InfiniteWatch entra en la órbita de OpenAI', c: 0, m: 7 },
    { f: 'Biurrun_GNP_Palantir_InsurInsights_Jul2026.html', t: 'GNP, Palantir y la IA que ya gestiona siniestros en tiempo real', c: 0, m: 7 },
    { f: 'CIMA_y_la_conectividad_del_seguro.html', t: 'CIMA y la conectividad del seguro iberoamericano', c: 0, m: 6 },
    { f: 'IA_Neurosimbolica_Gartner_LeonXIV.html', t: 'IA neurosimbólica, Gartner y León XIV: la inteligencia que razona', c: 0, m: 8 },
    { f: 'eiopa-comision-europea-ia-distribucion-seguros.html', t: 'EIOPA, Comisión Europea e IA en la distribución de seguros', c: 0, m: 7 },
    { f: 'informe-rc-ia.html', t: 'Responsabilidad civil e inteligencia artificial: el vacío legal que viene', c: 0, m: 6 },
    { f: 'REVO-Magazine-COI-Agosto2026.html', t: 'REVO Magazine COI: el seguro y la revolución tecnológica, agosto 2026', c: 0, m: 8 },
    { f: 'quien-paga-ia-se-equivoca.html', t: '¿Qué pasa si la IA se equivoca? Quién paga', c: 0, m: 12 },
    { f: 'aseguramiento-ia-agentica.html', t: 'El mapa legal y el aseguramiento de la responsabilidad ante los errores de la IA', c: 0, m: 12, n: 1 },
    { f: 'Sabadell_Seguros_cx.html', t: 'El modelo de experiencia de cliente de Sabadell Seguros: IA con intervención humana', c: 0, m: 7 },
    /* Ciberriesgos */
    { f: 'ciberriesgos-y-seguros.html', t: 'La IA ya ataca. Las pólizas, todavía no se han enterado', c: 1, m: 9 },
    { f: 'ciberseguro-informe-coi.html', t: 'Ciberseguro: estado del mercado y brechas de cobertura', c: 1, m: 7 },
    /* Factor Humano y Seguro */
    { f: 'seguro-humano-tecnologia-sin-alma.html', t: 'Tecnología sin alma: cómo la confianza pesa más que la tecnología', c: 3, m: 8 },
    { f: 'seguro-humano-territorios-olvidados.html', t: 'Los territorios olvidados del seguro europeo', c: 3, m: 9 },
    { f: 'seguro-humano-puede-el-seguro-salvar-un-pueblo.html', t: '¿Puede el seguro salvar un pueblo?', c: 3, m: 9, n: 1 },
    /* Insurtech */
    { f: 'Insurtech_Evolucion_12anos_COI_Magazine.html', t: 'Insurtech: 12 años de evolución y lo que realmente ha cambiado', c: 4, m: 10 },
    { f: 'insurtech-comparativo.html', t: 'Comparativa de modelos insurtech: qué ha funcionado y por qué', c: 4, m: 8 },
    { f: 'alan_ronda_480m.html', t: 'Alan cierra una ronda de 480 M€: qué dice de la salud del insurtech europeo', c: 4, m: 5 },
    { f: 'alan_coi_articulo_linkedin.html', t: 'Alan y el modelo direct-to-consumer: lecciones para el mercado español', c: 4, m: 6 },
    { f: 'lemonade-analisis-financiero.html', t: 'Lemonade: análisis financiero de un insurtech en busca de rentabilidad', c: 4, m: 7 },
    { f: 'luko-analisis-financiero.html', t: 'Luko: auge y caída de un insurtech europeo. Autopsia financiera', c: 4, m: 7 },
    { f: 'wefox-analisis-financiero.html', t: 'Wefox: el insurtech que apostó por los brokers y lo que revela su balance', c: 4, m: 7 },
    /* Mercados e Informes */
    { f: 'mercados-emergentes-seguros-2026.html', t: 'Mercados emergentes del seguro en 2026: dónde está el crecimiento real', c: 5, m: 8 },
    { f: 'damantia-allianz-coi-magazine.html', t: 'Damantia y Allianz: fusiones y concentración en el mercado asegurador europeo', c: 5, m: 6 },
    { f: 'informe-vullierme-waniwani.html', t: 'Informe Vullierme-Waniwani: microaseguramiento e inclusión financiera', c: 5, m: 6 },
    { f: 'seguro-vida-prima-de-relevancia.html', t: 'Capgemini y LIMRA 2027: el seguro de vida tiene un problema de traducción', c: 5, m: 11, n: 1 },
    /* Risks Management · Líderes en acción */
    { f: '2026-10-28_salsi-gestionar-riesgos-no-es-suficiente.html', t: 'Gestionar riesgos no es suficiente', c: [7, 6], m: 5, n: 1 }
  ];

  /* ───────────── 2 · UTILIDADES ───────────── */
  var script = document.currentScript || (function () {
    var s = document.getElementsByTagName('script'); return s[s.length - 1];
  })();
  var ROOT = new URL('./', script.src).href;           // carpeta donde vive ii-nav.js (raíz del hub)
  var INDEX = ROOT + '#articulos';
  var HOME = ROOT;

  function href(a) { return ROOT + 'articulos/' + a.f; }
  function cats(a) { return Array.isArray(a.c) ? a.c : [a.c]; }   /* áreas del artículo (la primera es la principal) */
  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  var current = (function () {
    var p = decodeURIComponent(location.pathname.split('/').pop() || '').toLowerCase();
    if (p && p.indexOf('.') === -1) p += '.html';
    for (var i = 0; i < ARTICULOS.length; i++) if (ARTICULOS[i].f.toLowerCase() === p) return i;
    return -1;
  })();

  /* ───────────── 3 · ESTILOS (encapsulados) ───────────── */
  var CSS = [
    '.iinav-root{--n:#595959;--n2:#444444;--g:#E4382E;--g2:#F1957C;--gd:#C92F26;--bg:#fff;--tx:#262626;--mu:#595959;--ln:#e6e6e6;--sf:#f6f6f6;',
    'font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.4;color:var(--tx);-webkit-font-smoothing:antialiased}',
    '@media (prefers-color-scheme:dark){.iinav-root{--bg:#1c1c1c;--tx:#f2f2f2;--mu:#b3b3b3;--ln:#3a3a3a;--sf:#262626}}',
    '.iinav-root *,.iinav-root *::before,.iinav-root *::after{box-sizing:border-box}',
    '.iinav-root a{text-decoration:none}',
    '.iinav-root button{font:inherit;cursor:pointer}',

    /* progreso */
    '.iinav-progress{position:fixed;left:0;top:0;height:3px;width:100%;z-index:99990;background:transparent;pointer-events:none}',
    '.iinav-progress>i{display:block;height:100%;width:100%;background:linear-gradient(90deg,var(--g),var(--g2));transform-origin:0 50%;transform:scaleX(0)}',

    /* dock */
    '.iinav-dock{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:99991;',
    'display:flex;align-items:center;gap:4px;padding:5px;border-radius:999px;background:var(--n);',
    'box-shadow:0 10px 30px rgba(0,0,0,.30),0 2px 6px rgba(0,0,0,.20);border:1px solid rgba(255,255,255,.12);',
    'max-width:calc(100vw - 20px);transition:transform .25s ease,opacity .25s ease}',
    '.iinav-dock.iinav-hide{transform:translate(-50%,120%);opacity:0}',
    '.iinav-btn{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 16px;border:0;border-radius:999px;background:transparent;',
    'color:#fff;font-weight:600;font-size:14px;letter-spacing:.01em;white-space:nowrap;transition:background .15s,color .15s}',
    '.iinav-btn:hover{background:rgba(255,255,255,.12);color:#fff}',
    '.iinav-btn:focus-visible{outline:2px solid var(--g2);outline-offset:2px}',
    '.iinav-btn svg{width:18px;height:18px;flex:none;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    '.iinav-btn.iinav-primary{background:var(--g);color:#fff}',
    '.iinav-btn.iinav-primary:hover{background:var(--gd);color:#fff}',
    '.iinav-btn.iinav-icon{width:42px;padding:0;justify-content:center}',
    '@media (max-width:480px){.iinav-btn{padding:0 12px;font-size:13px;gap:6px}.iinav-btn.iinav-icon{width:40px}}',

    /* panel */
    '.iinav-overlay{position:fixed;inset:0;z-index:99999;background:rgba(20,20,20,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);',
    'opacity:0;visibility:hidden;transition:opacity .2s ease,visibility .2s}',
    '.iinav-overlay.iinav-open{opacity:1;visibility:visible}',
    '.iinav-panel{position:absolute;top:0;right:0;bottom:0;width:min(460px,100%);background:var(--bg);display:flex;flex-direction:column;',
    'box-shadow:-18px 0 50px rgba(0,0,0,.28);transform:translateX(24px);transition:transform .25s ease}',
    '.iinav-open .iinav-panel{transform:none}',
    '@media (max-width:640px){.iinav-panel{top:6vh;border-radius:18px 18px 0 0;width:100%;transform:translateY(24px)}}',
    '.iinav-ph{padding:18px 20px 12px;border-bottom:1px solid var(--ln);background:var(--bg)}',
    '.iinav-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}',
    '.iinav-kick{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--g)}',
    '.iinav-title{font-family:Lora,Georgia,"Times New Roman",serif;font-size:22px;font-weight:700;color:var(--tx);margin:2px 0 0}',
    '.iinav-x{width:38px;height:38px;border-radius:50%;border:1px solid var(--ln);background:var(--sf);color:var(--tx);display:grid;place-items:center}',
    '.iinav-x:hover{border-color:var(--g)}',
    '.iinav-x svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round}',
    '.iinav-search{position:relative}',
    '.iinav-search svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);width:18px;height:18px;stroke:var(--mu);fill:none;stroke-width:2;stroke-linecap:round}',
    '.iinav-search input{width:100%;height:44px;padding:0 14px 0 40px;border:1px solid var(--ln);border-radius:12px;background:var(--sf);color:var(--tx);font:inherit;font-size:15px}',
    '.iinav-search input:focus{outline:2px solid var(--n);outline-offset:1px;border-color:transparent}',
    '@media (prefers-color-scheme:dark){.iinav-search input:focus{outline-color:var(--g)}}',
    '.iinav-chips{display:flex;gap:6px;overflow-x:auto;padding:12px 0 2px;scrollbar-width:none}',
    '.iinav-chips::-webkit-scrollbar{display:none}',
    '.iinav-chip{flex:none;height:32px;padding:0 12px;border-radius:999px;border:1px solid var(--ln);background:var(--bg);color:var(--mu);font-size:13px;font-weight:600}',
    '.iinav-chip b{font-weight:700;opacity:.7;margin-left:4px}',
    '.iinav-chip:hover{border-color:var(--g);color:var(--tx)}',
    '.iinav-chip[aria-pressed="true"]{background:var(--g);border-color:var(--g);color:#fff}',
    '.iinav-chip:focus-visible{outline:2px solid var(--g);outline-offset:2px}',
    '.iinav-list{flex:1;overflow-y:auto;overscroll-behavior:contain;margin:0;padding:8px 10px 20px;list-style:none}',
    '.iinav-gh{padding:14px 10px 6px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--mu)}',
    '.iinav-item{display:block;padding:11px 12px;border-radius:12px;color:var(--tx);border:1px solid transparent}',
    '.iinav-item:hover{background:var(--sf);border-color:var(--ln)}',
    '.iinav-item:focus-visible{outline:2px solid var(--n);outline-offset:-2px}',
    '.iinav-item[aria-current="page"]{background:var(--sf);border-color:var(--g);box-shadow:inset 3px 0 0 var(--g)}',
    '.iinav-it{display:block;font-family:Lora,Georgia,"Times New Roman",serif;font-size:16px;line-height:1.3;font-weight:600}',
    '.iinav-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:5px;font-size:12px;color:var(--mu)}',
    '.iinav-tag{padding:2px 8px;border-radius:999px;background:var(--sf);border:1px solid var(--ln);font-weight:600}',
    '.iinav-new{padding:2px 8px;border-radius:999px;background:var(--g);color:#fff;font-weight:700;font-size:11px;letter-spacing:.04em}',
    '.iinav-here{padding:2px 8px;border-radius:999px;background:var(--n);color:#fff;font-weight:700;font-size:11px}',
    '.iinav-empty{padding:34px 16px;text-align:center;color:var(--mu)}',
    '.iinav-pf{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 20px calc(12px + env(safe-area-inset-bottom));border-top:1px solid var(--ln);background:var(--bg);font-size:13px;color:var(--mu)}',
    '.iinav-pf a{color:var(--g);font-weight:700}',
    '@media (prefers-color-scheme:dark){.iinav-pf a{color:var(--g2)}}',
    '.iinav-pf a:hover{text-decoration:underline}',

    /* seguir leyendo */
    '.iinav-more{max-width:900px;margin:56px auto 110px;padding:0 20px}',
    '.iinav-more-in{border-top:3px solid var(--g);padding-top:26px}',
    '.iinav-more h2{font-family:Lora,Georgia,"Times New Roman",serif;font-size:26px;line-height:1.2;margin:4px 0 18px;color:var(--tx)}',
    '.iinav-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}',
    '.iinav-card{display:flex;flex-direction:column;gap:8px;padding:16px;border-radius:14px;border:1px solid var(--ln);background:var(--sf);color:var(--tx);transition:transform .15s,border-color .15s,box-shadow .15s}',
    '.iinav-card:hover{transform:translateY(-2px);border-color:var(--g);box-shadow:0 8px 22px rgba(0,0,0,.12)}',
    '.iinav-card .iinav-it{font-size:17px}',
    '.iinav-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}',
    '.iinav-cta{display:inline-flex;align-items:center;gap:8px;height:46px;padding:0 22px;border-radius:999px;font-weight:700;font-size:15px;border:2px solid var(--g);transition:background .15s,color .15s}',
    '.iinav-cta svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    '.iinav-cta.pri{background:var(--g);color:#fff}',
    '.iinav-cta.pri:hover{background:var(--gd);border-color:var(--gd)}',
    '.iinav-cta.sec{background:transparent;color:var(--g)}',
    '.iinav-cta.sec:hover{background:var(--g);color:#fff}',
    '@media (prefers-color-scheme:dark){.iinav-cta.sec{color:var(--g2);border-color:var(--g2)}.iinav-cta.sec:hover{background:var(--g2);color:#1c1c1c}}',

    /* bloque final dentro de páginas con #ii-art: colores propios y tema según el fondo real de la página */
    '.iinav-more[data-iinav-tema="claro"]{--bg:#fff;--tx:#262626;--mu:#595959;--ln:#e6e6e6;--sf:#f6f6f6}',
    '.iinav-more[data-iinav-tema="oscuro"]{--bg:#1c1c1c;--tx:#f2f2f2;--mu:#b3b3b3;--ln:#3a3a3a;--sf:#262626}',
    '#iinav-more .iinav-card{color:var(--tx)}',
    '#iinav-more .iinav-cta.pri{color:#fff}',
    '#iinav-more[data-iinav-tema="claro"] .iinav-cta.sec{color:var(--g);border-color:var(--g)}',
    '#iinav-more[data-iinav-tema="claro"] .iinav-cta.sec:hover{background:var(--g);color:#fff}',
    '#iinav-more[data-iinav-tema="oscuro"] .iinav-cta.sec{color:var(--g2);border-color:var(--g2)}',
    '#iinav-more[data-iinav-tema="oscuro"] .iinav-cta.sec:hover{background:var(--g2);color:#1c1c1c}',

    '@media (prefers-reduced-motion:reduce){.iinav-root *{transition:none!important}}',
    '@media print{.iinav-progress,.iinav-dock,.iinav-overlay{display:none!important}}'
  ].join('\n');

  /* ───────────── 4 · ICONOS ───────────── */
  var IC = {
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>',
    list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>'
  };

  /* ───────────── 5 · CONSTRUCCIÓN ───────────── */
  function init() {
    var st = document.createElement('style');
    st.id = 'iinav-style';
    st.textContent = CSS;
    document.head.appendChild(st);

    var root = document.createElement('div');
    root.className = 'iinav-root';
    root.id = 'iinav-root';

    /* progreso + dock + panel */
    root.innerHTML =
      '<div class="iinav-progress" aria-hidden="true"><i></i></div>' +
      '<nav class="iinav-dock" aria-label="Navegación de la biblioteca">' +
        '<a class="iinav-btn" id="iinav-home" href="' + INDEX + '" title="Volver al índice de artículos">' + IC.back + '<span>Biblioteca</span></a>' +
        '<button type="button" class="iinav-btn iinav-primary" id="iinav-open" aria-haspopup="dialog" aria-expanded="false" title="Buscar y elegir otro artículo (atajo: /)">' + IC.list + '<span>Artículos</span></button>' +
        '<button type="button" class="iinav-btn iinav-icon" id="iinav-up" aria-label="Subir al inicio del artículo" title="Subir al inicio">' + IC.up + '</button>' +
      '</nav>' +
      '<div class="iinav-overlay" id="iinav-overlay">' +
        '<aside class="iinav-panel" role="dialog" aria-modal="true" aria-labelledby="iinav-ttl">' +
          '<div class="iinav-ph">' +
            '<div class="iinav-top"><div><div class="iinav-kick">Insur·Insights</div><h2 class="iinav-title" id="iinav-ttl">Biblioteca · ' + ARTICULOS.length + ' artículos</h2></div>' +
            '<button type="button" class="iinav-x" id="iinav-close" aria-label="Cerrar">' + IC.x + '</button></div>' +
            '<label class="iinav-search">' + IC.search + '<input type="search" id="iinav-q" placeholder="Buscar por tema, empresa o palabra clave…" autocomplete="off" aria-label="Buscar artículos"></label>' +
            '<div class="iinav-chips" id="iinav-chips" role="group" aria-label="Filtrar por área"></div>' +
          '</div>' +
          '<ul class="iinav-list" id="iinav-list"></ul>' +
          '<div class="iinav-pf"><span id="iinav-count"></span><a href="' + INDEX + '">Ir al índice completo →</a></div>' +
        '</aside>' +
      '</div>';
    document.body.appendChild(root);

    var $ = function (id) { return document.getElementById(id); };
    var overlay = $('iinav-overlay'), openBtn = $('iinav-open'), closeBtn = $('iinav-close');
    var q = $('iinav-q'), chips = $('iinav-chips'), list = $('iinav-list'), count = $('iinav-count');
    var filtro = -1, lastFocus = null;

    /* chips */
    function renderChips() {
      var counts = AREAS.map(function () { return 0; });
      ARTICULOS.forEach(function (a) { cats(a).forEach(function (ci) { counts[ci]++; }); });
      var h = '<button type="button" class="iinav-chip" data-c="-1" aria-pressed="' + (filtro === -1) + '">Todos<b>' + ARTICULOS.length + '</b></button>';
      AREAS.forEach(function (n, i) {
        h += '<button type="button" class="iinav-chip" data-c="' + i + '" aria-pressed="' + (filtro === i) + '">' + esc(n) + '<b>' + counts[i] + '</b></button>';
      });
      chips.innerHTML = h;
    }

    /* lista (un artículo puede aparecer en varias áreas, como en el índice del hub) */
    function renderList() {
      var t = norm(q.value.trim());
      var grouped = (filtro === -1 && !t), rows = [], uniq = {};
      function etiquetas(a) { return cats(a).map(function (ci) { return AREAS[ci]; }); }
      if (grouped) {
        ORDEN.forEach(function (ci) {
          ARTICULOS.forEach(function (a, i) { if (cats(a).indexOf(ci) !== -1) rows.push({ i: i, g: ci }); });
        });
      } else {
        ARTICULOS.forEach(function (a, i) {
          if (filtro !== -1 && cats(a).indexOf(filtro) === -1) return;
          if (t && norm(a.t + ' ' + etiquetas(a).join(' ')).indexOf(t) === -1) return;
          rows.push({ i: i, g: -1 });
        });
      }
      var h = '', last = -1;
      rows.forEach(function (r) {
        var a = ARTICULOS[r.i]; uniq[r.i] = 1;
        if (grouped && r.g !== last) { last = r.g; h += '<li class="iinav-gh" role="presentation">' + esc(AREAS[r.g]) + '</li>'; }
        var here = r.i === current;
        h += '<li><a class="iinav-item" href="' + href(a) + '"' + (here ? ' aria-current="page"' : '') + '>' +
             '<span class="iinav-it">' + esc(a.t) + '</span>' +
             '<span class="iinav-meta">' +
               (here ? '<span class="iinav-here">Estás aquí</span>' : '') +
               (a.n ? '<span class="iinav-new">NUEVO</span>' : '') +
               etiquetas(a).map(function (n) { return '<span class="iinav-tag">' + esc(n) + '</span>'; }).join('') +
               '<span>' + a.m + ' min</span>' +
             '</span></a></li>';
      });
      var total = Object.keys(uniq).length;
      if (!total) h = '<li class="iinav-empty">No hay artículos que coincidan con «' + esc(q.value) + '».<br>Prueba con otra palabra o quita el filtro.</li>';
      list.innerHTML = h;
      count.textContent = total + (total === 1 ? ' artículo' : ' artículos');
    }

    /* abrir / cerrar */
    function open() {
      lastFocus = document.activeElement;
      overlay.classList.add('iinav-open');
      openBtn.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      renderChips(); renderList();
      var cur = list.querySelector('[aria-current="page"]');
      if (cur) cur.scrollIntoView({ block: 'center' });
      setTimeout(function () { q.focus({ preventScroll: true }); }, 60);
    }
    function close() {
      overlay.classList.remove('iinav-open');
      openBtn.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    window.iiNavOpen = open;

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('.iinav-chip'); if (!b) return;
      filtro = parseInt(b.getAttribute('data-c'), 10);
      renderChips(); renderList();
    });
    q.addEventListener('input', renderList);
    $('iinav-up').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' });
    });
    document.addEventListener('keydown', function (e) {
      var isOpen = overlay.classList.contains('iinav-open');
      if (e.key === 'Escape' && isOpen) { e.preventDefault(); close(); return; }
      if (isOpen && e.key === 'Tab') {                         /* foco atrapado dentro del panel */
        var f = overlay.querySelectorAll('a[href],button,input');
        if (!f.length) return;
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
        return;
      }
      var tag = (e.target && e.target.tagName || '').toLowerCase();
      if (e.key === '/' && !isOpen && tag !== 'input' && tag !== 'textarea' && !e.target.isContentEditable && !e.metaKey && !e.ctrlKey) {
        e.preventDefault(); open();
      }
    });

    /* progreso de lectura + dock que se aparta al llegar al final */
    var bar = root.querySelector('.iinav-progress>i'), dock = root.querySelector('.iinav-dock'), tick = false;
    function onScroll() {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var d = document.documentElement;
        var max = (d.scrollHeight - d.clientHeight) || 1;
        var y = window.pageYOffset || d.scrollTop;
        bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, y / max)) + ')';
        /* al llegar al final, el dock cede su sitio al bloque "Seguir leyendo" (que tiene los mismos botones) */
        dock.classList.toggle('iinav-hide', !!document.querySelector('.iinav-more') && (max - y) < 70);
        tick = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ── "Seguir leyendo" al final del artículo ── */
    try {
      if (current !== -1) {
        var rel = [], head = -1;
        cats(ARTICULOS[current]).forEach(function (ci) {          /* primero la misma área principal, luego las demás */
          for (var k = 1; k < ARTICULOS.length && rel.length < 3; k++) {
            var a = ARTICULOS[(current + k) % ARTICULOS.length];
            if (rel.indexOf(a) === -1 && cats(a).indexOf(ci) !== -1) { rel.push(a); if (head === -1) head = ci; }
          }
        });
        var compartidos = rel.length;                                    /* cuántos comparten área con el artículo actual */
        for (var j = 1; j < ARTICULOS.length && rel.length < 3; j++) {  /* completa con otras áreas si hace falta */
          var b = ARTICULOS[(current + j) % ARTICULOS.length];
          if (rel.indexOf(b) === -1) rel.push(b);
        }
        var cards = rel.map(function (a) {
          return '<a class="iinav-card" href="' + href(a) + '"><span class="iinav-it">' + esc(a.t) + '</span>' +
                 '<span class="iinav-meta"><span class="iinav-tag">' + esc(AREAS[cats(a)[0]]) + '</span><span>' + a.m + ' min</span>' +
                 (a.n ? '<span class="iinav-new">NUEVO</span>' : '') + '</span></a>';
        }).join('');
        var more = document.createElement('section');
        more.className = 'iinav-root iinav-more';
        more.id = 'iinav-more';
        more.setAttribute('aria-label', 'Seguir leyendo');
        more.innerHTML =
          '<div class="iinav-more-in"><div class="iinav-kick">Seguir leyendo</div>' +
          '<h2>' + esc(head !== -1 && compartidos >= 3 ? 'Más análisis de ' + AREAS[head] : 'Más análisis del hub') + '</h2>' +
          '<div class="iinav-cards">' + cards + '</div>' +
          '<div class="iinav-actions">' +
            '<a class="iinav-cta pri" href="' + INDEX + '">' + IC.back + 'Volver a la biblioteca</a>' +
            '<button type="button" class="iinav-cta sec" id="iinav-open2">' + IC.list + 'Ver los ' + ARTICULOS.length + ' artículos</button>' +
          '</div></div>';
        var footers = document.querySelectorAll('footer');
        var anchor = footers.length ? footers[footers.length - 1] : null;
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(more, anchor);
        else document.body.insertBefore(more, root);
        (function () {                       /* tema claro/oscuro según el fondo real de la página, no según el sistema */
          function fondo(el) {
            while (el) {
              var m = (getComputedStyle(el).backgroundColor || '').match(/[\d.]+/g);
              if (m && m.length >= 3 && (m.length < 4 || +m[3] > 0.5)) return m.map(Number);
              el = el.parentElement;
            }
            return [255, 255, 255];
          }
          var c = fondo(more.parentNode);
          more.setAttribute('data-iinav-tema', (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255 > 0.5 ? 'claro' : 'oscuro');
        })();
        document.getElementById('iinav-open2').addEventListener('click', open);
      }
    } catch (e) { /* el bloque final es un extra: nunca debe romper el artículo */ }

    /* ── El rótulo "Insur·Insights" de la cabecera pasa a ser enlace al índice ── */
    try {
      var scope = document.querySelector('header, .topbar, .top, nav:not(.iinav-dock)') || document.body;
      var w = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null), n, done = false;
      while (!done && (n = w.nextNode())) {
        if (n.parentNode.closest('#iinav-root,.iinav-root,a,script,style')) continue;
        if (/^\s*Insur[·.\-\s]?Insights\s*$/i.test(n.nodeValue)) {
          var link = document.createElement('a');
          link.href = HOME;
          link.title = 'Ir a la página principal de Insur·Insights';
          link.style.cssText = 'color:inherit;text-decoration:none;font:inherit';
          n.parentNode.insertBefore(link, n);
          link.appendChild(n);
          done = true;
        }
      }
    } catch (e) { /* idem */ }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
