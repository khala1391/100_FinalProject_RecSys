# Appendices

## Appendix A: Database Schema Reference

### A.1 Complete Table List

| # | Table Name | Type | Rows | PK |
|---:|---|---|---:|---|
| 1 | `language` | Dimension | 5 | language_id |
| 2 | `device` | Dimension | 3 | device_id |
| 3 | `traffic_source` | Dimension | 9 | traffic_source_id |
| 4 | `level_of_intent` | Dimension | 9 | intent_level |
| 5 | `discovery_channel` | Dimension | 8 | channel_id |
| 6 | `genre` | Core | 117 | genre_id |
| 7 | `publisher` | Core | 51 | publisher_id |
| 8 | `book_store` | Core | 12 | store_id |
| 9 | `tag` | Core | 57 | tag_id |
| 10 | `book` | Core | 6,000 | book_id |
| 11 | `book_tag` | Bridge | ~24,000 | (book_id, tag_id) |
| 12 | `user_genre_preference` | Bridge | ~2,700 | (user_id, genre_id) |
| 13 | `publisher_promotion` | Bridge | 120 | promo_id |
| 14 | `book_store_promotion` | Bridge | 60 | promo_id |
| 15 | `user` | Core | 1,000 | user_id |
| 16 | `user_system_event` | Fact | ~30,000 | event_id |
| 17 | `user_book_event` | **Fact** | **~200,000+** | event_id |
| 18 | `recommendation_log` | Fact | 50,000 | rec_id |

### A.2 Level of Intent Reference

| Level | Event Name | Description |
|---:|---|---|
| 0 | `genre_view` | User views a genre/category page |
| 1 | `preview` | User sees book card in a list |
| 2 | `view_details` | User opens book detail modal |
| 3 | `add_to_wishlist` | User adds to "Want to Read" list |
| 4 | `read_start` | User starts reading (e-book) or marks "Currently Reading" |
| 5 | `read_complete` | User finishes reading |
| 6 | `rate_review` | User gives rating and/or writes review |
| 7 | `purchase` | User purchases the book |
| 8 | `share` | User shares the book on social media |

### A.3 Genre List (24 Main Genres)

| # | Genre | # | Genre |
|---:|---|---:|---|
| 1 | Art & Photography | 13 | Mystery & Thriller |
| 2 | Biography & Memoir | 14 | Poetry |
| 3 | Business & Economics | 15 | Religion & Spirituality |
| 4 | Children's | 16 | Romance |
| 5 | Classics | 17 | Science & Technology |
| 6 | Comics & Manga | 18 | Science Fiction |
| 7 | Cooking & Food | 19 | Self-Help & Personal Development |
| 8 | Education & Reference | 20 | Sports & Outdoors |
| 9 | Fantasy | 21 | Travel & Adventure |
| 10 | Health & Wellness | 22 | True Crime |
| 11 | History | 23 | Young Adult |
| 12 | Horror | 24 | Home & Garden |

## Appendix B: Merged Tables Inventory

### B.1 File List

| File | Rows | Columns | Size (est.) |
|---|---:|---:|---|
| `merged_user_book_interaction.csv` | ~200,000 | ~30 | ~50 MB |
| `merged_book_features.csv` | 6,000 | ~70 | ~3 MB |
| `merged_user_profile.csv` | 1,000 | ~25 | ~200 KB |
| `merged_rec_performance.csv` | 50,000 | ~20 | ~8 MB |
| `user_book_ratings_long.csv` | ~7,000 | 3 | ~100 KB |
| `user_book_rating_matrix.csv` | 1,000 | ~2,500 | ~5 MB |

### B.2 Merged Tables to Algorithm Mapping

```
merged_user_book_interaction --> Collaborative Filtering (implicit)
                              --> Funnel Analysis / EDA

merged_book_features ----------> Content-Based Filtering
                              --> Book Similarity (cosine / Jaccard)

merged_user_profile -----------> User Segmentation
                              --> Cold-Start Handling
                              --> Demographic-Aware Recommendations

merged_rec_performance --------> Algorithm Evaluation
                              --> A/B Testing Analysis
                              --> CTR / NDCG Computation

user_book_ratings_long --------> SVD, ALS, NMF, KNN (Surprise library)

user_book_rating_matrix -------> Matrix Factorization (scikit-learn / scipy)
```

## Appendix C: Website Pages Reference

### C.1 Complete Page List

| # | File | Page Title (TH) | Section |
|---:|---|---|---|
| 1 | `index.html` | หน้าแรก | Home |
| 2 | `mybooks.html` | หนังสือของฉัน | My Books |
| 3 | `browse-rec.html` | แนะนำสำหรับคุณ | Browse |
| 4 | `browse-choice.html` | Choice Awards | Browse |
| 5 | `browse-new.html` | หนังสือใหม่ | Browse |
| 6 | `browse-list.html` | รายการหนังสือ | Browse |
| 7 | `browse-explore.html` | สำรวจเพิ่มเติม | Browse |
| 8 | `browse-news.html` | ข่าวสาร | Browse |
| 9 | `community-groups.html` | กลุ่ม | Community |
| 10 | `community-discuss.html` | สนทนา | Community |
| 11 | `community-quotes.html` | คำคม | Community |
| 12 | `about.html` | เกี่ยวกับ | Info |
| 13 | `contact.html` | ติดต่อ | Info |
| 14 | `faq.html` | คำถามที่พบบ่อย | Info |

### C.2 Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom) + responsive design |
| Scripting | Vanilla JavaScript |
| Data | `js/data.js` — static JSON data for book display |
| Components | `js/components.js` — shared navbar, footer, modals |
| Images | `image/covers/` — book cover images by genre |
| Icons | Unicode emoji + custom SVG |

## Appendix D: Tools and Technologies

### D.1 Data Generation & Analysis

| Tool | Version | Purpose |
|---|---|---|
| Python | 3.10+ | Primary language |
| pandas | 2.x | Data manipulation |
| numpy | 1.x | Numerical computation |
| google-generativeai | latest | Gemini API client |
| Graphviz | 12.x | ER diagram rendering |
| matplotlib | 3.x | Fallback visualization |
| Jupyter Notebook | 7.x | Interactive development |

### D.2 Recommendation Libraries (for implementation)

| Library | Purpose |
|---|---|
| scikit-learn | TF-IDF, cosine similarity, NMF |
| scikit-surprise | SVD, KNN, baseline algorithms |
| implicit | ALS for implicit feedback |
| scipy | Sparse matrix operations |

### D.3 LLM Configuration

| Parameter | Value |
|---|---|
| Model | `gemini-2.5-flash-lite` |
| Use cases | Book titles (TH/EN), descriptions (TH), reviews (TH) |
| Batch size | 50 books per API call |
| Temperature | 0.8 (creative content) |
| Max tokens | ~2,000 per response |

## Appendix E: File Structure

```
100_FinalProject_RecSys/
+-- index.html              # 14 HTML pages (website prototype)
+-- browse-*.html
+-- community-*.html
+-- mybooks.html
+-- about.html / contact.html / faq.html
|
+-- css/style.css           # Website styling
+-- js/
|   +-- data.js             # Book data (JSON)
|   +-- components.js       # Shared UI components
|
+-- image/
|   +-- covers/             # Book covers organized by genre
|   +-- decorate/           # UI decoration images
|   +-- logo/               # Greed Route logo
|   +-- member/             # Team member photos
|
+-- data/                   # Generated CSV files (18 base tables)
|   +-- book.csv
|   +-- user.csv
|   +-- user_book_event_partial.csv
|   +-- recommendation_log.csv
|   +-- ... (14 more CSVs)
|
+-- notebook/
|   +-- data_generation_rev02.ipynb  # Main data generation notebook
|   +-- download_covers.ipynb        # Book cover scraping
|   +-- db/database.md              # Schema documentation
|
+-- document/
|   +-- report/             # This report (markdown chapters)
|       +-- 00_cover.md
|       +-- 01_introduction.md
|       +-- 02_related_concepts.md
|       +-- 03_system_design.md
|       +-- 04_results.md
|       +-- 05_conclusion.md
|       +-- 06_appendices.md
|
+-- cli/
|   +-- guide.md            # CLI guideline for running the pipeline
|
+-- prompt/                 # Prompt files for LLM-assisted generation
    +-- prompt_apps_rev02.md
    +-- prompt_database_rev01.md
    +-- prompt_report_rev00.md
```

---
