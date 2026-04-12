## Prompt: Book Recommendation System Web App

## Task Description

Create a mobile-first responsive web app for a book recommendation system.
Display books organized by category with recommendation features, search, and filtering.

key features:
- FOCUS on book recommendation system
- in order to run this features, revenue model is from advertising, so the app should have a section for promoted books (sponsored by publishers)


## Reference Sites

| Site          | URL                                    | Reference For                                           |
| ------------- | -------------------------------------- | ------------------------------------------------------- |
| Goodreads     | https://www.goodreads.com/genres/apps  | Layout structure: genre page, book shelf, curated lists |
| Ookbee Buffet | https://buffet.ookbee.com/catalog/book | Thai UI/UX, categories, horizontal book carousel        |

## Web App Features

### 1. Header & Navigation
- App name + logo at the top
  -  app name: "Greed Route"
  -  background for name: wordplay from well known web apps "Goodreads"
  -  meaning of name: "Greed" for desire to read more books, "Route" for personalized reading journey
- Search bar for searching by book title / author / category
- Category menu as dropdown or toggle (ref. Ookbee: "Sort by Type" / "Sort by Interest")


### 2. Recommendation Sections
- **Recommended for You** — horizontal scroll carousel of book covers suggested by the system
- **Popular Books** — top-ranked books
- recommendation drived by several factors:
  - user behavior (clicking, ignoring pop-up)
  - book popularity
  - new arrivals — latest added books ie. new recommend from user
  - promoted books — sponsored by publishers

### 3. Category Sections
Each category displayed as a section with horizontal scroll of book covers (ref. Ookbee layout).
Main categories:
- Business, Finance & Investment
- Psychology & Self-Development
- Computer & Technology
- Award-Winning / Top Authors
- Japanese Manga
- Travel
- Food & Beverage
- Religion & Beliefs
- Family / Parenting
- General Knowledge
- Romance Novels
- Free Books

### 4. Book Card Component
Each book rendered as a card containing:
- Cover image (or placeholder)
- Book title
- Author name
- Rating (stars)
- publisher
- category
- tag
- button to read feedback from other user (to get confirmation for user ensure that current user interested in the book or not, then use this information to improve recommendation)
- button to feedback from current user
- button to add to reading list (to get confirmation for user ensure that current user interested in the book or not, then use this information to improve recommendation)

### 5. Book Detail Modal/Page
On clicking a book card, display:
- Large cover image
- Book title + author
- Synopsis / description
- Category / tags
- Rating and reviews
- Related books

### 6. Filter & Sort
- Filter by category
- Sort by: Recommended / Popular / New Arrivals / Highest Rated
- Filter by rating range

### 7. Footer
- Links to all categories
- Contact / About info

## Data / Source of Materials

Use mock (sample) data inspired by Ookbee Buffet:
- Reference URL: https://buffet.ookbee.com/catalog/book
- Generate JSON data with at least 50 entries covering all categories
- Each entry fields: id, title, author, category, rating, cover_url (use placeholder image), synopsis, tags

## Technical Requirements

- **HTML file** — CSS + JS with child pages
- **Mobile-first responsive** — works well on mobile (375px+) and desktop
- **No external framework required** — use vanilla HTML/CSS/JS, or optionally Tailwind CSS / Bootstrap via CDN
- **Smooth scrolling** — horizontal scroll on category sections must be smooth and touch-friendly
- **Search** — real-time client-side filtering (no backend needed)
- **Dark/Light mode** — theme toggle (optional but nice to have)

## color theme
-path: https://colorhunt.co/palette/f2eae0b4d3d9bda6ce9b8ec7
- color palette:
  - #F2EAE0
  - #B4D3D9
  - #BDA6CE
  - #9B8EC7

## Output

- **Language**: Thai (UI text in Thai)
- **File**: single HTML file
- **main_Filename**: `index.html`
- **Output path**: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\99_thesis_DS\tools\recsys`