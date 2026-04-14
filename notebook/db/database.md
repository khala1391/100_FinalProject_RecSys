# Database Schema for Book Recommendation System
business model: multi-sided platform connecting readers, publishers, and book stores. The database schema is designed to capture the key entities and interactions in this ecosystem, enabling effective recommendation algorithms and personalized user experiences.

---

## book
Core item catalogue. Attributes here feed **content-based filtering** (genre, tags, language, author) and **popularity signals** (avg_rating, view_count).

- book_id (primary key)
- title_th
- title_en
- author
- genre_id (foreign key to genre)
- publisher_id (foreign key to publisher)
- language_id (foreign key to language)
- publication_date
- price
- number_of_pages
- isbn
- description — short summary / blurb, used for NLP/TF-IDF content-based features
- cover_url
- avg_rating — cached average; updated on each new rating event
- rating_count — total number of explicit ratings received
- view_count — total number of view events; used for popularity-based rec

---

## genre
hierarchical genre classification. Useful for **content-based filtering** and understanding user preferences at different levels of granularity. The self-referential foreign key allows for modeling subgenres, which can capture more specific user interests (e.g., 'Fiction' > 'Mystery' > 'Cozy Mystery').

- genre_id (primary key)
- subgenre_of_id (foreign key to genre) — self-referential for hierarchical genres, e.g. 'Fiction' > 'Mystery' > 'Cozy Mystery'
- genre_name_th
- genre_name_en
- subgenre_of_name_th
- subgenre_of_name_en
- description_th
- description_en

---

## publisher
publisher information, useful for content-based filtering and understanding publishing trends.

- publisher_id (primary key)
- publisher_name

---

## publisher_promotion
publisher promotion information, useful for tracking which publishers are actively promoting their books and may be more likely to have popular or trending titles.

- promotion_id (primary key)
- book_id (foreign key to book)
- publisher_id (foreign key to publisher)
- promotion_budget — budget allocated to promote this book; used as a signal for expected popularity and trending rank in the recommendation algorithm
- promotion_start_date — date when the promotion started
- promotion_end_date — date when the promotion ended

---

## book_store
book store information, useful for tracking where books are available for purchase and providing personalized recommendations based on user location and preferred retailers.

- store_id (primary key)
- store_name
- store_location — city or region where the store is located, which can be used to provide location-based recommendations and promotions
- store_url — website URL for the store, which can be used to direct users to purchase books from their preferred retailers

---

## book_store_promotion
book store promotion information, useful for tracking which stores are actively promoting certain books and may be more likely to have popular or trending titles.

- promotion_id (primary key)
- book_id (foreign key to book)
- store_id (foreign key to book_store)
- promotion_budget — budget allocated by the store to promote this book; used as a signal for popularity and trending rank
- promotion_start_date — date when the store started promoting this book
- promotion_end_date — date when the store stopped promoting this book
- affiliate_link — URL for tracking referrals from the recommendation system; supports performance-based revenue sharing between the platform and book stores

---

## tag
Finer-grained content labels beyond genre (e.g., "leadership", "self-help", "AI"). Powers **content-based** narrowing.

- tag_id (primary key)
- tag_name

---

## book_tag
Many-to-many join between books and tags.

- book_id (foreign key to book)
- tag_id (foreign key to tag)
- PRIMARY KEY (book_id, tag_id)

---

## language
language information for books and user preferences, useful for **content-based filtering** and ensuring recommendations match user language preferences.

- language_id (primary key)
- language_name — e.g., 'Thai', 'English'
- language_code — ISO 639-1 code, e.g., 'th', 'en'

---

## user
User profile. Explicit preferences here seed **content-based cold-start** for new users.

- user_id (primary key)
- name
- email
- birth_year
- sex — enum: 'male', 'female', 'other'
- occupation: e.g., 'student', 'professional', 'retired'; used as demographic feature
- marital_status — enum: 'single', 'married', 'divorced', 'other'; used as demographic feature
- religion: e.g., 'Buddhism', 'Christianity', 'Islam', 'Hinduism', 'Other'; used as demographic feature
- hobbies: e.g., 'reading', 'traveling', 'cooking', 'sports', 'music'; used as demographic feature
- education_level: e.g., 'high_school', 'bachelor', 'master', 'doctorate'; used as demographic feature
- salary_range: e.g., '0-20k', '20k-50k', '50k-100k', '100k+'; used as demographic feature
- preferred_language_id (foreign key to language) — preferred reading language
- age_group — enum: 'teen', 'young_adult', 'adult', 'senior'; used as demographic feature
- onboarding_completed — boolean; whether user has set initial preferences

---

## user_genre_preference
Explicit genre preferences collected during onboarding or updated over time. Used as **initial user profile** for content-based filtering.

- user_id (foreign key to user)
- genre_id (foreign key to genre)
- preference_score — integer 1–5; set during onboarding, updated by implicit feedback
- PRIMARY KEY (user_id, genre_id)

---

## device
Device information for users, useful for **personalization** and understanding user context.

- device_id (primary key)
- device_type — enum: 'mobile', 'desktop', 'tablet'; used for device-based recommendation adjustments

---

## traffic_source
External traffic source where the user or session originated. Distinct from `discovery_channel` in `user_book_event` (which tracks how a book was found *within* the platform). Useful for acquisition and re-engagement analysis.

- traffic_source_id (primary key)
- traffic_source_name — enum: 'app', 'website', 'email', 'facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'direct'; tracks the external channel the user came from

---

## user_system_event
Session-level system events for engagement analytics and re-engagement signals.

- system_event_id (primary key)
- user_id (foreign key to user)
- event_type — enum: 'register', 'login', 'logout'
- timestamp
- registration_date — populated only on 'register' events
- last_login_date — populated only on 'login' events

---

## user_book_event
Fine-grained interaction log. This is the **primary input table** for both collaborative filtering (who liked / rated what) and behavioral scoring.

- book_event_id (primary key)
- timestamp
- session_id — groups events within a single visit; used for session-based recommendation
- user_id (foreign key to user)
- book_id (foreign key to book)
- device_id (foreign key to device) — device used during this event; enables device-aware recommendations
- traffic_source_id (foreign key to traffic_source) — external channel that brought the user to the platform for this session (e.g., 'facebook', 'email'); nullable if unknown
- store_id (foreign key to book_store) — nullable; populated only when event_type is 'purchase' to record which store completed the transaction
- event_type — enum: 'genre_view', 'preview', 'view_details', 'add_to_wishlist', 'read_start', 'read_complete', 'rate_review', 'purchase', 'share' — aligned with intent_level taxonomy below
- rating — optional integer 1–5; populated when event_type is 'rate_review'; explicit signal for collaborative filtering
- review_message — optional text; populated when event_type is 'rate_review'
- dwell_time_seconds — seconds spent on the book detail page; implicit engagement signal
- scroll_depth_pct — 0–100, how far user scrolled on the book detail page; additional implicit signal
- discovery_channel — how the user found this book *within* the platform: 'rec_collaborative', 'rec_content', 'rec_popular', 'search', 'browse', 'store_page', 'publisher_page', 'direct'; distinct from traffic_source which tracks the external acquisition channel
- referrer_url — full URL that led to this book page; used for granular navigation path tracking
- intent_level — integer 0–8; derived from event_type to indicate user intent (see below); each event is recorded in a separate row **in same set of events, record each event in a separate row with the corresponding intent_level to capture the full user journey**


---

## level_of_intent
Matches the `event_type` enum values in `user_book_event`.

| intent_level | event_type        | Description                                                                                       |
| ------------ | ----------------- | ------------------------------------------------------------------------------------------------- |
| 0            | `genre_view`      | Scrolling a genre/category — user shows interest in a specific genre                              |
| 1            | `preview`         | Hovering over a book card — quick overview (title, author, rating)                                |
| 2            | `view_details`    | Clicking a book for full details — summary, reviews, author bio                                   |
| 3            | `add_to_wishlist` | Adding to wishlist / save for later — intent to read                                              |
| 4            | `read_start`      | Starting to read — user begins consuming the book                                                 |
| 5            | `read_complete`   | Completing the book — strong signal of satisfaction                                               |
| 6            | `rate_review`     | Rating or reviewing — explicit feedback for recommendation improvement                            |
| 7            | `purchase`        | Purchasing the book via a linked store — strong commercial intent signal; `store_id` is populated |
| 8            | `share`           | Sharing the book — strongest signal of enthusiasm and recommendation value                        |


---

## recommendation_log
Records every recommendation served to a user. Used for **offline evaluation** (precision, recall, NDCG) and to avoid re-recommending items.

- rec_log_id (primary key)
- timestamp
- user_id (foreign key to user)
- book_id (foreign key to book)
- rec_algorithm — which algorithm generated this: 'collaborative', 'content', 'popular', 'hybrid'
- rec_position — rank position shown to the user (1 = top)
- was_clicked — boolean; outcome variable for CTR evaluation
- was_rated — boolean; whether user later rated this book

