/* ═══════════════════════════════════════════
   LE GRAND PRADO — main.js
   Refinements:
   - Hamburger aria-expanded sync + body scroll-lock when drawer is open
   - Lang switcher updates html.lang/dir, aria-pressed, persists in localStorage
   - Reveal observer respects prefers-reduced-motion
   - Lightbox supports keyboard (Enter/Space) on gallery items
═══════════════════════════════════════════ */

/* ─── RESPONSIVE HERO VIDEO ─────────────────────────
   Loads shawarma-pc.mp4 on >768px, shawarma-mobile.mp4 on ≤768px.
   Only one source is fetched at a time. Swaps automatically on
   viewport change (rotation, resize). Respects reduced-motion. */
(function setupResponsiveHeroVideo(){
  const video = document.getElementById('heroVideo');
  if (!video) return;

  const mqlMobile  = window.matchMedia('(max-width: 768px)');
  const mqlReduce  = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentSrc = '';

  function pickSrc(){
    return mqlMobile.matches
      ? video.dataset.srcMobile
      : video.dataset.srcDesktop;
  }

  function applySrc(){
    const next = pickSrc();
    if (!next || next === currentSrc) return;
    currentSrc = next;
    video.src = next;
    video.load();
    if (mqlReduce.matches){
      // Show first frame only, no autoplay
      video.pause();
      return;
    }
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(()=>{ /* autoplay blocked, ignore */ });
  }

  applySrc();

  // Modern + legacy listener support
  const onChange = () => applySrc();
  if (mqlMobile.addEventListener) mqlMobile.addEventListener('change', onChange);
  else if (mqlMobile.addListener) mqlMobile.addListener(onChange);
})();



/* ─── TRANSLATIONS ─────────────────────────────────── */
const T = {
fr: {
'tagline-short': 'Shawarma & Restauration Rapide',
'nav-home': 'Accueil','nav-about': 'À propos','nav-menu': 'Menu','nav-gallery': 'Galerie','nav-reviews': 'Avis','nav-contact': 'Contact','nav-wa': 'WhatsApp',
'hero-tagline': 'La meilleure shawarma et restauration rapide de la ville',
'hero-btn1': '🍽 Voir le Menu','hero-btn2': '📱 Commander Maintenant',
'about-eyebrow': 'Notre Histoire','about-title': "Une passion pour l'authenticité",
'about-text': "Restaurant Le Grand Prado vous accueille avec des ingrédients frais, une shawarma authentique et un service familial chaleureux. Chaque repas est préparé avec soin afin d'offrir une expérience unique à chaque visite.",
'pillar1-title':'Ingrédients frais','pillar1-desc':'Sélectionnés chaque matin au marché local pour garantir fraîcheur et saveur.',
'pillar2-title':'Shawarma authentique','pillar2-desc':'Recettes traditionnelles, cuisson à la broche, épices soigneusement dosées.',
'pillar3-title':'Service familial','pillar3-desc':'Accueil chaleureux, ambiance conviviale et service attentionné pour tous.',
'menu-eyebrow':'Découvrez','menu-title':'Notre Menu','menu-sub':'Tous nos prix sont en Dinars Algériens (DA)',
'sw1-name':'Shawarma Frites','sw1-desc':"Shawarma au poulet grillé avec frites croustillantes, sauce à l'ail et légumes frais.",
'sw2-name':'Shawarma Classique','sw2-desc':'Shawarma au poulet ou bœuf avec sauce maison et pain frais.',
'ta1-name':'Mini Tacos Poulet','ta1-desc':'Mini tacos garnis de poulet tendre, fromage fondu et sauce secrète.',
'ta2-name':'Tacos Poulet','ta2-desc':'Grand tacos au poulet grillé, légumes croquants, fromage et sauces assorties.',
'ta3-name':'Tacos Crispy','ta3-desc':'Poulet crispy doré, salade, tomate, sauce ranch et fromage fondant.',
'pl1-name':'Plat Arabi','pl1-desc':'Assiette orientale complète avec viande, riz, salade et pain.',
'pl2-name':'Plat Shawarma','pl2-desc':'Généreuse assiette de shawarma avec riz basmati, salade fraîche et sauces.',
'pl3-name':'Plat Crispy','pl3-desc':'Poulet crispy, frites maison, coleslaw et sauce barbecue.',
'pl4-name':'Plat Shawarma & Crispy','pl4-desc':'Le meilleur des deux mondes — shawarma et crispy avec accompagnements au choix.',
'sup1':'Frites','sup2':'Riz','sup3':'Salade',
'dr1':'Boisson Gazeuse Grand Format','dr2':'Boisson Gazeuse Petit Format','dr3':'Canette 33 cl','dr4':'Canette 24 cl','dr5':'Jus Grand Format','dr6':'Jus Petit Format','dr7':'Eau Grand Format','dr8':'Eau Petit Format',
'order-btn':'Commander',
'gallery-eyebrow':'Nos Photos','gallery-title':'Galerie',
'reviews-eyebrow':'Témoignages','reviews-title':'Ce que disent nos clients','rating-base':'Basé sur 31 avis Google',
'rev1-text':'Excellente shawarma, service rapide et personnel accueillant. Je recommande vivement cet endroit !','rev1-name':'Karim Amrani','rev1-date':'il y a 2 mois',
'rev2-text':"Meilleur shawarma que j'ai goûté en ville. Service excellent et nourriture délicieuse. Prix raisonnables.",'rev2-name':'Sara Benali','rev2-date':'il y a 3 mois',
'rev3-text':'Les tacos crispy sont incroyables ! Très bon rapport qualité-prix.','rev3-name':'Yacine Boudiaf','rev3-date':'il y a 1 mois',
'rev4-text':'Endroit propre et personnel respectueux. Parfait pour les familles.','rev4-name':'Nadia Ziani','rev4-date':'il y a 5 mois',
'rev5-text':'Bon restaurant familial. Shawarma bien garni et frites croustillantes.','rev5-name':'Mohamed Hadjadj','rev5-date':'il y a 4 mois',
'rev6-text':'Très bon shawarma ! Pain frais et sauce excellente.','rev6-name':'Rachid Khelil','rev6-date':'il y a 6 mois',
'contact-eyebrow':'Nous trouver','contact-title':'Contact & Localisation','contact-addr-label':'Adresse','contact-phone-label':'Téléphone','contact-wa-val':'Envoyer un message','contact-hours-label':'Horaires',
'contact-hours-val':'Ouvert tous les jours<br/><strong style="color:var(--crimson)">Jusqu\'à minuit</strong>',
'chip1':'🍽 Sur place','chip2':'🛍 À emporter','chip3':'🚴 Livraison',
'footer-sub':'Shawarma & Restauration Rapide · Sidi Bel Abbès','footer-desc':'Shawarma authentique préparée chaque jour avec des ingrédients frais. Livraison, sur place et à emporter.',
'footer-nav-title':'Navigation','footer-hours-title':'Horaires','footer-days':'Tous les jours','footer-until':'Ouvert jusqu\'à minuit',
'footer-copy':'© 2026 Restaurant Le Grand Prado. Tous droits réservés.',
'stat1':'Années de saveur','stat2':'Plats servis','stat3':'Halal & frais','stat4':'Avis Google'
},
ar: {
'tagline-short':'شاورما وأكلات سريعة',
'nav-home':'الرئيسية','nav-about':'من نحن','nav-menu':'القائمة','nav-gallery':'المعرض','nav-reviews':'آراء الزبائن','nav-contact':'اتصل بنا','nav-wa':'واتساب',
'hero-tagline':'أفضل شاورما وأكلات سريعة في المدينة','hero-btn1':'🍽 عرض القائمة','hero-btn2':'📱 اطلب الآن',
'about-eyebrow':'قصتنا','about-title':'شغف بالأصالة',
'about-text':'يرحب بكم مطعم لو غراند برادو بأشهى أطباق الشاورما المحضرة من مكونات طازجة يومياً، مع خدمة عائلية مميزة وأجواء مريحة.',
'pillar1-title':'مكونات طازجة','pillar1-desc':'نختار أفضل المكونات يومياً من السوق المحلي لضمان النضارة والطعم.',
'pillar2-title':'شاورما أصيلة','pillar2-desc':'وصفات تقليدية، تحضير على السيخ الدوّار، وبهارات مختارة بعناية.',
'pillar3-title':'خدمة عائلية','pillar3-desc':'استقبال حار وأجواء ودية وخدمة متميزة للجميع.',
'menu-eyebrow':'اكتشف','menu-title':'قائمتنا','menu-sub':'جميع الأسعار بالدينار الجزائري (DA)',
'sw1-name':'شاورما بطاطا','sw1-desc':'شاورما دجاج مشوية مع بطاطا مقلية طازجة وصلصة الثوم والخضروات.',
'sw2-name':'شاورما كلاسيكية','sw2-desc':'شاورما دجاج أو لحم مع صلصة منزلية وخبز طازج.',
'ta1-name':'ميني تاكوس دجاج','ta1-desc':'ميني تاكوس محشو بدجاج طري وجبن ذائب وصلصة سرية.',
'ta2-name':'تاكوس دجاج','ta2-desc':'تاكوس كبير بالدجاج المشوي وخضروات مقرمشة وجبن وصلصات متنوعة.',
'ta3-name':'تاكوس كريسبي','ta3-desc':'دجاج كريسبي ذهبي وسلطة وطماطم وصلصة رانش وجبن ذائب.',
'pl1-name':'طبق عربي','pl1-desc':'طبق شرقي متكامل مع اللحم والأرز والسلطة والخبز.',
'pl2-name':'طبق شاورما','pl2-desc':'طبق سخي من الشاورما مع أرز بسمتي وسلطة طازجة وصلصات.',
'pl3-name':'طبق كريسبي','pl3-desc':'دجاج كريسبي، بطاطا مقلية، كولسلو وصلصة باربكيو.',
'pl4-name':'طبق شاورما وكريسبي','pl4-desc':'أفضل ما في العالمين — شاورما وكريسبي مع مرافقات حسب الاختيار.',
'sup1':'بطاطا','sup2':'أرز','sup3':'سلطة',
'dr1':'مشروب غازي حجم كبير','dr2':'مشروب غازي حجم صغير','dr3':'مشروب غازي 33 سل','dr4':'مشروب غازي 24 سل','dr5':'عصير حجم كبير','dr6':'عصير حجم صغير','dr7':'ماء حجم كبير','dr8':'ماء حجم صغير',
'order-btn':'اطلب الآن',
'gallery-eyebrow':'صورنا','gallery-title':'المعرض',
'reviews-eyebrow':'شهادات','reviews-title':'آراء زبائننا','rating-base':'بناءً على 31 تقييم Google',
'rev1-text':'شاورما ممتازة وخدمة سريعة وطاقم ودود. أنصح الجميع!','rev1-name':'كريم عمراني','rev1-date':'منذ شهرين',
'rev2-text':'أفضل شاورما جربتها في المدينة. خدمة ممتازة وطعام لذيذ وأسعار مناسبة.','rev2-name':'سارة بن علي','rev2-date':'منذ 3 أشهر',
'rev3-text':'التاكوس الكريسبي رائع جداً!','rev3-name':'ياسين بوضياف','rev3-date':'منذ شهر',
'rev4-text':'مكان نظيف وموظفون محترمون ومناسب للعائلة.','rev4-name':'نادية زياني','rev4-date':'منذ 5 أشهر',
'rev5-text':'مطعم عائلي ممتاز والشاورما لذيذة جداً.','rev5-name':'محمد حجاج','rev5-date':'منذ 4 أشهر',
'rev6-text':'شاورما رائعة! خبز طازج وصلصة ممتازة.','rev6-name':'رشيد خليل','rev6-date':'منذ 6 أشهر',
'contact-eyebrow':'أين تجدنا','contact-title':'التواصل والموقع','contact-addr-label':'العنوان','contact-phone-label':'الهاتف','contact-wa-val':'أرسل رسالة','contact-hours-label':'أوقات العمل',
'contact-hours-val':'مفتوح يومياً<br/><strong style="color:var(--crimson)">حتى منتصف الليل</strong>',
'chip1':'🍽 داخل المطعم','chip2':'🛍 طلب خارجي','chip3':'🚴 توصيل',
'footer-sub':'شاورما وأكلات سريعة · سيدي بلعباس','footer-desc':'شاورما طازجة تُحضَّر يومياً بمكونات عالية الجودة. توصيل، داخل المطعم، وطلبات خارجية.',
'footer-nav-title':'التنقل','footer-hours-title':'أوقات العمل','footer-days':'كل يوم','footer-until':'حتى منتصف الليل',
'footer-copy':'© 2026 مطعم لو غراند برادو. جميع الحقوق محفوظة.',
'stat1':'سنوات من النكهة','stat2':'طبق مقدّم','stat3':'حلال وطازج','stat4':'تقييم Google'
}
};

/* ─── LANGUAGE SWITCHER ─────────────────────────────── */
let currentLang = 'fr';

function setLang(lang) {
  if (!T[lang]) return;
  currentLang = lang;
  const html = document.documentElement;
  html.lang = lang;
  html.dir  = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    if (T[lang][key] !== undefined) {
      if (key === 'contact-hours-val') {
        el.innerHTML = T[lang][key];
      } else {
        el.textContent = T[lang][key];
      }
    }
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    const k = 'data-key-' + lang;
    if (btn.getAttribute(k)) btn.textContent = btn.getAttribute(k);
  });

  const fr = document.getElementById('btnFr');
  const ar = document.getElementById('btnAr');
  const dFr = document.getElementById('drawerFr');
  const dAr = document.getElementById('drawerAr');
  if (fr) { fr.classList.toggle('active', lang === 'fr'); fr.setAttribute('aria-pressed', lang === 'fr'); }
  if (ar) { ar.classList.toggle('active', lang === 'ar'); ar.setAttribute('aria-pressed', lang === 'ar'); }
  if (dFr) dFr.classList.toggle('active', lang === 'fr');
  if (dAr) dAr.classList.toggle('active', lang === 'ar');

  try { localStorage.setItem('lgp-lang', lang); } catch (_) {}
}
// Expose for inline onclick handlers in the drawer
window.setLang = setLang;

document.getElementById('btnFr')?.addEventListener('click', () => setLang('fr'));
document.getElementById('btnAr')?.addEventListener('click', () => setLang('ar'));

// Restore saved language on load
try {
  const saved = localStorage.getItem('lgp-lang');
  if (saved && saved !== 'fr') setLang(saved);
} catch (_) {}

/* ─── NAVBAR SCROLL ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── HAMBURGER + DRAWER ────────────────────────────── */
const drawer = document.getElementById('mobileDrawer');
const ham    = document.getElementById('hamburger');
const dClose = document.getElementById('drawerClose');

function openDrawer(){
  drawer?.classList.add('open');
  ham?.setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';  // lock background scroll
}
function closeDrawer(){
  drawer?.classList.remove('open');
  ham?.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}
ham?.addEventListener('click', openDrawer);
dClose?.addEventListener('click', closeDrawer);
document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', closeDrawer));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

/* ─── MENU TABS ─────────────────────────────────────── */
document.getElementById('menuTabs')?.addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const tab = btn.dataset.tab;
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + tab)?.classList.add('active');
  document.querySelectorAll('#panel-' + tab + ' .reveal').forEach(el => {
    el.classList.remove('visible');
    setTimeout(() => el.classList.add('visible'), 10);
  });
});

/* ─── SCROLL REVEAL ─────────────────────────────────── */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
} else {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ─── LIGHTBOX ──────────────────────────────────────── */
function openLb(el) {
  const img = el.querySelector('img');
  if (!img) return;
  document.getElementById('lbImg').src = img.src.replace('w=500','w=1400').replace('w=600','w=1400');
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
window.openLb = openLb;
window.closeLb = closeLb;
document.getElementById('lightbox')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLb();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
// Keyboard activation for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(item); }
  });
});

/* ─── WHATSAPP ORDER ────────────────────────────────── */
function waOrder() {
  const msg = currentLang === 'ar'
    ? 'مرحباً، أرغب في تقديم طلب.'
    : 'Bonjour, je voudrais passer une commande.';
  window.open('https://wa.me/213549526900?text=' + encodeURIComponent(msg), '_blank', 'noopener');
}
window.waOrder = waOrder;

/* ─── COUNT-UP STATS ────────────────────────────────── */
if (!reduceMotion) {
  const cuObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cuObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.stat-num').forEach(el => cuObs.observe(el));
} else {
  document.querySelectorAll('.stat-num').forEach(el => {
    el.textContent = (el.dataset.count || '') + (el.dataset.suffix || '');
  });
}
