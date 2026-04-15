# Chapter 1: Introduction

## 1.1 Background and Motivation

ในยุคที่ข้อมูลหนังสือมีมากมายบนแพลตฟอร์มออนไลน์ ผู้อ่านมักประสบปัญหาในการเลือกหนังสือที่ตรงกับความสนใจของตนเอง — ปรากฏการณ์ที่เรียกว่า **Information Overload** โครงงานนี้จึงพัฒนาระบบแนะนำหนังสือสำหรับแพลตฟอร์ม **Greed Route** ซึ่งเป็นเว็บแอปพลิเคชันสไตล์ Goodreads ที่รองรับภาษาไทยและภาษาอังกฤษ โดยมีเป้าหมายเพื่อมอบประสบการณ์การค้นหาหนังสือที่เป็นส่วนตัวและราบรื่นให้แก่ผู้ใช้

**Greed Route** ถูกออกแบบเป็น multi-sided platform ที่เชื่อมต่อผู้อ่าน สำนักพิมพ์ และร้านหนังสือเข้าด้วยกัน โดยแพลตฟอร์มประกอบด้วยฟีเจอร์หลัก ได้แก่:

- **ระบบแนะนำส่วนตัว** (Recommended for You) — แนะนำหนังสือตามพฤติกรรมและความชอบของผู้ใช้
- **ระบบสำรวจ** (Explore, New Releases, Trending) — ให้ผู้ใช้ค้นพบหนังสือใหม่ ๆ
- **ชุมชน** (Groups, Discussions, Quotes) — ส่งเสริมการมีปฏิสัมพันธ์ระหว่างผู้อ่าน
- **ชั้นหนังสือส่วนตัว** (My Books) — ติดตามการอ่านและจัดการรายการหนังสือ
- **Choice Awards** — โหวตหนังสือยอดเยี่ยมแห่งปี

ระบบแนะนำที่พัฒนาขึ้นใช้ข้อมูลจากพฤติกรรมการใช้งานจริงของผู้ใช้ (user interaction events) ร่วมกับข้อมูลหนังสือ (content features) เพื่อสร้างคำแนะนำที่ผสมผสานหลายแนวทาง ได้แก่ Collaborative Filtering, Content-Based Filtering, Popularity-Based Filtering และ Hybrid Approach

## 1.2 Objectives

1. ออกแบบและสร้างฐานข้อมูลสำหรับระบบแนะนำหนังสือ ที่ครอบคลุมข้อมูลผู้ใช้ หนังสือ พฤติกรรมการใช้งาน และ recommendation log
2. พัฒนาและประเมินผลอัลกอริทึมระบบแนะนำหลายรูปแบบ ได้แก่ Collaborative Filtering, Content-Based Filtering, Popularity-Based และ Hybrid
3. สร้าง Prototype ของเว็บแอปพลิเคชัน **Greed Route** ที่แสดงผลระบบแนะนำแบบ end-to-end
4. ประเมินประสิทธิผลของระบบแนะนำด้วย Precision@K, Recall@K, NDCG, CTR และ Coverage

## 1.3 Scope of the Study

- **จำนวนหนังสือ:** 6,000 เล่ม ครอบคลุม 24 หมวดหมู่หลัก (genre) และ 93 หมวดย่อย (subgenre)
- **จำนวนผู้ใช้:** 1,000 คน พร้อม demographic profile ครบถ้วน
- **จำนวน interaction events:** ~200,000+ แถว (user_book_event) ครอบคลุม 9 ระดับ intent
- **จำนวน recommendation log:** 50,000 แถว จาก 4 อัลกอริทึม
- **ช่วงเวลาข้อมูล:** 1 มกราคม 2024 ถึง 31 ธันวาคม 2025
- **เว็บแอปพลิเคชัน:** 14 หน้า HTML แบบ static prototype พร้อมระบบ bilingual (TH/EN)
- **LLM:** Google Gemini API สำหรับ generate book descriptions และ Thai review messages

## 1.4 Methodology Overview

โครงงานนี้ดำเนินการตามขั้นตอนหลัก 6 ขั้น:

1. **Database Design** — ออกแบบ schema ครอบคลุมตาราง 18 ตาราง ตามหลัก star schema (fact + dimension)
2. **Data Generation** — สร้างข้อมูลจำลองที่สมจริง ด้วย Python + Gemini API
3. **Data Preparation** — สร้าง merged/analytical tables สำหรับแต่ละอัลกอริทึม
4. **Model Development** — พัฒนาอัลกอริทึม 4 แบบ: Collaborative, Content-Based, Popularity, Hybrid
5. **Evaluation** — ประเมินผลด้วย offline metrics (Precision@K, Recall@K, NDCG, CTR)
6. **Prototype** — สร้างเว็บแอปพลิเคชัน Greed Route เพื่อสาธิตการทำงานของระบบ

## 1.5 Expected Contributions

- **Practical:** ระบบแนะนำ end-to-end ที่ใช้งานได้จริงบน Greed Route platform พร้อม recommendation pipeline
- **Academic:** เปรียบเทียบประสิทธิภาพ Collaborative vs. Content-Based vs. Hybrid ในบริบทหนังสือภาษาไทย
- **Technical:** Database schema 18 ตารางที่ออกแบบสำหรับ recommendation system โดยเฉพาะ พร้อม merged tables 6 ตารางสำหรับแต่ละ use case

---

\newpage
