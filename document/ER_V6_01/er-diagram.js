// ========== SCHEMA DEFINITIONS ==========
const TABLES = {
  user_book_event: {
    label: "user_book_event",
    type: "fact",
    fields: [
      { name: "book_event_id", pk: true },
      { name: "timestamp" },
      { name: "session_id" },
      { name: "user_id", fk: "user" },
      { name: "book_id", fk: "book" },
      { name: "device_id", fk: "device" },
      { name: "traffic_source_id", fk: "traffic_source" },
      { name: "store_id", fk: "book_store" },
      { name: "event_type" },
      { name: "rating" },
      { name: "review_message" },
      { name: "dwell_time_seconds" },
      { name: "scroll_depth_pct" },
      { name: "discovery_channel", fk: "discovery_channel" },
      { name: "referrer_url" },
      { name: "intent_level", fk: "level_of_intent" },
    ]
  },
  recommendation_log: {
    label: "recommendation_log",
    type: "fact",
    fields: [
      { name: "rec_log_id", pk: true },
      { name: "timestamp" },
      { name: "user_id", fk: "user" },
      { name: "book_id", fk: "book" },
      { name: "rec_algorithm" },
      { name: "rec_position" },
      { name: "was_clicked" },
      { name: "was_rated" },
    ]
  },
  user: {
    label: "user",
    type: "dim",
    fields: [
      { name: "user_id", pk: true },
      { name: "name" },
      { name: "email" },
      { name: "birth_year" },
      { name: "sex" },
      { name: "occupation" },
      { name: "marital_status" },
      { name: "religion" },
      { name: "hobbies" },
      { name: "education_level" },
      { name: "salary_range" },
      { name: "preferred_language_id", fk: "language" },
      { name: "age_group" },
      { name: "onboarding_completed" },
    ]
  },
  book: {
    label: "book",
    type: "dim",
    fields: [
      { name: "book_id", pk: true },
      { name: "title_th" },
      { name: "title_en" },
      { name: "author" },
      { name: "genre_id", fk: "genre" },
      { name: "publisher_id", fk: "publisher" },
      { name: "language_id", fk: "language" },
      { name: "publication_date" },
      { name: "price" },
      { name: "number_of_pages" },
      { name: "isbn" },
      { name: "description" },
      { name: "cover_url" },
      { name: "avg_rating" },
      { name: "rating_count" },
      { name: "view_count" },
    ]
  },
  genre: {
    label: "genre",
    type: "dim",
    fields: [
      { name: "genre_id", pk: true },
      { name: "subgenre_of_id" },
      { name: "genre_name_th" },
      { name: "genre_name_en" },
      { name: "subgenre_of_name_th" },
      { name: "subgenre_of_name_en" },
      { name: "description_th" },
      { name: "description_en" },
    ]
  },
  publisher: {
    label: "publisher",
    type: "dim",
    fields: [
      { name: "publisher_id", pk: true },
      { name: "publisher_name" },
    ]
  },
  publisher_promotion: {
    label: "publisher_promotion",
    type: "dim",
    fields: [
      { name: "promotion_id", pk: true },
      { name: "book_id", fk: "book" },
      { name: "publisher_id", fk: "publisher" },
      { name: "promotion_budget" },
      { name: "promotion_start_date" },
      { name: "promotion_end_date" },
    ]
  },
  book_store_promotion: {
    label: "book_store_promotion",
    type: "dim",
    fields: [
      { name: "promotion_id", pk: true },
      { name: "book_id", fk: "book" },
      { name: "store_id", fk: "book_store" },
      { name: "promotion_budget" },
      { name: "promotion_start_date" },
      { name: "promotion_end_date" },
      { name: "affiliate_link" },
    ]
  },
  book_store: {
    label: "book_store",
    type: "dim",
    fields: [
      { name: "store_id", pk: true },
      { name: "store_name" },
      { name: "store_location" },
      { name: "store_url" },
    ]
  },
  book_tag: {
    label: "book_tag",
    type: "dim",
    fields: [
      { name: "book_id", fk: "book" },
      { name: "tag_id", fk: "tag" },
    ]
  },
  tag: {
    label: "tag",
    type: "dim",
    fields: [
      { name: "tag_id", pk: true },
      { name: "tag_name" },
    ]
  },
  language: {
    label: "language",
    type: "dim",
    fields: [
      { name: "language_id", pk: true },
      { name: "language_name" },
      { name: "language_code" },
    ]
  },
  device: {
    label: "device",
    type: "dim",
    fields: [
      { name: "device_id", pk: true },
      { name: "device_type" },
    ]
  },
  traffic_source: {
    label: "traffic_source",
    type: "dim",
    fields: [
      { name: "traffic_source_id", pk: true },
      { name: "traffic_source_name" },
    ]
  },
  discovery_channel: {
    label: "discovery_channel",
    type: "dim",
    fields: [
      { name: "discovery_channel_id", pk: true },
      { name: "channel_name" },
    ]
  },
  level_of_intent: {
    label: "level_of_intent",
    type: "dim",
    fields: [
      { name: "intent_level", pk: true },
      { name: "event_type" },
      { name: "description" },
    ]
  },
  user_genre_preference: {
    label: "user_genre_preference",
    type: "dim",
    fields: [
      { name: "user_id", fk: "user" },
      { name: "genre_id", fk: "genre" },
      { name: "preference_score" },
    ]
  },
  user_system_event: {
    label: "user_system_event",
    type: "dim",
    fields: [
      { name: "system_event_id", pk: true },
      { name: "user_id", fk: "user" },
      { name: "event_type" },
      { name: "timestamp" },
      { name: "registration_date" },
      { name: "last_login_date" },
    ]
  },
};

// ========== MODEL DEFINITIONS ==========
// table -> [fields used]
const MODELS = [
  {
    id: 1,
    name: "Content-Based by Demographic",
    shortName: "CB Demographic",
    fields: {
      user: ["user_id", "birth_year", "education_level", "hobbies", "marital_status", "occupation", "religion", "salary_range", "sex"],
    }
  },
  {
    id: 2,
    name: "Content-Based by Metadata",
    shortName: "CB Metadata",
    fields: {
      book: ["book_id", "title_en", "author", "description"],
      genre: ["genre_name_en", "subgenre_of_name_en"],
    }
  },
  {
    id: 3,
    name: "Content-Based by Behavior",
    shortName: "CB Behavior",
    fields: {
      user_book_event: ["user_id", "book_id", "intent_level", "timestamp"],
    }
  },
  {
    id: 4,
    name: "Collaborative Filtering by Keyword Embedding",
    shortName: "CF Keyword",
    fields: {
      user_book_event: ["book_id", "review_message"],
    }
  },
  {
    id: 5,
    name: "Collaborative Filtering by Item with Rating",
    shortName: "CF Item Rating",
    fields: {
      user_book_event: ["book_id", "rating"],
    }
  },
  {
    id: 6,
    name: "Collaborative Filtering by User with Rating",
    shortName: "CF User Rating",
    fields: {
      user_book_event: ["user_id", "rating"],
    }
  },
];

// ========== TABLE HEADER COLORS ==========
const TABLE_HEADER_COLORS = {
  user_genre_preference: '#d1f5cc',
  user_system_event:     '#d1f5cc',
  user:                  '#d1f5cc',
  discovery_channel:     '#e6e2cb',
  device:                '#e6e2cb',
  traffic_source:        '#e6e2cb',
  level_of_intent:       '#f5dead',
  user_book_event:       '#f5dead',
  recommendation_log:    '#f5dead',
  book_store_promotion:  '#dddcfb',
  book_store:            '#dddcfb',
  publisher:             '#d5e4fc',
  publisher_promotion:   '#d5e4fc',
  book:                  '#f6d8f3',
  book_tag:              '#f6d8f3',
  genre:                 '#f6d8f3',
  language:              '#f6d8f3',
  tag:                   '#f6d8f3',
};

// ========== SAMPLE DATA ==========
const SAMPLE_DATA = {
  user_book_event: {
    cols: ["book_event_id","timestamp","session_id","user_id","book_id","device_id","traffic_source_id","store_id","event_type","rating","review_message","dwell_time_seconds","scroll_depth_pct","discovery_channel","referrer_url","intent_level"],
    rows: [
      ["a1858ddf","2024-10-29T21:52","198a4bba","1","97033e89","1","2","","genre_view","","","11","27","store_page","/store/7","0"],
      ["f6a81f2c","2024-10-29T21:55","198a4bba","1","97033e89","1","2","","preview","","","5","48","store_page","/store/7","1"],
      ["386fec82","2024-10-29T21:57","198a4bba","1","97033e89","1","2","","view_details","","","162","46","store_page","/store/7","2"],
    ]
  },
  recommendation_log: {
    cols: ["rec_log_id","timestamp","user_id","book_id","rec_algorithm","rec_position","was_clicked","was_rated"],
    rows: [
      ["1","2024-06-25T20:04","48","dd4864e9","hybrid","1","False","False"],
      ["2","2024-06-17T23:43","343","b6f41885","hybrid","6","False","False"],
      ["3","2024-11-05T19:59","895","c54efba6","popular","15","False","False"],
    ]
  },
  user: {
    cols: ["user_id","name","birth_year","sex","occupation","marital_status","religion","hobbies","education_level","salary_range","age_group"],
    rows: [
      ["1","ธนากร ชัยภูมิ","1965","female","freelancer","other","Buddhism","reading,cooking","high_school","20k-50k","senior"],
      ["2","ไอซ์ แสงดาว","1964","female","engineer","married","Christianity","sports,music","bachelor","100k+","senior"],
      ["3","ปิยะ รักษ์ไทย","1989","male","professional","married","Buddhism","traveling,yoga","master","100k+","adult"],
    ]
  },
  book: {
    cols: ["book_id","title_en","author","genre_id","publisher_id","language_id","price","avg_rating","description"],
    rows: [
      ["5dce6a93","Shadows of Memory","อรุณี ชัยวัฒน์","1","2","2","214.72","0.0","When memories return..."],
      ["be668812","Whispers on the Wind","วิศรุต สุวรรณ","1","3","1","544.33","3.0","In a small village..."],
      ["84f84432","The Bridge Across Time","ดร. สุรเดช","1","27","1","818.30","0.0","A brilliant physicist..."],
    ]
  },
  genre: {
    cols: ["genre_id","genre_name_en","subgenre_of_name_en","description_en"],
    rows: [
      ["1","Fiction","","Top-level genre: Fiction"],
      ["2","Non-Fiction","","Top-level genre: Non-Fiction"],
      ["3","Science Fiction","","Top-level genre: Science Fiction"],
    ]
  },
  publisher: {
    cols: ["publisher_id","publisher_name"],
    rows: [["1","สำนักพิมพ์แจ่มใส"],["2","สำนักพิมพ์ผีเสื้อ"],["3","สำนักพิมพ์มติชน"]]
  },
  publisher_promotion: {
    cols: ["promotion_id","book_id","publisher_id","promotion_budget","promotion_start_date","promotion_end_date"],
    rows: [
      ["1","c2120b9c","20","301646.74","2025-10-14","2025-10-21"],
      ["2","ed359a9d","20","138276.28","2024-09-21","2024-11-16"],
    ]
  },
  book_store_promotion: {
    cols: ["promotion_id","book_id","store_id","promotion_budget","promotion_start_date","promotion_end_date","affiliate_link"],
    rows: [
      ["1","218911c9","4","93911.39","2024-01-27","2024-03-23","https://track.example.com/4/7e71"],
      ["2","cbd4883e","11","36818.04","2024-07-13","2024-07-20","https://track.example.com/11/e53b"],
    ]
  },
  book_store: {
    cols: ["store_id","store_name","store_location","store_url"],
    rows: [["1","SE-ED","Bangkok","se-ed.com"],["2","Naiin","Bangkok","naiin.com"],["3","Kinokuniya TH","Bangkok","kinokuniya.co.th"]]
  },
  book_tag: {
    cols: ["book_id","tag_id"],
    rows: [["53858530","44"],["8160278a","48"],["c9e259e6","56"]]
  },
  tag: {
    cols: ["tag_id","tag_name"],
    rows: [["1","bestseller"],["2","award-winner"],["3","page-turner"]]
  },
  language: {
    cols: ["language_id","language_name","language_code"],
    rows: [["1","Thai","th"],["2","English","en"],["3","Japanese","ja"]]
  },
  device: {
    cols: ["device_id","device_type"],
    rows: [["1","mobile"],["2","desktop"],["3","tablet"]]
  },
  traffic_source: {
    cols: ["traffic_source_id","traffic_source_name"],
    rows: [["1","app"],["2","website"],["3","email"]]
  },
  discovery_channel: {
    cols: ["discovery_channel_id","channel_name"],
    rows: [["1","rec_collaborative"],["2","rec_content"],["3","rec_popular"]]
  },
  level_of_intent: {
    cols: ["intent_level","event_type","description"],
    rows: [["0","genre_view","Scrolling a genre/category"],["1","preview","Hovering over a book card"],["2","view_details","Clicking a book for full details"]]
  },
  user_genre_preference: {
    cols: ["user_id","genre_id","preference_score"],
    rows: [["1","96","4"],["1","41","2"],["1","75","1"]]
  },
  user_system_event: {
    cols: ["system_event_id","user_id","event_type","timestamp","registration_date","last_login_date"],
    rows: [
      ["1","1","register","2024-03-31T14:01","2024-03-31",""],
      ["2","1","login","2024-03-31T15:01","","2024-03-31"],
    ]
  },
};

// ========== STATE ==========
let selectedModel = null;

// ========== COMPUTE USED FIELDS (across all models) ==========
function getAllModelFields() {
  const used = {}; // tableName -> Set of field names
  MODELS.forEach(m => {
    Object.entries(m.fields).forEach(([tbl, fields]) => {
      if (!used[tbl]) used[tbl] = new Set();
      fields.forEach(f => used[tbl].add(f));
    });
  });
  return used;
}

const ALL_MODEL_FIELDS = getAllModelFields();

function isFieldUsedInAnyModel(tableName, fieldName) {
  return !!(ALL_MODEL_FIELDS[tableName] && ALL_MODEL_FIELDS[tableName].has(fieldName));
}

function isFieldActiveInSelectedModel(tableName, fieldName) {
  if (!selectedModel) return false;
  const m = MODELS.find(x => x.id === selectedModel);
  if (!m || !m.fields[tableName]) return false;
  return m.fields[tableName].includes(fieldName);
}

// ========== BUILD TABLE ELEMENT ==========
function buildTableEl(tableName) {
  const tbl = TABLES[tableName];
  const div = document.createElement('div');
  div.className = 'er-table' + (tbl.type === 'fact' ? ' fact-table' : '');
  div.id = 'tbl-' + tableName;

  const header = document.createElement('div');
  header.className = 'table-header';
  // Apply per-group header color
  const hColor = TABLE_HEADER_COLORS[tableName] || '#f1f5f9';
  header.style.background = hColor;
  header.innerHTML = `<span>${tbl.label}</span><span class="table-badge ${tbl.type === 'fact' ? 'fact' : ''}">${tbl.type}</span>`;
  div.appendChild(header);

  tbl.fields.forEach(f => {
    const row = document.createElement('div');
    row.className = 'field-row';
    row.dataset.table = tableName;
    row.dataset.field = f.name;

    let icon = '';
    if (f.pk) icon = '<span class="field-pk-icon" title="Primary Key">🔑</span>';
    else if (f.fk) icon = '<span class="field-fk-icon" title="Foreign Key → ' + f.fk + '">🔗</span>';

    row.innerHTML = icon + `<span class="field-name">${f.name}</span>`;

    if (isFieldUsedInAnyModel(tableName, f.name)) {
      row.classList.add('used-in-model');
    } else {
      row.classList.add('unused-field');
    }

    div.appendChild(row);
  });

  // Show popup on hover
  div.addEventListener('mouseenter', () => showTablePopup(tableName, div));

  return div;
}

// ========== UPDATE FIELD CLASSES AFTER MODEL CHANGE ==========
function updateFieldClasses() {
  document.querySelectorAll('.field-row').forEach(row => {
    const t = row.dataset.table;
    const f = row.dataset.field;
    row.classList.remove('active-field');

    if (isFieldActiveInSelectedModel(t, f)) {
      row.classList.add('active-field');
    }
  });
}

// ========== TABLE POPUP ==========
let activePopupTable = null;

function showTablePopup(tableName, triggerEl) {
  const tbl = TABLES[tableName];
  const data = SAMPLE_DATA[tableName];
  const hColor = TABLE_HEADER_COLORS[tableName] || '#f1f5f9';
  const popup = document.getElementById('table-popup');

  // Build fields panel
  const m = selectedModel ? MODELS.find(x => x.id === selectedModel) : null;
  const activeFields = m && m.fields[tableName] ? new Set(m.fields[tableName]) : new Set();

  let fieldsHtml = '';
  tbl.fields.forEach(f => {
    let icon = '';
    if (f.pk) icon = '<span class="field-pk-icon">🔑</span>';
    else if (f.fk) icon = '<span class="field-fk-icon">🔗</span>';
    const isUsed = isFieldUsedInAnyModel(tableName, f.name);
    const isActive = activeFields.has(f.name);
    const cls = isActive ? 'active-field' : (isUsed ? '' : 'unused-field');
    fieldsHtml += `<div class="tpopup-field-row ${cls}">${icon}<span class="field-name">${f.name}</span></div>`;
  });

  // Build data table panel
  let dataHtml = '';
  if (data) {
    dataHtml = '<table class="tpopup-table"><thead><tr>';
    data.cols.forEach(c => {
      dataHtml += `<th class="${activeFields.has(c) ? 'active-col' : ''}">${c}</th>`;
    });
    dataHtml += '</tr></thead><tbody>';
    data.rows.forEach(row => {
      dataHtml += '<tr>';
      row.forEach((cell, i) => {
        dataHtml += `<td class="${activeFields.has(data.cols[i]) ? 'active-col' : ''}" title="${cell}">${cell}</td>`;
      });
      dataHtml += '</tr>';
    });
    dataHtml += '</tbody></table>';
  }

  popup.innerHTML = `
    <div class="tpopup-header" style="background:${hColor}">
      <span>📋 ${tbl.label}<span class="tpopup-badge ${tbl.type === 'fact' ? 'fact' : ''}">${tbl.type}</span></span>
      <span class="tpopup-close" id="tpopup-close-btn">✕</span>
    </div>
    <div class="tpopup-body">
      <div class="tpopup-fields">${fieldsHtml}</div>
      ${data ? `<div class="tpopup-data">${dataHtml}</div>` : ''}
    </div>
    <div class="tpopup-hint">Schema fields · ${data ? data.rows.length + ' sample rows' : 'no sample data'} · click outside to close</div>
  `;

  popup.classList.add('visible');
  activePopupTable = tableName;

  // Position popup next to trigger card
  positionPopup(popup, triggerEl);

  document.getElementById('tpopup-close-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    hideTablePopup();
  });
}

function positionPopup(popup, triggerEl) {
  const rect = triggerEl.getBoundingClientRect();
  const popW = Math.min(820, window.innerWidth * 0.92);
  const popH = Math.min(window.innerHeight * 0.8, 480);
  const margin = 10;
  let x = rect.right + margin;
  let y = rect.top;
  if (x + popW > window.innerWidth) x = rect.left - popW - margin;
  if (x < margin) x = margin;
  if (y + popH > window.innerHeight) y = window.innerHeight - popH - margin;
  if (y < margin) y = margin;
  popup.style.left = x + 'px';
  popup.style.top = y + 'px';
  popup.style.maxWidth = popW + 'px';
  popup.style.maxHeight = popH + 'px';
}

function hideTablePopup() {
  document.getElementById('table-popup').classList.remove('visible');
  activePopupTable = null;
}

function refreshPopupIfOpen() {
  if (!activePopupTable) return;
  const triggerEl = document.getElementById('tbl-' + activePopupTable);
  if (triggerEl) showTablePopup(activePopupTable, triggerEl);
}

// ========== MODEL DROPDOWN ==========
function toggleDropdown() {
  document.getElementById('model-dropdown').classList.toggle('open');
}

function selectModel(id) {
  selectedModel = id;
  document.getElementById('model-dropdown').classList.remove('open');
  const m = id ? MODELS.find(x => x.id === id) : null;
  const label = document.getElementById('active-model-label');
  if (m) {
    label.innerHTML = `Model: <span>#${m.id} ${m.shortName}</span>`;
  } else {
    label.innerHTML = `Model: <span>None selected</span>`;
  }
  // Update dropdown highlights
  document.querySelectorAll('.model-option').forEach(el => {
    el.classList.toggle('selected', parseInt(el.dataset.id) === id);
  });
  updateFieldClasses();
  updateMatrixHighlight();
  refreshPopupIfOpen();
}

document.addEventListener('click', (e) => {
  const dd = document.getElementById('model-dropdown');
  if (!document.getElementById('model-btn').contains(e.target) && !dd.contains(e.target)) {
    dd.classList.remove('open');
  }
  // Close popup when clicking outside table card and popup
  const popup = document.getElementById('table-popup');
  if (popup && popup.classList.contains('visible')) {
    if (!popup.contains(e.target) && !e.target.closest('.er-table')) {
      hideTablePopup();
    }
  }
});

// ========== INIT ==========
function init() {
  const canvas = document.getElementById('er-canvas');
  const layout = canvas.querySelector('.er-layout');

  // Primary (model-used) tables first, then the rest
  const tableOrder = [
    'user_book_event', 'user', 'book', 'genre',
    'recommendation_log', 'publisher', 'language', 'device',
    'traffic_source', 'discovery_channel', 'level_of_intent',
    'book_tag', 'tag', 'book_store', 'book_store_promotion',
    'publisher_promotion', 'user_genre_preference', 'user_system_event'
  ];

  tableOrder.forEach(name => {
    layout.appendChild(buildTableEl(name));
  });

  // Build model dropdown
  const dd = document.getElementById('model-dropdown');
  MODELS.forEach(m => {
    const opt = document.createElement('div');
    opt.className = 'model-option';
    opt.dataset.id = m.id;
    opt.innerHTML = `<span class="model-num">#${m.id}</span>${m.name}`;
    opt.addEventListener('click', () => selectModel(m.id));
    dd.appendChild(opt);
  });

  const clr = document.createElement('div');
  clr.className = 'model-clear';
  clr.textContent = '✕ Clear selection';
  clr.addEventListener('click', () => selectModel(null));
  dd.appendChild(clr);

  // Build features matrix
  buildFeaturesMatrix();
}

// ========== FEATURES MATRIX ==========
function buildFeaturesMatrix() {
  const container = document.getElementById('features-matrix');
  if (!container) return;

  // Collect unique table.field pairs used in any model
  const rowsMap = new Map();
  MODELS.forEach(m => {
    Object.entries(m.fields).forEach(([tbl, fields]) => {
      fields.forEach(f => {
        const key = tbl + '\x00' + f;
        if (!rowsMap.has(key)) rowsMap.set(key, { tbl, field: f });
      });
    });
  });
  const rows = Array.from(rowsMap.values());

  let html = '<table class="features-table"><thead><tr>';
  html += '<th class="ft-feature-col">Feature (table · field)</th>';
  MODELS.forEach(m => {
    html += `<th class="ft-model-col model-color-${m.id}" data-model-id="${m.id}">#${m.id} ${m.shortName}</th>`;
  });
  html += '</tr></thead><tbody>';

  rows.forEach(r => {
    html += '<tr>';
    html += `<td class="ft-feature-name"><span class="ft-table-tag">${r.tbl}</span> <span class="ft-field-name">${r.field}</span></td>`;
    MODELS.forEach(m => {
      const used = m.fields[r.tbl] && m.fields[r.tbl].includes(r.field);
      html += `<td class="ft-cell${used ? ' ft-used model-color-' + m.id : ''}" data-model-id="${m.id}">${used ? '&#10003;' : ''}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;

  // Click model header to select/deselect
  container.querySelectorAll('.ft-model-col').forEach(th => {
    th.addEventListener('click', () => {
      const id = parseInt(th.dataset.modelId);
      selectModel(selectedModel === id ? null : id);
    });
  });
}

function updateMatrixHighlight() {
  document.querySelectorAll('.ft-model-col').forEach(th => {
    th.classList.toggle('selected-col', parseInt(th.dataset.modelId) === selectedModel);
  });
  document.querySelectorAll('.ft-cell').forEach(td => {
    td.classList.toggle('selected-col', parseInt(td.dataset.modelId) === selectedModel);
  });
}

window.addEventListener('DOMContentLoaded', init);
