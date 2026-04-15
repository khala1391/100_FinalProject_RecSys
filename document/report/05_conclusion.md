# Chapter 5: Conclusion and Future Work

## 5.1 Summary

โปรเจกต์ **Greed Route** พัฒนาระบบแนะนำหนังสือ (Book Recommendation System) แบบครบวงจร ประกอบด้วย:

1. **ฐานข้อมูล 18 ตาราง** ออกแบบตาม Star Schema รองรับทุก dimension ของ book recommendation — ตั้งแต่ demographic, behavioral ไปจนถึง contextual signals
2. **Synthetic data pipeline** สร้างข้อมูลจำลองสมจริง 200,000+ events จาก 1,000 users × 6,000 books ด้วย Python + Google Gemini API
3. **4 recommendation algorithms** — Collaborative Filtering, Content-Based Filtering, Popularity-Based, และ Hybrid — ทดสอบและเปรียบเทียบผ่าน 50,000 recommendation logs
4. **Website prototype** 14 หน้า แสดง recommendation touchpoints ทั่วทั้งแพลตฟอร์ม
5. **6 merged analytical tables** เตรียมไว้สำหรับการ implement แต่ละ algorithm โดยเฉพาะ

## 5.2 Key Findings

### 5.2.1 Algorithm Performance

| Finding | Detail |
|---|---|
| **Hybrid ดีที่สุดโดยรวม** | CTR 0.27, NDCG@5 0.38, Coverage 78% — ดีที่สุดในทุกมิติ |
| **Collaborative เด่นสำหรับ heavy users** | CTR 0.31 สำหรับ users ที่มี >300 events |
| **Content-Based เด่นสำหรับ cold-start** | ใช้ genre preference + book features แก้ปัญหา new user/new book ได้ผลดี |
| **Popularity-Based มีข้อจำกัดเรื่อง Coverage** | 35% coverage — ควรใช้เป็น fallback เท่านั้น |

### 5.2.2 User Behavior Insights

- **Evening reading pattern** (19:00–22:00) เป็น peak interaction time — สามารถใช้เป็น temporal context ใน recommendation
- **Funnel drop-off สูงที่ view -> wishlist (48%)** -- โอกาสปรับปรุงด้วย better UX + social proof
- **Recommendation feed drive 35% ของ purchases** — คุ้มค่าการลงทุนพัฒนาระบบแนะนำ

### 5.2.3 Data Architecture

- **Star Schema** เหมาะสำหรับ analytical workload ของ RecSys เพราะ query ง่ายและ JOIN performance ดี
- **Level of Intent (0–8)** เป็น implicit feedback signal ที่ดี สะท้อน engagement depth ได้ละเอียดกว่า binary click/no-click
- **Merged tables** ลด complexity ในการ implement algorithm — data scientist ไม่ต้อง JOIN เอง

## 5.3 Limitations

### 5.3.1 Data Limitations

- **Synthetic data** — แม้จะออกแบบให้สมจริง แต่อาจไม่จับ subtle patterns ของ real user behavior เช่น seasonal reading trends, word-of-mouth effects
- **Thai-centric** — review text เป็นภาษาไทย ทำให้ NLP-based features (sentiment, topic modeling) ต้องใช้ Thai-specific tools
- **Fixed scale** — 1,000 users × 6,000 books อาจไม่เพียงพอสำหรับทดสอบ scalability ของ matrix factorization ในระดับ production

### 5.3.2 System Limitations

- **Static prototype** — เว็บไซต์เป็น static HTML ไม่มี backend server, real-time recommendation, หรือ user authentication
- **Offline evaluation** — ดัชนีชี้วัด (CTR, NDCG) คำนวณจาก simulated data ไม่ใช่ online A/B test จริง
- **Single LLM provider** — ใช้ Gemini เพียงตัวเดียว ยังไม่ได้เปรียบเทียบกับ provider อื่น

### 5.3.3 Algorithm Limitations

- **No deep learning models** — ยังไม่ได้ทดสอบ neural collaborative filtering, transformer-based RecSys
- **No context-aware features** — time-of-day, device type, reading speed ยังไม่ถูกนำมาใช้เป็น feature
- **No explanation** — ระบบยังไม่สามารถอธิบายว่าทำไมถึงแนะนำหนังสือเล่มนั้น

## 5.4 Future Work

### 5.4.1 Short-term Improvements

1. **Online serving** — พัฒนา REST API (FastAPI/Flask) สำหรับ serve recommendations แบบ real-time
2. **A/B testing framework** — deploy ระบบ A/B test เพื่อเปรียบเทียบ algorithm บน real traffic
3. **Explainability** — เพิ่ม "เพราะว่า..." ใต้ recommendation card เช่น "เพราะคุณชอบ Mystery" หรือ "ผู้อ่านที่คล้ายกันชอบเล่มนี้"
4. **Re-ranking with business rules** — เพิ่ม publisher promotion, new release boost, diversity constraint

### 5.4.2 Medium-term Enhancements

5. **Neural Collaborative Filtering (NCF)** — ทดสอบ deep learning model ที่จับ non-linear user-item interactions
6. **Sequence-aware RecSys** — ใช้ GRU4Rec หรือ SASRec สำหรับ session-based recommendation จาก intent sequence
7. **Multi-objective optimization** — optimize ทั้ง relevance, diversity, novelty, serendipity พร้อมกัน
8. **Knowledge Graph** — สร้าง book knowledge graph จาก tags, genres, authors, publishers เพื่อ graph-based recommendation

### 5.4.3 Long-term Vision

9. **Thai NLP integration** — sentiment analysis จาก review text (ภาษาไทย) เป็น additional signal
10. **Cross-platform** — รวม data จาก mobile app + website + social media
11. **Group recommendation** — แนะนำหนังสือสำหรับ reading groups (community feature)
12. **Conversational RecSys** — chatbot ที่ถามความชอบแล้วแนะนำ ใช้ LLM + retrieval augmented generation

## 5.5 Closing Remark

Greed Route แสดงให้เห็นว่า recommendation system ที่ออกแบบดี — แม้ใช้ข้อมูลจำลอง — สามารถ:

- **เพิ่ม conversion** (35% ของ purchases มาจาก recommendation feed)
- **ลด cold-start problem** (genre preference + content features ให้ CTR สูงกว่า random 175%)
- **ปรับตามบริบทผู้ใช้** (heavy users ใช้ collaborative, light users ใช้ content-based)

ด้วย data architecture ที่ extensible (Star Schema + merged tables) และ modular algorithm design ระบบพร้อมสำหรับการต่อยอดสู่ production ในอนาคต

---

\newpage
