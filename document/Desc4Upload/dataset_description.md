# Thai Book Recommender System — Synthetic Interaction Dataset

## Subtitle
A synthetic, Thai-language e-book platform dataset for building and benchmarking recommender system models (collaborative filtering, content-based, hybrid, cold-start).

---

## About the Dataset

This dataset simulates a **Thai online book-retail platform** (similar to Ookbee / SE-ED / Naiin).  
All records are **synthetically generated** for academic use in a university recommender-systems course project.  
The data covers users, books, in-session reading behaviour, purchase/rating events, recommendation logs, genre taxonomy, and editorial metadata.

---

## Files

| File                        | Rows (approx.) | Description                                                                                                                                       |
| --------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user.csv`                  | ~1,000         | User demographics: name, birth year, sex, occupation, education, salary range, hobbies, religion, preferred language                              |
| `book.csv`                  | ~500           | Book catalogue: Thai/English title, author, genre, publisher, language, price, pages, ISBN, description, ratings                                  |
| `genre.csv`                 | ~100           | Two-level genre taxonomy (parent ↔ sub-genre) with Thai/English names                                                                             |
| `tag.csv`                   | —              | Editorial tags (e.g. *bestseller*, *award-winner*)                                                                                                |
| `book_tag.csv`              | —              | Many-to-many book ↔ tag mapping                                                                                                                   |
| `publisher.csv`             | —              | Publisher master list                                                                                                                             |
| `book_store.csv`            | —              | Online store master list (SE-ED, Naiin, …)                                                                                                        |
| `book_store_promotion.csv`  | —              | Store-level promotional discounts                                                                                                                 |
| `publisher_promotion.csv`   | —              | Publisher-level promotional campaigns                                                                                                             |
| `language.csv`              | —              | Language look-up                                                                                                                                  |
| `device.csv`                | —              | Device types used (mobile, tablet, desktop)                                                                                                       |
| `traffic_source.csv`        | —              | Session traffic-source categories                                                                                                                 |
| `discovery_channel.csv`     | —              | How users discovered a book (search, recommendation, store page, …)                                                                               |
| `level_of_intent.csv`       | —              | Ordinal intent levels (0 = browse → 4 = purchase)                                                                                                 |
| `user_book_event.csv`       | large          | Per-session implicit & explicit events: genre_view, preview, view_details, add_to_cart, purchase, rate, review — with dwell time and scroll depth |
| `user_genre_preference.csv` | —              | User ↔ genre preference scores (from onboarding survey)                                                                                           |
| `user_system_event.csv`     | —              | System-level events: register, login, logout                                                                                                      |
| `recommendation_log.csv`    | —              | Algorithm-level log: which algorithm served a recommendation, position shown, whether clicked/rated                                               |

---

## Column Highlights

### `user.csv`
`user_id`, `name`, `email`, `birth_year`, `sex`, `occupation`, `marital_status`, `religion`, `hobbies`, `education_level`, `salary_range`, `preferred_language_id`, `age_group`, `onboarding_completed`

### `book.csv`
`book_id`, `title_th`, `title_en`, `author`, `genre_id`, `publisher_id`, `language_id`, `publication_date`, `price`, `number_of_pages`, `isbn`, `description` (Thai), `cover_url`, `avg_rating`, `rating_count`, `view_count`

### `user_book_event.csv`
`book_event_id`, `timestamp`, `session_id`, `user_id`, `book_id`, `device_id`, `traffic_source_id`, `store_id`, `event_type`, `rating`, `review_message`, `dwell_time_seconds`, `scroll_depth_pct`, `discovery_channel`, `referrer_url`, `intent_level`

### `recommendation_log.csv`
`rec_log_id`, `timestamp`, `user_id`, `book_id`, `rec_algorithm` *(hybrid / popular / content / collaborative)*, `rec_position`, `was_clicked`, `was_rated`

---

## Potential Applications

- **Collaborative Filtering** — user-based or item-based CF using ratings and purchase events
- **Content-Based Filtering** — genre taxonomy, tags, author, description embeddings
- **Hybrid Recommenders** — combine implicit signals (dwell time, scroll depth) with explicit ratings
- **Cold-Start Research** — new users have demographic + onboarding genre preferences; new books have full metadata
- **Session-Based Recommendation** — chronological in-session event sequences
- **Diversity & Serendipity Studies** — genre hierarchy enables niche vs. mainstream analysis
- **Thai NLP** — book descriptions and reviews are written in Thai

---

## Data Generation

All records were generated synthetically with a Python notebook (`data_generation_rev02.ipynb`) using:
- Realistic Thai names, demographics, and occupations
- A two-level genre tree with ~100 genres
- Session-based event simulation following an intent funnel (browse → view → preview → add-to-cart → purchase → rate)
- Multiple recommendation algorithms logged (hybrid, popular, content-based, collaborative)
- Temporal consistency (registration → login → events → recommendation)

No real personal data is included. ISBNs are randomly generated.

---

## Source

Created as a **final project dataset** for *2603522 Recommender Systems*, Chulalongkorn University, 2025–2026.

---

## Tags

`recommender-systems` `collaborative-filtering` `content-based-filtering` `hybrid` `cold-start` `implicit-feedback` `thai` `nlp` `e-commerce` `books` `synthetic` `education` `session-based`

---

## License

For academic and research use only.