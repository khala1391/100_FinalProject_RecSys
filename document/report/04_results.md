# Chapter 4: Results and Analysis

บทนี้นำเสนอผลลัพธ์จากระบบแนะนำหนังสือ Greed Route ครอบคลุมทั้ง data overview, algorithm performance, และ user behavior analysis

## 4.1 Dataset Summary

### 4.1.1 Overall Statistics

| Metric | Value |
|---|---:|
| จำนวนผู้ใช้ (Users) | 1,000 |
| จำนวนหนังสือ (Books) | 6,000 |
| จำนวน Genres | 24 หลัก + 93 subgenres |
| จำนวน Tags | 57 |
| จำนวน Publishers | 51 |
| จำนวน Book Stores | 12 |
| จำนวน User-Book Events | ~200,000+ |
| จำนวน Recommendation Logs | 50,000 |
| จำนวน System Events | ~30,000 |
| ภาษาที่รองรับ | 5 (TH, EN, JA, ZH, KO) |

### 4.1.2 Book Distribution by Genre

หนังสือ 6,000 เล่มกระจายใน 24 genres หลัก โดย top-5 genres:

| Genre | จำนวนเล่ม | สัดส่วน |
|---|---:|---:|
| Fiction | ~400 | 6.7% |
| Mystery & Thriller | ~380 | 6.3% |
| Romance | ~360 | 6.0% |
| Fantasy | ~350 | 5.8% |
| Science Fiction | ~340 | 5.7% |

การกระจายค่อนข้าง uniform เนื่องจาก seed data สร้างเล่มต่อ genre ใกล้เคียงกัน (250 เล่ม/genre โดยเฉลี่ย)

### 4.1.3 User Demographics

จากตาราง `merged_user_profile`:

- **เพศ:** Male ~50%, Female ~48%, Non-binary ~2%
- **ช่วงอายุ:** 18–25 (30%), 26–35 (35%), 36–45 (20%), 46+ (15%)
- **ภาษาหลัก:** Thai (60%), English (25%), Japanese (8%), Chinese (4%), Korean (3%)
- **อุปกรณ์ (primary):** Mobile (55%), Desktop (30%), Tablet (15%)

## 4.2 User Behavior Analysis

### 4.2.1 Intent Level Distribution (Funnel Analysis)

จาก `user_book_event` table visiualize conversion funnel ตาม Level of Intent:

| Level | Intent | Cumulative Count | Drop-off |
|---:|---|---:|---:|
| 0 | `genre_view` | ~200,000 | — |
| 1 | `preview` | ~140,000 | ~30% |
| 2 | `view_details` | ~100,000 | ~29% |
| 3 | `add_to_wishlist` | ~52,000 | ~48% |
| 4 | `read_start` | ~28,000 | ~46% |
| 5 | `read_complete` | ~15,000 | ~46% |
| 6 | `rate_review` | ~7,000 | ~53% |
| 7 | `purchase` | ~4,500 | ~36% |
| 8 | `share` | ~2,800 | ~38% |

**Insight:** drop-off ใหญ่ที่สุดเกิดที่ `view_details` -> `add_to_wishlist` (48%) แสดงว่าหลายคนดูรายละเอียดแต่ไม่ commit ระบบแนะนำควร optimize จุดนี้ เช่น แสดง similar books หรือ social proof (เพื่อนก็อ่าน)

### 4.2.2 Session Behavior

- **เฉลี่ย events per session:** ~6.5
- **เฉลี่ย unique books per session:** ~3.2
- **Peak hours:** 19:00–22:00 (evening reading time) — สอดคล้องกับ temporal bias
- **Weekend vs weekday:** sessions on weekends มี duration เฉลี่ยนานกว่า ~20%

### 4.2.3 Rating Distribution

จาก users ที่ให้ rating (intent level ≥ 6):

| Rating | สัดส่วน |
|---:|---:|
| 5 stars | ~15% |
| 4 stars | ~35% |
| 3 stars | ~30% |
| 2 stars | ~15% |
| 1 star  | ~5% |

เฉลี่ย rating: **3.4** — slight positive skew ซึ่งเป็นลักษณะทั่วไปของ rating systems (users มักไม่ rate หนังสือที่ไม่ชอบเลย)

## 4.3 Recommendation Algorithm Performance

### 4.3.1 Algorithm Comparison (from recommendation_log)

จาก `merged_rec_performance` table วิเคราะห์ 50,000 recommendation records:

| Algorithm | Served Count | CTR | Avg Rating (if rated) | Coverage |
|---|---:|---:|---:|---:|
| **Collaborative Filtering** | ~12,500 | 0.24 | 3.7 | 68% |
| **Content-Based Filtering** | ~12,500 | 0.21 | 3.5 | 72% |
| **Popularity-Based** | ~12,500 | 0.19 | 3.3 | 35% |
| **Hybrid** | ~12,500 | 0.27 | 3.8 | 78% |

> **CTR** = Click-Through Rate (clicked_flag = True / total served)
> **Coverage** = % of unique books recommended / total books

### 4.3.2 Key Findings

1. **Hybrid algorithm ให้ผลลัพธ์ดีที่สุด** — CTR 0.27 สูงกว่า Collaborative เดี่ยวๆ 12.5% เนื่องจากรวมจุดแข็งของทั้ง implicit signals (collaborative) กับ content similarity

2. **Popularity-Based มี Coverage ต่ำมาก (35%)** — recommend ซ้ำหนังสือ popular เดิมๆ ทำให้เกิด popularity bias อย่างรุนแรง เหมาะเป็น fallback/cold-start เท่านั้น

3. **Content-Based มี Coverage สูง (72%)** — สามารถแนะนำหนังสือ niche ที่ demographic เฉพาะสนใจ เพราะใช้ feature similarity แทน collaborative signal

4. **Collaborative Filtering ให้ rating สูง (3.7)** — users ที่ interact ตาม rec. จาก collaborative มีแนวโน้ม rate สูงกว่า เพราะ algorithm จับ latent preferences จากพฤติกรรม implicit

### 4.3.3 CTR by Genre

| Genre | Collaborative CTR | Content CTR | Hybrid CTR |
|---|---:|---:|---:|
| Mystery & Thriller | 0.28 | 0.24 | 0.31 |
| Romance | 0.26 | 0.23 | 0.29 |
| Fantasy | 0.25 | 0.22 | 0.28 |
| Non-Fiction | 0.20 | 0.19 | 0.23 |
| History | 0.18 | 0.20 | 0.22 |

**Insight:** Fiction genres (Mystery, Romance, Fantasy) ได้ benefit จาก Collaborative Filtering มากกว่า Non-Fiction เนื่องจากมี inter-user pattern ชัดเจนกว่า (คนที่ชอบ mystery มักอ่าน mystery เหมือนๆ กัน) ขณะที่ Non-Fiction มี Content-Based CTR ใกล้เคียง Collaborative เพราะ feature similarity (หัวข้อ, ผู้แต่ง) มีน้ำหนักมากกว่า social signals

### 4.3.4 Performance by User Segment

แบ่ง user เป็น 3 กลุ่มตาม activity level:

| Segment | Users | Avg Events | Best Algorithm | CTR |
|---|---:|---:|---|---:|
| **Heavy** (>300 events) | ~150 | 450 | Collaborative | 0.31 |
| **Medium** (100–300) | ~500 | 180 | Hybrid | 0.26 |
| **Light** (<100) | ~350 | 45 | Content-Based | 0.20 |

**Insight:** 
- **Heavy users** -- Collaborative ทำงานดีที่สุดเพราะมี interaction data มาก
- **Light users** -- Content-Based ดีกว่าเพราะ collaborative signal ยังไม่เพียงพอ (cold-start mitigation)
- **Medium users** -- Hybrid ดีที่สุดเพราะรวมทั้งสอง signals ได้สมดุล

## 4.4 Evaluation Metrics Deep-Dive

### 4.4.1 Precision@K and Recall@K

ทดสอบ top-K recommendation lists สำหรับ users ที่มี ≥10 rated books (hold-out 20%):

| Metric | K=5 | K=10 | K=20 |
|---|---:|---:|---:|
| Precision@K (Hybrid) | 0.32 | 0.28 | 0.22 |
| Recall@K (Hybrid) | 0.18 | 0.30 | 0.45 |
| Precision@K (Collaborative) | 0.29 | 0.25 | 0.20 |
| Recall@K (Collaborative) | 0.15 | 0.26 | 0.40 |

### 4.4.2 NDCG@K

| Algorithm | NDCG@5 | NDCG@10 | NDCG@20 |
|---|---:|---:|---:|
| Hybrid | 0.38 | 0.35 | 0.31 |
| Collaborative | 0.34 | 0.31 | 0.28 |
| Content-Based | 0.30 | 0.28 | 0.25 |
| Popularity | 0.22 | 0.20 | 0.18 |

### 4.4.3 Coverage vs Accuracy Trade-off

```
Popularity    -->  Low Coverage (35%)  +  Low NDCG (0.22)
Content       -->  High Coverage (72%) +  Mid NDCG (0.30)
Collaborative -->  Mid Coverage (68%)  +  Mid-High NDCG (0.34)
Hybrid        -->  High Coverage (78%) +  High NDCG (0.38)  <- Best overall
```

## 4.5 Cold-Start Analysis

### 4.5.1 New User Cold-Start

ผู้ใช้ใหม่ที่มี <5 events:

| Strategy | CTR |
|---|---:|
| Popularity only | 0.15 |
| Genre preference (onboarding) + Content | 0.22 |
| Genre preference + Popularity | 0.19 |

**Result:** ใช้ genre preference จาก onboarding ร่วมกับ Content-Based ให้ CTR สูงกว่า popularity-only 47% ยืนยันว่า `user_genre_preference` table มีคุณค่ามากในช่วง cold-start

### 4.5.2 New Book Cold-Start

หนังสือใหม่ที่มี <10 interactions:

| Strategy | CTR |
|---|---:|
| Random placement | 0.08 |
| Content similarity (features + tags) | 0.18 |
| Publisher-based (ถ้า publisher popular) | 0.14 |

**Result:** Content-Based ใช้ `merged_book_features` (tag one-hot + genre + publisher + language) แนะนำหนังสือใหม่ได้อย่างมีประสิทธิภาพ โดยไม่ต้องรอ collaborative data

## 4.6 Website Prototype Evaluation

### 4.6.1 Page View Distribution (จาก user_system_event + user_book_event)

| Page / Feature | Est. % of Total Events |
|---|---:|
| หน้าแรก (index.html) | 25% |
| Browse — Rec for You (browse-rec.html) | 18% |
| Book Detail Modal | 22% |
| My Books (mybooks.html) | 12% |
| Browse — Explore (browse-explore.html) | 8% |
| Community pages | 7% |
| Browse — New / Choice / List / News | 5% |
| About / Contact / FAQ | 3% |

**Insight:** "Recommended for You" เป็นจุดเข้าถึง recommendation หลัก (18%) รองจากหน้าแรก (25%) แสดงว่า users ตั้งใจเข้ามาดู personalized recommendation

### 4.6.2 Discovery Channel Effectiveness

จาก `discovery_channel` field ใน `user_book_event`:

| Discovery Channel | % of Conversions (purchase) |
|---|---:|
| recommendation_feed | 35% |
| browse_genre | 22% |
| search | 18% |
| trending_list | 12% |
| friend_activity | 8% |
| new_releases | 5% |

**Insight:** Recommendation feed drive 35% ของ purchases — มากกว่า search (18%) เกือบ 2 เท่า ยืนยัน business value ของระบบแนะนำ

---

\newpage
