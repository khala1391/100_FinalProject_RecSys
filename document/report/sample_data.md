# Sample Data — Greed Route Recommender System
> **Filter:** `user_id = 1`  
> All tables below are filtered by a single user. Data is merged from multiple source CSV files under `data/`.

---

## Table 1: User Profile
**Sources:** `user.csv`  
**Description:** Demographic and account information for the selected user.

| Field | Value |
|---|---|
| `user_id` | 1 |
| `name` | ธนากร ชัยภูมิ |
| `email` | user1@example.com |
| `birth_year` | 1965 |
| `age_group` | senior |
| `sex` | female |
| `occupation` | freelancer |
| `marital_status` | other |
| `religion` | Buddhism |
| `hobbies` | reading, cooking, photography |
| `education_level` | high_school |
| `salary_range` | 20k–50k |
| `preferred_language_id` | 1 |
| `onboarding_completed` | True |

---

## Table 2: User Genre Preferences
**Sources:** `user_genre_preference.csv` ⟕ `genre.csv`  
**Join:** `user_genre_preference.genre_id = genre.genre_id`  
**Description:** Genre preferences collected during onboarding, with human-readable genre names. Used as cold-start signal for Content-Based Filtering (M2).

| `user_id` | `genre_id` | `genre_name_th` | `genre_name_en` | `preference_score` |
|---|---|---|---|---|
| 1 | 96 | การ์ตูนและมังงะ — Graphic Novel | Graphic Novel | 4 |
| 1 | 32 | สารคดี — Memoir | Memoir | 3 |
| 1 | 41 | สืบสวนสอบสวน — Cozy Mystery | Cozy Mystery | 2 |
| 1 | 55 | ระทึกขวัญ — Medical Thriller | Medical Thriller | 1 |
| 1 | 75 | วิทยาศาสตร์ — Earth Science | Earth Science | 1 |

---

## Table 3: User Book Events (Interaction History)
**Sources:** `user_book_event.csv` ⟕ `book.csv` ⟕ `genre.csv` ⟕ `level_of_intent.csv`  
**Joins:**
- `user_book_event.book_id = book.book_id`
- `book.genre_id = genre.genre_id`
- `user_book_event.intent_level = level_of_intent.intent_level`

**Description:** Full interaction history for the selected user, enriched with book title, genre, and intent label. Used as input for Collaborative Filtering (M3–M6) and intent-weighted scoring (M4).

| `book_event_id` | `timestamp` | `user_id` | `title_en` | `genre_name_en` | `event_type` | `intent_level` | `intent_description` | `rating` | `dwell_time_seconds` |
|---|---|---|---|---|---|---|---|---|---|
| a1858ddf-… | 2024-10-29T21:52:58 | 1 | The Last Exodus | Science Fiction | genre_view | 0 | Scrolling a genre/category | — | 11.0 |
| f6a81f2c-… | 2024-10-29T21:55:34 | 1 | The Last Exodus | Science Fiction | preview | 1 | Hovering over a book card | — | 5.0 |
| 386fec82-… | 2024-10-29T21:57:03 | 1 | The Last Exodus | Science Fiction | view_details | 2 | Clicking a book for full details | — | 162.0 |
| 4a9f7498-… | 2024-10-31T03:52:43 | 1 | Graffiti Art: Expression in Public Spaces | Fine Art | genre_view | 0 | Scrolling a genre/category | — | 20.0 |
| 44708090-… | 2024-10-31T03:57:24 | 1 | Graffiti Art: Expression in Public Spaces | Fine Art | preview | 1 | Hovering over a book card | — | 8.0 |

---

## Table 4: Recommendation Log
**Sources:** `recommendation_log.csv` ⟕ `book.csv`  
**Join:** `recommendation_log.book_id = book.book_id`  
**Description:** Records of recommendations served to the selected user — which algorithm generated them, their position in the ranked list, and whether the user clicked or rated. Used for Online Evaluation (CTR, Funnel Conversion).

| `rec_log_id` | `timestamp` | `user_id` | `title_en` | `rec_algorithm` | `rec_position` | `was_clicked` | `was_rated` |
|---|---|---|---|---|---|---|---|
| 1280 | 2024-02-05T07:10:55 | 1 | Khao Yai's Charm: A Haven for Foodies and Nature Lovers | collaborative | 12 | False | False |
| 1965 | 2025-11-10T18:09:24 | 1 | Digital Fortress | content | 18 | False | False |
| 2556 | 2024-11-29T21:24:53 | 1 | Sound Wave Therapy | hybrid | 5 | False | False |
| 2662 | 2025-08-15T02:47:51 | 1 | The Witch's Secret Bread Recipe | hybrid | 19 | False | False |
| 2715 | 2024-06-16T21:41:40 | 1 | Threads of the Night | content | 9 | **True** | False |

---

## Table 5: Rated / Purchased Books with Tags
**Sources:** `user_book_event.csv` ⟕ `book.csv` ⟕ `publisher.csv` ⟕ `book_tag.csv` ⟕ `tag.csv`  
**Joins:**
- `user_book_event.book_id = book.book_id` (filter: `event_type IN ('rate_review','purchase')`)
- `book.publisher_id = publisher.publisher_id`
- `book_tag.book_id = book.book_id`
- `book_tag.tag_id = tag.tag_id`

**Description:** Books the user has rated or purchased, enriched with publisher info, aggregate ratings, and content tags. This merged view is the primary input for Content-Based Filtering (M2) and is used for Offline Evaluation ground-truth.

| `book_id` | `title_en` | `author` | `publisher_name` | `price` | `avg_rating` | `rating_count` | `tags` | `user_event` | `user_rating` |
|---|---|---|---|---|---|---|---|---|---|
| 8f115ff0-… | Graffiti Art: Expression in Public Spaces | บีบอย สตรีท | Kadokawa | 347.82 | 4.0 | 1 | dark-humor, diverse-voices, underrated | rate_review | 4.0 |
| 8f115ff0-… | Graffiti Art: Expression in Public Spaces | บีบอย สตรีท | Kadokawa | 347.82 | 4.0 | 1 | dark-humor, diverse-voices, underrated | purchase | — |
| 6509937a-… | Laughter in the Silence | สมเกียรติ รุ่งเรือง | Hachette Book Group | 813.08 | 4.0 | 1 | feel-good, fast-paced, plot-twist | rate_review | 4.0 |

---

## Summary of Table Joins

```
user (user_id)
│
├── user_genre_preference (user_id → genre_id)
│   └── genre (genre_id) → genre_name_th, genre_name_en
│
├── user_book_event (user_id → book_id, intent_level)
│   ├── book (book_id) → title_th, title_en, author, genre_id, publisher_id
│   │   ├── genre (genre_id) → genre_name_en
│   │   ├── publisher (publisher_id) → publisher_name
│   │   └── book_tag (book_id → tag_id)
│   │       └── tag (tag_id) → tag_name
│   └── level_of_intent (intent_level) → event_type, description
│
└── recommendation_log (user_id → book_id)
    └── book (book_id) → title_en
```
