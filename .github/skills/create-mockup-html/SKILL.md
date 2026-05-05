---
name: create-mockup-html
description: 'Create HTML mockup pages for the Greed Route book recommendation app. Use when: building a new page mockup, wireframing a UI screen, adding a placeholder page, scaffolding HTML from a description or feature spec. Produces ready-to-use HTML files that match the project style (Sarabun/Prompt fonts, CSS variables, dark-mode support, Thai + English bilingual data-th/data-en attributes, component injection via components.js).'
argument-hint: "Page name and description, e.g. 'user-profile page showing reading history and badges'"
---

# Create Mockup HTML

## When to Use
- A new page needs to be stubbed out (e.g. `user-profile.html`, `notifications.html`)
- Quickly wireframing a UI concept to match existing pages
- Adding a screen that does not yet exist in the project

## Project Conventions (must follow)

| Convention                                             | Detail                                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `<html lang="th" data-theme="light">`                  | All pages start with this                                                               |
| `<link rel="stylesheet" href="css/style.css">`         | Single shared stylesheet                                                                |
| `<body data-page="<pagename>">`                        | Unique page identifier                                                                  |
| `<!-- Header/Nav/Footer injected by components.js -->` | Do NOT inline header/footer                                                             |
| `<script src="js/components.js" defer></script>`       | Always include at end of body                                                           |
| `data-th="…" data-en="…"`                              | Bilingual attributes on ALL visible labels                                              |
| CSS variables                                          | Use only vars from `:root` (e.g. `--primary`, `--card-bg`, `--text`)                    |
| Fonts                                                  | `'Sarabun'` for body, `'Prompt'` for headings — loaded via Google Fonts in `<head>`     |
| Layout                                                 | `<main class="container">` → `<div class="page-layout">` → `<div class="main-content">` |
| Placeholder images                                     | `<div class="ph-cover placeholder-img" style="width:Xpx;height:Ypx">📸</div>`          |

## CSS Variable Quick Reference

```css
/* Colors */
--primary-dark: #7B4019   --primary: #FF7D29   --primary-light: #FFBF78
--secondary-bg: #F2EAE0   --secondary-blue: #B4D3D9
--bg: #ffffff             --bg-alt: #f9f5f0    --card-bg: #ffffff
--text: #2d2217           --text-secondary: #6b5c4e  --text-muted: #9a8b7c
--border: #e5ddd4         --shadow: rgba(123,64,25,0.08)
--radius: 12px            --radius-sm: 8px     --transition: 0.3s ease
--star: #ffcf3f           --success: #48bb78   --danger: #e53e3e
```

## Procedure

1. **Clarify** the page name (becomes `data-page` and the filename, e.g. `user-profile`)
2. **Identify** the main content blocks from the user's description (cards, lists, tabs, forms, etc.)
3. **Scaffold** using the [Base Template](#base-template) below
4. **Populate** content sections — use placeholder data consistent with the book-rec domain (titles, authors, ratings, genres)
5. **Apply bilingual labels** — every visible text element must have `data-th` and `data-en`
6. **Validate structure**:
   - No inline `<header>` / `<footer>` (injected by `components.js`)
   - No hardcoded hex colors (use CSS variables only)
   - Dark-mode class does not need extra CSS — variables handle it
7. **Save** the file to the project root alongside existing pages

## Base Template

```html
<!DOCTYPE html>
<html lang="th" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Greed Route — PAGE_TITLE</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body data-page="PAGE_NAME">

<!-- Header/Nav/Footer injected by components.js -->

<main class="container">
  <div class="page-layout">
    <div class="main-content">

      <!-- SECTION: Page Heading -->
      <div class="section-block">
        <div class="section-header">
          <h2 data-th="THAI_TITLE" data-en="ENGLISH_TITLE">THAI_TITLE</h2>
        </div>
        <!-- cards / lists / tabs go here -->
      </div>

    </div>
    <!-- Optional sidebar: <aside class="sidebar"> … </aside> -->
  </div>
</main>

<script src="js/components.js" defer></script>
<script src="js/data.js" defer></script>
</body>
</html>
```

## Common UI Patterns

### Card
```html
<div class="book-card">
  <div class="ph-cover placeholder-img" style="width:80px;height:110px;border-radius:var(--radius-sm)">📸</div>
  <div>
    <h4>Book Title</h4>
    <p class="text-secondary">Author Name</p>
    <div class="star-row">⭐⭐⭐⭐☆ <span class="text-muted">4.0</span></div>
  </div>
</div>
```

### Tabs
```html
<div class="tabs">
  <div class="tab active" data-tab="tab1" data-th="แท็บ 1" data-en="Tab 1">แท็บ 1</div>
  <div class="tab"        data-tab="tab2" data-th="แท็บ 2" data-en="Tab 2">แท็บ 2</div>
</div>
<div id="tab-tab1"><!-- content --></div>
<div id="tab-tab2" hidden><!-- content --></div>
```

### Form Field
```html
<div class="form-group">
  <label data-th="ฉลาก" data-en="Label">ฉลาก</label>
  <input type="text" class="input" placeholder="…">
</div>
```

## Output Checklist

- [ ] Filename is lowercase, hyphenated, `.html` extension, placed at project root
- [ ] `data-page` matches filename (without extension)
- [ ] All visible strings have `data-th` + `data-en`
- [ ] Only CSS variables used for colors/spacing
- [ ] No `<header>` / `<footer>` inlined
- [ ] `components.js` script tag present at end of `<body>`
