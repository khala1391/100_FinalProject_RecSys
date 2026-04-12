// ===== DATA LOADER =====
// Loads genres.json and books.json, then calls window.onDataReady() if defined

let genres = [];
let books = [];

async function loadData() {
  try {
    const [gRes, bRes] = await Promise.all([
      fetch('data/genres.json'),
      fetch('data/books.json')
    ]);
    genres = await gRes.json();
    books = await bRes.json();
  } catch (e) {
    console.warn('JSON load failed, using inline fallback', e);
  }
  if (typeof window.onDataReady === 'function') window.onDataReady();
}

document.addEventListener('DOMContentLoaded', loadData);
