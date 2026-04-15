# Chapter 2: Related Concepts and Algorithms

บทนี้อธิบายแนวคิดพื้นฐาน อัลกอริทึม และเทคนิคที่นำมาประยุกต์ใช้ในระบบแนะนำหนังสือ Greed Route โดยเน้นความเชื่อมโยงกับข้อมูลและฟีเจอร์ที่มีอยู่จริงในแพลตฟอร์ม

## 2.1 Recommender System Overview

Recommender System คือระบบที่กรองข้อมูลจำนวนมาก เพื่อแนะนำ item ที่ผู้ใช้น่าจะสนใจที่สุด โดยทั่วไปแบ่งออกเป็น 3 แนวทางหลัก:

| แนวทาง | วิธีการ | จุดแข็ง | จุดอ่อน |
|---|---|---|---|
| **Collaborative Filtering** | ใช้ rating patterns ของผู้ใช้ที่คล้ายกัน | ค้นพบ item ใหม่ที่ไม่เคยเห็น | Cold-start problem |
| **Content-Based Filtering** | ใช้ features ของ item (genre, tags, description) | ทำงานได้กับ user ใหม่ | จำกัดอยู่ใน content ที่คล้ายกัน |
| **Hybrid** | รวม Collaborative + Content-Based | ลบจุดอ่อนของแต่ละแนวทาง | ซับซ้อนกว่า |

## 2.2 Collaborative Filtering

### 2.2.1 User-Based Collaborative Filtering

ค้นหาผู้ใช้ที่มี rating pattern คล้ายกับผู้ใช้เป้าหมาย แล้วแนะนำหนังสือที่ผู้ใช้คล้ายกันชอบแต่ผู้ใช้เป้าหมายยังไม่เคยอ่าน

**Similarity measure:** Cosine Similarity

$$
\text{sim}(u, v) = \frac{\sum_{i \in I_{uv}} r_{ui} \cdot r_{vi}}{\sqrt{\sum_{i \in I_{uv}} r_{ui}^2} \cdot \sqrt{\sum_{i \in I_{uv}} r_{vi}^2}}
$$

โดย $I_{uv}$ คือ set ของ items ที่ทั้ง user $u$ และ $v$ เคย rate, $r_{ui}$ คือ rating ที่ user $u$ ให้กับ item $i$

### 2.2.2 Item-Based Collaborative Filtering

คำนวณ similarity ระหว่าง items จาก rating vectors แล้วแนะนำ items ที่คล้ายกับสิ่งที่ผู้ใช้เคยชอบ

### 2.2.3 Matrix Factorization (SVD, ALS, NMF)

ย่อยสลาย user-item rating matrix ออกเป็นผลคูณของ latent factor matrices:

$$
R \approx P \times Q^T
$$

โดย $R$ คือ rating matrix ($m \times n$), $P$ คือ user latent factors ($m \times k$), $Q$ คือ item latent factors ($n \times k$), $k$ คือจำนวน latent dimensions

**ตัวอย่างจากข้อมูล Greed Route:**
- `user_book_rating_matrix.csv` — sparse matrix ขนาด 1,000 users × ~2,500+ books (sparsity > 99%)
- `user_book_ratings_long.csv` — (user_id, book_id, rating) format สำหรับ library เช่น Surprise

## 2.3 Content-Based Filtering

ใช้ features ของหนังสือเพื่อคำนวณ similarity ระหว่าง items แล้วแนะนำหนังสือที่มี feature profile คล้ายกับหนังสือที่ผู้ใช้เคยชอบ

### 2.3.1 Feature Representation

สำหรับ Greed Route ข้อมูล content ของหนังสือแต่ละเล่มประกอบด้วย:

| Feature Type | ตัวอย่าง | ที่มา |
|---|---|---|
| Genre hierarchy | Fiction > Mystery > Cozy Mystery | `genre` table (24 genres, 93 subgenres) |
| Tags | bestseller, page-turner, debut-novel | `book_tag` table (57 tags, one-hot encoded) |
| Publisher | สำนักพิมพ์แจ่มใส, Penguin Random House | `publisher` table (51 publishers) |
| Language | Thai, English, Japanese | `language` table |
| Price range | 89–990 THB | `book.price` |
| Description text | Thai-language book blurb (Gemini-generated) | `book.description` |
| Numeric features | avg_rating, rating_count, view_count, number_of_pages | `book` table |

### 2.3.2 TF-IDF + Cosine Similarity

สำหรับ text-based similarity จาก `description`:

1. ทำ tokenization ข้อความภาษาไทย
2. คำนวณ TF-IDF vector
3. คำนวณ cosine similarity ระหว่างหนังสือ

### 2.3.3 Feature-Vector Similarity

รวม genre (one-hot), tags (57 binary flags), publisher, language, price range เข้าเป็น combined feature vector แล้วคำนวณ cosine similarity

**ข้อมูลที่ใช้:** `merged_book_features.csv` — 6,000 rows × 70+ columns (รวม 57 tag flags)

## 2.4 Popularity-Based Filtering (Baseline)

แนะนำหนังสือยอดนิยมโดยรวมหรือแยกตามหมวดหมู่ ใช้เป็น baseline สำหรับเปรียบเทียบ

**Ranking signals:**
- `view_count` — จำนวนครั้งที่ถูกดู (implicit popularity)
- `rating_count` — จำนวน ratings (explicit engagement)
- `avg_rating` — คะแนนเฉลี่ย (quality signal)

**Time-decayed variant:** ให้น้ำหนักกับ interaction ที่เกิดขึ้นเร็ว ๆ นี้มากกว่า โดยใช้ timestamp decay

## 2.5 Hybrid Approach

ผสมผสาน Collaborative + Content-Based เพื่อแก้ปัญหา cold-start และเพิ่ม coverage:

- **Weighted Hybrid:** ถ่วงน้ำหนักคะแนนจากแต่ละ algorithm แล้วรวม
- **Switching Hybrid:** ใช้ Content-Based สำหรับผู้ใช้ใหม่ (cold-start) แล้วสลับเป็น Collaborative เมื่อมี ratings เพียงพอ
- **Feature-Augmented:** เพิ่ม content features เข้าไปใน collaborative model

## 2.6 Level of Intent — User Interaction Model

ฟีเจอร์สำคัญที่ทำให้ Greed Route แตกต่างคือ **intent-level taxonomy** ซึ่งจำแนก interaction ของผู้ใช้เป็น 9 ระดับ ตั้งแต่เบาไปหนัก:

| Intent Level | Event Type | Signal Strength | ตัวอย่างบน Greed Route |
|:---:|---|:---:|---|
| 0 | `genre_view` | Weak implicit | ผู้ใช้เลื่อนดูหมวด "แฟนตาซี" |
| 1 | `preview` | Weak implicit | hover เห็นปกหนังสือ |
| 2 | `view_details` | Medium implicit | คลิกดูรายละเอียดหนังสือ |
| 3 | `add_to_wishlist` | Medium explicit | กดบันทึกเข้า "อยากอ่าน" |
| 4 | `read_start` | Strong implicit | เริ่มอ่านหนังสือ |
| 5 | `read_complete` | Strong implicit | อ่านจบ |
| 6 | `rate_review` | Strong explicit | ให้คะแนน + เขียนรีวิว |
| 7 | `purchase` | Very strong | ซื้อหนังสือผ่านร้านค้าที่ลิงก์ |
| 8 | `share` | Very strong | แชร์หนังสือให้เพื่อน |

Intent level สามารถใช้เป็น implicit rating weight ใน collaborative filtering ได้ เช่น `purchase` (level 7) มีน้ำหนักมากกว่า `preview` (level 1)

## 2.7 Evaluation Metrics

| Metric | สูตร | ใช้ประเมินอะไร |
|---|---|---|
| **Precision@K** | $\frac{\text{relevant items in top-K}}{K}$ | สัดส่วนของ item ที่แนะนำแล้วถูกต้อง |
| **Recall@K** | $\frac{\text{relevant items in top-K}}{\text{total relevant items}}$ | ครอบคลุม item ที่ผู้ใช้ชอบได้มากแค่ไหน |
| **NDCG** | Normalized Discounted Cumulative Gain | คุณภาพของ ranking (ตำแหน่งสูง = สำคัญกว่า) |
| **CTR** | $\frac{\text{clicks}}{\text{impressions}}$ | อัตราการคลิกจาก recommendation |
| **Coverage** | $\frac{\text{unique items recommended}}{\text{total items}}$ | ความหลากหลายของ item ที่แนะนำ |

## 2.8 Cold-Start Problem

ปัญหาที่ระบบไม่สามารถแนะนำได้อย่างแม่นยำสำหรับผู้ใช้ใหม่หรือหนังสือใหม่:

| ประเภท | สาเหตุ | แนวทางแก้ไขใน Greed Route |
|---|---|---|
| **New user** | ไม่มี rating history | ใช้ genre preferences จาก onboarding (`user_genre_preference`) + Content-Based |
| **New item** | ไม่มี ratings จากผู้ใช้ | ใช้ Content-Based (genre, tags, description) + Popularity boost |

80% ของผู้ใช้ใน Greed Route ผ่าน onboarding แล้ว (เลือก 2–5 genres ที่ชอบ) ทำให้มีข้อมูลเพียงพอสำหรับ Content-Based cold-start

---

\newpage
