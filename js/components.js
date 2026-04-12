// ===== SHARED COMPONENTS =====
// Injects header, footer, mobile nav, genre modal across all pages.
// Each page includes this via <script src="js/components.js"></script>

// --- State ---
let lang = localStorage.getItem('gr_lang') || 'th';
let currentPage = document.body.dataset.page || 'home';

// --- Helpers ---
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const t = (obj, key) => lang === 'en' ? (obj[key+'_en'] || obj[key+'_th']) : (obj[key+'_th'] || obj[key+'_en']);

// --- Page file mapping ---
const pageFiles = {
  'home': 'index.html',
  'mybooks': 'mybooks.html',
  'browse-rec': 'browse-rec.html',
  'browse-choice': 'browse-choice.html',
  'browse-new': 'browse-new.html',
  'browse-list': 'browse-list.html',
  'browse-explore': 'browse-explore.html',
  'browse-news': 'browse-news.html',
  'community-groups': 'community-groups.html',
  'community-discuss': 'community-discuss.html',
  'community-quotes': 'community-quotes.html',
  'about': 'about.html',
  'contact': 'contact.html',
  'faq': 'faq.html'
};

function pageHref(page) {
  return pageFiles[page] || 'index.html';
}

// --- Inject Header ---
function injectHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
  <div class="header-inner">
    <div class="logo">
      <a href="index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none">
        <img src="image/logo/logo_icon.png" alt="Greed Route" onerror="this.style.display='none'">
        <span class="logo-text">Greed Route</span>
      </a>
    </div>

    <nav class="nav" id="mainNav">
      <a href="index.html" class="nav-item${currentPage==='home'?' active':''}" data-th="หน้าแรก" data-en="Home">หน้าแรก</a>
      <a href="mybooks.html" class="nav-item${currentPage==='mybooks'?' active':''}" data-th="หนังสือของฉัน" data-en="My Books">หนังสือของฉัน</a>
      <div class="nav-item${currentPage.startsWith('browse')?' active':''}">
        <span data-th="สำรวจ ▾" data-en="Browse ▾">สำรวจ ▾</span>
        <div class="nav-dropdown">
          <a href="browse-rec.html" data-th="แนะนำสำหรับคุณ" data-en="Recommendations">แนะนำสำหรับคุณ</a>
          <a href="browse-choice.html" data-th="รางวัล Choice Awards" data-en="Choice Awards">รางวัล Choice Awards</a>
          <a href="browse-new.html" data-th="หนังสือใหม่" data-en="New Releases">หนังสือใหม่</a>
          <a href="browse-list.html" data-th="รายการหนังสือ" data-en="Lists">รายการหนังสือ</a>
          <a href="browse-explore.html" data-th="สำรวจเพิ่มเติม" data-en="Explore">สำรวจเพิ่มเติม</a>
          <a href="browse-news.html" data-th="ข่าวสารและบทสัมภาษณ์" data-en="News &amp; Interviews">ข่าวสารและบทสัมภาษณ์</a>
        </div>
      </div>
      <div class="nav-item${currentPage.startsWith('community')?' active':''}">
        <span data-th="ชุมชน ▾" data-en="Community ▾">ชุมชน ▾</span>
        <div class="nav-dropdown">
          <a href="community-groups.html" data-th="กลุ่ม" data-en="Groups">กลุ่ม</a>
          <a href="community-discuss.html" data-th="สนทนา" data-en="Discussions">สนทนา</a>
          <a href="community-quotes.html" data-th="คำคม" data-en="Quotes">คำคม</a>
        </div>
      </div>
    </nav>

    <div class="header-actions">
      <div class="search-box">
        <span>🔍</span>
        <input type="text" placeholder="${lang==='th'?'ค้นหาหนังสือ...':'Search books...'}" id="searchInput">
      </div>
      <button class="icon-btn" data-tooltip="${lang==='th'?'การแจ้งเตือน':'Notifications'}">🔔<span class="badge">3</span></button>
      <button class="icon-btn" data-tooltip="${lang==='th'?'ข้อความ':'Messages'}">💬</button>
      <button class="icon-btn" data-tooltip="${lang==='th'?'เพื่อน':'Friends'}">👥</button>
      <button class="icon-btn" data-tooltip="${lang==='th'?'โปรไฟล์':'Profile'}">👤</button>

      <div class="toggle-group">
        <span class="toggle-label">🌙</span>
        <label class="toggle-switch">
          <input type="checkbox" id="themeToggle">
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div class="toggle-group">
        <span class="toggle-label" id="langLabel">${lang==='th'?'TH':'EN'}</span>
        <label class="toggle-switch">
          <input type="checkbox" id="langToggle" ${lang==='en'?'checked':''}>
          <span class="toggle-slider"></span>
        </label>
      </div>

      <div class="toggle-group">
        <span class="toggle-label">📱</span>
        <label class="toggle-switch">
          <input type="checkbox" id="mobileToggle">
          <span class="toggle-slider"></span>
        </label>
      </div>

      <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>`;
  document.body.prepend(header);
}

// --- Inject Mobile Nav ---
function injectMobileNav() {
  const nav = document.createElement('div');
  nav.className = 'mobile-nav';
  nav.id = 'mobileNav';
  nav.innerHTML = `
    <a href="index.html" data-th="🏠 หน้าแรก" data-en="🏠 Home">🏠 หน้าแรก</a>
    <a href="mybooks.html" data-th="📚 หนังสือของฉัน" data-en="📚 My Books">📚 หนังสือของฉัน</a>

    <div class="mobile-nav-group">
      <div class="mobile-nav-group-title" data-th="📖 สำรวจ" data-en="📖 Browse">📖 ${lang==='th'?'สำรวจ':'Browse'}</div>
      <div class="mobile-nav-grid">
        <a href="browse-rec.html" data-th="⭐ แนะนำ" data-en="⭐ Recommendations">⭐ ${lang==='th'?'แนะนำ':'Recommendations'}</a>
        <a href="browse-choice.html" data-th="🏆 Choice Awards" data-en="🏆 Choice Awards">🏆 Choice Awards</a>
        <a href="browse-new.html" data-th="🆕 หนังสือใหม่" data-en="🆕 New Releases">🆕 ${lang==='th'?'หนังสือใหม่':'New Releases'}</a>
        <a href="browse-list.html" data-th="📋 รายการ" data-en="📋 Lists">📋 ${lang==='th'?'รายการ':'Lists'}</a>
        <a href="browse-explore.html" data-th="🔭 สำรวจ" data-en="🔭 Explore">🔭 ${lang==='th'?'สำรวจ':'Explore'}</a>
        <a href="browse-news.html" data-th="📰 ข่าวสาร" data-en="📰 News">📰 ${lang==='th'?'ข่าวสาร':'News'}</a>
      </div>
    </div>

    <div class="mobile-nav-group">
      <div class="mobile-nav-group-title" data-th="💬 ชุมชน" data-en="💬 Community">💬 ${lang==='th'?'ชุมชน':'Community'}</div>
      <div class="mobile-nav-grid">
        <a href="community-groups.html" data-th="👥 กลุ่ม" data-en="👥 Groups">👥 ${lang==='th'?'กลุ่ม':'Groups'}</a>
        <a href="community-discuss.html" data-th="💬 สนทนา" data-en="💬 Discussions">💬 ${lang==='th'?'สนทนา':'Discussions'}</a>
        <a href="community-quotes.html" data-th="💡 คำคม" data-en="💡 Quotes">💡 ${lang==='th'?'คำคม':'Quotes'}</a>
      </div>
    </div>

    <div class="mobile-nav-group">
      <div class="mobile-nav-group-title" data-th="ℹ️ อื่น ๆ" data-en="ℹ️ More">ℹ️ ${lang==='th'?'อื่น ๆ':'More'}</div>
      <div class="mobile-nav-grid">
        <a href="about.html" data-th="ℹ️ เกี่ยวกับ" data-en="ℹ️ About">ℹ️ ${lang==='th'?'เกี่ยวกับ':'About'}</a>
        <a href="contact.html" data-th="📞 ติดต่อ" data-en="📞 Contact">📞 ${lang==='th'?'ติดต่อ':'Contact'}</a>
        <a href="faq.html" data-th="❓ FAQ" data-en="❓ FAQ">❓ FAQ</a>
      </div>
    </div>
  `;
  document.body.querySelector('.header').after(nav);
}

// --- Inject Bottom Nav (Mobile) ---
function injectBottomNav() {
  const nav = document.createElement('div');
  nav.className = 'bottom-nav';
  const items = [
    {page:'home', icon:'🏠', th:'หน้าแรก', en:'Home'},
    {page:'mybooks', icon:'📚', th:'หนังสือ', en:'Books'},
    {page:'browse-rec', icon:'⭐', th:'แนะนำ', en:'For You'},
    {page:'community-discuss', icon:'💬', th:'ชุมชน', en:'Community'},
    {page:'about', icon:'👤', th:'เพิ่มเติม', en:'More'}
  ];
  nav.innerHTML = items.map(i =>
    `<a href="${pageHref(i.page)}" class="${currentPage===i.page?'active':''}">
      <span class="nav-icon">${i.icon}</span>
      <span>${lang==='th'?i.th:i.en}</span>
    </a>`
  ).join('');
  // Insert before footer
  const footer = $('footer.footer');
  if (footer) footer.before(nav);
  else document.body.appendChild(nav);
}

// --- Inject Mobile Toolbar (theme / lang / desktop toggle) ---
function injectMobileToolbar() {
  const savedTheme = localStorage.getItem('gr_theme') || 'light';
  const bar = document.createElement('div');
  bar.className = 'mobile-toolbar';
  bar.id = 'mobileToolbar';
  bar.innerHTML = `
    <div class="mobile-toolbar-item">
      <span>${savedTheme==='dark'?'🌙':'☀️'}</span>
      <label class="toggle-switch">
        <input type="checkbox" id="mobileThemeToggle" ${savedTheme==='dark'?'checked':''}>
        <span class="toggle-slider"></span>
      </label>
      <span class="mobile-toolbar-label" data-th="${savedTheme==='dark'?'มืด':'สว่าง'}" data-en="${savedTheme==='dark'?'Dark':'Light'}">${savedTheme==='dark'?(lang==='th'?'มืด':'Dark'):(lang==='th'?'สว่าง':'Light')}</span>
    </div>
    <div class="mobile-toolbar-item">
      <span>🌐</span>
      <label class="toggle-switch">
        <input type="checkbox" id="mobileLangToggle" ${lang==='en'?'checked':''}>
        <span class="toggle-slider"></span>
      </label>
      <span class="mobile-toolbar-label">${lang==='th'?'TH':'EN'}</span>
    </div>
    <div class="mobile-toolbar-item">
      <span>🖥️</span>
      <button class="mobile-toolbar-btn" id="mobileDesktopBtn" data-th="เดสก์ท็อป" data-en="Desktop">${lang==='th'?'เดสก์ท็อป':'Desktop'}</button>
    </div>
  `;
  // Insert right after bottom-nav
  const bottomNav = $('.bottom-nav');
  if (bottomNav) bottomNav.after(bar);
  else document.body.appendChild(bar);
}

// --- Inject Footer ---
function injectFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
  <div class="footer-grid">
    <div>
      <h4 data-th="บริษัท" data-en="COMPANY">${lang==='th'?'บริษัท':'COMPANY'}</h4>
      <ul>
        <li><a href="about.html">${lang==='th'?'เกี่ยวกับเรา':'About Us'}</a></li>
        <li><a href="#">${lang==='th'?'ร่วมงานกับเรา':'Careers'}</a></li>
        <li><a href="#">${lang==='th'?'ข้อกำหนด':'Terms'}</a></li>
        <li><a href="#">${lang==='th'?'ความเป็นส่วนตัว':'Privacy'}</a></li>
        <li><a href="faq.html">${lang==='th'?'ช่วยเหลือ':'Help'}</a></li>
      </ul>
    </div>
    <div>
      <h4 data-th="เชื่อมต่อ" data-en="CONNECT">${lang==='th'?'เชื่อมต่อ':'CONNECT'}</h4>
      <div class="footer-social">
        <a href="#" title="Facebook">📘</a>
        <a href="#" title="Twitter / X">🐦</a>
        <a href="#" title="Instagram">📷</a>
        <a href="#" title="LinkedIn">🔗</a>
        <a href="#" title="YouTube">▶️</a>
      </div>
    </div>
    <div>
      <h4 data-th="แอปพลิเคชัน" data-en="APPLICATIONS">${lang==='th'?'แอปพลิเคชัน':'APPLICATIONS'}</h4>
      <ul>
        <li><a href="#">📱 iOS</a></li>
        <li><a href="#">🤖 Android</a></li>
      </ul>
    </div>
    <div>
      <h4 data-th="ติดต่อเรา" data-en="CONTACT">${lang==='th'?'ติดต่อเรา':'CONTACT'}</h4>
      <ul>
        <li><a href="contact.html">📞 ${lang==='th'?'ติดต่อ':'Contact'}</a></li>
        <li><a href="faq.html">❓ FAQ</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    © 2026 Greed Route. All rights reserved. — a platform company
  </div>`;
  document.body.appendChild(footer);
}

// --- Genre Modal ---
function injectGenreModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'genreModal';
  overlay.innerHTML = `
  <div class="modal">
    <div class="modal-header">
      <h2>${lang==='th'?'เลือกหมวดหมู่ที่ชื่นชอบ':'Choose Your Favorite Genres'}</h2>
      <button class="modal-close" id="closeGenreModal">✕</button>
    </div>
    <p style="margin-bottom:16px;font-size:.9rem;color:var(--text-secondary)">${lang==='th'?'เลือกอย่างน้อย 3 หมวดหมู่เพื่อรับคำแนะนำหนังสือที่ตรงใจคุณ':'Select at least 3 genres to get personalized book recommendations'}</p>
    <div class="genre-grid" id="genreGrid"></div>
    <div style="text-align:center;margin-top:20px">
      <button class="btn btn-primary" id="saveGenres">${lang==='th'?'บันทึกและเริ่มใช้งาน':'Save & Get Started'}</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
}

function populateGenreModal() {
  const grid = $('#genreGrid');
  if (!grid || !genres.length) return;
  grid.innerHTML = genres.map(g => `
    <label class="genre-checkbox">
      <input type="checkbox" value="${g.id}">
      <div class="genre-label">
        <strong>${lang==='th'?g.th:g.en}</strong>
        <span>${lang==='th'?g.desc_th:g.desc_en}</span>
      </div>
    </label>`).join('');

  const close = $('#closeGenreModal');
  if (close) close.onclick = () => $('#genreModal').classList.remove('show');
  const save = $('#saveGenres');
  if (save) save.onclick = () => {
    const checked = [...$$('#genreGrid input:checked')].map(i=>i.value);
    if (checked.length < 3) { alert(lang==='th'?'กรุณาเลือกอย่างน้อย 3 หมวดหมู่':'Please select at least 3 genres'); return; }
    localStorage.setItem('gr_genres', JSON.stringify(checked));
    $('#genreModal').classList.remove('show');
  };
}

function showGenreModalIfNeeded() {
  if (!localStorage.getItem('gr_genres')) {
    setTimeout(() => {
      const m = $('#genreModal');
      if (m) m.classList.add('show');
    }, 500);
  }
}

// --- Book Card HTML ---
function bookCardHTML(book) {
  const colors = ['#FFBF78','#B4D3D9','#BDA6CE','#9B8EC7','#FFEEA9','#F2EAE0'];
  const c = colors[Math.floor(Math.random()*colors.length)];
  const coverSrc = book.local_cover || book.cover_url || '';
  const title = t(book, 'title');
  const bookId = book.id || book.title_en || title;
  const coverHTML = coverSrc
    ? `<img class="book-cover" src="${coverSrc}" alt="${title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="book-cover ph-cover" style="display:none;background:linear-gradient(135deg,${c},${c}dd);align-items:center;justify-content:center;font-size:.7rem;padding:12px;color:#5a4a3a">${title}</div>`
    : `<div class="book-cover ph-cover" style="background:linear-gradient(135deg,${c},${c}dd);display:flex;align-items:center;justify-content:center;font-size:.7rem;padding:12px;color:#5a4a3a">${title}</div>`;
  const savedRating = getUserRating(bookId);
  const displayRating = savedRating || Math.round(book.rating || 0);
  const starsHTML = [1,2,3,4,5].map(i =>
    `<span class="star${i <= displayRating ? ' filled' : ''}" data-value="${i}" data-book="${encodeURIComponent(bookId)}">★</span>`
  ).join('');
  return `<div class="book-card">
    ${coverHTML}
    <div class="book-title">${title}</div>
    <div class="book-author">${book.author||''}</div>
    <div class="star-rating" data-book="${encodeURIComponent(bookId)}">${starsHTML} <span class="rating-value" style="font-size:.7rem;color:var(--text-muted)">${savedRating ? savedRating+'.0' : (book.rating||'')}</span></div>
    ${shelfDropdownHTML(bookId)}
  </div>`;
}

// --- User Rating Helpers ---
function getUserRating(bookId) {
  const ratings = JSON.parse(localStorage.getItem('gr_ratings') || '{}');
  return ratings[bookId] || 0;
}
function setUserRating(bookId, value) {
  const ratings = JSON.parse(localStorage.getItem('gr_ratings') || '{}');
  ratings[bookId] = value;
  localStorage.setItem('gr_ratings', JSON.stringify(ratings));
}

// --- User Shelf Helpers ---
const shelfOptions = [
  { key: 'to-read',            icon: '📖', th: 'อยากอ่าน',   en: 'Want to Read' },
  { key: 'currently-reading',  icon: '📚', th: 'กำลังอ่าน',  en: 'Currently Reading' },
  { key: 'read',               icon: '✅', th: 'อ่านแล้ว',   en: 'Read' },
  { key: 'did-not-finish',     icon: '🚫', th: 'อ่านไม่จบ',  en: 'Did Not Finish' }
];
function getUserShelf(bookId) {
  const shelves = JSON.parse(localStorage.getItem('gr_shelves') || '{}');
  return shelves[bookId] || 'to-read';
}
function setUserShelf(bookId, shelfKey) {
  const shelves = JSON.parse(localStorage.getItem('gr_shelves') || '{}');
  shelves[bookId] = shelfKey;
  localStorage.setItem('gr_shelves', JSON.stringify(shelves));
}
function shelfDropdownHTML(bookId) {
  const current = getUserShelf(bookId);
  const cur = shelfOptions.find(s => s.key === current) || shelfOptions[0];
  const label = cur.icon + ' ' + (lang==='th' ? cur.th : cur.en);
  const opts = shelfOptions.map(s =>
    `<div class="shelf-option${s.key===current?' active':''}" data-shelf="${s.key}" data-book="${encodeURIComponent(bookId)}">${s.icon} ${lang==='th'?s.th:s.en}</div>`
  ).join('');
  return `<div class="shelf-dropdown" data-book="${encodeURIComponent(bookId)}">
    <button class="shelf-btn btn btn-secondary btn-sm" type="button">${label} ▾</button>
    <div class="shelf-menu">${opts}</div>
  </div>`;
}
function initShelfDropdowns() {
  // Toggle menu
  document.addEventListener('click', e => {
    const btn = e.target.closest('.shelf-btn');
    if (btn) {
      e.stopPropagation();
      const dd = btn.closest('.shelf-dropdown');
      const wasOpen = dd.classList.contains('open');
      $$('.shelf-dropdown.open').forEach(d => d.classList.remove('open'));
      if (!wasOpen) dd.classList.add('open');
      return;
    }
    const opt = e.target.closest('.shelf-option');
    if (opt) {
      const shelfKey = opt.dataset.shelf;
      const bookId = decodeURIComponent(opt.dataset.book);
      setUserShelf(bookId, shelfKey);
      const dd = opt.closest('.shelf-dropdown');
      const cur = shelfOptions.find(s => s.key === shelfKey);
      dd.querySelector('.shelf-btn').textContent = cur.icon + ' ' + (lang==='th'?cur.th:cur.en) + ' ▾';
      dd.querySelectorAll('.shelf-option').forEach(o => o.classList.toggle('active', o.dataset.shelf === shelfKey));
      dd.classList.remove('open');
      return;
    }
    // Close all open dropdowns
    $$('.shelf-dropdown.open').forEach(d => d.classList.remove('open'));
  });
}
function initStarRatings() {
  document.addEventListener('click', e => {
    const star = e.target.closest('.star-rating .star');
    if (!star) return;
    const value = parseInt(star.dataset.value);
    const bookId = decodeURIComponent(star.dataset.book);
    setUserRating(bookId, value);
    const container = star.closest('.star-rating');
    container.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('filled', parseInt(s.dataset.value) <= value);
    });
    const valSpan = container.querySelector('.rating-value');
    if (valSpan) valSpan.textContent = value + '.0';
  });
  // Hover preview
  document.addEventListener('mouseover', e => {
    const star = e.target.closest('.star-rating .star');
    if (!star) return;
    const value = parseInt(star.dataset.value);
    const container = star.closest('.star-rating');
    container.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('hover', parseInt(s.dataset.value) <= value);
    });
  });
  document.addEventListener('mouseout', e => {
    const star = e.target.closest('.star-rating .star');
    if (!star) return;
    star.closest('.star-rating').querySelectorAll('.star').forEach(s => s.classList.remove('hover'));
  });
}

// --- Theme ---
function initTheme() {
  const toggle = $('#themeToggle');
  if (!toggle) return;
  const saved = localStorage.getItem('gr_theme');
  if (saved === 'dark') { document.documentElement.dataset.theme = 'dark'; toggle.checked = true; }
  toggle.onchange = () => {
    const theme = toggle.checked ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('gr_theme', theme);
    // Sync mobile toolbar toggle
    const mobileTheme = $('#mobileThemeToggle');
    if (mobileTheme) {
      mobileTheme.checked = toggle.checked;
      const item = mobileTheme.closest('.mobile-toolbar-item');
      if (item) {
        item.querySelector('span').textContent = toggle.checked ? '🌙' : '☀️';
        const lbl = item.querySelector('.mobile-toolbar-label');
        if (lbl) lbl.textContent = lang==='th'?(toggle.checked?'มืด':'สว่าง'):(toggle.checked?'Dark':'Light');
      }
    }
  };
}

// --- Language ---
function initLanguage() {
  const toggle = $('#langToggle');
  if (!toggle) return;
  toggle.onchange = () => {
    lang = toggle.checked ? 'en' : 'th';
    localStorage.setItem('gr_lang', lang);
    location.reload();
  };
}

// --- Mobile Toggle ---
function initMobile() {
  const toggle = $('#mobileToggle');
  const hamburger = $('#hamburgerBtn');
  if (toggle) {
    const savedMobile = localStorage.getItem('gr_mobile');
    if (savedMobile === 'true') { document.body.classList.add('mobile-view'); toggle.checked = true; }
    toggle.onchange = () => {
      document.body.classList.toggle('mobile-view', toggle.checked);
      localStorage.setItem('gr_mobile', toggle.checked);
    };
  }
  if (hamburger) {
    hamburger.onclick = () => {
      const mn = $('#mobileNav');
      if (mn) mn.classList.toggle('open');
    };
  }
  // --- Mobile toolbar toggles ---
  const mobileTheme = $('#mobileThemeToggle');
  if (mobileTheme) {
    mobileTheme.onchange = () => {
      const theme = mobileTheme.checked ? 'dark' : 'light';
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('gr_theme', theme);
      // Sync header toggle
      const headerTheme = $('#themeToggle');
      if (headerTheme) headerTheme.checked = mobileTheme.checked;
      // Update icon/label
      const item = mobileTheme.closest('.mobile-toolbar-item');
      if (item) {
        item.querySelector('span').textContent = mobileTheme.checked ? '🌙' : '☀️';
        const lbl = item.querySelector('.mobile-toolbar-label');
        if (lbl) { lbl.dataset.th = mobileTheme.checked?'มืด':'สว่าง'; lbl.dataset.en = mobileTheme.checked?'Dark':'Light'; lbl.textContent = lang==='th'?(mobileTheme.checked?'มืด':'สว่าง'):(mobileTheme.checked?'Dark':'Light'); }
      }
    };
  }
  const mobileLang = $('#mobileLangToggle');
  if (mobileLang) {
    mobileLang.onchange = () => {
      lang = mobileLang.checked ? 'en' : 'th';
      localStorage.setItem('gr_lang', lang);
      location.reload();
    };
  }
  const desktopBtn = $('#mobileDesktopBtn');
  if (desktopBtn) {
    desktopBtn.onclick = () => {
      document.body.classList.remove('mobile-view');
      localStorage.setItem('gr_mobile', 'false');
      const headerToggle = $('#mobileToggle');
      if (headerToggle) headerToggle.checked = false;
    };
  }
}

// --- Dropdown toggle for touch ---
function initDropdowns() {
  $$('.nav-item').forEach(item => {
    if (!item.querySelector('.nav-dropdown')) return;
    item.addEventListener('click', e => {
      if (e.target.closest('.nav-dropdown')) return;
      e.stopPropagation();
      const open = item.classList.contains('dropdown-open');
      $$('.nav-item.dropdown-open').forEach(n => n.classList.remove('dropdown-open'));
      if (!open) item.classList.add('dropdown-open');
    });
  });
  document.addEventListener('click', () => {
    $$('.nav-item.dropdown-open').forEach(n => n.classList.remove('dropdown-open'));
  });
}

// --- Update language on all data-th/data-en elements ---
function updateLanguage() {
  $$('[data-th][data-en]').forEach(el => {
    el.textContent = lang === 'th' ? el.dataset.th : el.dataset.en;
  });
}

// ===== INIT ALL SHARED COMPONENTS =====
let _componentsInitialized = false;
function initComponents() {
  if (_componentsInitialized) return;
  _componentsInitialized = true;

  // Apply saved theme immediately
  const savedTheme = localStorage.getItem('gr_theme');
  if (savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';

  injectHeader();
  injectMobileNav();
  injectGenreModal();
  // Page content is in the HTML file itself
  injectBottomNav();
  injectMobileToolbar();
  injectFooter();

  initTheme();
  initLanguage();
  initMobile();
  initDropdowns();
  initStarRatings();
  initShelfDropdowns();
  updateLanguage();
}

// initComponents() is called by each page's onDataReady callback
// (triggered by data.js after JSON loads), so no auto-init here.
